/* ═══════════════════════════════════════════════════════════════════════
   VRA · Canonical quote form behavior
   ═══════════════════════════════════════════════════════════════════════
   - Cascading specialty dropdown driven by industry selection
   - "Describe your industry" / "Describe your specialty" text inputs
     reveal on "other" / "*-other" selections
   - Required-field validation with inline errors (no alert dialogs)
   - On valid submit: hides the form, shows the success panel
     ┌──────────────────────────────────────────────────────────────┐
     │  → Hook for backend / webhook integration (NowCerts/Momentum │
     │     AMS, Google Workspace, etc.) goes inside submitForm()    │
     │     where indicated. Replace the success-swap with fetch()   │
     │     when the endpoint is ready.                              │
     └──────────────────────────────────────────────────────────────┘
   ─────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  // ── Specialty options per industry ───────────────────────────────
  const SPECIALTIES = {
    healthcare: [
      ['medical',     'Medical practice'],
      ['dental',      'Dental practice'],
      ['anesthesia',  'Anesthesia / CRNA'],
      ['allied',      'Allied health'],
      ['malpractice', 'Malpractice coverage'],
      ['hc-other',    'Other healthcare specialty'],
    ],
    hospitality: [
      ['hotel',       'Hotel / Motel'],
      ['restaurant',  'Restaurant'],
      ['event',       'Event venue / Catering'],
      ['hosp-other',  'Other hospitality type'],
    ],
    multifamily: [
      ['apartment',   'Apartment complex'],
      ['condo-mf',    'Condominium building'],
      ['mixed',       'Mixed-use property'],
      ['senior',      'Senior / assisted living'],
      ['student',     'Student housing'],
      ['mf-other',    'Other multifamily type'],
    ],
    hoa: [
      ['sf-hoa',      'Single-family HOA'],
      ['condo-hoa',   'Condominium / Townhome association'],
      ['master',      'Master-planned community'],
      ['comm-hoa',    'Commercial / mixed HOA'],
      ['hoa-other',   'Other HOA type'],
    ],
    business: [
      ['retail',      'Retail / eCommerce'],
      ['gas-station', 'C-store / gas station'],
      ['professional','Professional services'],
      ['contractor',  'Contractor / Trades'],
      ['tech',        'Technology / SaaS'],
      ['food-sb',     'Food & Beverage'],
      ['fitness',     'Fitness / Wellness'],
      ['sb-other',    'Other business type'],
    ],
  };

  const REQUIRED_FIELDS = [
    'first_name', 'last_name', 'business_name', 'email', 'phone', 'industry'
  ];

  // ── Init every canonical form on the page ────────────────────────
  document.querySelectorAll('.quote-form').forEach(initQuoteForm);

  function initQuoteForm(form) {
    const industrySelect    = form.querySelector('select[name="industry"]');
    const specialtySelect   = form.querySelector('select[name="specialty"]');

    const specialtyCascade  = form.querySelector('[data-cascade-for="specialty"]');
    const otherIndCascade   = form.querySelector('[data-cascade-for="other_industry"]');
    const otherSpecCascade  = form.querySelector('[data-cascade-for="other_specialty"]');

    // Start with all cascades closed and their inputs disabled
    [specialtyCascade, otherIndCascade, otherSpecCascade].forEach(closeCascade);

    // Industry change → swap which cascade is open
    if (industrySelect) {
      industrySelect.addEventListener('change', () => {
        const value = industrySelect.value;
        clearError(form, 'industry');

        if (value === 'other') {
          closeCascade(specialtyCascade);
          closeCascade(otherSpecCascade);
          openCascade(otherIndCascade);
        } else if (value && SPECIALTIES[value]) {
          populateSpecialty(specialtySelect, SPECIALTIES[value]);
          openCascade(specialtyCascade);
          closeCascade(otherIndCascade);
          closeCascade(otherSpecCascade);
        } else {
          closeCascade(specialtyCascade);
          closeCascade(otherIndCascade);
          closeCascade(otherSpecCascade);
        }
      });
    }

    // Specialty change → open "describe specialty" only for *-other
    if (specialtySelect) {
      specialtySelect.addEventListener('change', () => {
        const value = specialtySelect.value;
        if (value && /-other$/.test(value)) openCascade(otherSpecCascade);
        else                                closeCascade(otherSpecCascade);
      });
    }

    // Clear an error when the user starts fixing the field
    form.querySelectorAll('input, select, textarea').forEach((el) => {
      const name = el.getAttribute('name');
      if (!name) return;
      el.addEventListener('input',  () => clearError(form, name));
      el.addEventListener('change', () => clearError(form, name));
    });

    // Submit
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validate(form)) return;
      submitForm(form);
    });
  }

  // ── Specialty population ─────────────────────────────────────────
  function populateSpecialty(select, options) {
    if (!select) return;
    const html = ['<option value="" disabled selected>Choose a specialty…</option>']
      .concat(options.map(
        ([value, label]) =>
          '<option value="' + escapeAttr(value) + '">' + escapeHtml(label) + '</option>'
      ))
      .join('');
    select.innerHTML = html;
    select.value = '';
  }

  // ── Cascade open/close ───────────────────────────────────────────
  function openCascade(el) {
    if (!el) return;
    el.classList.add('is-open');
    const field = el.querySelector('input, select');
    if (field) field.disabled = false;
  }
  function closeCascade(el) {
    if (!el) return;
    el.classList.remove('is-open');
    const field = el.querySelector('input, select');
    if (field) {
      field.disabled = true;
      field.value = '';
    }
    const fieldName = el.getAttribute('data-field');
    if (fieldName) clearError(el.closest('form'), fieldName);
  }

  // ── Validation ───────────────────────────────────────────────────
  function validate(form) {
    let ok = true;
    REQUIRED_FIELDS.forEach((name) => {
      const el = form.elements[name];
      if (!el) return;
      const value = (el.value || '').trim();

      if (!value) {
        showError(form, name, 'This field is required.');
        ok = false;
        return;
      }
      if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        showError(form, name, 'Please enter a valid email address.');
        ok = false;
        return;
      }
      if (name === 'phone' && value.replace(/[^\d]/g, '').length < 7) {
        showError(form, name, 'Please enter a valid phone number.');
        ok = false;
      }
    });
    return ok;
  }

  function showError(form, name, message) {
    const wrap = form.querySelector('[data-field="' + name + '"]');
    if (!wrap) return;
    wrap.classList.add('has-error');
    const err = wrap.querySelector('.qf-error');
    if (err) err.textContent = message;
  }
  function clearError(form, name) {
    if (!form || !name) return;
    const wrap = form.querySelector('[data-field="' + name + '"]');
    if (!wrap) return;
    wrap.classList.remove('has-error');
    const err = wrap.querySelector('.qf-error');
    if (err) err.textContent = '';
  }

  // ── Submission ───────────────────────────────────────────────────
  function submitForm(form) {
    // ┌─ Webhook integration point ─────────────────────────────────┐
    // │ When backends are ready, swap the success-only behavior     │
    // │ below for a fetch() POST to the chosen endpoint. The form   │
    // │ data is already collected in `data` and uses the canonical  │
    // │ field names (see quote-form-snippet.html header).           │
    // │                                                             │
    // │ Example:                                                    │
    // │   fetch('https://hooks.example.com/vra-quote', {            │
    // │     method: 'POST',                                         │
    // │     headers: { 'Content-Type': 'application/json' },        │
    // │     body: JSON.stringify(data),                             │
    // │   }).then(() => showSuccess(form))                          │
    // │     .catch((err) => showSubmitError(form, err));            │
    // └─────────────────────────────────────────────────────────────┘
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });

    // For now: just show the client-side success panel.
    showSuccess(form);
  }

  function showSuccess(form) {
    const success = form.parentElement
      ? form.parentElement.querySelector('.qf-success')
      : null;
    form.style.display = 'none';
    if (success) {
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // ── Utilities ────────────────────────────────────────────────────
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
  function escapeAttr(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;');
  }
})();

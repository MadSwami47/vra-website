(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = [
    { name: 'name',     required: true,  test: (v) => v.trim().length >= 2,
      msg: 'Please enter your full name.' },
    { name: 'email',    required: true,  test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      msg: 'Please enter a valid business email.' },
    { name: 'phone',    required: false, test: () => true, msg: '' },
    { name: 'industry', required: true,  test: (v) => v && v !== '',
      msg: 'Please select an industry.' },
    { name: 'revenue',  required: true,  test: (v) => v && v !== '',
      msg: 'Please select a revenue range.' },
    { name: 'message',  required: false, test: () => true, msg: '' },
  ];

  function showError(field, msg) {
    const wrap = form.querySelector(`[data-field="${field}"]`);
    if (!wrap) return;
    wrap.classList.add('has-error');
    const err = wrap.querySelector('.form-error');
    if (err) err.textContent = msg;
  }
  function clearError(field) {
    const wrap = form.querySelector(`[data-field="${field}"]`);
    if (!wrap) return;
    wrap.classList.remove('has-error');
    const err = wrap.querySelector('.form-error');
    if (err) err.textContent = '';
  }

  fields.forEach((f) => {
    const el = form.elements[f.name];
    if (!el) return;
    el.addEventListener('input',  () => clearError(f.name));
    el.addEventListener('change', () => clearError(f.name));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    fields.forEach((f) => {
      const el = form.elements[f.name];
      if (!el) return;
      const v = el.value || '';
      if (f.required && !v.trim()) {
        showError(f.name, 'This field is required.');
        ok = false;
        return;
      }
      if (f.required && !f.test(v)) {
        showError(f.name, f.msg);
        ok = false;
      }
    });
    if (!ok) return;

    // Phase 2: real submission. For now, show success state.
    const success = document.getElementById('form-success');
    if (success) {
      form.style.display = 'none';
      success.removeAttribute('hidden');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
})();

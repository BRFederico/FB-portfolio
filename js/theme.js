(() => {
  let preference;
  try { preference = localStorage.getItem('portfolio-theme'); } catch {}
  const dark = preference === 'dark' || (preference !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
})();

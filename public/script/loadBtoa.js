(function () {
  const targets = document.querySelectorAll(`form[action="btoa"]`);
  targets.forEach((form) => {
    const values = location.search.slice(1)
      .split("&")
      .map(e =>
        e.split("=")).reduce((acc, [k, v]) => ({ ...acc, [k]: atob(v) }), {});
    Object.entries(values).forEach(([k, v]) => form[k].value = v);
  });
})();
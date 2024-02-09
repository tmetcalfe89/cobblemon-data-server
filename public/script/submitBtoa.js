(function () {
  const targets = document.querySelectorAll(`form[action="btoa"]`);
  targets.forEach((target) => {
    target.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const form = evt.target;
      const query = {};
      const formData = new FormData(form);
      formData.forEach((v, k) => query[k] = v);
      location.href = `${location.origin}${location.pathname}?${Object.entries(query).map(([k, v]) => `${k}=${btoa(v)}`).join("&")}`
    });
  });
})();
(function () {
  const targets = document.querySelectorAll(`form[action="btoa"]`);
  targets.forEach((form) => {
    const values = JSON.parse(atob(location.search.slice(1)
      .split("&")
      .map(e => e.split("="))
      .find(([k]) => k === "q")[1]));
    Object.entries(values).forEach(([k, v]) => form[k].value = v);
  });
})();
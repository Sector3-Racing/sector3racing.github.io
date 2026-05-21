(async function () {
  const headerMount = document.getElementById("siteHeaderMount");
  const footerMount = document.getElementById("siteFooterMount");
  if (!headerMount && !footerMount) return;

  const loadPartial = async (path) => {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return await res.text();
  };

  try {
    if (headerMount) headerMount.innerHTML = await loadPartial("/assets/partials/header.html");
    if (footerMount) footerMount.innerHTML = await loadPartial("/assets/partials/footer.html");

    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    if (window.SiteInit) window.SiteInit();
  } catch (e) {
    console.error(e);
  }
})();

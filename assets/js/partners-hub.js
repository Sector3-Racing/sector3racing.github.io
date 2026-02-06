(async function () {
  const root = document.getElementById("partnersHub");
  if (!root) return;

  const SHOW_EMPTY_ENABLED_TIERS = true;

  const renderTileGrid = (items) => {
    if (items.length === 0) {
      return SHOW_EMPTY_ENABLED_TIERS
        ? `
          <div class="partner-grid">
            <div class="card">
              <h3>Coming soon</h3>
              <p class="muted">This section will populate as partners are added.</p>
            </div>
          </div>
        `
        : "";
    }

    const tiles = items
      .map((p) => {
        const href = `/partners/${p.slug}/`;
        return `
          <a class="card partner-tile" href="${href}" aria-label="${p.name} partner page">
            <img class="partner-tile-logo" src="${p.logo}" alt="${p.name} logo" loading="lazy" />
            <h3 class="partner-tile-name">${p.name}</h3>
          </a>
        `;
      })
      .join("");

    return `<div class="partner-grid">${tiles}</div>`;
  };

  const renderTier = (key, tier, index) => {
    if (!tier || tier.enabled === false) return "";

    const items = Array.isArray(tier.items) ? tier.items : [];
    const label = tier.label || key;

    // Optional alternating background like your site uses
    const alt = index % 2 === 1 ? " alt" : "";

    // Future: Title / Principal can have different layouts with more copy
    // For now, we still render them as a grid if enabled.
    const content = renderTileGrid(items);
    if (!content) return "";

    return `
      <section class="section${alt}" id="${key}">
        <div class="container">
          <h2>${label}</h2>
          ${content}
        </div>
      </section>
    `;
  };

  try {
    const res = await fetch("/assets/data/partners.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load partners.json");
    const data = await res.json();

    const order = Array.isArray(data.tiersOrder) ? data.tiersOrder : [];
    const tiers = data.tiers || {};

    const html = order
      .map((k, i) => renderTier(k, tiers[k], i))
      .join("");

    root.innerHTML = html || `
      <section class="section">
        <div class="container">
          <h2>Partners</h2>
          <p class="muted">No partner tiers are enabled yet.</p>
        </div>
      </section>
    `;
  } catch (e) {
    console.error(e);
    root.innerHTML = `
      <section class="section">
        <div class="container">
          <h2>Partners</h2>
          <p class="muted">Unable to load partners right now.</p>
        </div>
      </section>
    `;
  }
})();

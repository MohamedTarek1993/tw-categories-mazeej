import { LitElement as _, css as $, html as t } from "lit";
import { property as w } from "lit/decorators.js";
var k = Object.defineProperty, z = (o, e, r, d) => {
  for (var a = void 0, i = o.length - 1, l; i >= 0; i--)
    (l = o[i]) && (a = l(e, r, a) || a);
  return a && k(e, r, a), a;
};
function p(o) {
  return o ? typeof o == "string" ? o : o.url ?? o.src ?? "" : "";
}
const c = class c extends _ {
  render() {
    const e = this.config ?? {}, r = e.categories ?? [], d = e.cols_laptop ?? 5, a = e.cols_tablet ?? 3, i = e.cols_mobile ?? 2, l = e.header_title_color ?? "#000000", f = e.header_title_font_size ?? "1.75rem", b = e.section_bg_color ?? "#ffffff", h = e.category_name_color ?? "#ffffff", g = e.category_name_font_size ?? "0.9rem", v = e.overlay_color ?? "rgba(0,0,0,0.55)", y = e.overlay_opacity ?? 1, x = e.card_border_radius ?? "12px", m = e.header_title_position ?? "start", u = `
      --cols-laptop: ${d};
      --cols-tablet: ${a};
      --cols-mobile: ${i};
      --header-color: ${l};
      --header-font-size: ${f};
      --name-color: ${h};
      --name-font-size: ${g};
      --overlay-color: ${v};
      --overlay-opacity: ${y};
      --card-radius: ${x};
      background-color: ${b};
    `;
    return t`
      <section style=${u}>
        <div class="container">
          ${e.header_title || e.header_text ? t`
                <div
                  class="main-head"
                  style="text-align: ${m};"
                >
                  <div class="head-content">
                    ${e.header_title ? t`<h2 class="main-title">${e.header_title}</h2>` : ""}
                    ${e.header_text ? t`<p
                          class="main-subtitle"
                          style="text-align: ${m};"
                        >
                          ${e.header_text}
                        </p>` : ""}
                  </div>
                  ${e.display_button && e.button_link ? t`
                        <div class="view-more-desktop">
                          <a href=${e.button_link} class="btn-link">
                            <span>${e.button_text ?? "عرض الكل"}</span>
                            <i class="sicon-keyboard_arrow_left"></i>
                          </a>
                        </div>
                      ` : ""}
                </div>
              ` : ""}

          ${r.length ? t`
                <div class="hover-grid">
                  ${r.map(
      (n) => t`
                      <a href=${n.url} class="cat-card">
                        ${p(n.image) ? t`<img
                              src=${p(n.image)}
                              alt=${n.name}
                              loading="lazy"
                            />` : t`<div class="placeholder-icon">
                              <i class="sicon-folder-outline"></i>
                            </div>`}
                        <div class="overlay"></div>
                        <h3 class="cat-name">${n.name}</h3>
                      </a>
                    `
    )}
                </div>
              ` : t`<div class="empty">لا توجد تصنيفات لعرضها حالياً.</div>`}

          ${e.display_button && e.button_link ? t`
                <div class="view-more-mobile">
                  <a href=${e.button_link} class="mazeej-btn">
                    <span>${e.button_text ?? "عرض الكل"}</span>
                    <i class="sicon-keyboard_arrow_left"></i>
                  </a>
                </div>
              ` : ""}
        </div>
      </section>
    `;
  }
};
c.styles = $`
    :host {
      display: block;
      font-family: inherit;
    }

    section {
      padding: 3rem 0;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    /* Header */
    .main-head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #f0f0f0;
    }

    .head-content {
      flex-grow: 1;
    }

    .main-title {
      font-size: var(--header-font-size, 1.75rem);
      font-weight: 700;
      margin: 0 0 0.5rem;
      color: var(--header-color, #000);
    }

    .main-subtitle {
      color: #6b7280;
      margin: 0;
      max-width: 42rem;
    }

    /* Grid */
    .hover-grid {
      display: grid;
      grid-template-columns: repeat(var(--cols-mobile, 2), minmax(0, 1fr));
      gap: 1rem;
    }

    @media (min-width: 768px) {
      .hover-grid {
        grid-template-columns: repeat(var(--cols-tablet, 3), minmax(0, 1fr));
        gap: 1.5rem;
      }
    }

    @media (min-width: 1024px) {
      .hover-grid {
        grid-template-columns: repeat(var(--cols-laptop, 5), minmax(0, 1fr));
        gap: 2rem;
      }
    }

    /* Card */
    .cat-card {
      display: block;
      position: relative;
      text-decoration: none;
      overflow: hidden;
      border-radius: var(--card-radius, 12px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      aspect-ratio: 1 / 1;
      background: #f3f4f6;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .cat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
    }

    /* Image */
    .cat-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .cat-card:hover img {
      transform: scale(1.06);
    }

    .placeholder-icon {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #d1d5db;
      font-size: 3rem;
    }

    /* Overlay */
    .overlay {
      position: absolute;
      inset: 0;
      background: var(--overlay-color, rgba(0, 0, 0, 0.55));
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
    }

    .cat-card:hover .overlay {
      opacity: var(--overlay-opacity, 1);
    }

    /* Name label */
    .cat-name {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0.875rem 1rem;
      font-size: var(--name-font-size, 0.9rem);
      font-weight: 700;
      color: var(--name-color, #ffffff);
      background: var(--overlay-color, rgba(0, 0, 0, 0.55));
      text-align: center;
      transform: translateY(100%);
      transition: transform 0.3s ease;
      z-index: 2;
      margin: 0;
      letter-spacing: 0.02em;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .cat-card:hover .cat-name {
      transform: translateY(0);
    }

    /* Desktop button */
    .view-more-desktop {
      flex-shrink: 0;
    }

    .btn-link {
      display: none;
      align-items: center;
      gap: 0.5rem;
      font-weight: 700;
      font-size: 0.9rem;
      color: var(--header-color, #c49a7a);
      text-decoration: none;
      padding-bottom: 2px;
      border-bottom: 2px solid transparent;
      transition: border-color 0.3s;
    }

    @media (min-width: 768px) {
      .btn-link {
        display: flex;
      }
    }

    .btn-link:hover {
      border-bottom-color: currentColor;
    }

    /* Mobile button */
    .view-more-mobile {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
    }

    @media (min-width: 768px) {
      .view-more-mobile {
        display: none;
      }
    }

    .mazeej-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 2rem;
      background: var(--header-color, #c49a7a);
      color: #fff;
      font-weight: 700;
      font-size: 0.875rem;
      border-radius: 6px;
      text-decoration: none;
      transition: opacity 0.2s;
      width: 100%;
      max-width: 20rem;
    }

    .mazeej-btn:hover {
      opacity: 0.85;
    }

    /* Empty state */
    .empty {
      text-align: center;
      color: #9ca3af;
      padding: 2rem;
    }
  `;
let s = c;
z([
  w({ type: Object })
], s.prototype, "config");
typeof s < "u" && s.registerSallaComponent("salla-categories-hover");
export {
  s as default
};

import { LitElement as w, css as y, html as o } from "lit";
import { property as $ } from "lit/decorators.js";
var k = Object.defineProperty, z = (r, e, a, d) => {
  for (var t = void 0, i = r.length - 1, l; i >= 0; i--)
    (l = r[i]) && (t = l(e, a, t) || t);
  return t && k(e, a, t), t;
};
function p(r) {
  return r ? typeof r == "string" ? r : r.url ?? r.src ?? "" : "";
}
const c = class c extends w {
  render() {
    const e = this.config ?? {}, a = e.categories ?? [], d = e.cols_laptop ?? 7, t = e.cols_tablet ?? 4, i = e.cols_mobile ?? 2, l = e.header_title_color ?? "#000000", f = e.header_title_font_size ?? "1.75rem", b = e.section_bg_color ?? "#ffffff", h = e.category_name_color ?? "#1f2937", g = e.category_name_hover_color ?? "#c49a7a", v = e.category_name_font_size ?? "0.875rem", x = e.border_hover_color ?? "#c49a7a", _ = e.image_size ?? "120px", m = e.header_title_position ?? "start", u = `
      --cols-laptop: ${d};
      --cols-tablet: ${t};
      --cols-mobile: ${i};
      --header-color: ${l};
      --header-font-size: ${f};
      --name-color: ${h};
      --name-hover-color: ${g};
      --name-font-size: ${v};
      --border-hover-color: ${x};
      --img-size: ${_};
      background-color: ${b};
    `;
    return o`
      <section style=${u}>
        <div class="container">
          ${e.header_title || e.header_text ? o`
                <div
                  class="main-head"
                  style="text-align: ${m};"
                >
                  <div class="head-content">
                    ${e.header_title ? o`<h2 class="main-title">${e.header_title}</h2>` : ""}
                    ${e.header_text ? o`<p
                          class="main-subtitle"
                          style="text-align: ${m};"
                        >
                          ${e.header_text}
                        </p>` : ""}
                  </div>
                  ${e.display_button && e.button_link ? o`
                        <div class="view-more-desktop">
                          <a href=${e.button_link} class="btn-link">
                            <span>${e.button_text ?? "عرض الكل"}</span>
                            <i class="sicon-keyboard_arrow_left"></i>
                          </a>
                        </div>
                      ` : ""}
                </div>
              ` : ""}

          ${a.length ? o`
                <div class="circle-grid">
                  ${a.map(
      (n) => o`
                      <a href=${n.url} class="cat-card">
                        <div class="image-wrapper">
                          ${p(n.image) ? o`<img
                                src=${p(n.image)}
                                alt=${n.name}
                                loading="lazy"
                              />` : o`<div class="placeholder-icon">
                                <i class="sicon-folder-outline"></i>
                              </div>`}
                        </div>
                        <h3 class="cat-name">${n.name}</h3>
                      </a>
                    `
    )}
                </div>
              ` : ""}

          ${e.display_button && e.button_link ? o`
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
c.styles = y`
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
    .circle-grid {
      display: grid;
      grid-template-columns: repeat(var(--cols-mobile, 2), minmax(0, 1fr));
      gap: 1.5rem;
    }

    @media (min-width: 768px) {
      .circle-grid {
        grid-template-columns: repeat(var(--cols-tablet, 4), minmax(0, 1fr));
        gap: 2rem;
      }
    }

    @media (min-width: 1024px) {
      .circle-grid {
        grid-template-columns: repeat(var(--cols-laptop, 7), minmax(0, 1fr));
      }
    }

    /* Card */
    .cat-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      cursor: pointer;
      text-decoration: none;
      gap: 0.75rem;
    }

    /* Image wrapper */
    .image-wrapper {
      width: var(--img-size, 120px);
      height: var(--img-size, 120px);
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid transparent;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: border-color 0.3s ease, box-shadow 0.3s ease,
        transform 0.35s ease;
      background: #f9fafb;
      flex-shrink: 0;
    }

    .cat-card:hover .image-wrapper {
      border-color: var(--border-hover-color, #c49a7a);
      box-shadow: 0 0 0 3px var(--border-hover-color, #c49a7a),
        0 8px 20px rgba(0, 0, 0, 0.15);
      transform: translateY(-4px) scale(1.04);
    }

    .image-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      transition: transform 0.5s ease;
    }

    .cat-card:hover .image-wrapper img {
      transform: scale(1.08);
    }

    .placeholder-icon {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #d1d5db;
      font-size: 2rem;
    }

    /* Name */
    .cat-name {
      font-size: var(--name-font-size, 0.875rem);
      font-weight: 600;
      color: var(--name-color, #1f2937);
      margin: 0;
      transition: color 0.3s ease;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .cat-card:hover .cat-name {
      color: var(--name-hover-color, #c49a7a);
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
      color: var(--border-hover-color, #c49a7a);
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
      border-bottom-color: var(--border-hover-color, #c49a7a);
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
      background: var(--border-hover-color, #c49a7a);
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
  `;
let s = c;
z([
  $({ type: Object })
], s.prototype, "config");
typeof s < "u" && s.registerSallaComponent("salla-categories-circle");
export {
  s as default
};

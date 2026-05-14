import { LitElement as k, css as B, html as n } from "lit";
import { property as Y } from "lit/decorators.js";
var C = Object.defineProperty, j = (t, e, l, c) => {
  for (var r = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = s(e, l, r) || r);
  return r && C(e, l, r), r;
};
function d(t) {
  return t ? typeof t == "string" ? t : t.url ?? t.src ?? "" : "";
}
function T(t) {
  return typeof t == "boolean" ? t : typeof t == "string" ? t === "true" || t === "1" : !1;
}
function m(t) {
  return d(t);
}
const b = class b extends k {
  render() {
    const e = this.config ?? {}, l = e.categories ?? [], c = T(e.show_banner), r = d(e.banner_image), o = e.section_height ?? "480px", s = e.section_bg_color ?? "#ffffff", h = e.gallery_gap ?? "4px", u = e.title_box_bg_color ?? "#ffffff", g = e.title_box_text_color ?? "#0b192c", x = e.title_box_font_size ?? "clamp(0.875rem, 2vw, 1.25rem)", y = e.banner_title_color ?? "#ffffff", v = e.banner_text_color ?? "#ffffff", _ = e.banner_btn_bg_color ?? "#ffffff", p = l.slice(0, 4), f = p.length, $ = f > 0 ? `count-${f}` : "", w = c ? "" : "no-banner", z = `
      --section-height: ${o};
      --gallery-gap: ${h};
      --title-box-bg-color: ${u};
      --title-box-text-color: ${g};
      --title-box-font-size: ${x};
      --banner-title-color: ${y};
      --banner-text-color: ${v};
      --banner-btn-bg-color: ${_};
      --banner-btn-text-color-hover: ${g};
      background-color: ${s};
    `;
    return n`
      <section style=${z}>
        <div class="category-wrapper ${w}">
          ${c && r ? n`
                <div class="banner">
                  <img src=${r} alt=${e.banner_title ?? ""} />
                  <div class="banner-content">
                    ${e.banner_title ? n`<h2 class="banner-title">${e.banner_title}</h2>` : ""}
                    ${e.banner_text ? n`<p class="banner-text">${e.banner_text}</p>` : ""}
                    ${e.banner_btn_url && e.banner_btn_text ? n`<a href=${e.banner_btn_url} class="banner-btn">
                          ${e.banner_btn_text}
                        </a>` : ""}
                  </div>
                </div>
              ` : ""}

          ${f ? n`
                <div class="gallery ${$}">
                  ${p.map(
      (a) => n`
                      <a href=${a.url} class="gallery-item">
                        ${m(a.image) ? n`<img
                              src=${m(a.image)}
                              alt=${a.name}
                              loading="lazy"
                            />` : ""}
                        <div class="title-box">${a.name}</div>
                      </a>
                    `
    )}
                </div>
              ` : ""}
        </div>
      </section>
    `;
  }
};
b.styles = B`
    :host {
      display: block;
      font-family: inherit;
    }

    section {
      margin: 1.5rem 0;
    }

    /* Wrapper: banner + gallery side by side */
    .category-wrapper {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 5px;
      align-items: stretch;
      height: var(--section-height, 480px);
    }

    .category-wrapper.no-banner {
      grid-template-columns: 1fr;
      height: var(--section-height, 480px);
    }

    @media (max-width: 768px) {
      .category-wrapper {
        grid-template-columns: 1fr;
      }
    }

    /* ===== BANNER ===== */
    .banner,
    .gallery {
      height: 100%;
      min-height: var(--section-height, 480px);
    }

    .banner {
      position: relative;
      overflow: hidden;
      background: #ddd;
      cursor: pointer;
    }

    .banner img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        filter 0.6s ease;
    }

    .banner:hover img {
      transform: scale(1.08);
      filter: brightness(0.72);
    }

    /* Gradient overlay always visible */
    .banner-content {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;
      padding: 1.5rem;
      z-index: 2;
      background: linear-gradient(
        to top,
        rgba(11, 25, 44, 0.85) 0%,
        rgba(11, 25, 44, 0.4) 50%,
        rgba(11, 25, 44, 0.1) 100%
      );
    }

    .banner-title {
      font-size: clamp(1.1rem, 2vw, 1.75rem);
      font-weight: 700;
      margin: 0 0 0.5rem;
      color: var(--banner-title-color, #ffffff);
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.4s ease 0.1s;
    }

    .banner-text {
      font-size: 0.875rem;
      opacity: 0;
      margin: 0 0 0.75rem;
      color: var(--banner-text-color, #ffffff);
      transform: translateY(20px);
      transition: all 0.4s ease 0.2s;
    }

    .banner-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 44px;
      padding: 0 1.75rem;
      background: transparent;
      border: 2px solid var(--banner-btn-border-color, rgba(255, 255, 255, 0.85));
      color: var(--banner-btn-text-color, #ffffff);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      text-decoration: none;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.4s ease 0.3s, background-color 0.3s, color 0.3s;
    }

    .banner-btn:hover {
      background-color: var(--banner-btn-bg-color, #ffffff);
      color: var(--banner-btn-text-color-hover, #0b192c);
      border-color: var(--banner-btn-bg-color, #ffffff);
    }

    /* Show content on hover */
    .banner:hover .banner-title,
    .banner:hover .banner-text,
    .banner:hover .banner-btn {
      opacity: 1;
      transform: translateY(0);
    }

    /* ===== GALLERY ===== */
    .gallery {
      display: grid;
      width: 100%;
      gap: var(--gallery-gap, 4px);
      height: 100%;
    }

    .gallery-item {
      position: relative;
      overflow: hidden;
      cursor: pointer;
      background: #ddd;
    }

    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        filter 0.6s ease;
    }

    .gallery-item:hover img {
      transform: scale(1.08);
      filter: brightness(0.72);
    }

    /* Gradient on items */
    .gallery-item::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to top,
        rgba(11, 25, 44, 0.85) 0%,
        rgba(11, 25, 44, 0.4) 50%,
        rgba(11, 25, 44, 0.1) 100%
      );
      z-index: 1;
      transition: opacity 0.5s ease;
    }

    /* Title badge */
    .title-box {
      position: absolute;
      bottom: 50%;
      left: 50%;
      transform: translate(-50%, 50%) translateY(20px);
      padding: 0.625rem 1.75rem;
      font-size: var(--title-box-font-size, clamp(0.875rem, 2vw, 1.25rem));
      font-weight: 600;
      color: var(--title-box-text-color, #0b192c);
      background: var(--title-box-bg-color, #ffffff);
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: all 0.4s ease 0.1s;
      z-index: 4;
    }

    .gallery-item:hover .title-box {
      opacity: 1;
      transform: translate(-50%, 50%) translateY(0);
    }

    /* ===== COUNT LAYOUTS ===== */
    .gallery.count-1 {
      grid-template-columns: 1fr;
    }

    .gallery.count-2 {
      grid-template-columns: 1fr;
    }

    .gallery.count-3 {
      grid-template-columns: repeat(2, 1fr);
    }

    .gallery.count-3 .gallery-item:first-child {
      grid-column: 1 / -1;
    }

    .gallery.count-4 {
      grid-template-columns: repeat(2, 1fr);
    }

    /* Responsive gallery */
    @media (max-width: 600px) {
      .gallery.count-3,
      .gallery.count-4 {
        grid-template-columns: 1fr;
      }

      .gallery.count-3 .gallery-item:first-child {
        grid-column: auto;
      }
    }
  `;
let i = b;
j([
  Y({ type: Object })
], i.prototype, "config");
typeof i < "u" && i.registerSallaComponent("salla-categories-grid");
export {
  i as default
};

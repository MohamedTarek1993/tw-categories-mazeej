import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

interface SallaImage {
  url?: string;
  src?: string;
}

interface Category {
  url: string;
  image?: string | SallaImage;
  name: string;
}

function resolveImage(val?: string | SallaImage): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  return val.url ?? val.src ?? "";
}

interface CategoriesHoverConfig {
  categories?: Category[];
  header_title?: string;
  header_text?: string;
  header_title_position?: "start" | "center" | "end";
  header_title_color?: string;
  header_title_font_size?: string;
  section_bg_color?: string;
  overlay_color?: string;
  overlay_opacity?: number;
  category_name_color?: string;
  category_name_font_size?: string;
  card_border_radius?: string;
  cols_laptop?: number;
  cols_tablet?: number;
  cols_mobile?: number;
  display_button?: boolean;
  button_text?: string;
  button_link?: string;
}

export default class CategoriesHover extends LitElement {
  @property({ type: Object })
  config?: CategoriesHoverConfig;

  static styles = css`
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

  render() {
    const c = this.config ?? {};
    const categories = c.categories ?? [];
    const colsLaptop = c.cols_laptop ?? 5;
    const colsTablet = c.cols_tablet ?? 3;
    const colsMobile = c.cols_mobile ?? 2;
    const headerColor = c.header_title_color ?? "#000000";
    const headerFontSize = c.header_title_font_size ?? "1.75rem";
    const sectionBg = c.section_bg_color ?? "#ffffff";
    const nameColor = c.category_name_color ?? "#ffffff";
    const nameFontSize = c.category_name_font_size ?? "0.9rem";
    const overlayColor = c.overlay_color ?? "rgba(0,0,0,0.55)";
    const overlayOpacity = c.overlay_opacity ?? 1;
    const cardRadius = c.card_border_radius ?? "12px";
    const titlePosition = c.header_title_position ?? "start";

    const cssVars = `
      --cols-laptop: ${colsLaptop};
      --cols-tablet: ${colsTablet};
      --cols-mobile: ${colsMobile};
      --header-color: ${headerColor};
      --header-font-size: ${headerFontSize};
      --name-color: ${nameColor};
      --name-font-size: ${nameFontSize};
      --overlay-color: ${overlayColor};
      --overlay-opacity: ${overlayOpacity};
      --card-radius: ${cardRadius};
      background-color: ${sectionBg};
    `;

    return html`
      <section style=${cssVars}>
        <div class="container">
          ${c.header_title || c.header_text
            ? html`
                <div
                  class="main-head"
                  style="text-align: ${titlePosition};"
                >
                  <div class="head-content">
                    ${c.header_title
                      ? html`<h2 class="main-title">${c.header_title}</h2>`
                      : ""}
                    ${c.header_text
                      ? html`<p
                          class="main-subtitle"
                          style="text-align: ${titlePosition};"
                        >
                          ${c.header_text}
                        </p>`
                      : ""}
                  </div>
                  ${c.display_button && c.button_link
                    ? html`
                        <div class="view-more-desktop">
                          <a href=${c.button_link} class="btn-link">
                            <span>${c.button_text ?? "عرض الكل"}</span>
                            <i class="sicon-keyboard_arrow_left"></i>
                          </a>
                        </div>
                      `
                    : ""}
                </div>
              `
            : ""}

          ${categories.length
            ? html`
                <div class="hover-grid">
                  ${categories.map(
                    (cat) => html`
                      <a href=${cat.url} class="cat-card">
                        ${resolveImage(cat.image)
                          ? html`<img
                              src=${resolveImage(cat.image)}
                              alt=${cat.name}
                              loading="lazy"
                            />`
                          : html`<div class="placeholder-icon">
                              <i class="sicon-folder-outline"></i>
                            </div>`}
                        <div class="overlay"></div>
                        <h3 class="cat-name">${cat.name}</h3>
                      </a>
                    `
                  )}
                </div>
              `
            : html`<div class="empty">لا توجد تصنيفات لعرضها حالياً.</div>`}

          ${c.display_button && c.button_link
            ? html`
                <div class="view-more-mobile">
                  <a href=${c.button_link} class="mazeej-btn">
                    <span>${c.button_text ?? "عرض الكل"}</span>
                    <i class="sicon-keyboard_arrow_left"></i>
                  </a>
                </div>
              `
            : ""}
        </div>
      </section>
    `;
  }
}

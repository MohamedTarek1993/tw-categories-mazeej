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

interface CategoriesCircleConfig {
  categories?: Category[];
  header_title?: string;
  header_text?: string;
  header_title_position?: "start" | "center" | "end";
  header_title_color?: string;
  header_title_font_size?: string;
  section_bg_color?: string;
  image_size?: string;
  category_name_color?: string;
  category_name_hover_color?: string;
  category_name_font_size?: string;
  border_hover_color?: string;
  cols_laptop?: number;
  cols_tablet?: number;
  cols_mobile?: number;
  display_button?: boolean;
  button_text?: string;
  button_link?: string;
}

export default class CategoriesCircle extends LitElement {
  @property({ type: Object })
  config?: CategoriesCircleConfig;

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

  render() {
    const c = this.config ?? {};
    const categories = c.categories ?? [];
    const colsLaptop = c.cols_laptop ?? 7;
    const colsTablet = c.cols_tablet ?? 4;
    const colsMobile = c.cols_mobile ?? 2;
    const headerColor = c.header_title_color ?? "#000000";
    const headerFontSize = c.header_title_font_size ?? "1.75rem";
    const sectionBg = c.section_bg_color ?? "#ffffff";
    const nameColor = c.category_name_color ?? "#1f2937";
    const nameHoverColor = c.category_name_hover_color ?? "#c49a7a";
    const nameFontSize = c.category_name_font_size ?? "0.875rem";
    const borderHoverColor = c.border_hover_color ?? "#c49a7a";
    const imgSize = c.image_size ?? "120px";
    const titlePosition = c.header_title_position ?? "start";

    const cssVars = `
      --cols-laptop: ${colsLaptop};
      --cols-tablet: ${colsTablet};
      --cols-mobile: ${colsMobile};
      --header-color: ${headerColor};
      --header-font-size: ${headerFontSize};
      --name-color: ${nameColor};
      --name-hover-color: ${nameHoverColor};
      --name-font-size: ${nameFontSize};
      --border-hover-color: ${borderHoverColor};
      --img-size: ${imgSize};
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
                <div class="circle-grid">
                  ${categories.map(
                    (cat) => html`
                      <a href=${cat.url} class="cat-card">
                        <div class="image-wrapper">
                          ${resolveImage(cat.image)
                            ? html`<img
                                src=${resolveImage(cat.image)}
                                alt=${cat.name}
                                loading="lazy"
                              />`
                            : html`<div class="placeholder-icon">
                                <i class="sicon-folder-outline"></i>
                              </div>`}
                        </div>
                        <h3 class="cat-name">${cat.name}</h3>
                      </a>
                    `
                  )}
                </div>
              `
            : ""}

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

import { css, html, LitElement } from "lit";
import { property } from "lit/decorators.js";

interface Category {
  url: string;
  image?: string | { url?: string; src?: string };
  name: string;
}

interface SallaImage {
  url?: string;
  src?: string;
}

interface CategoriesGridConfig {
  categories?: Category[];
  show_banner?: boolean | string;
  banner_image?: string | SallaImage;
  banner_title?: string;
  banner_text?: string;
  banner_btn_text?: string;
  banner_btn_url?: string;
  section_height?: string;
  section_bg_color?: string;
  overlay_color?: string;
  title_box_bg_color?: string;
  title_box_text_color?: string;
  title_box_font_size?: string;
  gallery_gap?: string;
  banner_title_color?: string;
  banner_text_color?: string;
  banner_btn_bg_color?: string;
  banner_btn_text_color?: string;
}

function resolveImage(val?: string | SallaImage): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  return val.url ?? val.src ?? "";
}

function resolveBool(val?: boolean | string): boolean {
  if (typeof val === "boolean") return val;
  if (typeof val === "string") return val === "true" || val === "1";
  return false;
}

function resolveCategoryImage(val?: string | SallaImage): string {
  return resolveImage(val);
}

export default class CategoriesGrid extends LitElement {
  @property({ type: Object })
  config?: CategoriesGridConfig;

  static styles = css`
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

  render() {
    const c = this.config ?? {};
    const categories = c.categories ?? [];
    const showBanner = resolveBool(c.show_banner);
    const bannerImgSrc = resolveImage(c.banner_image);
    const sectionHeight = c.section_height ?? "480px";
    const sectionBg = c.section_bg_color ?? "#ffffff";
    const galleryGap = c.gallery_gap ?? "4px";
    const titleBoxBg = c.title_box_bg_color ?? "#ffffff";
    const titleBoxText = c.title_box_text_color ?? "#0b192c";
    const titleBoxFontSize = c.title_box_font_size ?? "clamp(0.875rem, 2vw, 1.25rem)";
    const bannerTitleColor = c.banner_title_color ?? "#ffffff";
    const bannerTextColor = c.banner_text_color ?? "#ffffff";
    const bannerBtnBg = c.banner_btn_bg_color ?? "#ffffff";

    const displayedCats = categories.slice(0, 4);
    const count = displayedCats.length;
    const countClass = count > 0 ? `count-${count}` : "";
    const noBannerClass = !showBanner ? "no-banner" : "";

    const cssVars = `
      --section-height: ${sectionHeight};
      --gallery-gap: ${galleryGap};
      --title-box-bg-color: ${titleBoxBg};
      --title-box-text-color: ${titleBoxText};
      --title-box-font-size: ${titleBoxFontSize};
      --banner-title-color: ${bannerTitleColor};
      --banner-text-color: ${bannerTextColor};
      --banner-btn-bg-color: ${bannerBtnBg};
      --banner-btn-text-color-hover: ${titleBoxText};
      background-color: ${sectionBg};
    `;

    return html`
      <section style=${cssVars}>
        <div class="category-wrapper ${noBannerClass}">
          ${showBanner && bannerImgSrc
            ? html`
                <div class="banner">
                  <img src=${bannerImgSrc} alt=${c.banner_title ?? ""} />
                  <div class="banner-content">
                    ${c.banner_title
                      ? html`<h2 class="banner-title">${c.banner_title}</h2>`
                      : ""}
                    ${c.banner_text
                      ? html`<p class="banner-text">${c.banner_text}</p>`
                      : ""}
                    ${c.banner_btn_url && c.banner_btn_text
                      ? html`<a href=${c.banner_btn_url} class="banner-btn">
                          ${c.banner_btn_text}
                        </a>`
                      : ""}
                  </div>
                </div>
              `
            : ""}

          ${count
            ? html`
                <div class="gallery ${countClass}">
                  ${displayedCats.map(
                    (cat) => html`
                      <a href=${cat.url} class="gallery-item">
                        ${resolveCategoryImage(cat.image)
                          ? html`<img
                              src=${resolveCategoryImage(cat.image)}
                              alt=${cat.name}
                              loading="lazy"
                            />`
                          : ""}
                        <div class="title-box">${cat.name}</div>
                      </a>
                    `
                  )}
                </div>
              `
            : ""}
        </div>
      </section>
    `;
  }
}

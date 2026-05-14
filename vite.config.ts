import { defineConfig } from "vite";
import {
  sallaTransformPlugin,
  sallaBuildPlugin,
  sallaDemoPlugin,
} from "@salla.sa/twilight-bundles/vite-plugins";

const mockCategories = [
  { url: "#", image: "https://placehold.co/400x400/f5e6d3/8b5e3c?text=أزياء", name: "أزياء نسائية" },
  { url: "#", image: "https://placehold.co/400x400/d3e8f5/3c6e8b?text=رجالي", name: "أزياء رجالية" },
  { url: "#", image: "https://placehold.co/400x400/d3f5d3/3c8b3c?text=أطفال", name: "أطفال" },
  { url: "#", image: "https://placehold.co/400x400/f5f5d3/8b8b3c?text=إلكترونيات", name: "إلكترونيات" },
  { url: "#", image: "https://placehold.co/400x400/f5d3f5/8b3c8b?text=منزل", name: "منزل وديكور" },
  { url: "#", image: "https://placehold.co/400x400/d3f5f5/3c8b8b?text=رياضة", name: "رياضة" },
  { url: "#", image: "https://placehold.co/400x400/f5d3d3/8b3c3c?text=عطور", name: "عطور" },
];

const mockDataJS = `
(function() {
  var mockCategories = ${JSON.stringify(mockCategories)};

  var circleData = {
    categories: mockCategories,
    header_title: "تصنيفاتنا",
    header_text: "اكتشف مجموعتنا المتنوعة من التصنيفات",
    header_title_color: "#1f2937",
    header_title_font_size: "1.75rem",
    section_bg_color: "#ffffff",
    image_size: "120px",
    border_hover_color: "#c49a7a",
    category_name_color: "#1f2937",
    category_name_hover_color: "#c49a7a",
    category_name_font_size: "0.875rem",
    cols_laptop: 7,
    cols_tablet: 4,
    cols_mobile: 3,
    display_button: true,
    button_text: "عرض الكل",
    button_link: "#"
  };

  var hoverData = {
    categories: mockCategories.slice(0, 5),
    header_title: "تصنيفاتنا",
    header_text: "اكتشف مجموعتنا المتنوعة",
    header_title_color: "#1f2937",
    header_title_font_size: "1.75rem",
    section_bg_color: "#f9fafb",
    overlay_color: "rgba(0,0,0,0.55)",
    overlay_opacity: 0.55,
    category_name_color: "#ffffff",
    category_name_font_size: "0.9rem",
    card_border_radius: "12px",
    cols_laptop: 5,
    cols_tablet: 3,
    cols_mobile: 2,
    display_button: true,
    button_text: "عرض الكل",
    button_link: "#"
  };

  var gridData = {
    categories: mockCategories.slice(0, 4),
    show_banner: true,
    banner_image: "https://placehold.co/600x800/1f2937/ffffff?text=New+Collection",
    banner_title: "كولكشن الصيف",
    banner_text: "تصاميم عصرية بأسعار مميزة",
    banner_btn_text: "تسوق الآن",
    banner_btn_url: "#",
    banner_title_color: "#ffffff",
    banner_text_color: "#e5e7eb",
    section_height: "480px",
    gallery_gap: "4px",
    title_box_bg_color: "#ffffff",
    title_box_text_color: "#0b192c",
    title_box_font_size: "1rem",
    banner_btn_bg_color: "#ffffff",
    section_bg_color: "#ffffff"
  };

  if (!localStorage.getItem('form-builder::data_categories-circle')) {
    localStorage.setItem('form-builder::data_categories-circle', JSON.stringify(circleData));
  }
  if (!localStorage.getItem('form-builder::data_categories-hover')) {
    localStorage.setItem('form-builder::data_categories-hover', JSON.stringify(hoverData));
  }
  if (!localStorage.getItem('form-builder::data_categories-grid')) {
    localStorage.setItem('form-builder::data_categories-grid', JSON.stringify(gridData));
  }
})();
`;

export default defineConfig({
  plugins: [
    sallaTransformPlugin(),
    sallaBuildPlugin(),
    sallaDemoPlugin({
      grid: {
        columns: "1fr",
        gap: "2rem",
      },
      js: mockDataJS,
    }),
  ],
});

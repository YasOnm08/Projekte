"use strict";

function generateCustomStyles(styleSettings) {
  if (!styleSettings) return "";

  const { font, colors, border, shadow } = styleSettings;
  const variables = buildCSSVariables(font, colors, border, shadow);

  return `<style>.iframe-container.custom-styles{${variables.join("")}}</style>`;
}

function buildCSSVariables(font, colors, border, shadow) {
  const getColor = (colorObj) => colorObj?.color || colorObj;
  const v = (value, fallback) => value || fallback;
  const vc = (colorObj, fallback) => getColor(colorObj) || fallback;

  return [
    `--font-size: ${v(font?.size, "16px")};`,
    `--font-weight: ${v(font?.weight, "400")};`,
    `--font-style: ${v(font?.style, "normal")};`,
    `--color-primary: ${vc(colors?.primaryColor, "#667eea")};`,
    `--color-secondary: ${vc(colors?.secondaryColor, "#764ba2")};`,
    `--color-text: ${vc(colors?.fontColor, "#1f2937")};`,
    `--color-text-header: #ffffff;`,
    `--color-bg-content: ${vc(colors?.backgroundColor, "rgba(255, 255, 255, 0.95)")};`,
    `--color-bg-sections: ${vc(colors?.backgroundColor, "rgba(255, 255, 255, 0.8)")};`,
    `--color-open: ${vc(colors?.openedColor, "#10b981")};`,
    `--color-closed: ${vc(colors?.closedColor, "#ef4444")};`,
    `--color-warning: ${vc(colors?.soonColor, "#f59e0b")};`,
    `--border-width: ${v(border?.width, "1px")};`,
    `--border-style: ${v(border?.style, "solid")};`,
    `--shadow-x: ${v(shadow?.offsetX, "0px")};`,
    `--shadow-y: ${v(shadow?.offsetY, "8px")};`,
    `--shadow-blur: ${v(shadow?.blur, "24px")};`,
    `--shadow-color: ${vc(shadow?.color, "rgba(0, 0, 0, 0.1)")};`,
  ];
}

module.exports = { generateCustomStyles };

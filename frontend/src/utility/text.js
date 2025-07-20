// Strip all HTML tags and return plain text
export function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

// Get a safe preview snippet from HTML
export function getPreview(html, maxLength = 100) {
  return stripHtml(html).slice(0, maxLength) + "...";
}

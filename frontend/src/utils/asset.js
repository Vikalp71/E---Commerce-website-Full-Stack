export const normalizeImageUrl = (src, fallback = "/images/electronics.jpg") => {
  if (!src) return fallback;

  if (src.startsWith("/src/assets/images/")) {
    return src.replace("/src/assets/images/", "/images/");
  }

  if (src.startsWith("src/assets/images/")) {
    return `/${src.replace("src/assets/images/", "images/")}`;
  }

  return src;
};

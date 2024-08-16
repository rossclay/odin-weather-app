function importAll(r) {
  let icons = {};
  r.keys().forEach((item) => {
    icons[item.replace("./", "")] = r(item);
  });
  return icons;
}

const images = importAll(require.context("./png", false, /\.(png|jpe?g|svg)$/));
export { images };

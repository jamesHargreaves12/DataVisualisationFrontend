import { getUrl } from "./Datasets";

export const ICONS = {
  // https://fonts.google.com/icons?selected=Material+Icons
  rotate: "/src/data/icons/cached_black_24dp.svg",
  // made by me
  snail: "/src/data/icons/snail.svg",
  smallAngle: "/src/data/icons/smallAngle.svg",
  largeAngle: "/src/data/icons/largeAngle.svg",
  smallCircle: "/src/data/icons/smallCircle.svg",
  bigCircle: "/src/data/icons/bigCircle.svg",
  nextArrow: "/src/data/icons/nextArrow.svg",
  prevArrow: "/src/data/icons/prevArrow.svg",
  colourHighPower: "/src/data/icons/colourHighPower.svg",
  colourLowPower: "/src/data/icons/colourLowPower.svg",
  noCap: "/src/data/icons/noCap.svg",
  withCap: "/src/data/icons/withCap.svg",
  // https://svgsilh.com/image/48433.html
  cheetah: "/src/data/icons/cheetah.svg",
  // https://freesvg.org/1445302539
  hare: "/src/data/icons/hare.svg",
  // https://freesvg.org/snail-silhouette-46148
  snailSilhouette: "/src/data/icons/snail_silhouette.svg",
};
Object.keys(ICONS).forEach((k) => {
  const key = k as keyof typeof ICONS;
  ICONS[key] = getUrl(ICONS[key]);
});

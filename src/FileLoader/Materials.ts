// src of all except viridis is https://github.com/ghosh/uiGradients/blob/master/LICENSE.md
import { getUrl } from "./Datasets";

export const MATERIAL_FILEPATHS = [
  "viridis.png",
  "Atlas.jpg",
  "By Design.jpg",
  "Cool Sky.jpg",
  "Evening Sunshine.jpg",
  "Flare.jpg",
  "Kye Meh.jpg",
  "Kyoo Pal.jpg",
  "Kyoo Tah.jpg",
  "Magic.jpg",
  "Metapolis.jpg",
  "Rastafari.jpg",
  "Red Sunset.jpg",
  "Wedding Day Blues.jpg",
  "Wiretap.jpg",
].map((fname) => getUrl("/src/data/objMaterials/" + fname));

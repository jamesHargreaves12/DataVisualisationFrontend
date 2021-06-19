import "../data/master.mtl";
import { isLocalDev } from "../util";

// kinda hacky but...
export const getUrl = (path: string) =>
  isLocalDev
    ? path
    : path.startsWith("/")
    ? `/DataVisualisationFrontend${path}`
    : `/DataVisualisationFrontend/${path}`;

export const POPULATION_DENSITY_OBJ_FILENAMES = [
  "gbr_m_0_2020_constrained_UNadj.obj",
  "gbr_m_25_2020_constrained_UNadj.obj",
  "gbr_m_10_2020_constrained_UNadj.obj",
  "gbr_f_80_2020_constrained_UNadj.obj",
  "gbr_m_40_2020_constrained_UNadj.obj",
  "gbr_m_75_2020_constrained_UNadj.obj",
  "gbr_f_20_2020_constrained_UNadj.obj",
  "gbr_f_15_2020_constrained_UNadj.obj",
  "gbr_f_45_2020_constrained_UNadj.obj",
  "gbr_f_70_2020_constrained_UNadj.obj",
  "gbr_f_1_2020_constrained_UNadj.obj",
  "gbr_m_50_2020_constrained_UNadj.obj",
  "gbr_m_65_2020_constrained_UNadj.obj",
  "gbr_m_35_2020_constrained_UNadj.obj",
  "gbr_f_0_2020_constrained_UNadj.obj",
  "gbr_f_55_2020_constrained_UNadj.obj",
  "gbr_f_60_2020_constrained_UNadj.obj",
  "gbr_m_1_2020_constrained_UNadj.obj",
  "gbr_f_30_2020_constrained_UNadj.obj",
  "gbr_f_35_2020_constrained_UNadj.obj",
  "gbr_f_65_2020_constrained_UNadj.obj",
  "gbr_f_50_2020_constrained_UNadj.obj",
  "gbr_m_30_2020_constrained_UNadj.obj",
  "gbr_f_5_2020_constrained_UNadj.obj",
  "gbr_m_60_2020_constrained_UNadj.obj",
  "gbr_m_55_2020_constrained_UNadj.obj",
  "gbr_f_75_2020_constrained_UNadj.obj",
  "gbr_f_40_2020_constrained_UNadj.obj",
  "gbr_f_10_2020_constrained_UNadj.obj",
  "gbr_f_25_2020_constrained_UNadj.obj",
  "gbr_m_80_2020_constrained_UNadj.obj",
  "gbr_m_70_2020_constrained_UNadj.obj",
  "gbr_m_45_2020_constrained_UNadj.obj",
  "gbr_pd_2020_1km_UNadj_ASCII_XYZ.obj",
  "gbr_m_15_2020_constrained_UNadj.obj",
  "gbr_m_5_2020_constrained_UNadj.obj",
  "gbr_m_20_2020_constrained_UNadj.obj",
];

const FILENAME_TO_DESCRIPTION: { [key: string]: string } = {
  // Todo increase type strength
  "mcdonalds.obj":
    "The data being visualised here is the distance to the closest McDonald's restaurant. The location of the McDonald's restaurant was scraped from the API that powers the McDonald's restaurant locator (https://www.mcdonalds.com/gb/en-gb/restaurant-locator.html). The height of each pixel represents the distance of those living in that square to their closest McDonald's as the crow flies.",
};

export const DISTANCE_TO_OBJ_FILENAMES = [
  "mcdonalds.obj",
  "coop.obj",
  "iceland.obj",
  "mands.obj",
  "mcdonalds.obj",
  "sainsburys.obj",
  "tesco.obj",
  "inverted_mcdonalds.obj",
];

// src of all except viridis is https://github.com/ghosh/uiGradients/blob/master/LICENSE.md
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

export type Gender = "Male" | "Female" | "All" | "NA";
export type FileDetails = {
  filename: string;
  filepath: string;
  ageRange: string;
  gender: Gender;
  title: string;
  id: string;
  description?: string;
};

const standardFilenameRegex = /gbr_(m|f)_([0-9]+)_2020_constrained_UNadj.obj/;
export const filenameToDetails = (
  filename: string,
  datasetId: DatasetIds
): FileDetails => {
  const filepath = isLocalDev
    ? getUrl(`/src/data/objFiles/${datasetId}/${filename}`)
    : getUrl(`/src/data/objFilesCompressed/${datasetId}/${filename}.gz`);
  switch (datasetId) {
    case DatasetIds.populationDensity:
      if (filename === "gbr_pd_2020_1km_UNadj_ASCII_XYZ.obj")
        return {
          id: "wholePop",
          filename: filename,
          filepath: filepath,
          ageRange: "NA",
          gender: "All",
          title: "Whole Population",
          description: FILENAME_TO_DESCRIPTION[filename],
        };

      const match = filename.match(standardFilenameRegex);
      if (match !== null) {
        const [full, gender, ageGroupStart] = match;
        const fullGender = gender === "m" ? "Male" : "Female";
        const ageRange =
          ageGroupStart === "80"
            ? `80+`
            : ageGroupStart === "0"
            ? `0 - 1`
            : ageGroupStart === "1"
            ? `1 - 5`
            : `${ageGroupStart} - ${parseInt(ageGroupStart) + 5}`;
        return {
          id: `${fullGender}${ageRange.replaceAll(" ", "")}`,
          filename: filename,
          filepath: filepath,
          ageRange: ageRange,
          gender: fullGender,
          title: fullGender + " " + ageRange,
          description: FILENAME_TO_DESCRIPTION[filename],
        };
      }
      throw Error(`Unknown filename for ${datasetId}: ${filename}`);
    case DatasetIds.distanceTo:
      const filenameWithoutType = filename.split(".")[0];
      const titleWords = filenameWithoutType
        .split("_")
        .map((x) => x.charAt(0).toUpperCase() + x.slice(1));
      return {
        id: filenameWithoutType,
        filename: filename,
        filepath: filepath,
        ageRange: "NA",
        gender: "NA",
        title: titleWords.join(" "),
        description: FILENAME_TO_DESCRIPTION[filename],
      };
  }
  throw Error("Unexpected filenmae");
};

export const getFilteredFiles = (
  fileDetails: FileDetails[],
  titleFilter: string,
  gendersFilter: Gender[],
  ageRangeFilter: string[]
) => {
  return fileDetails.filter(
    (fd) =>
      fd.title.includes(titleFilter) &&
      (gendersFilter.includes(fd.gender) || gendersFilter.length === 0) &&
      (ageRangeFilter.includes(fd.ageRange) || ageRangeFilter.length === 0)
  );
};

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

export type Dataset = {
  id: DatasetIds;
  title: string;
  objs: FileDetails[];
  listPageImageCaption: string;
  heatMapSource: string;
};

enum DatasetIds {
  populationDensity = "populationDensity",
  distanceTo = "distanceTo",
}
const HEATMAPS: Record<DatasetIds, string> = {
  [DatasetIds.populationDensity]: "populationDensity.png",
  [DatasetIds.distanceTo]: "mcDonalds.png",
};
Object.keys(HEATMAPS).forEach((k) => {
  const key = k as keyof typeof HEATMAPS;
  HEATMAPS[key] = getUrl(`/src/data/highResHeatMaps/${HEATMAPS[key]}`);
});

export const DATASETS: Dataset[] = [
  {
    id: DatasetIds.populationDensity,
    title: "Population Density",
    objs: POPULATION_DENSITY_OBJ_FILENAMES.map((fn) =>
      filenameToDetails(fn, DatasetIds.populationDensity)
    ),
    heatMapSource: HEATMAPS[DatasetIds.populationDensity],
    listPageImageCaption: "Visualisation of population density data", //TODO improve
  },
  {
    id: DatasetIds.distanceTo,
    title: "Distance To Nearest X",
    objs: DISTANCE_TO_OBJ_FILENAMES.map((fn) =>
      filenameToDetails(fn, DatasetIds.distanceTo)
    ),
    heatMapSource: HEATMAPS[DatasetIds.distanceTo],
    listPageImageCaption: "Example shown for McDonald's",
  },
];

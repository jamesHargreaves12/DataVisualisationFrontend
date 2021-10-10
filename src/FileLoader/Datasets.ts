import "../data/master.mtl";
import { isLocalDev } from "../util";
import medPricePaid0002 from "../data/details/pricePaid/med_price_paid_00_02.json";
import medPricePaid0305 from "../data/details/pricePaid/med_price_paid_03_05.json";
import medPricePaid0608 from "../data/details/pricePaid/med_price_paid_06_08.json";
import medPricePaid0911 from "../data/details/pricePaid/med_price_paid_09_11.json";
import medPricePaid1214 from "../data/details/pricePaid/med_price_paid_12_14.json";
import medPricePaid1517 from "../data/details/pricePaid/med_price_paid_15_17.json";
import medPricePaid1820 from "../data/details/pricePaid/med_price_paid_18_20.json";
import medPricePaid9799 from "../data/details/pricePaid/med_price_paid_97_99.json";
import meanPricePaid0002 from "../data/details/pricePaid/mean_price_paid_00_02.json";
import meanPricePaid0305 from "../data/details/pricePaid/mean_price_paid_03_05.json";
import meanPricePaid0608 from "../data/details/pricePaid/mean_price_paid_06_08.json";
import meanPricePaid0911 from "../data/details/pricePaid/mean_price_paid_09_11.json";
import meanPricePaid1214 from "../data/details/pricePaid/mean_price_paid_12_14.json";
import meanPricePaid1517 from "../data/details/pricePaid/mean_price_paid_15_17.json";
import meanPricePaid1820 from "../data/details/pricePaid/mean_price_paid_18_20.json";
import meanPricePaid9799 from "../data/details/pricePaid/mean_price_paid_97_99.json";
import coOpDetails from "../data/details/distanceTo/coop.json";
import icelandDetails from "../data/details/distanceTo/iceland.json";
import mAndSDetails from "../data/details/distanceTo/mands.json";
import morisonsDetails from "../data/details/distanceTo/morisons.json";
import mcDonaldsDetails from "../data/details/distanceTo/mcdonalds.json";
import sainsburysDetails from "../data/details/distanceTo/sainsburys.json";
import tescoDetails from "../data/details/distanceTo/tesco.json";
import popF0 from "../data/details/populationDensity/gbr_f_0_2020_constrained_UNadj.json";
import popF1 from "../data/details/populationDensity/gbr_f_1_2020_constrained_UNadj.json";
import popF5 from "../data/details/populationDensity/gbr_f_5_2020_constrained_UNadj.json";
import popF10 from "../data/details/populationDensity/gbr_f_10_2020_constrained_UNadj.json";
import popF15 from "../data/details/populationDensity/gbr_f_15_2020_constrained_UNadj.json";
import popF20 from "../data/details/populationDensity/gbr_f_20_2020_constrained_UNadj.json";
import popF25 from "../data/details/populationDensity/gbr_f_25_2020_constrained_UNadj.json";
import popF30 from "../data/details/populationDensity/gbr_f_30_2020_constrained_UNadj.json";
import popF35 from "../data/details/populationDensity/gbr_f_35_2020_constrained_UNadj.json";
import popF40 from "../data/details/populationDensity/gbr_f_40_2020_constrained_UNadj.json";
import popF45 from "../data/details/populationDensity/gbr_f_45_2020_constrained_UNadj.json";
import popF50 from "../data/details/populationDensity/gbr_f_50_2020_constrained_UNadj.json";
import popF55 from "../data/details/populationDensity/gbr_f_55_2020_constrained_UNadj.json";
import popF60 from "../data/details/populationDensity/gbr_f_60_2020_constrained_UNadj.json";
import popF65 from "../data/details/populationDensity/gbr_f_65_2020_constrained_UNadj.json";
import popF70 from "../data/details/populationDensity/gbr_f_70_2020_constrained_UNadj.json";
import popF75 from "../data/details/populationDensity/gbr_f_75_2020_constrained_UNadj.json";
import popF80 from "../data/details/populationDensity/gbr_f_80_2020_constrained_UNadj.json";
import popM1 from "../data/details/populationDensity/gbr_m_1_2020_constrained_UNadj.json";
import popM5 from "../data/details/populationDensity/gbr_m_5_2020_constrained_UNadj.json";
import popM0 from "../data/details/populationDensity/gbr_m_0_2020_constrained_UNadj.json";
import popM10 from "../data/details/populationDensity/gbr_m_10_2020_constrained_UNadj.json";
import popM15 from "../data/details/populationDensity/gbr_m_15_2020_constrained_UNadj.json";
import popM20 from "../data/details/populationDensity/gbr_m_20_2020_constrained_UNadj.json";
import popM25 from "../data/details/populationDensity/gbr_m_25_2020_constrained_UNadj.json";
import popM30 from "../data/details/populationDensity/gbr_m_30_2020_constrained_UNadj.json";
import popM35 from "../data/details/populationDensity/gbr_m_35_2020_constrained_UNadj.json";
import popM40 from "../data/details/populationDensity/gbr_m_40_2020_constrained_UNadj.json";
import popM45 from "../data/details/populationDensity/gbr_m_45_2020_constrained_UNadj.json";
import popM50 from "../data/details/populationDensity/gbr_m_50_2020_constrained_UNadj.json";
import popM55 from "../data/details/populationDensity/gbr_m_55_2020_constrained_UNadj.json";
import popM60 from "../data/details/populationDensity/gbr_m_60_2020_constrained_UNadj.json";
import popM65 from "../data/details/populationDensity/gbr_m_65_2020_constrained_UNadj.json";
import popM70 from "../data/details/populationDensity/gbr_m_70_2020_constrained_UNadj.json";
import popM75 from "../data/details/populationDensity/gbr_m_75_2020_constrained_UNadj.json";
import popM80 from "../data/details/populationDensity/gbr_m_80_2020_constrained_UNadj.json";
import popAll from "../data/details/populationDensity/gbr_pd_2020_1km_UNadj_ASCII_XYZ.json";
import afterHousingIncome16 from "../data/details/msoaCensusData/FY2016NetIncomeAfterHousing.json";
import beforeHousingIncome16 from "../data/details/msoaCensusData/FY2016NetIncomeBeforeHousing.json";
import netAnnualIncome16 from "../data/details/msoaCensusData/FY2016NetAnnualIncome.json";
import totalIncome16 from "../data/details/msoaCensusData/FY2016TotalIncome.json";
import afterHousingIncome18 from "../data/details/msoaCensusData/FY2018NetIncomeAfterHousing.json";
import beforeHousingIncome18 from "../data/details/msoaCensusData/FY2018NetIncomeBeforeHousing.json";
import netAnnualIncome18 from "../data/details/msoaCensusData/FY2018NetAnnualIncome.json";
import totalIncome18 from "../data/details/msoaCensusData/FY2018TotalIncome.json";
import afterHousingIncome14 from "../data/details/msoaCensusData/FY2014NetAnnualIncomeAfterHousing.json";
import beforeHousingIncome14 from "../data/details/msoaCensusData/FY2014NetAnnualIncomeBeforeHousing.json";
import netAnnualIncome14 from "../data/details/msoaCensusData/FY2014NetAnnualIncome.json";
import totalIncome14 from "../data/details/msoaCensusData/FY2014TotalAnnualIncome.json";
import afterHousingIncome12 from "../data/details/msoaCensusData/FY2012NetAnnualIncomeAfterHousing.json";
import beforeHousingIncome12 from "../data/details/msoaCensusData/FY2012NetAnnualIncomeBeforeHousing.json";
import netAnnualIncome12 from "../data/details/msoaCensusData/FY2012NetAnnualIncome.json";
import totalIncome12 from "../data/details/msoaCensusData/FY2012TotalAnnualIncome.json";
import footballStadium from "../data/details/distanceTo/premFootballStadiums.json";

const FILENAME_TO_DETAILS: {
  [k: string]: {
    idOverride?: string;
    title: string;
    description: string;
    datasetSpecificTags?: Record<string, string>;
  };
} = {
  "med_price_paid_00-02.obj": medPricePaid0002,
  "med_price_paid_03-05.obj": medPricePaid0305,
  "med_price_paid_06-08.obj": medPricePaid0608,
  "med_price_paid_09-11.obj": medPricePaid0911,
  "med_price_paid_12-14.obj": medPricePaid1214,
  "med_price_paid_15-17.obj": medPricePaid1517,
  "med_price_paid_18-20.obj": medPricePaid1820,
  "med_price_paid_97-99.obj": medPricePaid9799,
  "mean_price_paid_00-02.obj": meanPricePaid0002,
  "mean_price_paid_03-05.obj": meanPricePaid0305,
  "mean_price_paid_06-08.obj": meanPricePaid0608,
  "mean_price_paid_09-11.obj": meanPricePaid0911,
  "mean_price_paid_12-14.obj": meanPricePaid1214,
  "mean_price_paid_15-17.obj": meanPricePaid1517,
  "mean_price_paid_18-20.obj": meanPricePaid1820,
  "mean_price_paid_97-99.obj": meanPricePaid9799,
  "coop.obj": coOpDetails,
  "iceland.obj": icelandDetails,
  "mands.obj": mAndSDetails,
  "mcdonalds.obj": mcDonaldsDetails,
  "morisons.obj": morisonsDetails,
  "sainsburys.obj": sainsburysDetails,
  "tesco.obj": tescoDetails,
  "gbr_f_0_2020_constrained_UNadj.obj": popF0,
  "gbr_f_1_2020_constrained_UNadj.obj": popF1,
  "gbr_f_5_2020_constrained_UNadj.obj": popF5,
  "gbr_f_10_2020_constrained_UNadj.obj": popF10,
  "gbr_f_15_2020_constrained_UNadj.obj": popF15,
  "gbr_f_20_2020_constrained_UNadj.obj": popF20,
  "gbr_f_25_2020_constrained_UNadj.obj": popF25,
  "gbr_f_30_2020_constrained_UNadj.obj": popF30,
  "gbr_f_35_2020_constrained_UNadj.obj": popF35,
  "gbr_f_40_2020_constrained_UNadj.obj": popF40,
  "gbr_f_45_2020_constrained_UNadj.obj": popF45,
  "gbr_f_50_2020_constrained_UNadj.obj": popF50,
  "gbr_f_55_2020_constrained_UNadj.obj": popF55,
  "gbr_f_60_2020_constrained_UNadj.obj": popF60,
  "gbr_f_65_2020_constrained_UNadj.obj": popF65,
  "gbr_f_70_2020_constrained_UNadj.obj": popF70,
  "gbr_f_75_2020_constrained_UNadj.obj": popF75,
  "gbr_f_80_2020_constrained_UNadj.obj": popF80,
  "gbr_m_1_2020_constrained_UNadj.obj": popM1,
  "gbr_m_5_2020_constrained_UNadj.obj": popM5,
  "gbr_m_0_2020_constrained_UNadj.obj": popM0,
  "gbr_m_10_2020_constrained_UNadj.obj": popM10,
  "gbr_m_15_2020_constrained_UNadj.obj": popM15,
  "gbr_m_20_2020_constrained_UNadj.obj": popM20,
  "gbr_m_25_2020_constrained_UNadj.obj": popM25,
  "gbr_m_30_2020_constrained_UNadj.obj": popM30,
  "gbr_m_35_2020_constrained_UNadj.obj": popM35,
  "gbr_m_40_2020_constrained_UNadj.obj": popM40,
  "gbr_m_45_2020_constrained_UNadj.obj": popM45,
  "gbr_m_50_2020_constrained_UNadj.obj": popM50,
  "gbr_m_55_2020_constrained_UNadj.obj": popM55,
  "gbr_m_60_2020_constrained_UNadj.obj": popM60,
  "gbr_m_65_2020_constrained_UNadj.obj": popM65,
  "gbr_m_70_2020_constrained_UNadj.obj": popM70,
  "gbr_m_75_2020_constrained_UNadj.obj": popM75,
  "gbr_m_80_2020_constrained_UNadj.obj": popM80,
  "gbr_pd_2020_1km_UNadj_ASCII_XYZ.obj": popAll,
  "FY2018NetIncomeAfterHousing.obj": afterHousingIncome18,
  "FY2018NetIncomeBeforeHousing.obj": beforeHousingIncome18,
  "FY2018NetAnnualIncome.obj": netAnnualIncome18,
  "FY2018TotalIncome.obj": totalIncome18,
  "FY2016NetIncomeAfterHousing.obj": afterHousingIncome16,
  "FY2016NetIncomeBeforeHousing.obj": beforeHousingIncome16,
  "FY2016NetAnnualIncome.obj": netAnnualIncome16,
  "FY2016TotalIncome.obj": totalIncome16,
  "FY2014NetAnnualIncomeAfterHousing.obj": afterHousingIncome14,
  "FY2014NetAnnualIncomeBeforeHousing.obj": beforeHousingIncome14,
  "FY2014NetAnnualIncome.obj": netAnnualIncome14,
  "FY2014TotalAnnualIncome.obj": totalIncome14,
  "FY2012NetAnnualIncomeAfterHousing.obj": afterHousingIncome12,
  "FY2012NetAnnualIncomeBeforeHousing.obj": beforeHousingIncome12,
  "FY2012NetAnnualIncome.obj": netAnnualIncome12,
  "FY2012TotalAnnualIncome.obj": totalIncome12,
  "premFootballStadiums.obj": footballStadium,
};

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

export const DISTANCE_TO_OBJ_FILENAMES = [
  "coop.obj",
  "iceland.obj",
  "mands.obj",
  "mcdonalds.obj",
  "morisons.obj",
  "sainsburys.obj",
  "tesco.obj",
  "premFootballStadiums.obj",
];

export const PRICE_PAID_FILENAMES = [
  "med_price_paid_00-02.obj",
  "med_price_paid_03-05.obj",
  "med_price_paid_06-08.obj",
  "med_price_paid_09-11.obj",
  "med_price_paid_12-14.obj",
  "med_price_paid_15-17.obj",
  "med_price_paid_18-20.obj",
  "med_price_paid_97-99.obj",
  "mean_price_paid_00-02.obj",
  "mean_price_paid_03-05.obj",
  "mean_price_paid_06-08.obj",
  "mean_price_paid_09-11.obj",
  "mean_price_paid_12-14.obj",
  "mean_price_paid_15-17.obj",
  "mean_price_paid_18-20.obj",
  "mean_price_paid_97-99.obj",
];

export const MSOA_CENSUS_DATA = [
  "FY2018NetIncomeAfterHousing.obj",
  "FY2018NetIncomeBeforeHousing.obj",
  "FY2018NetAnnualIncome.obj",
  "FY2018TotalIncome.obj",
  "FY2016NetIncomeAfterHousing.obj",
  "FY2016NetIncomeBeforeHousing.obj",
  "FY2016NetAnnualIncome.obj",
  "FY2016TotalIncome.obj",
  "FY2014NetAnnualIncomeAfterHousing.obj",
  "FY2014NetAnnualIncomeBeforeHousing.obj",
  "FY2014NetAnnualIncome.obj",
  "FY2014TotalAnnualIncome.obj",
  "FY2012NetAnnualIncomeAfterHousing.obj",
  "FY2012NetAnnualIncomeBeforeHousing.obj",
  "FY2012NetAnnualIncome.obj",
  "FY2012TotalAnnualIncome.obj",
];

export type Gender = "Male" | "Female" | "All" | "NA";
export type FileDetails = {
  filename: string;
  filepath: string;
  title: string;
  id: string;
  description: string;
  datasetSpecificTags?: Record<string, string>;
};

export const filenameToDetails = (
  filename: string,
  datasetId: DatasetIds
): FileDetails => {
  const filepath = isLocalDev
    ? getUrl(`/src/data/objFiles/${datasetId}/${filename}`)
    : getUrl(`/src/data/objFilesCompressed/${datasetId}/${filename}.gz`);
  const details = FILENAME_TO_DETAILS[filename];
  return {
    id: details.idOverride ?? filename.split(".")[0],
    filename: filename,
    filepath: filepath,
    title: details.title,
    description: details.description,
    datasetSpecificTags: details.datasetSpecificTags,
  };
};

export const getFilteredFiles = (
  fileDetails: FileDetails[],
  titleFilter: string,
  datasetSpecifcFilters: Record<string, undefined | string[]>
) => {
  return fileDetails.filter(
    (fd) =>
      fd.title.includes(titleFilter) &&
      Object.keys(datasetSpecifcFilters).every(
        (k) =>
          datasetSpecifcFilters[k] === undefined ||
          datasetSpecifcFilters[k]?.length === 0 ||
          datasetSpecifcFilters[k]?.includes(
            fd.datasetSpecificTags?.[k] as string
          )
      )
  );
};

export type RightNavSettings = {
  colorExponent?: number;
  cameraRadius?: number;
};

export type Dataset = {
  id: DatasetIds;
  title: string;
  objs: () => FileDetails[];
  listPageImageCaption: string;
  heatMapSource: string;
  rightNavDefaultSettings: RightNavSettings;
};

enum DatasetIds {
  populationDensity = "populationDensity",
  distanceTo = "distanceTo",
  pricePaid = "pricePaid",
  msoaCensusData = "msoaCensusData",
}
const HEATMAPS: Record<DatasetIds, string> = {
  [DatasetIds.populationDensity]: "populationDensity.png",
  [DatasetIds.distanceTo]: "mcDonalds.png",
  [DatasetIds.pricePaid]: "med_price_paid_09-11.png",
  [DatasetIds.msoaCensusData]: "FY2016NetIncomeAfterHousing.png",
};
Object.keys(HEATMAPS).forEach((k) => {
  const key = k as keyof typeof HEATMAPS;
  HEATMAPS[key] = getUrl(`/src/data/highResHeatMaps/${HEATMAPS[key]}`);
});

export const DATASETS: Dataset[] = [
  {
    id: DatasetIds.populationDensity,
    title: "Population Density",
    objs: () =>
      POPULATION_DENSITY_OBJ_FILENAMES.map((fn) =>
        filenameToDetails(fn, DatasetIds.populationDensity)
      ),
    heatMapSource: HEATMAPS[DatasetIds.populationDensity],
    listPageImageCaption: "Visualisation of population density data", //TODO improve
    rightNavDefaultSettings: {},
  },
  {
    id: DatasetIds.distanceTo,
    title: "Distance To Nearest X",
    objs: () =>
      DISTANCE_TO_OBJ_FILENAMES.map((fn) =>
        filenameToDetails(fn, DatasetIds.distanceTo)
      ),
    heatMapSource: HEATMAPS[DatasetIds.distanceTo],
    listPageImageCaption: "Example shown for McDonald's", // TODO
    rightNavDefaultSettings: { colorExponent: 0.5 },
  },
  {
    id: DatasetIds.pricePaid,
    title: "House Prices",
    objs: () =>
      PRICE_PAID_FILENAMES.map(
        (fn) => filenameToDetails(fn, DatasetIds.pricePaid) // TODO
      ),
    heatMapSource: HEATMAPS[DatasetIds.pricePaid],
    listPageImageCaption: "TODO",
    rightNavDefaultSettings: { cameraRadius: 21.6, colorExponent: 1.2 },
  },
  {
    id: DatasetIds.msoaCensusData,
    title: "Income Data",
    objs: () =>
      MSOA_CENSUS_DATA.map(
        (fn) => filenameToDetails(fn, DatasetIds.msoaCensusData) // TODO
      ),
    heatMapSource: HEATMAPS[DatasetIds.msoaCensusData],
    listPageImageCaption: "TODO",
    rightNavDefaultSettings: { colorExponent: 2.34, cameraRadius: 21.6 },
  },
];

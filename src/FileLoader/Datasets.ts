import "../data/master.mtl";
import { isLocalDev } from "../util";
import medPricePaid0002 from "../data/details/pricePaid/med_price_paid_00-02.json";
import medPricePaid0305 from "../data/details/pricePaid/med_price_paid_03-05.json";
import medPricePaid0608 from "../data/details/pricePaid/med_price_paid_06-08.json";
import medPricePaid0911 from "../data/details/pricePaid/med_price_paid_09-11.json";
import medPricePaid1214 from "../data/details/pricePaid/med_price_paid_12-14.json";
import medPricePaid1517 from "../data/details/pricePaid/med_price_paid_15-17.json";
import medPricePaid1820 from "../data/details/pricePaid/med_price_paid_18-20.json";
import medPricePaid9799 from "../data/details/pricePaid/med_price_paid_97-99.json";
import meanPricePaid0002 from "../data/details/pricePaid/mean_price_paid_00-02.json";
import meanPricePaid0305 from "../data/details/pricePaid/mean_price_paid_03-05.json";
import meanPricePaid0608 from "../data/details/pricePaid/mean_price_paid_06-08.json";
import meanPricePaid0911 from "../data/details/pricePaid/mean_price_paid_09-11.json";
import meanPricePaid1214 from "../data/details/pricePaid/mean_price_paid_12-14.json";
import meanPricePaid1517 from "../data/details/pricePaid/mean_price_paid_15-17.json";
import meanPricePaid1820 from "../data/details/pricePaid/mean_price_paid_18-20.json";
import meanPricePaid9799 from "../data/details/pricePaid/mean_price_paid_97-99.json";
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
import afterHousingIncome16 from "../data/details/msoaCensusData/FY2016NetAnnualIncomeAfterHousing.json";
import beforeHousingIncome16 from "../data/details/msoaCensusData/FY2016NetAnnualIncomeBeforeHousing.json";
import netAnnualIncome16 from "../data/details/msoaCensusData/FY2016NetAnnualIncome.json";
import totalIncome16 from "../data/details/msoaCensusData/FY2016TotalAnnualIncome.json";
import afterHousingIncome18 from "../data/details/msoaCensusData/FY2018NetAnnualIncomeAfterHousing.json";
import beforeHousingIncome18 from "../data/details/msoaCensusData/FY2018NetAnnualIncomeBeforeHousing.json";
import netAnnualIncome18 from "../data/details/msoaCensusData/FY2018NetAnnualIncome.json";
import totalIncome18 from "../data/details/msoaCensusData/FY2018TotalAnnualIncome.json";
import afterHousingIncome14 from "../data/details/msoaCensusData/FY2014NetAnnualIncomeAfterHousing.json";
import beforeHousingIncome14 from "../data/details/msoaCensusData/FY2014NetAnnualIncomeBeforeHousing.json";
import netAnnualIncome14 from "../data/details/msoaCensusData/FY2014NetAnnualIncome.json";
import totalIncome14 from "../data/details/msoaCensusData/FY2014TotalAnnualIncome.json";
import afterHousingIncome12 from "../data/details/msoaCensusData/FY2012NetAnnualIncomeAfterHousing.json";
import beforeHousingIncome12 from "../data/details/msoaCensusData/FY2012NetAnnualIncomeBeforeHousing.json";
import netAnnualIncome12 from "../data/details/msoaCensusData/FY2012NetAnnualIncome.json";
import totalIncome12 from "../data/details/msoaCensusData/FY2012TotalAnnualIncome.json";
import footballStadium from "../data/details/distanceTo/premFootballStadiums.json";
import f2002AorticAneurysm from "../data/details/msoaAorticAneurysm/F2002aorticaneurysmdeathsbymsoaengland.json";
import f2003AorticAneurysm from "../data/details/msoaAorticAneurysm/F2003aorticaneurysmdeathsbymsoaengland.json";
import f2004AorticAneurysm from "../data/details/msoaAorticAneurysm/F2004aorticaneurysmdeathsbymsoaengland.json";
import f2005AorticAneurysm from "../data/details/msoaAorticAneurysm/F2005aorticaneurysmdeathsbymsoaengland.json";
import f2006AorticAneurysm from "../data/details/msoaAorticAneurysm/F2006aorticaneurysmdeathsbymsoaengland.json";
import f2007AorticAneurysm from "../data/details/msoaAorticAneurysm/F2007aorticaneurysmdeathsbymsoaengland.json";
import f2008AorticAneurysm from "../data/details/msoaAorticAneurysm/F2008aorticaneurysmdeathsbymsoaengland.json";
import f2009AorticAneurysm from "../data/details/msoaAorticAneurysm/F2009aorticaneurysmdeathsbymsoaengland.json";
import f2010AorticAneurysm from "../data/details/msoaAorticAneurysm/F2010aorticaneurysmdeathsbymsoaengland.json";
import f2011AorticAneurysm from "../data/details/msoaAorticAneurysm/F2011aorticaneurysmdeathsbymsoaengland.json";
import f2012AorticAneurysm from "../data/details/msoaAorticAneurysm/F2012aorticaneurysmdeathsbymsoaengland.json";
import f2013AorticAneurysm from "../data/details/msoaAorticAneurysm/F2013aorticaneurysmdeathsbymsoaengland.json";
import f2014AorticAneurysm from "../data/details/msoaAorticAneurysm/F2014aorticaneurysmdeathsbymsoaengland.json";
import f2015AorticAneurysm from "../data/details/msoaAorticAneurysm/F2015aorticaneurysmdeathsbymsoaengland.json";
import f2016AorticAneurysm from "../data/details/msoaAorticAneurysm/F2016aorticaneurysmdeathsbymsoaengland.json";
import f2017AorticAneurysm from "../data/details/msoaAorticAneurysm/F2017aorticaneurysmdeathsbymsoaengland.json";
import m2002AorticAneurysm from "../data/details/msoaAorticAneurysm/M2002aorticaneurysmdeathsbymsoaengland.json";
import m2003AorticAneurysm from "../data/details/msoaAorticAneurysm/M2003aorticaneurysmdeathsbymsoaengland.json";
import m2004AorticAneurysm from "../data/details/msoaAorticAneurysm/M2004aorticaneurysmdeathsbymsoaengland.json";
import m2005AorticAneurysm from "../data/details/msoaAorticAneurysm/M2005aorticaneurysmdeathsbymsoaengland.json";
import m2006AorticAneurysm from "../data/details/msoaAorticAneurysm/M2006aorticaneurysmdeathsbymsoaengland.json";
import m2007AorticAneurysm from "../data/details/msoaAorticAneurysm/M2007aorticaneurysmdeathsbymsoaengland.json";
import m2008AorticAneurysm from "../data/details/msoaAorticAneurysm/M2008aorticaneurysmdeathsbymsoaengland.json";
import m2009AorticAneurysm from "../data/details/msoaAorticAneurysm/M2009aorticaneurysmdeathsbymsoaengland.json";
import m2010AorticAneurysm from "../data/details/msoaAorticAneurysm/M2010aorticaneurysmdeathsbymsoaengland.json";
import m2011AorticAneurysm from "../data/details/msoaAorticAneurysm/M2011aorticaneurysmdeathsbymsoaengland.json";
import m2012AorticAneurysm from "../data/details/msoaAorticAneurysm/M2012aorticaneurysmdeathsbymsoaengland.json";
import m2013AorticAneurysm from "../data/details/msoaAorticAneurysm/M2013aorticaneurysmdeathsbymsoaengland.json";
import m2014AorticAneurysm from "../data/details/msoaAorticAneurysm/M2014aorticaneurysmdeathsbymsoaengland.json";
import m2015AorticAneurysm from "../data/details/msoaAorticAneurysm/M2015aorticaneurysmdeathsbymsoaengland.json";
import m2016AorticAneurysm from "../data/details/msoaAorticAneurysm/M2016aorticaneurysmdeathsbymsoaengland.json";
import m2017AorticAneurysm from "../data/details/msoaAorticAneurysm/M2017aorticaneurysmdeathsbymsoaengland.json";
import diabetesAll from "../data/details/diabetesDeaths/All-deathsByDiabetes20132017.json";
import diabetesMale from "../data/details/diabetesDeaths/Male-deathsByDiabetes20132017.json";
import diabetesFemale from "../data/details/diabetesDeaths/Female-deathsByDiabetes20132017.json";




const FILENAME_TO_DETAILS: {
  [k: string]: {
    idOverride?: string;
    title: string;
    description: string;
    datasetSpecificTags?: Record<string, string>;
    src: string;
    min?: number; // This should not be an optional field
    max?: number; // This should not be an optional field
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
  "FY2018NetAnnualIncomeAfterHousing.obj": afterHousingIncome18,
  "FY2018NetAnnualIncomeBeforeHousing.obj": beforeHousingIncome18,
  "FY2018NetAnnualIncome.obj": netAnnualIncome18,
  "FY2018TotalAnnualIncome.obj": totalIncome18,
  "FY2016NetAnnualIncomeAfterHousing.obj": afterHousingIncome16,
  "FY2016NetAnnualIncomeBeforeHousing.obj": beforeHousingIncome16,
  "FY2016NetAnnualIncome.obj": netAnnualIncome16,
  "FY2016TotalAnnualIncome.obj": totalIncome16,
  "FY2014NetAnnualIncomeAfterHousing.obj": afterHousingIncome14,
  "FY2014NetAnnualIncomeBeforeHousing.obj": beforeHousingIncome14,
  "FY2014NetAnnualIncome.obj": netAnnualIncome14,
  "FY2014TotalAnnualIncome.obj": totalIncome14,
  "FY2012NetAnnualIncomeAfterHousing.obj": afterHousingIncome12,
  "FY2012NetAnnualIncomeBeforeHousing.obj": beforeHousingIncome12,
  "FY2012NetAnnualIncome.obj": netAnnualIncome12,
  "FY2012TotalAnnualIncome.obj": totalIncome12,
  "premFootballStadiums.obj": footballStadium,
  "F2002aorticaneurysmdeathsbymsoaengland.obj": f2002AorticAneurysm,
  "F2003aorticaneurysmdeathsbymsoaengland.obj": f2003AorticAneurysm,
  "F2004aorticaneurysmdeathsbymsoaengland.obj": f2004AorticAneurysm,
  "F2005aorticaneurysmdeathsbymsoaengland.obj": f2005AorticAneurysm,
  "F2006aorticaneurysmdeathsbymsoaengland.obj": f2006AorticAneurysm,
  "F2007aorticaneurysmdeathsbymsoaengland.obj": f2007AorticAneurysm,
  "F2008aorticaneurysmdeathsbymsoaengland.obj": f2008AorticAneurysm,
  "F2009aorticaneurysmdeathsbymsoaengland.obj": f2009AorticAneurysm,
  "F2010aorticaneurysmdeathsbymsoaengland.obj": f2010AorticAneurysm,
  "F2011aorticaneurysmdeathsbymsoaengland.obj": f2011AorticAneurysm,
  "F2012aorticaneurysmdeathsbymsoaengland.obj": f2012AorticAneurysm,
  "F2013aorticaneurysmdeathsbymsoaengland.obj": f2013AorticAneurysm,
  "F2014aorticaneurysmdeathsbymsoaengland.obj": f2014AorticAneurysm,
  "F2015aorticaneurysmdeathsbymsoaengland.obj": f2015AorticAneurysm,
  "F2016aorticaneurysmdeathsbymsoaengland.obj": f2016AorticAneurysm,
  "F2017aorticaneurysmdeathsbymsoaengland.obj": f2017AorticAneurysm,  
  "M2002aorticaneurysmdeathsbymsoaengland.obj": m2002AorticAneurysm,
  "M2003aorticaneurysmdeathsbymsoaengland.obj": m2003AorticAneurysm,
  "M2004aorticaneurysmdeathsbymsoaengland.obj": m2004AorticAneurysm,
  "M2005aorticaneurysmdeathsbymsoaengland.obj": m2005AorticAneurysm,
  "M2006aorticaneurysmdeathsbymsoaengland.obj": m2006AorticAneurysm,
  "M2007aorticaneurysmdeathsbymsoaengland.obj": m2007AorticAneurysm,
  "M2008aorticaneurysmdeathsbymsoaengland.obj": m2008AorticAneurysm,
  "M2009aorticaneurysmdeathsbymsoaengland.obj": m2009AorticAneurysm,
  "M2010aorticaneurysmdeathsbymsoaengland.obj": m2010AorticAneurysm,
  "M2011aorticaneurysmdeathsbymsoaengland.obj": m2011AorticAneurysm,
  "M2012aorticaneurysmdeathsbymsoaengland.obj": m2012AorticAneurysm,
  "M2013aorticaneurysmdeathsbymsoaengland.obj": m2013AorticAneurysm,
  "M2014aorticaneurysmdeathsbymsoaengland.obj": m2014AorticAneurysm,
  "M2015aorticaneurysmdeathsbymsoaengland.obj": m2015AorticAneurysm,
  "M2016aorticaneurysmdeathsbymsoaengland.obj": m2016AorticAneurysm,
  "M2017aorticaneurysmdeathsbymsoaengland.obj": m2017AorticAneurysm,  
  "Female-deathsByDiabetes20132017.obj": diabetesFemale,
  "Male-deathsByDiabetes20132017.obj": diabetesMale,
  "All-deathsByDiabetes20132017.obj": diabetesAll,
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
  "FY2018NetAnnualIncomeAfterHousing.obj",
  "FY2018NetAnnualIncomeBeforeHousing.obj",
  "FY2018NetAnnualIncome.obj",
  "FY2018TotalAnnualIncome.obj",
  "FY2016NetAnnualIncomeAfterHousing.obj",
  "FY2016NetAnnualIncomeBeforeHousing.obj",
  "FY2016NetAnnualIncome.obj",
  "FY2016TotalAnnualIncome.obj",
  "FY2014NetAnnualIncomeAfterHousing.obj",
  "FY2014NetAnnualIncomeBeforeHousing.obj",
  "FY2014NetAnnualIncome.obj",
  "FY2014TotalAnnualIncome.obj",
  "FY2012NetAnnualIncomeAfterHousing.obj",
  "FY2012NetAnnualIncomeBeforeHousing.obj",
  "FY2012NetAnnualIncome.obj",
  "FY2012TotalAnnualIncome.obj",
];

export const MSOA_AORTIC_ANEURYSM = [
  "F2002aorticaneurysmdeathsbymsoaengland.obj",
  "F2003aorticaneurysmdeathsbymsoaengland.obj",
  "F2004aorticaneurysmdeathsbymsoaengland.obj",
  "F2005aorticaneurysmdeathsbymsoaengland.obj",
  "F2006aorticaneurysmdeathsbymsoaengland.obj",
  "F2007aorticaneurysmdeathsbymsoaengland.obj",
  "F2008aorticaneurysmdeathsbymsoaengland.obj",
  "F2009aorticaneurysmdeathsbymsoaengland.obj",
  "F2010aorticaneurysmdeathsbymsoaengland.obj",
  "F2011aorticaneurysmdeathsbymsoaengland.obj",
  "F2012aorticaneurysmdeathsbymsoaengland.obj",
  "F2013aorticaneurysmdeathsbymsoaengland.obj",
  "F2014aorticaneurysmdeathsbymsoaengland.obj",
  "F2015aorticaneurysmdeathsbymsoaengland.obj",
  "F2016aorticaneurysmdeathsbymsoaengland.obj",
  "F2017aorticaneurysmdeathsbymsoaengland.obj",
  "M2002aorticaneurysmdeathsbymsoaengland.obj",
  "M2003aorticaneurysmdeathsbymsoaengland.obj",
  "M2004aorticaneurysmdeathsbymsoaengland.obj",
  "M2005aorticaneurysmdeathsbymsoaengland.obj",
  "M2006aorticaneurysmdeathsbymsoaengland.obj",
  "M2007aorticaneurysmdeathsbymsoaengland.obj",
  "M2008aorticaneurysmdeathsbymsoaengland.obj",
  "M2009aorticaneurysmdeathsbymsoaengland.obj",
  "M2010aorticaneurysmdeathsbymsoaengland.obj",
  "M2011aorticaneurysmdeathsbymsoaengland.obj",
  "M2012aorticaneurysmdeathsbymsoaengland.obj",
  "M2013aorticaneurysmdeathsbymsoaengland.obj",
  "M2014aorticaneurysmdeathsbymsoaengland.obj",
  "M2015aorticaneurysmdeathsbymsoaengland.obj",
  "M2016aorticaneurysmdeathsbymsoaengland.obj",
  "M2017aorticaneurysmdeathsbymsoaengland.obj",
];

export const DIABETES_DEATHS = [
  "All-deathsByDiabetes20132017.obj", 
  "Female-deathsByDiabetes20132017.obj",
  "Male-deathsByDiabetes20132017.obj"
];

export type Gender = "Male" | "Female" | "All" | "NA";
export type FileDetails = {
  filename: string;
  filepath: string;
  title: string;
  id: string;
  src: string;
  description: string;
  datasetSpecificTags?: Record<string, string>;
  min?: number;
  max?: number;
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
    src: details.src,
    id: details.idOverride ?? filename.split(".")[0],
    filename: filename,
    filepath: filepath,
    title: details.title,
    description: details.description,
    datasetSpecificTags: details.datasetSpecificTags,
    min: details.min,
    max: details.max
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
  listPageImageCaption: string; // Currently unused but left in as it makes it clear which visualisation gives rise to the heat map
  heatMapSource: string;
  rightNavDefaultSettings: RightNavSettings;
};

enum DatasetIds {
  populationDensity = "populationDensity",
  distanceTo = "distanceTo",
  pricePaid = "pricePaid",
  msoaCensusData = "msoaCensusData",
  msoaAorticAneurysm = "msoaAorticAneurysm",
  diabetesDeaths = "diabetesDeaths"
}
const HEATMAPS: Record<DatasetIds, string> = {
  [DatasetIds.populationDensity]: "populationDensity.png",
  [DatasetIds.distanceTo]: "mcDonalds.png",
  [DatasetIds.pricePaid]: "med_price_paid_09-11.png",
  [DatasetIds.msoaCensusData]: "FY2016NetIncomeAfterHousing.png",
  [DatasetIds.msoaAorticAneurysm]: "M2015aorticaneurysmdeathsbymsoaengland.png",
  [DatasetIds.diabetesDeaths]: "All-deathsByDiabetes20132017.png",
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
    listPageImageCaption: "Population density of all age groups in the UK",
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
    listPageImageCaption: "Example shown is the distance to a McDonald's restaurant",
    rightNavDefaultSettings: { colorExponent: 0.5 },
  },
  {
    id: DatasetIds.pricePaid,
    title: "House Prices",
    objs: () =>
      PRICE_PAID_FILENAMES.map(
        (fn) => filenameToDetails(fn, DatasetIds.pricePaid)
      ),
    heatMapSource: HEATMAPS[DatasetIds.pricePaid],
    listPageImageCaption: "Median house priced 2009-2011",
    rightNavDefaultSettings: { cameraRadius: 21.6, colorExponent: 1.2 },
  },
  {
    id: DatasetIds.msoaCensusData,
    title: "Census Data",
    objs: () =>
      MSOA_CENSUS_DATA.map(
        (fn) => filenameToDetails(fn, DatasetIds.msoaCensusData)
      ),
    heatMapSource: HEATMAPS[DatasetIds.msoaCensusData],
    listPageImageCaption: "Net Income after housing in 2014-2016",
    rightNavDefaultSettings: { colorExponent: 2.34, cameraRadius: 21.6 },
  },
  {
    id: DatasetIds.msoaAorticAneurysm,
    title: "Aortic Aneurysms per 100k people",
    objs: () =>
      MSOA_AORTIC_ANEURYSM.map(
        (fn) => filenameToDetails(fn, DatasetIds.msoaAorticAneurysm)
      ),
    heatMapSource: HEATMAPS[DatasetIds.msoaAorticAneurysm],
    listPageImageCaption: "Example shown for Males in 2015",
    rightNavDefaultSettings: { colorExponent: 2, cameraRadius: 31.25 },
  },
  {
    id: DatasetIds.diabetesDeaths,
    title: "Diabetes Deaths per 100k people",
    objs: () =>
      DIABETES_DEATHS.map(
        (fn) => filenameToDetails(fn, DatasetIds.diabetesDeaths)
      ),
    heatMapSource: HEATMAPS[DatasetIds.diabetesDeaths],
    listPageImageCaption: "Across All Genders",
    rightNavDefaultSettings: { colorExponent: 2.5, cameraRadius: 31.25 },
  },
];

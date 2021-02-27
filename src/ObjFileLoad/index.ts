import "../data/gbr_pd_2020_1km_UNadj_ASCII_XYZ.obj";
import "../data/gbr_m_80_2020_constrained_UNadj.obj";
import "../data/gbr_m_25_2020_constrained_UNadj.obj";
import "../data/gbr_m_0_2020_constrained_UNadj.obj";
import "../data/gbr_m_25_2020_constrained_UNadj.obj";
import "../data/gbr_m_10_2020_constrained_UNadj.obj";
import "../data/gbr_f_80_2020_constrained_UNadj.obj";
import "../data/gbr_m_40_2020_constrained_UNadj.obj";
import "../data/gbr_m_75_2020_constrained_UNadj.obj";
import "../data/gbr_f_20_2020_constrained_UNadj.obj";
import "../data/gbr_f_15_2020_constrained_UNadj.obj";
import "../data/gbr_f_45_2020_constrained_UNadj.obj";
import "../data/gbr_f_70_2020_constrained_UNadj.obj";
import "../data/gbr_f_1_2020_constrained_UNadj.obj";
import "../data/gbr_m_50_2020_constrained_UNadj.obj";
import "../data/gbr_m_65_2020_constrained_UNadj.obj";
import "../data/gbr_m_35_2020_constrained_UNadj.obj";
import "../data/gbr_f_0_2020_constrained_UNadj.obj";
import "../data/gbr_f_55_2020_constrained_UNadj.obj";
import "../data/gbr_f_60_2020_constrained_UNadj.obj";
import "../data/gbr_m_1_2020_constrained_UNadj.obj";
import "../data/gbr_f_30_2020_constrained_UNadj.obj";
import "../data/gbr_f_35_2020_constrained_UNadj.obj";
import "../data/gbr_f_65_2020_constrained_UNadj.obj";
import "../data/gbr_f_50_2020_constrained_UNadj.obj";
import "../data/gbr_m_30_2020_constrained_UNadj.obj";
import "../data/gbr_f_5_2020_constrained_UNadj.obj";
import "../data/gbr_m_60_2020_constrained_UNadj.obj";
import "../data/gbr_m_55_2020_constrained_UNadj.obj";
import "../data/gbr_f_75_2020_constrained_UNadj.obj";
import "../data/gbr_f_40_2020_constrained_UNadj.obj";
import "../data/gbr_f_10_2020_constrained_UNadj.obj";
import "../data/gbr_f_25_2020_constrained_UNadj.obj";
import "../data/gbr_m_80_2020_constrained_UNadj.obj";
import "../data/gbr_m_70_2020_constrained_UNadj.obj";
import "../data/gbr_m_45_2020_constrained_UNadj.obj";
import "../data/gbr_pd_2020_1km_UNadj_ASCII_XYZ.obj";
import "../data/gbr_m_15_2020_constrained_UNadj.obj";
import "../data/gbr_m_5_2020_constrained_UNadj.obj";
import "../data/gbr_m_20_2020_constrained_UNadj.obj";

export const OBJ_FILENAMES = [
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

export type Gender = "Male" | "Female" | "All";
export type FileDetails = {
  filename: string;
  ageRange: string;
  gender: Gender;
  title: string;
};

const standardFilenameRegex = /gbr_(m|f)_([0-9]+)_2020_constrained_UNadj.obj/;
export const filenameToDetails = (filename: string): FileDetails => {
  if (filename === "gbr_pd_2020_1km_UNadj_ASCII_XYZ.obj")
    return {
      filename: filename,
      ageRange: "NA",
      gender: "All",
      title: "Whole Population",
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
      filename: filename,
      ageRange: ageRange,
      gender: fullGender,
      title: fullGender + " " + ageRange,
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

// export const filterByGender = (filenames: string[], genders?: Gender[]) => {
//   if (!genders || genders.length === 0) return filenames;
//   const possibleFilenames = genders.map((g) => filenameToGenders[g]).flat();
//   console.log(possibleFilenames.length);
//   return filenames.filter((f) => possibleFilenames.includes(f));
// };

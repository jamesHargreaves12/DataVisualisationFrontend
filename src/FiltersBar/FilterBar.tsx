import { Chip, InputBase, MenuItem, Select } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { FileDetails, Gender } from "../ObjFileLoad";
import Input from "@material-ui/core/Input";
import React from "react";
import "./FilterBar.scss";

export type FilterBarProps = {
  selectedGenders: Gender[];
  setSelectedGenders: (genders: Gender[]) => void;
  selectedAgeRanges: string[];
  setSelectedAgeRanges: (genders: Gender[]) => void;
  setSearchStatus: (value: string) => void;
  unfilteredFileDetails: FileDetails[];
};

export default function FilterBar(props: FilterBarProps) {
  const {
    selectedGenders,
    setSelectedGenders,
    setSearchStatus,
    unfilteredFileDetails,
    selectedAgeRanges,
    setSelectedAgeRanges,
  } = props;
  const possibleGenders: Gender[] = Array.from(
    new Set([...unfilteredFileDetails.map((fd) => fd.gender)])
  );
  const possibleAgeRanges: string[] = Array.from(
    new Set([...unfilteredFileDetails.map((fd) => fd.ageRange)])
  );
  possibleAgeRanges.sort();

  return (
    <div className="object-filter-bar">
      <div className="object-filter-bar__search-section">
        <InputBase
          placeholder="Filter by name"
          color="primary"
          margin="dense"
          onChange={(e) => setSearchStatus(e.target.value)}
          className={"object-filter-bar__search-section-input"}
        />
        <SearchIcon />
      </div>
      <div className={"object-filter-bar__filter"}>
        <Select
          label={"Genders"}
          multiple={true}
          displayEmpty={true}
          value={selectedGenders}
          onChange={(e) => setSelectedGenders(e.target.value as Gender[])}
          input={<Input />}
          variant={"filled"}
          renderValue={(value: unknown) => {
            let genders = value as Gender[];
            if (genders.length === 0)
              return (
                <div className={"object-filter-bar__filter-chip-group"}>
                  Gender
                </div>
              );
            return (
              <div className={"object-filter-bar__filter-chip-group"}>
                {genders.map((g) => (
                  <Chip
                    key={g}
                    label={g}
                    className={"object-filter-bar__filter-chip"}
                  />
                ))}
              </div>
            );
          }}
        >
          {possibleGenders.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className={"object-filter-bar__filter"}>
        <Select
          label={"Age Ranges"}
          multiple={true}
          displayEmpty={true}
          value={selectedAgeRanges}
          onChange={(e) => setSelectedAgeRanges(e.target.value as Gender[])}
          input={<Input />}
          variant={"filled"}
          renderValue={(value: unknown) => {
            let ageRange = value as string[];
            if (ageRange.length === 0)
              return (
                <div className={"object-filter-bar__filter-chip-group"}>
                  Age Ranges
                </div>
              );
            return (
              <div className={"object-filter-bar__filter-chip-group"}>
                {ageRange.map((v) => (
                  <Chip
                    key={v}
                    label={v}
                    className={"object-filter-bar__filter-chip"}
                  />
                ))}
              </div>
            );
          }}
        >
          {possibleAgeRanges.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
}

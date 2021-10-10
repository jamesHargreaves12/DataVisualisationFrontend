import { Chip, InputBase, MenuItem, Select } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { FileDetails } from "../FileLoader/Datasets";
import Input from "@material-ui/core/Input";
import React from "react";
import "./FilterBar.scss";
import { PAGE_LAYOUT_CONFIG } from "../util";

export type FilterBarProps = {
  setSearchStatus: (value: string) => void;
  unfilteredFileDetails: FileDetails[];
  filterDetails: Omit<FacetFilterProps, "possibleValues">[];
};

export default function FilterBar(props: FilterBarProps) {
  const { setSearchStatus, unfilteredFileDetails, filterDetails } = props;
  return (
    <div
      className="object-filter-bar"
      style={{ height: PAGE_LAYOUT_CONFIG.filterBarHeight }}
    >
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
      <FacetFilterList
        filterDetails={filterDetails}
        unfilteredFileDetails={unfilteredFileDetails}
      />
    </div>
  );
}

function FacetFilterList({
  filterDetails,
  unfilteredFileDetails,
}: {
  filterDetails: Omit<FacetFilterProps, "possibleValues">[];
  unfilteredFileDetails: FileDetails[];
}) {
  const returnValue = filterDetails.map((filterDetail) => {
    const possibleValues = Array.from(
      new Set(
        unfilteredFileDetails
          .map((x) => x.datasetSpecificTags?.[filterDetail.label])
          .filter((x) => x != undefined) as string[]
      )
    );
    possibleValues.sort();
    if (possibleValues.length === 0) {
      return <></>;
    }
    return (
      <FacetFilter
        key={filterDetail.label}
        possibleValues={possibleValues}
        {...filterDetail}
      />
    );
  });
  return <>{returnValue}</>;
}

export type FacetFilterProps = {
  possibleValues: string[];
  setSelectedValues: (v: string[]) => void;
  selectedValues: string[];
  label: string;
};
function FacetFilter({
  possibleValues,
  setSelectedValues,
  selectedValues,
  label,
}: FacetFilterProps) {
  return (
    <div className={"object-filter-bar__filter"}>
      <Select
        label={label}
        multiple={true}
        displayEmpty={true}
        value={selectedValues}
        onChange={(e) => setSelectedValues(e.target.value as string[])}
        input={<Input />}
        variant={"filled"}
        renderValue={(value: unknown) => {
          let selectedVals = value as string[];
          if (selectedVals.length === 0)
            return (
              <div className={"object-filter-bar__filter-chip-group"}>
                {label}
              </div>
            );
          return (
            <div className={"object-filter-bar__filter-chip-group"}>
              {selectedVals.map((g) => (
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
        {possibleValues.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

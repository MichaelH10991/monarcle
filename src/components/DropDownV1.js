import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./DropDownV1.css";
import config from "../config";

const sortNames = (names) => {
  return names.sort();
};

const onlyUnique = (value, index, array) => {
  return array.indexOf(value) === index;
};

export default function ComboBox({ data, setSearchText, placeholder }) {
  const [inputValue, setInputValue] = React.useState();

  const sorted = sortNames(data);
  const unique = sorted.filter(onlyUnique);
  return (
    <Autocomplete
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        setSearchText(newInputValue);
      }}
      options={unique}
      fullWidth
      freeSolo
      sx={{
        "& .MuiInputBase-root": {
          color: "white",
          fontFamily: "Arial",
          backgroundColor: config.theme.secondary,
          border: config.theme.borderColor
            ? `1px solid ${config.theme.borderColor}`
            : "none",
          borderRadius: "10px",
        },
        "& .MuiFormLabel-root": {
          color: "lightgrey",
          "&.Mui-focused": {
            color: "white",
          },
        },
      }}
      renderInput={(params) => (
        <TextField {...params} label={placeholder || ""} />
      )}
    />
    // </ThemeProvider>
  );
}

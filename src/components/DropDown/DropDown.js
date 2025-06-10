import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./DropDown.css";

const sortNames = (names) => {
  return names.sort();
};

const onlyUnique = (value, index, array) => {
  return array.indexOf(value) === index;
};

export default function ComboBox({ data, setSearchText, placeholder, theme }) {
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
      options={inputValue && inputValue.length > 0 ? unique : []}
      fullWidth
      freeSolo
      sx={{
        "& .MuiInputBase-root": {
          color: "white",
          fontFamily: "Arial",
          backgroundColor: theme.secondary,
          border: theme.borderColor ? `1px solid ${theme.borderColor}` : "none",
          borderRadius: "10px",
        },
        "& .MuiFormLabel-root": {
          color: "white",
          "&.Mui-focused": {
            color: "white",
          },
        },
      }}
      renderInput={(params) => (
        <TextField {...params} label={placeholder || ""} />
      )}
    />
  );
}

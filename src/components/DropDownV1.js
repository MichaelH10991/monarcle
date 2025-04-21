import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./DropDownV1.css";

const theme = createTheme({
  palette: {
    text: {
      primary: "#ffffff",
      secondary: "#46505A",
    },
  },
});

const sortNames = (names) => {
  return names.sort();
};

export default function ComboBox({ data, setSearchText }) {
  const [inputValue, setInputValue] = React.useState();

  const sorted = sortNames(data);
  return (
    // <ThemeProvider theme={theme}>
    <Autocomplete
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        setSearchText(newInputValue);
      }}
      options={sorted}
      fullWidth
      freeSolo
      sx={{
        "& .MuiInputBase-root": {
          color: "white",
          fontFamily: "Arial",
          backgroundColor: "#252525",
          border: "1px solid #383838",
        },
        "& .MuiFormLabel-root": {
          color: "lightgrey",
          "&.Mui-focused": {
            color: "white",
          },
        },
      }}
      renderInput={(params) => <TextField {...params} label="Monarch" />}
    />
    // </ThemeProvider>
  );
}

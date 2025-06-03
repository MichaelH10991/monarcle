import "./DropDown.css";

const sortNames = (names) => {
  return names.sort();
};

const DropDown = ({ data, open, setOpen, searchText, setSearchText }) => {
  const handleSelection = (value) => {
    console.log("slelecting data", value);
    setSearchText(value);
    setOpen(false);
  };

  const handleFocusLeave = () => {
    console.log("focus leave");
    setOpen(false);
  };

  const sorted = sortNames(data);

  const filteredData = sorted.filter((name) => {
    return (
      name.toLocaleLowerCase().slice(0, searchText.length) ===
      searchText.toLocaleLowerCase()
    );
  });

  const buttonStyle = (length, index) =>
    index === length - 1 ? { border: "none" } : {};

  const dropDownStyle = (open) => (!open ? { display: "none" } : {});

  return (
    <div
      className="drop-down"
      style={dropDownStyle(open)}
      // onBlur={handleFocusLeave}
    >
      {filteredData.map((item, index) => {
        return (
          <button
            key={`drop-down-button-${index}`}
            onClick={() => handleSelection(item)}
            className="drop-down-item"
            style={buttonStyle(data.length, index)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default DropDown;

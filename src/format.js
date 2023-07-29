const capitalize = (string) => {
  let array = string.split(" ");
  array.map((word, i) => {
    array[i] = word.charAt(0).toUpperCase() + word.slice(1);
  });
  const newString = array.join(" ");
  return newString;
};

const customStyles = {
  option: (defaultStyles, state) => ({
    ...defaultStyles,
    color: state.isSelected ? "#212529" : "#fff",
    backgroundColor: state.isFocused
      ? "#a0a0a0"
      : state.isSelected
      ? "#fff"
      : "#212529",
    fontSize: 12,
    zIndex: 9999,
    "&:hover": {
      borderColor: "red",
      cursor: "pointer",
    },
  }),

  control: (defaultStyles) => ({
    ...defaultStyles,
    backgroundColor: "#212529",
    padding: "2px",
    border: "none",
    boxShadow: "none",
    fontSize: 12,
  }),
  singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
};

export default {
  customStyles,
  capitalize,
};

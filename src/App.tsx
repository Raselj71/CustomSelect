import React, { useState } from "react";
import CustomSelect from "./Components/CustomSelect";


//Option data
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

//group option Data
const groupedOptions = [
  {
    label: "Fruits",
    options: [
      { value: "apple", label: "Apple" },
      { value: "orange", label: "Orange" },
    ],
  },
  {
    label: "Vegetables",
    options: [
      { value: "carrot", label: "Carrot" },
      { value: "broccoli", label: "Broccoli" },
    ],
  },
];


const App = () => {
  //For initial selected value
  const [selectedValue, setSelectedValue] = useState([]);
 
  //for onchage for selected element
  const handleChange = (selectedOption: any) => {
    setSelectedValue(selectedOption);
  };

  console.log(selectedValue);

  //custom select componet
  return (
    <div>
      <h1>Custom Select Component</h1>
      <CustomSelect
        isClearable={true}
        isSearchable={true}
        isDisabled={false}
        Options={groupedOptions}
        value={selectedValue}
        placeholder={"Select one..."}
        isGrouped={true}
        isMulti={true}
        onChangeHandler={handleChange}
        onMenuOpen={() => console.log("Menu opened")}
        onSearchHandler={(inputValue) =>
          console.log("Searching for:", inputValue)
        }
      />
    </div>
  );
};

export default App;

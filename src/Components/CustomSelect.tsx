import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import "./Custom.css";


//props and props data type
interface Option {
  value: string;
  label: string;
}

interface GroupedOptions {
  label: string;
  options: Option[];
}

interface propstype {
  isClearable: boolean;
  isSearchable: boolean;
  isDisabled: boolean;
  Options: GroupedOptions[];
  value: Option | Option[] | null;
  placeholder: string;
  isMulti: boolean;
  isGrouped: boolean;
  onChangeHandler: (value: Option | Option[] | null) => void;
  onMenuOpen: () => void;
  onSearchHandler: (inputValue: string) => void;
}

function CustomSelect({
  isClearable,
  isSearchable,
  isDisabled,
  Options,
  value,
  placeholder,
  isMulti,
  isGrouped,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
}: propstype) {


  const [selectedValue, setSelectedValue] = useState<Option | Option[] | null>(
    value
  );
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(Options);
  {
    // console.log(selectedValue);
  }

  //fuction for delete selected item
  const handleClear = (e: any) => {
    e.stopPropagation();
    if (isMulti) {
      if (Array.isArray(selectedValue) && selectedValue.length > 0) {
        const newValue = selectedValue.slice(0, -1);
        handleSelect(newValue);
      } else {
        handleSelect([]);
      }
    } else {
      handleSelect([]);
    }
  };

  //function for select item
  const handleSelect = (newValue: any) => {
    setSelectedValue(newValue);

    onChangeHandler(newValue);
  };

  //fuction for opening Option
  const toggleMenu = () => {
     if(!isDisabled){
      if (!isOpen) {
        onMenuOpen();
      }
      setIsOpen(!isOpen);
     }
  };
  // console.log(selectedValue);


  //for searching and show filter data
  const onChangeHandleValue = (e: any) => {
    setIsOpen(true);
    const data = e.target.value;
    onSearchHandler(data);
    setSearchValue(data);

    if (data) {
      const filterOption = Options.map((option) =>
        isGrouped
          ? {
              ...option,
              options: option.options.filter((opt) =>
                opt.label.toLowerCase().includes(data.toLowerCase())
              ),
            }
          : option
      ).filter((option) =>
        isGrouped
          ? option.options.length > 0
          : option.label.toLowerCase().includes(data.toLowerCase())
      );

      setFilteredOptions(filterOption);
    } else {
      setFilteredOptions(Options);
    }
  };

   //for handling click event in option item
  const handleOptionClick = (option: Option) => {
    let newValue: Option | Option[] | null;
    if (isMulti) {
      if (Array.isArray(selectedValue)) {
        newValue = [...selectedValue, option];
      } else {
        newValue = selectedValue ? [selectedValue, option] : [option];
      }
    } else {
      newValue = option;
      setIsOpen(false);
    }

    handleSelect(newValue);
  };

  return (
    <main>
      <div
        onClick={() => {
          toggleMenu();
        }}
        className={`kzui-container ${isDisabled ? "kzui-disabled" : ""}`}
      >
        <div className="kzui-subcontainer">
          <div className="kzui-subcontainer__left">
            {isMulti &&
            Array.isArray(selectedValue) &&
            selectedValue.length > 0 ? (
              <div className="kzui-selectedContainer">
                {selectedValue.map((value, i) => (
                  <span key={i} className="kzui-selectValue">
                    {value.label}
                  </span>
                ))}
              </div>
            ) : (
              <div>
                {selectedValue && !Array.isArray(selectedValue) ? (
                  <span className="kzui-selectValue">
                    {selectedValue.label}
                  </span>
                ) : (
                  <span>{placeholder}</span>
                )}
              </div>
            )}

            {isSearchable && (
              <div>
                <input
                  disabled={isDisabled}
                  type="text"
                  value={searchValue}
                  placeholder="search"

                  onChange={onChangeHandleValue}
                />
              </div>
            )}
          </div>

          <div className="kzui-subcontainer__right">
            {isClearable && selectedValue && (
              <button onClick={handleClear}>X</button>
            )}
            <div className="kzui-rule"></div>
            <IoMdArrowDropdown className="kzui-dropdown" />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="kzui-optionContainer">
          {isGrouped
            ? filteredOptions.map((group, index) => (
                <div key={index} className="kzui-option-group">
                  <div className="kzui-group-label">{group.label}</div>
                  {group.options.map((option, i) => (
                    <div
                      key={i}
                      className="kzui-option"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              ))
            : filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="kzui-option"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </div>
              ))}
        </div>
      )}
    </main>
  );
}

export default CustomSelect;

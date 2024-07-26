import React, { useEffect, useState } from "react";

import { IoMdArrowDropdown } from "react-icons/io";
import "./Custom.css";

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
  placeholder: String;
  isMulti: boolean;
  isGrouped: boolean;
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
}: propstype) {
  const [selectedValue, setSelectedValue] = useState<Option | Option[] | null>(
    null
  );
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleClear = (e) => {
    e.stopPropagation();
    if (isMulti) {
      if (Array.isArray(selectedValue) && selectedValue.length > 0) {
        const newValue = selectedValue.slice(0, -1);
        setSelectedValue(newValue);
      } else {
        setSelectedValue([]);
      }
    } else {
      setSelectedValue([]);
    }
  };

  const onChangeHandler = () => {};

  const handleOptionClick = (option) => {
    if (isMulti) {
      if (Array.isArray(selectedValue)) {
        const newValeu = [...selectedValue, option];
        setSelectedValue(newValeu);
      } else {
        const data = new Array(selectedValue);
        setSelectedValue([...data, option]);
      }
    } else {
      setSelectedValue(option);

      setIsOpen(false);
    }
  };

  return (
    <main>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
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
          </div>

          <div className="kzui-subcontainer__right">
            {isClearable && <button onClick={handleClear}>X</button>}
            <div className="kzui-rule"></div>
            <IoMdArrowDropdown className="kzui-dropdown" />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="kzui-optionContainer">
          {isGrouped
            ? Options.map((group, index) => (
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
            : Options.map((option, index) => (
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

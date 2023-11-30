import { useState, forwardRef } from "react";

import "./DropDownList.scss";

export type DropDownListOptionValue = string | number;
export type DropDownListOption = {
  value: DropDownListOptionValue;
  text?: string;
};

type DropDownListProps = {
  options: DropDownListOption[];
  onSelect?: (
    option: DropDownListOption,
    selectedValue: DropDownListOptionValue
  ) => void;
  defaultValue?: DropDownListOptionValue;
};

const DropDownList = forwardRef<HTMLInputElement, DropDownListProps>(
  ({ options, onSelect, defaultValue }: DropDownListProps, ref) => {
    const [selectedOption, setSelectedOption] = useState<
      DropDownListOption | undefined
    >(
      defaultValue
        ? options.find(({ value }) => value === defaultValue)
        : undefined
    );
    const [opened, setOpened] = useState(false);

    const handleSelection = (option: DropDownListOption) => {
      setSelectedOption(option);
      onSelect?.(option, option.value);
      setOpened(false);
    };

    return (
      <div className="dropdownlist">
        <input ref={ref} type="hidden" value={selectedOption?.value} />
        <div className="dropdownlist__input" onClick={() => setOpened(!opened)}>
          {selectedOption?.text || selectedOption?.value}
        </div>
        <div className={`dropdownlist__options${opened ? " opened" : ""}`}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`dropdownlist__option${
                option.value === selectedOption?.value ? " selected" : ""
              }`}
              onClick={() => handleSelection(option)}
            >
              {option.text || option.value}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default DropDownList;

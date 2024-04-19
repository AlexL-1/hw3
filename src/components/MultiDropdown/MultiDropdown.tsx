import React, { useEffect, useRef, useState } from "react";
import Input from "../Input";
import ArrowDownIcon from "../icons/ArrowDownIcon";

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}: MultiDropdownProps) => {
  const inputStringState = (arr: Option[]): string => {
    let output: string = "";
    if (arr.length > 0) output = getTitle(arr);
    return output;
  };

  const getOptionByKey = (key: string): Option => {
    let d = options.filter((elm) => elm.key == key);
    return d[0];
  };

  const isSelected = (key: string): boolean => {
    let d = selectedItems.filter((elm) => elm.key == key);
    return d.length > 0;
  };

  let [isExpanded, Toggle] = useState(false);
  let [filter, SetFilter] = useState("");
  let [selectedItems, SetSelectedItems] = useState([...value]);

  const newRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });
  const handleOutsideClick = (e: any) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      Toggle(false);
    }
  };

  const handleOnKeyPressed = (val: string) => {
    //тут надо менять отображаемые опции, если в фильтре что-то введено
    //хоть так и называется, но срабатывает на onChange
    SetFilter(val);
  };

  const handleOnListClicked = (key: string) => {
    {
      let newSelectedValues: Option[];
      if (!isSelected(key)) {
        //ещё не выделен, надо добавить
        let elm = getOptionByKey(key);
        onChange([elm]); //только с ним
        newSelectedValues = [...selectedItems, elm];
      } else {
        //такой уже был, надо убрать
        newSelectedValues = selectedItems.filter((elm) => elm.key != key);
        onChange(newSelectedValues); //callback
      }

      SetSelectedItems(newSelectedValues);
    }
  };

  let optionsFiltered: Option[] = [...options];
  optionsFiltered = options.filter(
    ({ value }) => value.substring(0, filter.length) == filter
  );

  const listItems = optionsFiltered.map((elm) => (
    <div
      key={elm.key}
      onClick={() => {
        handleOnListClicked(elm.key);
      }}
      className={isSelected(elm.key) ? "itemSelected" : ""}
    >
      {elm.value}
    </div>
  ));

  return (
    <div ref={newRef} style={{ display: "inline-block" }}>
      <Input
        placeholder={inputStringState(selectedItems)}
        value={filter || inputStringState(selectedItems)}
        disabled={disabled}
        onChange={handleOnKeyPressed} //тут надо фильтровать опции
        style={{ width: "328px" }} //надо 328
        onClick={() => {
          Toggle(true); //всегда открывать?
        }}
        afterSlot={<ArrowDownIcon color="secondary" />}
        className={className}
      />
      {isExpanded && !disabled && <span className="droplist">{listItems}</span>}
    </div>
  );
};

export default MultiDropdown;

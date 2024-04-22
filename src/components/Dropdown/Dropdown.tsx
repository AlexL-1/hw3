import React, { useEffect, useRef, useState } from "react";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import styles from "./Dropdown.module.scss";

export type Option = {
  key: string;
  value: string;
};

export type DropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущий индекс, может быть пустым */
  keySelected: string;
  /** Callback, вызываемый при выборе варианта */
  onChange: (key: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  keySelected,
  onChange,
}: DropdownProps) => {
  let [isExpanded, Toggle] = useState(false);
  let [index, SetIndex] = useState(keySelected);

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

  const handleOnListClicked = (key: string) => {
    {
      Toggle(false);
      //only 1 category
      // if selected, then unselect
      if (key == index) {
        onChange(key); //callback
        SetIndex("");
      } else {
        onChange(key); //callback
        SetIndex(key);
      }
    }
  };

  const listItems = options.map((elm) => (
    <div
      key={elm.key}
      onClick={() => {
        handleOnListClicked(elm.key);
      }}
      className={elm.key == index ? styles.itemSelected : ""}
    >
      {elm.value}
    </div>
  ));

  const optionsFiltered = options.filter((elm) => elm.key == index);

  return (
    <div ref={newRef}>
      <input
        placeholder="Filter"
        value={optionsFiltered.length > 0 ? optionsFiltered[0].value : ""}
        onChange={() => {}} //do nothing
        onClick={() => {
          Toggle(true); //open
        }}
        className={styles.droplistInput}
        readOnly
      />
      <span className={styles.inputIcon}>
        <ArrowDownIcon />
      </span>

      {isExpanded && <span className={styles.droplist}>{listItems}</span>}
    </div>
  );
};

export default Dropdown;

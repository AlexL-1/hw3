import React, { useEffect, useRef, useState } from "react";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import styles from "./Dropdown.module.scss";

export type Option = {
  key: string;
  value: string;
};

export type DropdownProps = {
  options: Option[];
  keySelected: string;
  onChange: (key: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  keySelected,
  onChange,
}: DropdownProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [index, setIndex] = useState<string>(keySelected);

  const newRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });
  const handleOutsideClick = (e: any) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setIsExpanded(false);
    }
  };

  const handleOnListClicked = React.useCallback(
    (key: string) => {
      {
        //может быть выбрана только одна категория
        //чтобы сбросить категорию, надо выбрать пустое значение
        //поэтому по щелчку список сразу сворачиваем

        setIsExpanded(false);

        if (key === index) {
          //если щелкнули ту же самую категорию, то делать ничего не надо
        } else {
          onChange(key); //callback - запустить фильтрафию в родителе
          setIndex(key);
        }
      }
    },
    [index]
  );

  const listItems = options.map((elm) => (
    <div
      key={elm.key}
      onClick={() => {
        handleOnListClicked(elm.key);
      }}
      className={elm.key === index ? styles.itemSelected : ""}
    >
      {elm.value}
    </div>
  ));

  const optionsFiltered = options.filter((elm) => elm.key === index);

  return (
    <div ref={newRef}>
      <input
        placeholder="Filter"
        value={optionsFiltered.length > 0 ? optionsFiltered[0].value : ""}
        onChange={() => {}} //do nothing
        onClick={() => {
          setIsExpanded(true); //open
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

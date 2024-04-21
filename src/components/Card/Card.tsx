import React from "react";
import Text from "../Text";

import styles from "./Card.module.scss";

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = (props: CardProps) => {
  let classNameString: string = styles.card;
  if (props.className) classNameString += " " + props.className;

  return (
    <div onClick={props.onClick} className={classNameString}>
      <img src={props.image} width="100%" />
      <div className={styles.card_white}>
        {props.captionSlot && (
          <Text tag="p" weight="bold" color="secondary" view="p-16">
            {props.captionSlot}
          </Text>
        )}
        <div style={{ marginBottom: "7px", marginTop: "7px" }}>
          <Text view="p-20" maxLines={2} weight="bold">
            {props.title}
          </Text>
        </div>
        <Text view="p-16" color="secondary" maxLines={3}>
          {props.subtitle}
        </Text>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "19px",
            marginBottom: "14px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              margin: "auto",
              marginLeft: "7px",
            }}
          >
            <Text view="p-18" color="primary" weight="bold">
              {props.contentSlot}
            </Text>
          </div>
          <div style={{ display: "inline-block" }}>{props.actionSlot}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;

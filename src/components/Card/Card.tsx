import React from "react";
import Text from "../Text";

import styles from "./Card.module.scss";

export type CardProps = {
  className?: string;
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
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
        <div className={styles.title}>
          <Text view="p-20" maxLines={2} weight="bold">
            {props.title}
          </Text>
        </div>
        <Text view="p-16" color="secondary" maxLines={3}>
          {props.subtitle}
        </Text>
        <div className={styles.bottomContainer}>
          <div className={styles.bottom}>
            <Text view="p-18" color="primary" weight="bold">
              {props.contentSlot}
            </Text>
          </div>
          <div className={styles.actionSlot}>{props.actionSlot}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;

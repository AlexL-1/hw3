import React from 'react';
import Text from '../Text';

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
  return (
    <div onClick={props.onClick} className={props.className + ' card'}>
      <img src={props.image} width="100%" />
      <div className="card_white">
        {props.captionSlot && (
          <p className="text p-16 secondary bold" style={{ marginBottom: '7px' }}>
            {props.captionSlot}
          </p>
        )}
        <div style={{ marginBottom: '7px' }}>
          <Text view="p-20" maxLines={2} weight="bold">
            {props.title}
          </Text>
        </div>
        <Text view="p-16" color="secondary" maxLines={3}>
          {props.subtitle}
        </Text>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '19px',
            marginBottom: '14px',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              margin: 'auto',
              marginLeft: '7px',
            }}
          >
            <Text view="p-18" color="secondary">
              {props.contentSlot}
            </Text>
          </div>
          <div style={{ display: 'inline-block' }}>{props.actionSlot}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;

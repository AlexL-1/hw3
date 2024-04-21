import styles from "./Text.module.scss";

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: "title" | "button" | "p-20" | "p-18" | "p-16" | "p-14";
  /** Html-тег */
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "p" | "span";
  /** Начертание шрифта */
  weight?: "normal" | "medium" | "bold";
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: "primary" | "secondary" | "accent";
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  className,
  view,
  tag,
  weight,
  children,
  color,
  maxLines,
}: TextProps) => {
  const Mytag = tag ? tag : "p";

  let additionalStyles = {};
  //если задано ограничение на число строк, то надо поставить overflow=hidden и ограничить высоту.
  if (maxLines)
    //а вдруг такого нет поля?
    additionalStyles = {
      display: "-webkit-box",
      WebkitLineClamp: maxLines,
    };

  let newClassName: string = styles.textBasic;

  if (view) newClassName += " " + styles[view];
  if (color) newClassName += " " + styles[color];
  if (weight) newClassName += " " + styles[weight];
  if (className) newClassName += " " + className;

  return (
    <Mytag className={newClassName} style={additionalStyles}>
      {children}
    </Mytag>
  );
};

export default Text;

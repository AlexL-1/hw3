import PrevIcon from "components/icons/PrevIcon";
import NextIcon from "components/icons/NextIcon";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  currentPage: number;
  pagesTotal: number;
  onClick: (pageNumber: number) => void;
};

/*
Pages нужно сделать state. И в pages могут быть просто номера страниц, для которых можно нарисовать отдельный компонент(или элемент),
 который ,будет использовать onClick, переданный сверху.
  Компонент Pagination не должен рулить какой-то логикой. 
  Он должен уметь подсвечивать выбранную страницу, 
  использовать onClick и отображаться в соответствии с номером, выбранной страницы.
*/

//в зависимости от числа страниц могут быть разные вырианты показа
//если страниц меньше 7, то покажем все
//[Pev] 1,2,3,4,5,6,7 [Next]

//если страниц больше, то надо показывать точки.
//рядом с выделенной страницей надо показывать соседей.
//отдельно есть случаи, когда страница у края
//[Pev] (1),2,..........б100 [Next] - кнопку prev надо сделать недоступной
//[Pev] 1,(2),3,..........100 [Next]- скобки () показывают выделенную страницу
//[Pev] 1,2,(3),4.........100 [Next]
//[Pev] 1,...3,(4),5......100 [Next]
//[Pev] 1.....96(97)98....100 [Next]
//[Pev] 1.......97(98),99,100 [Next]
//[Pev] 1.........98,(99),100 [Next]
//[Pev] 1.............99,(100) [Next]  --кнопка next недоступна

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pagesTotal,
  onClick,
}: PaginationProps) => {
  const TOTAL_PAGES_SHOW_ALL_BOUDARY: number = 7; //если страниц меньше 7, то покажем все
  const START_OR_END_MARGIN: number = 3; //если страница ближе чем 3 к концу или началу, то там свои правила показа

  const pagesToDisplay: number[] = []; //сюда сложим все номера страниц для показа, вместо многоточия кладем 0

  if (pagesTotal < TOTAL_PAGES_SHOW_ALL_BOUDARY) {
    for (let i = 1; i <= pagesTotal; i++) pagesToDisplay.push(i);
  } else {
    //если текущая страница далеко от концов, то добавляем 1, точки, сосед- (страница)- сосед, точки, последняя

    if (currentPage > 1 + 1 && currentPage < pagesTotal - 1) {
      pagesToDisplay.push(1);
      pagesToDisplay.push(0);
      pagesToDisplay.push(currentPage - 1);
      pagesToDisplay.push(currentPage);
      pagesToDisplay.push(currentPage + 1);
      pagesToDisplay.push(0);
      pagesToDisplay.push(pagesTotal);
    }

    if (currentPage < START_OR_END_MARGIN) {
      //если близко к началу
      for (let i = 1; i <= currentPage + 1; i++) pagesToDisplay.push(i); //добавляем с 1 по текущую , плюс соседа справа
      pagesToDisplay.push(0); //дальше идет многоточие
      pagesToDisplay.push(pagesTotal); //дальше идет последняя страница
    }

    if (currentPage > pagesTotal - START_OR_END_MARGIN) {
      //если близко к концу, то точки
      pagesToDisplay.push(1); //добавляем 1,
      pagesToDisplay.push(0); //дальше идет многоточие
      for (let i = currentPage - 1; i <= pagesTotal; i++)
        pagesToDisplay.push(i); //c соседа слева и до конца
    }
  }

  //страницы в массиве у нас есть, теперь идем по массиву и генерируем React элементы
  return (
    <div className={styles.pagination}>
      {currentPage === 1 ? (
        <button className={styles.disabled}>
          <PrevIcon />
        </button>
      ) : (
        <button onClick={() => onClick(currentPage - 1)}>
          <PrevIcon />
        </button>
      )}

      {pagesToDisplay.map((elm) =>
        elm !== 0 ? (
          elm === currentPage ? (
            <button key={elm} className={styles.currentPage}>
              {elm}
            </button>
          ) : (
            <button key={elm} onClick={() => onClick(elm)}>
              {elm}
            </button>
          )
        ) : (
          //многоточий может быть несколько, надо и им уникальные Id придумать.
          <span key={Math.random()}>...</span>
        )
      )}
      {currentPage === pagesTotal ? (
        <button className={styles.disabled}>
          <NextIcon />
        </button>
      ) : (
        <button onClick={() => onClick(currentPage + 1)}>
          <NextIcon />
        </button>
      )}
    </div>
  );
};

export default Pagination;

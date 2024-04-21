import PrevIcon from "components/icons/PrevIcon";
import NextIcon from "components/icons/NextIcon";
import styles from "./Pagination.module.scss";
import { ReactElement } from "react";

type Pagination = {
  baseUrl: string; ///products?page=
  currentPage: number;
  totalPages: number;
};

//[Pev] 1....44,(45),46...100 [Next] - general view
//[Pev] (1),2,3,..........100 [Next]  - prev disabled
//[Pev] 1,(2),3,..........100 [Next]
//[Pev] 1,2,(3),4.........100 [Next]
//[Pev] 1.........98,99,(100) [Next]  --next disabled
//[Pev] 1.........98,(99),100 [Next]
//[Pev] 1.........97(98),99,100 [Next]
//[Pev] 1,2,3,4,5,6,7 [Next]  -less than 8 pages

const Pagination = ({ baseUrl, currentPage, totalPages }: Pagination) => {
  const TOTAL_PAGES_SHOW_ALL_BOUDARY: number = 8;

  const pages: ReactElement[] = [];

  if (totalPages < TOTAL_PAGES_SHOW_ALL_BOUDARY && totalPages > 2) {
    //first and last pages are already added
    for (let i = 2; i < totalPages - 1; i++) {
      if (currentPage == i) {
        pages.push(<a className={styles.currentPage}>{i}</a>);
      } else pages.push(<a href={baseUrl + i}>{i}</a>);
    }
  } else {
    if (currentPage > 1 + 2 && currentPage < totalPages - 2) {
      //add group ...3,(4),5....
      pages.push(<>...</>);
      pages.push(<a href={baseUrl + (currentPage - 1)}>{currentPage - 1}</a>);
      pages.push(<a className={styles.currentPage}>{currentPage}</a>);
      pages.push(<a href={baseUrl + (currentPage + 1)}>{currentPage + 1}</a>);
      pages.push(<>...</>);
    } else if (currentPage == 1) {
      pages.push(<a href={baseUrl + "2"}>2</a>);
      pages.push(<a href={baseUrl + "3"}>3</a>);
      pages.push(<>...</>);
    } else if (currentPage == 2) {
      pages.push(<a className={styles.currentPage}>2</a>);
      pages.push(<a href={baseUrl + "3"}>3</a>);
      pages.push(<>...</>);
    } else if (currentPage == 3) {
      pages.push(<a href={baseUrl + "2"}>2</a>);
      pages.push(<a className={styles.currentPage}>3</a>);
      pages.push(<a href={baseUrl + "4"}>4</a>);
      pages.push(<>...</>);
    } else if (currentPage == totalPages) {
      pages.push(<>...</>);
      pages.push(<a href={baseUrl + (totalPages - 2)}>{totalPages - 2}</a>);
      pages.push(<a href={baseUrl + (totalPages - 1)}>{totalPages - 1}</a>);
    } else if (currentPage == totalPages - 1) {
      pages.push(<>...</>);
      pages.push(<a href={baseUrl + (totalPages - 2)}>{totalPages - 2}</a>);
      pages.push(<a className={styles.currentPage}>{totalPages - 1}</a>);
    } else if (currentPage == totalPages - 2) {
      pages.push(<>...</>);
      pages.push(<a href={baseUrl + (totalPages - 3)}>{totalPages - 3}</a>);
      pages.push(<a className={styles.currentPage}>{totalPages - 2}</a>);
      pages.push(<a href={baseUrl + (totalPages - 1)}>{totalPages - 1}</a>);
    }
  }

  return (
    <div className={styles.pagination}>
      {currentPage == 1 ? (
        <>
          <a className={styles.disabled}>
            <PrevIcon />
          </a>
          <a className={styles.currentPage}>1</a>
        </>
      ) : (
        <>
          <a href={baseUrl + (currentPage - 1)}>
            <PrevIcon />
          </a>
          <a href={baseUrl + "1"}>1</a>
        </>
      )}

      {...pages}

      {currentPage == totalPages ? (
        <>
          <a className={styles.currentPage}>{totalPages}</a>
          <a className={styles.disabled}>
            <NextIcon />
          </a>
        </>
      ) : (
        <>
          <a href={baseUrl + totalPages}>{totalPages}</a>
          <a href={baseUrl + (currentPage + 1)}>
            <NextIcon />
          </a>
        </>
      )}
    </div>
  );
};

export default Pagination;

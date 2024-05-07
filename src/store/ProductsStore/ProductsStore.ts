//это хранилище вместо всех useState, которые есть на странице всех продуктов

import getAllProducts from "api/getAllProducts";
import { Product } from "api/types";
import { makeAutoObservable } from "mobx";

const ELEMENTS_PER_PAGE: number = 6;

class ProductsStore {
  productsArray: Product[] = []; //список продуктов для показа на странице
  productsTotal: number = 0; //сколько всего есть продуктов
  page: number = 1; //номер открытой страницы
  title: string = ""; //строка поиска, которая пошла в query
  inputText: string = ""; //текст введенный в поле поиска
  categoryId: string = ""; //выбранная в фильтре категория

  constructor() {
    makeAutoObservable(this);
  }

  get offset() {
    return (this.page - 1) * ELEMENTS_PER_PAGE;
  }

  get pagesTotal() {
    //сколько всего страниц для показа
    const pagesComputed: number = Math.ceil(
      this.productsTotal / ELEMENTS_PER_PAGE
    );
    if (pagesComputed < 1) return 1; // если нет ничего, то всё равно одна страница
    return pagesComputed;
  }

  //состояние можно менять. нужны методы смены состояния

  //метод получения продуктов для показа на странице.
  private getProducts = async () => {
    const result = await getAllProducts({
      limit: ELEMENTS_PER_PAGE,
      offset: this.offset,
      categoryId: this.categoryId,
      title: this.title,
    });
    //для показа на странице не нужны все, а только часть (ELEMENTS_PER_PAGE)
    //и хоть api нам должна давать массив нужной длины, но на всякий случай обрежем
    if (!result.isError) {
      this.productsArray = result.data.slice(0, ELEMENTS_PER_PAGE);
    } else {
      //TODO: может надо как-то ошибку обработать, а не прятать?
      this.productsArray = []; //продуктов нет
    }
  };

  //метод получения колличества всех продуктов
  private getTotalProducts = async () => {
    //общее число всех товаров
    const result = await getAllProducts({
      category: this.categoryId,
      title: this.title,
    });
    if (!result.isError) this.productsTotal = result.data.length;
    else {
      //TODO: может надо как-то ошибку обработать, а не прятать?
      this.productsTotal = 0;
    }
  };

  // action выполнить поиск, когда что-то поменялось
  makeSearch() {
    this.getTotalProducts();
    this.getProducts();
  }

  // методы, чтобы менять поля
  setTitle(val: string) {
    this.title = val;
  }

  setCategoryId(val: string) {
    this.categoryId = val;
  }

  // метод, чтобы поменять текст и поле поиска
  setInputText(val: string) {
    this.inputText = val;
  }

  // метод, чтобы поменять текст и поле поиска
  setPage(val: number) {
    this.page = val;
  }
}

export default ProductsStore;

//этот стор глобальный. он хранит параметры query строки
//он не имеет доступа к строке и не может её менять. Только хранит
//а строку меняет react router
import { makeAutoObservable, set } from "mobx";

import queryString, { ParsedQuery } from "query-string"; //что-то у меня qs не заработал

class QueryParamsStore {
  search: string = ""; //неразобранная строка
  params: ParsedQuery = {}; //разобранная строка

  constructor() {
    makeAutoObservable(this);
  }

  //нужен метод чтения из query строки одного параметра
  getValByKey = (key: string): string | (string | null)[] | null => {
    return this.params[key];
  };

  //установить значение параметра и собрать строку
  setParam = (key: string, val: string): void => {
    const update = { ...this.params };
    update[key] = val;
    set(this.params, update); //обновим параметр
    this.search = queryString.stringify(this.params); //сборка новой строки при изменении параметров
    this.updateQueryInBrowser(); //поменять в браузере
  };

  //установить строку. Используется только при загрузке один раз. Обновлять браузерную строку не надо.
  setSearch = (val: string): void => {
    this.search = val;
    this.params = queryString.parseUrl(val).query; //надо сразу и разобрать строку
  };

  updateQueryInBrowser() {
    window.history.pushState(null, "", "?" + this.search); //надо строку как-то в историю браузера положить
  }
}

export default QueryParamsStore;

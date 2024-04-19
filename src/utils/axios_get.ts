//helper function that makes a GET request to api
//надо импортировать axios
import axios from "axios";

//это пример с https://www.npmjs.com/package/axios#example

//Record = { key(string):value(string|number), key1:value1, .... } 


type RequestParams = { //эти параметры нужны для отправки запроса
    url:string,
    params?:Record<string,string|number>
}



// T неизвестный пока тип. Мы будем давать тип ожидаемого ответа при обращении  к функции
export const makeGetRequest = async<T> ({url,params }:RequestParams) => {
    try {
      const response = await axios.get(url, {
        params: params
      });
        return response.data as T;
      //console.log(response);
    } catch (error:any) {
        throw new Error(error)
      //console.error(error);
    }
  }


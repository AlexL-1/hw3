//запрос всех продуктов возвращает такой массив
/*[
  {
    "id": 4,
    "title": "Handmade Fresh Table",
    "price": 687,
    "description": "Andy shoes are designed to keeping in...",
    "category": {
      "id": 5,
      "name": "Others",
      "image": "https://placeimg.com/640/480/any?r=0.591926261873231"
    },
    "images": [
      "https://placeimg.com/640/480/any?r=0.9178516507833767",
      "https://placeimg.com/640/480/any?r=0.9300320592588625",
      "https://placeimg.com/640/480/any?r=0.8807778235430017"
    ]
  }
  // ...
]
*/

//на самом деле там есть ещё поля даты создания
/*
[{"id":10,"title":"Product 1 Updated","price":1000,"description":"Description 1 Updated","images":["[\"https://i.imgur.com/wXuQ7bm.jpeg\"","\"https://i.imgur.com/BZrIEmb.jpeg\"","\"https://i.imgur.com/KcT6BE0.jpeg\"]"],"creationAt":"2024-04-18T20:15:40.000Z","updatedAt":"2024-04-19T16:39:49.000Z","category":{"id":1,"name":"Clothes","image":"https://i.imgur.com/QkIa5tT.jpeg","creationAt":"2024-04-18T20:15:40.000Z","updatedAt":"2024-04-18T20:15:40.000Z"}},....]
*/

//здесь типизируем один продут

export type Category = {
    id:number,
    name:string,
    image: string,
    creationAt: string, //"2024-04-18T20:15:40.000Z"
    updatedAt: string,//"2024-04-18T20:15:40.000Z"
}



export type Product = {
id:number,
title:string,
price:number,
description:string,
category:Category,
images: string, //string[] does not work here
creationAt: string, //"2024-04-18T20:15:40.000Z"
updatedAt: string,//"2024-04-18T20:15:40.000Z"
}

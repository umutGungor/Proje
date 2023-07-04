import {Products, Product_Stock,Product_Stock1} from '../models/Product'

export class Product_Depo {
    private Products : Product_Stock[]= [
    {id:23232,u_ad:"Osman Pilav",mark:"Philps",stock:231,min_stock:200,dep_ad:"Serkan Philips Depo"},
    {id:2232,u_ad:"Selo Pilav",mark:"Philps",stock:231,min_stock:200,dep_ad:"Serkan Philips Depo"},
    {id:13232,u_ad:"Kela Pilav",mark:"Philps",stock:231,min_stock:200,dep_ad:"Serkan Philips Depo"},
    {id:23432,u_ad:"Lola Pilav",mark:"Philps",stock:231,min_stock:200,dep_ad:"Serkan Philips Depo"},
    {id:22532,u_ad:"Pana Pilav",mark:"Philps",stock:231,min_stock:200,dep_ad:"Serkan Philips Depo"},
    {id:2132,u_ad:"Linka Pilav",mark:"Philps",stock:231,min_stock:200,dep_ad:"Serkan Philips Depo"},
    {id:23832,u_ad:"Ülk Pilav",mark:"Philps",stock:231,min_stock:200,dep_ad:"Serkan Philips Depo"},
    {id:23432,u_ad:"Seven Pilav",mark:"Philps",stock:231,min_stock:200,dep_ad:"Serkan Philips Depo"},
    {id:26732,u_ad:"Manyak Pilav",mark:"Philps",stock:231,min_stock:200,dep_ad:"Serkan Philips Depo"},
  ];
  private Products1 : Product_Stock1[]= [];

  private products : Products[]= [{id:23232,u_ad:"Osman Pilav"},
  {id:2232,u_ad:"Selo Pilav",},
  {id:13232,u_ad:"Kela Pilav"},
  {id:23432,u_ad:"Lola Pilav"},
  {id:22532,u_ad:"Pana Pilav"},
  {id:2132,u_ad:"Linka Pilav"},
  {id:23832,u_ad:"Ülk Pilav"},
  {id:23432,u_ad:"Seven Pilav"},
  {id:26732,u_ad:"Manyak Pilav"},
];

getProducts(){
    return this.Products;
}

  getProById(id:number){
    return id;
  }

}
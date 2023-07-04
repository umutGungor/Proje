import { Target } from '@angular/compiler';
import { Component, Directive, ElementRef, HostListener } from '@angular/core';
import { elements } from 'chart.js';
import {Product_Stock} from '../../models/Product'
import {Product_Depo} from '../../models/Products_Depo'
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['../../../custom_sources/main.css']
})


export class ProductStockComponent {
Products : Product_Stock[];
Product_Depo : Product_Depo;

minus !: Element ;
plus !: Element ;
blocker !: Element ;
panel !:Element;
confirm !:Element;
adet !:any;
drm="";
item:any;
lisance:any;
constructor(public router:Router){
this.Product_Depo=new Product_Depo();
this.Products=this.Product_Depo.getProducts();
}

 ngOnInit(){
  this.adet=document.querySelector('#adet')!;
  this.confirm=document.querySelector('#confirm')!;
    this.minus=document.querySelector('#minus')!;
    this.plus=document.querySelector('#plus')!;
    this.blocker=document.querySelector('#blocker')!;
    this.panel=document.querySelector('#panel')!;

    const sk = localStorage.getItem('sk');
   const ls = localStorage.getItem('ls');
   this.lisance=ls;
   if (ls!='1') {
     this.router.navigate(['/hata']);
    
   } else {
    
   }
  }
  
  kapt(){
   this.panel.classList.add('d-none');
      this.blocker.classList.add('d-none');
      this.drm="";
      document.body.style.overflow="auto"; 
  }
      
 
  
 accc()  {
    this.panel.classList.remove("d-none");
    this.blocker.classList.remove('d-none');
   document.body.style.overflow="hidden";   
   }
   
    
   ekle(item :any){
    this.drm="+";
    this.item=item;
  }

  tamamla(){
var it : any=this.Products.filter(pro => pro==this.item);
    if(this.drm=="+")
  it[0].stock+=parseInt(this.adet.value)
  else if(this.drm=="-")
  it[0].stock-=parseInt(this.adet.value)
  this.adet.value="";
console.log(this.Products);
this.panel.classList.add("d-none")
this.blocker.classList.add("d-none")
  this.item=null;
  }

  cikar(item :any){
    this.drm="-";
    this.item=item;
  } 
   
}



 


import { Component, OnInit } from '@angular/core';
import {jsPDF} from 'jspdf';
import { addEmitHelper } from 'typescript';
@Component({
  selector: 'app-rapor',
  templateUrl: './rapor.component.html',
  styleUrls: ['./rapor.component.css']
})
export class RaporComponent implements OnInit{
lyear !:Element;
lmonth !:Element;
lweek !:Element;
siparisler:any[]=[];
gecmis:any[]=[{urun_ad:"d",urun_marka:"phil",urun_kategori_AD:"esdav",urun_adet:3346},{urun_ad:"asdsd",urun_marka:"phisl",urun_kategori_AD:"ev",urun_adet:653346},{urun_ad:"asd",urun_marka:"phil",urun_kategori_AD:"ev",urun_adet:653346},{urun_ad:"asd",urun_marka:"phil",urun_kategori_AD:"ev",urun_adet:66},{urun_ad:"asd",urun_marka:"phil",urun_kategori_AD:"ev",urun_adet:66},{urun_ad:"asd",urun_marka:"phil",urun_kategori_AD:"ev",urun_adet:66},{urun_ad:"asd",urun_marka:"beko",urun_kategori_AD:"tel",urun_adet:166},{urun_ad:"das",urun_marka:"beko",urun_kategori_AD:"tel",urun_adet:166},{urun_ad:"das",urun_marka:"beko",urun_kategori_AD:"tel",urun_adet:166},{urun_ad:"das",urun_marka:"beko",urun_kategori_AD:"tel",urun_adet:166},{urun_ad:"das",urun_marka:"beko",urun_kategori_AD:"tel",urun_adet:166},{urun_ad:"das",urun_marka:"beko",urun_kategori_AD:"tel",urun_adet:166},{urun_ad:"das",urun_marka:"beko",urun_kategori_AD:"tel",urun_adet:166},{urun_ad:"das",urun_marka:"beko",urun_kategori_AD:"tel",urun_adet:166},{urun_ad:"das",urun_marka:"beko",urun_kategori_AD:"tel",urun_adet:166}];
alinanlar:any[]=[];
zaman="week";
totalal:any;
totalsat:any;
topmal:any;
topkaz:any;
totalsip:any;
day:any;
month:any;
year:any;
basarili:any;
basarisiz:any;
satan:any;
satankez:any;
enmark:any;
markkez:any;
enkat:any;
katkez:any;
ngOnInit() {
      this.lweek=document.querySelector('#LastWeek')!;
      this.lmonth=document.querySelector('#LastMonth')!;
      this.lyear=document.querySelector('#LastYear')!;
      this.day=new Date().getDate();
      this.month=new Date().getMonth();
      this.year=new Date().getFullYear();
    this.lastWeek();
    }


    PDFDownload(){
      const doc = new jsPDF();

      doc.addFont('assets/fonts/BebasNeue-Regular.ttf', 'ArialUnicodeMS', 'normal');
      doc.setFont('ArialUnicodeMS');
   

      const element = document.getElementById('pdfContent')!;
      const htmlContent = element.innerHTML;


const plainText = htmlContent.replace(/<[^>]+>/g, '');

const lines = plainText.split('\n');
const lineHeight = 10; 

let y = 10; 

lines.forEach(line => {
  doc.text(line, 10, y);
  y += lineHeight;
});

doc.save('dosya.pdf');
}


lastWeek(){
  this.topkaz=0;
  this.topmal=0;
  this.totalal=0;
  this.totalsat=0;
  const ortsure=0;
  this.lweek.classList.add("aktif");
  this.lyear.classList.remove("aktif");
  this.lmonth.classList.remove("aktif");
  this.zaman="week";
  const hafta=this.gecmis.filter((item)=>item.siparis_tarih>=`${this.day-7}-${this.month}-${this.year}T000:000` && item.durum_ID!=-1)
 for(var i=0;i<hafta.length;i++){
  this.topkaz+=hafta[i].satis;
  this.topmal+=hafta[i].adet*hafta[i].maliyet;
  this.totalsat+=hafta[i].adet;
 }
 const alinanlar=this.alinanlar.filter((item)=>item.siparis_tarih>=`${this.day-7}-${this.month}-${this.year}T000:000`);
 for(var i=0;i<alinanlar.length;i++){
  this.totalal+=hafta[i].adet;
 }
 
 const basarisiz=this.gecmis.filter((item)=>item.siparis_tarih>=`${this.day-7}-${this.month}-${this.year}T000:000` && item.durum_ID==-1)
this.basarili=hafta.length-basarisiz.length;  
this.basarisiz=basarisiz.length;
this.totalsip=hafta.length+basarisiz.length;
this.findMostSoldProduct(this.gecmis);
}

findMostSoldProduct(salesRecords:any[]) {
  var productSalesCounter:any = {};
  var categorySalesCounter:any = {};
  var brandSalesCounter:any = {};

  for (var i = 0; i < salesRecords.length; i++) {
    var product = salesRecords[i].urun_ad;
    var category = salesRecords[i].urun_kategori_AD;
    var brand = salesRecords[i].urun_marka;
    var quantity = salesRecords[i].urun_adet;

    // Ürün satışlarını takip et
    if (productSalesCounter[product]) {
      productSalesCounter[product] += quantity;
    } else {
      productSalesCounter[product] = quantity;
    }

    // Kategori satışlarını takip et
    if (categorySalesCounter[category]) {
      categorySalesCounter[category] += quantity;
    } else {
      categorySalesCounter[category] = quantity;
    }

    // Marka satışlarını takip et
    if (brandSalesCounter[brand]) {
      brandSalesCounter[brand] += quantity;
    } else {
      brandSalesCounter[brand] = quantity;
    }
  }

  var mostSoldProduct = '';
  var mostSoldProductSales = 0;

  for (let product in productSalesCounter) {
    if (productSalesCounter[product] > mostSoldProductSales) {
      mostSoldProductSales = productSalesCounter[product];
      mostSoldProduct = product;
    }
  }

  var mostSoldCategory = '';
  var mostSoldCategorySales = 0;

  for (let category in categorySalesCounter) {
    if (categorySalesCounter[category] > mostSoldCategorySales) {
      mostSoldCategorySales = categorySalesCounter[category];
      mostSoldCategory = category;
    }
  }

  var mostSoldBrand = '';
  var mostSoldBrandSales = 0;

  for (let brand in brandSalesCounter) {
    if (brandSalesCounter[brand] > mostSoldBrandSales) {
      mostSoldBrandSales = brandSalesCounter[brand];
      mostSoldBrand = brand;
    }
  }

 
  
    this.satan=mostSoldProduct;
    this.satankez=mostSoldProductSales;
    this.enkat=mostSoldCategory;
    this.katkez=mostSoldCategorySales;
    this.enmark= mostSoldBrand;
    this.markkez=mostSoldBrandSales;
}
  
    lastMonth(){
      this.topkaz=0;
      this.topmal=0;
      this.totalal=0;
      this.totalsat=0;
      const ortsure=0;
  this.lweek.classList.remove("aktif");
  this.lyear.classList.remove("aktif");
  this.lmonth.classList.add("aktif");
  this.zaman="month";
  const hafta=this.gecmis.filter((item)=>item.siparis_tarih>=`${this.day}-${this.month-1}-${this.year}T000:000` && item.durum_ID!=-1)
 for(var i=0;i<hafta.length;i++){
  this.topkaz+=hafta[i].satis;
  this.topmal+=hafta[i].adet*hafta[i].maliyet;
  this.totalsat+=hafta[i].adet;
 }
 const alinanlar=this.alinanlar.filter((item)=>item.siparis_tarih>=`${this.day-7}-${this.month}-${this.year}T000:000`);
 for(var i=0;i<alinanlar.length;i++){
  this.totalal+=hafta[i].adet;
 }
 const basarisiz=this.gecmis.filter((item)=>item.siparis_tarih>=`${this.day}-${this.month-1}-${this.year}T000:000` && item.durum_ID==-1)
 this.basarili=hafta.length-basarisiz.length;  
 this.basarisiz=basarisiz.length;
 this.totalsip=hafta.length+basarisiz.length;
 this.findMostSoldProduct(hafta);
    }
    
    lastYear(){
      this.topkaz=0;
      this.topmal=0;
      this.totalal=0;
      this.totalsat=0;
      const ortsure=0;
  this.lweek.classList.remove("aktif");
  this.lyear.classList.add("aktif");
  this.lmonth.classList.remove("aktif");
  this.zaman="year";
  const hafta=this.gecmis.filter((item)=>item.siparis_tarih>=`${this.day}-${this.month}-${this.year-1}T000:000` && item.durum_ID!=-1)
 for(var i=0;i<hafta.length;i++){
  this.topkaz+=hafta[i].satis;
  this.topmal+=hafta[i].adet*hafta[i].maliyet;
  this.totalsat+=hafta[i].adet;
 }
 const alinanlar=this.alinanlar.filter((item)=>item.siparis_tarih>=`${this.day-7}-${this.month}-${this.year}T000:000`);
 for(var i=0;i<alinanlar.length;i++){
  this.totalal+=hafta[i].adet;
 }
 const basarisiz=this.gecmis.filter((item)=>item.siparis_tarih>=`${this.day}-${this.month}-${this.year-1}T000:000` && item.durum_ID==-1)
 this.basarili=hafta.length-basarisiz.length;  
 this.basarisiz=basarisiz.length;
 this.totalsip=hafta.length+basarisiz.length;
 this.findMostSoldProduct(hafta);
    }

}

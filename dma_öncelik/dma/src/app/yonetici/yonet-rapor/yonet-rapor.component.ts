import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {jsPDF} from 'jspdf';
import { AuthService } from 'src/app/services/auth.service';
import { addEmitHelper } from 'typescript';
@Component({
  selector: 'app-yonet-rapor',
  templateUrl: './yonet-rapor.component.html',
  styleUrls: ['./yonet-rapor.component.css']
})

export class YonetRaporComponent implements OnInit{
  
  enazsatan: string | undefined;
  enazsatankez: number | undefined;
  enazkat: string | undefined;
  enazkatkez: number | undefined;
  enazmark: string | undefined;
  enazmarkkez: number | undefined;
  constructor(private service: AuthService,private router:Router ,private elementRef:ElementRef) { }
  lyear !:Element;
  lmonth !:Element;
  lweek !:Element;
  siparisler:any[]=[];
  gecmis :any[]=[];
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
  teslimler:any;
  month1!:any;
  day1!:any;
  lday!:any;

  ngOnInit() {
  
    if ((localStorage.getItem('ls')=='1')) {
      // magazalogin true ise
    } else {
      // magazalogin false ise
      this.router.navigate(['/hata']);
    }

        this.lday=document.querySelector('#LastDay')!;
        this.lweek=document.querySelector('#LastWeek')!;
        this.lmonth=document.querySelector('#LastMonth')!;
        this.lyear=document.querySelector('#LastYear')!;
        this.day=new Date().getDate();
        this.day1=new Date().getDate();
        this.month=new Date().getMonth();
        this.month1=new Date().getMonth();
        this.year=new Date().getFullYear();
      
        this.day1=this.day1-7;
        this.month=this.month+1;
        if(this.day1<10){
   
          this.day1="0"+this.day1.toString();
          this.day1=parseInt(this.day1);
        }
       
        const buttonElement = this.elementRef.nativeElement.querySelector('#LastWeek');
        buttonElement.click();
    
       if(this.month1+1<10){
          
        this.month1 = (this.month1).toString().padStart(2, "0");

      }
      else{
       this.month=this.month;
      }
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
  
  async a(event:any){
    try {
    event.preventDefault();

      const data1 = await this.service.getalis().toPromise();
      this.alinanlar = data1!;
  
      const data2 = await this.service.getsiparislerim().toPromise();
      this.siparisler = data2!;
  
      const data3 = await this.service.gecmis().toPromise();
      this.gecmis = data3!;
      console.log(this.gecmis);
     this.lastWeek();
    } catch (error) {
      console.error(error);
      // Hata işlemlerini burada gerçekleştirin
    }
  };  
  b(){};
  c(){};
  lastWeek(){
    if(this.month+1<10){
      this. month="0"+(this.month);
    }
    else{
     this.month=this.month;
    }

    this.topkaz=0;
    this.topmal=0;
    this.totalal=0;
    this.totalsat=0;
    const ortsure=0;

    this.zaman="week";
    var sepet=0;
    const hafta1=this.gecmis.filter((item)=>item.teslim_tarihi>=`${this.year}-${this.month}-${this.day1}T00:00:00`);
    for (let i = 0; i < hafta1.length; i++) {
      const siparis = hafta1[i].teslim_tarihi;
      const teslim = hafta1[i].teslim_tarihi;
      
      const tarih1 = new Date(siparis);
      const tarih2 = new Date(teslim);
      
      const tarih1ZamanDamgasi = tarih1.getTime();
      const tarih2ZamanDamgasi = tarih2.getTime();
      
      var gunFarki = Math.floor((tarih2ZamanDamgasi - tarih1ZamanDamgasi) / (1000 * 60 * 60 * 24));
      sepet+=gunFarki;
    }
    console.log(sepet/this.gecmis.length);

    this.teslimler = (sepet / this.gecmis.length).toFixed(1);

    
    this.gecmis
  console.log(this.year,this.month,this.day1);
    const hafta=this.gecmis.filter((item)=>item.teslim_tarihi>=`${this.year}-${this.month}-${this.day1}T00:00:00` && item.durum_id!=0);
    console.log(hafta);
   for(var i=0;i<hafta.length;i++){
    this.topkaz+=hafta[i].satis*hafta[i].adet;
    this.topmal+=hafta[i].adet*hafta[i].maliyet;
    this.totalsat+=hafta[i].adet;
   }
   const alinanlar=this.alinanlar.filter((item)=>item.tarih>=`${this.year}-${this.month}-${this.day1}T00:00:00`)

   for(var i=0;i<alinanlar.length;i++){
    this.totalal+=alinanlar[i].adet;
   }
   const basarili=this.gecmis.filter((item)=>item.teslim_tarihi>=`${this.year}-${this.month}-${this.day1}T00:00:00` && item.durum_id==3);
   
   const basarisiz=this.gecmis.filter((item)=>item.teslim_tarihi>=`${this.year}-${this.month}-${this.day1}T00:00:00` && item.durum_id==0);
  this.basarili=basarili.length;  
  this.basarisiz=basarisiz.length;
  this.totalsip=hafta.length+basarisiz.length;
  this.findMostSoldProduct(hafta);
  this.findLeastSoldProduct(hafta);
  console.log(this.basarili,this.basarisiz);
  this.lweek.classList.add("aktif");
  this.lyear.classList.remove("aktif");
  this.lmonth.classList.remove("aktif");
  this.lday.classList.remove("aktif");

  }
  
  findMostSoldProduct(salesRecords:any[]) {
    var productSalesCounter:any = {};
    var categorySalesCounter:any = {};
    var brandSalesCounter:any = {};
  
    for (var i = 0; i < salesRecords.length; i++) {
      var product = salesRecords[i].urun_ad;
      var category = salesRecords[i].kategori_AD;
      var brand = salesRecords[i].marka_AD;
      var quantity = salesRecords[i].adet;
  
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
  findLeastSoldProduct(salesRecords: any[]) {
    var productSalesCounter: any = {};
    var categorySalesCounter: any = {};
    var brandSalesCounter: any = {};
  
    for (var i = 0; i < salesRecords.length; i++) {
      var product = salesRecords[i].urun_ad;
      var category = salesRecords[i].kategori_AD;
      var brand = salesRecords[i].marka_AD;
      var quantity = salesRecords[i].adet;
  
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
  
    var leastSoldProduct = '';
    var leastSoldProductSales = Infinity;
  
    for (let product in productSalesCounter) {
      if (productSalesCounter[product] < leastSoldProductSales && productSalesCounter[product] > 0) {
        leastSoldProductSales = productSalesCounter[product];
        leastSoldProduct = product;
      }
    }
  
    var leastSoldCategory = '';
    var leastSoldCategorySales = Infinity;
  
    for (let category in categorySalesCounter) {
      if (categorySalesCounter[category] < leastSoldCategorySales && categorySalesCounter[category] > 0) {
        leastSoldCategorySales = categorySalesCounter[category];
        leastSoldCategory = category;
      }
    }
  
    var leastSoldBrand = '';
    var leastSoldBrandSales = Infinity;
  
    for (let brand in brandSalesCounter) {
      if (brandSalesCounter[brand] < leastSoldBrandSales && brandSalesCounter[brand] > 0) {
        leastSoldBrandSales = brandSalesCounter[brand];
        leastSoldBrand = brand;
      }
    }
  
    this.enazsatan = leastSoldProduct;
    this.enazsatankez = leastSoldProductSales;
    this.enazkat = leastSoldCategory;
    this.enazkatkez = leastSoldCategorySales;
    this.enazmark = leastSoldBrand;
    this.enazmarkkez = leastSoldBrandSales;
  }
  
    
      lastMonth(event:any){
        event.preventDefault();

        if(this.day<10){
          this.day="0"+this.day.toString();
        }
       

    
        this.topkaz=0;
        this.topmal=0;
        this.totalal=0;
        this.totalsat=0;
        const ortsure=0;
       
        this.zaman="month";
        var sepet=0;
        const hafta1=this.gecmis.filter((item)=>item.teslim_tarihi>=`${this.year}-${this.month1}-${this.day}T00:00:00`);
        for (let i = 0; i < hafta1.length; i++) {
          const siparis = hafta1[i].teslim_tarihi;
          const teslim = hafta1[i].teslim_tarihi;
          
          const tarih1 = new Date(siparis);
          const tarih2 = new Date(teslim);
          
          const tarih1ZamanDamgasi = tarih1.getTime();
          const tarih2ZamanDamgasi = tarih2.getTime();
          
          var gunFarki = Math.floor((tarih2ZamanDamgasi - tarih1ZamanDamgasi) / (1000 * 60 * 60 * 24));
          sepet+=gunFarki;
        }
        console.log(sepet/this.gecmis.length);
    
        this.teslimler = (sepet / this.gecmis.length).toFixed(1);
    
        
        this.gecmis
      console.log(this.year,this.month1,this.day);
        const hafta=this.gecmis.filter((item)=>item.teslim_tarihi>=`${this.year}-${this.month1}-${this.day}T00:00:00` && item.durum_id!=0);
        console.log(hafta);
       for(var i=0;i<hafta.length;i++){
        this.topkaz+=hafta[i].satis*hafta[i].adet;
        this.topmal+=hafta[i].adet*hafta[i].maliyet;
        this.totalsat+=hafta[i].adet;
       }
       const alinanlar=this.alinanlar.filter((item)=>item.tarih>=`${this.year}-${this.month1}-${this.day}T00:00:00`)
    
       for(var i=0;i<alinanlar.length;i++){
        this.totalal+=alinanlar[i].adet;
       }
       const basarili=this.gecmis.filter((item)=>item.teslim_tarihi>=`${this.year}-${this.month1}-${this.day}T00:00:00` && item.durum_id==3);
       
       const basarisiz=this.gecmis.filter((item)=>item.teslim_tarihi>=`${this.year}-${this.month1}-${this.day}T00:00:00` && item.durum_id==0);
      this.basarili=basarili.length;  
      this.basarisiz=basarisiz.length;
      this.totalsip=hafta.length+basarisiz.length;
      this.findMostSoldProduct(hafta);
      this.findLeastSoldProduct(hafta);
      console.log(this.basarili,this.basarisiz);
      this.lweek.classList.remove("aktif");
      this.lyear.classList.remove("aktif");
      this.lmonth.classList.add("aktif");
    this.lday.classList.remove("aktif");

      }
      lastYear(event:any){
        event.preventDefault();
        if(this.day<10){
          this.day="0"+this.day.toString();
        }
       
        if(this.month+1<10){
          this. month="0"+(this.month);
        }
        else{
         this.month=this.month;
        }
    console.log(this.day);  
        this.topkaz=0;
        this.topmal=0;
        this.totalal=0;
        this.totalsat=0;
        const ortsure=0;
       
        this.zaman="year";
        var sepet=0;
        const hafta1=this.gecmis.filter((item)=>item.teslim_tarihi>=`${this.year-1}-${this.month}-${this.day}T00:00:00`);
        for (let i = 0; i < hafta1.length; i++) {
          const siparis = hafta1[i].teslim_tarihi;
          const teslim = hafta1[i].teslim_tarihi;
          
          const tarih1 = new Date(siparis);
          const tarih2 = new Date(teslim);
          
          const tarih1ZamanDamgasi = tarih1.getTime();
          const tarih2ZamanDamgasi = tarih2.getTime();
          
          var gunFarki = Math.floor((tarih2ZamanDamgasi - tarih1ZamanDamgasi) / (1000 * 60 * 60 * 24));
          sepet+=gunFarki;
        }
        console.log(sepet/this.gecmis.length);
    
        this.teslimler = (sepet / this.gecmis.length).toFixed(1);
    
        
        this.gecmis
      console.log(this.year,this.month,this.day);
        const hafta=this.gecmis.filter((item)=>item.teslim_tarihi>=`${this.year-1}-${this.month}-${this.day}T00:00:00` && item.durum_id!=0);
        console.log(hafta);
       for(var i=0;i<hafta.length;i++){
        this.topkaz+=hafta[i].satis*hafta[i].adet;
        this.topmal+=hafta[i].adet*hafta[i].maliyet;
        this.totalsat+=hafta[i].adet;
       }
       const alinanlar=this.alinanlar.filter((item)=>item.tarih>=`${this.year-1}-${this.month}-${this.day}T00:00:00`)
    
       for(var i=0;i<alinanlar.length;i++){
        this.totalal+=alinanlar[i].adet;
       }
       const basarili=this.gecmis.filter((item)=>item.teslim_tarihi>=`${this.year-1}-${this.month}-${this.day}T00:00:00` && item.durum_id==3);
       
       const basarisiz=this.gecmis.filter((item)=>item.teslim_tarihi>=`${this.year-1}-${this.month}-${this.day}T00:00:00` && item.durum_id==0);
      this.basarili=basarili.length;  
      this.basarisiz=basarisiz.length;
      this.totalsip=hafta.length+basarisiz.length;
      this.findMostSoldProduct(hafta);
      this.findLeastSoldProduct(hafta);
      console.log(this.basarili,this.basarisiz);
      this.lweek.classList.remove("aktif");
      this.lyear.classList.add("aktif");
    this.lday.classList.remove("aktif");

      this.lmonth.classList.remove("aktif");
      }
      lastDay(event:any){
        event.preventDefault();
        if(this.day<10){
          this.day="0"+this.day.toString();
        }
       
        if(this.month+1<10){
          this. month="0"+(this.month);
        }
        else{
         this.month=this.month;
        }
    console.log(this.day);  
        this.topkaz=0;
        this.topmal=0;
        this.totalal=0;
        this.totalsat=0;
        const ortsure=0;
       
        this.zaman="day";
        var sepet=0;
        const hafta1=this.gecmis.filter((item)=>item.teslim_tarihi>=`${this.year}-${this.month}-${this.day-1}T00:00:00`);
        for (let i = 0; i < hafta1.length; i++) {
          const siparis = hafta1[i].teslim_tarihi;
          const teslim = hafta1[i].teslim_tarihi;
          
          const tarih1 = new Date(siparis);
          const tarih2 = new Date(teslim);
          
          const tarih1ZamanDamgasi = tarih1.getTime();
          const tarih2ZamanDamgasi = tarih2.getTime();
          
          var gunFarki = Math.floor((tarih2ZamanDamgasi - tarih1ZamanDamgasi) / (1000 * 60 * 60 * 24));
          sepet+=gunFarki;
        }
        console.log(sepet/this.gecmis.length);
    
        this.teslimler = (sepet / this.gecmis.length).toFixed(1);
    
        
        this.gecmis
      console.log(this.year,this.month,this.day);
        const hafta=this.gecmis.filter((item)=>item.teslim_tarihi>=`${this.year}-${this.month}-${this.day-1}T00:00:00` && item.durum_id!=0);
        console.log(hafta);
       for(var i=0;i<hafta.length;i++){
        this.topkaz+=hafta[i].satis*hafta[i].adet;
        this.topmal+=hafta[i].adet*hafta[i].maliyet;
        this.totalsat+=hafta[i].adet;
       }
       const alinanlar=this.alinanlar.filter((item)=>item.tarih>=`${this.year}-${this.month}-${this.day-1}T00:00:00`)
    
       for(var i=0;i<alinanlar.length;i++){
        this.totalal+=alinanlar[i].adet;
       }
       const basarili=this.gecmis.filter((item)=>item.teslim_tarihi>=`${this.year}-${this.month}-${this.day-1}T00:00:00` && item.durum_id==3);
       
       const basarisiz=this.gecmis.filter((item)=>item.teslim_tarihi>=`${this.year}-${this.month}-${this.day-1}T00:00:00` && item.durum_id==0);
      this.basarili=basarili.length;  
      this.basarisiz=basarisiz.length;
      this.totalsip=hafta.length+basarisiz.length;
      this.findMostSoldProduct(hafta);
      this.findLeastSoldProduct(hafta);
      console.log(this.basarili,this.basarisiz);
      this.lweek.classList.remove("aktif");
      this.lyear.classList.remove("aktif");
      this.lday.classList.add("aktif");
      this.lmonth.classList.remove("aktif");
      }
  
  }
  
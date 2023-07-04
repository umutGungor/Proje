import { Component, ElementRef,ViewChild,OnInit, Renderer2 } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { Chart , Colors, registerables} from 'node_modules/chart.js';
import { AuthService } from '../services/auth.service';
Chart.register(...registerables);
@Component({
  selector: 'app-yonetici',
  templateUrl: './yonetici.component.html',
  styleUrls: ['./yonetici.component.css']
})
export class YoneticiComponent {

  tip:any='bar';
  group !:Element;
  pie_ch !:Element;
  graphics !:Element;
  lyear !:Element;
  lmonth !:Element;
  lweek !:Element;
  graph !:any;
  analiz !:Element;
  chart!:Chart;
  baslik!:Element;
  loginn!:Element;
  blocker!:Element;
  azcok !:Element;
  cokaz !:Element;
  st !:Element;
  ln !:Element;
  today !:Element;
  startDateControl: FormControl;
  endDateControl: FormControl;
  kat!:any;
  mark!:any;
  //tavsiyeler
  tavsiyeler:any[]=[];
  tavsiyelerCopy:any[]=[];
  //grafik
  grafik:any[]=[];
  //sepettekiler
  sepettekiler:any[]=[];
  sepettekilerCopy:any[]=[];
  //satanlar
kategoriler:any[]=[];
markalar:any[]=[];
  satanlar:any[]=[];
  analiztab:any[]=[];
  satanlarCopy:any[]=[];
  ikihafta: any[]=[];
  analiztab1: any[]=[];
    constructor(public router: Router,private elementRef: ElementRef, private renderer: Renderer2,private service:AuthService) {
      this.startDateControl = new FormControl(null, Validators.required);
      this.endDateControl = new FormControl(null, Validators.required);
    }
  deger="satan";
   
  
  ozel!:Element;
  
    ngOnInit(){
      if ((localStorage.getItem('ls')=='1')) {
        // magazalogin true ise
      } else {
        // magazalogin false ise
        this.router.navigate(['/hata']);
      }
      //sepet gecmiş
      this.service.getsepetgecmis().subscribe(
        (data) => {
          this.sepettekiler=data;
    
        },
        (error) => {
          console.error(error);
          // Hata işlemlerini burada gerçekleştirin
        }
      );
  //getsatisgunlerbirlesik
  this.service.getsatisgunlerbirlesik().subscribe(
    (data) => {
      this.satanlar=data;

    },
    (error) => {
      console.error(error);
      // Hata işlemlerini burada gerçekleştirin
    }
  );
  this.service.tavsiye().subscribe(
    (data) => {
      this.tavsiyeler=data;
      const buttonElement = this.elementRef.nativeElement.querySelector('#today');
      buttonElement.click();
      this.zaman="today";
      this.tavsiye();

    },
    (error) => {
      console.error(error);
      // Hata işlemlerini burada gerçekleştirin
    }
  );
  this.service.getkategori().subscribe(
    (data) => {
      this.kategoriler=data;
      const buttonElement = this.elementRef.nativeElement.querySelector('#today');
      buttonElement.click();
      this.zaman="today";
      this.tavsiye();

    },
    (error) => {
      console.error(error);
      // Hata işlemlerini burada gerçekleştirin
    }
  );
  this.service.getmarka().subscribe(
    (data) => {
      this.markalar=data;
      const buttonElement = this.elementRef.nativeElement.querySelector('#today');
      buttonElement.click();
      this.zaman="today";
      this.tavsiye();

    },
    (error) => {
      console.error(error);
      // Hata işlemlerini burada gerçekleştirin
    }
  );
      this.mark=document.querySelector('#selectMark')!;
      this.kat=document.querySelector('#selectCat')!;
      this.cokaz=document.querySelector('#cokaz')!;
      this.azcok=document.querySelector('#azcok')!;
      this.lweek=document.querySelector('#LastWeek')!;
      this.lmonth=document.querySelector('#LastMonth')!;
      this.today=document.querySelector('#today')!;
      this.lyear=document.querySelector('#LastYear')!;
      this.group=document.querySelector('#group')!;;
      this.graphics=document.querySelector('#graph')!;
      this.graph=document.querySelector('#chart')!;
      this.analiz=document.querySelector('#analiz')!;
      this.loginn=document.querySelector('#loginn')!;
      this.blocker=document.querySelector('.blocker')!;
      this.st=document.querySelector('#st')!;
      this.ln=document.querySelector('#ln')!;
      this.baslik=document.querySelector('#baslik')!;
      this.ozel=document.querySelector('#ozel')!;

   this.RenderChart();
   
      
    }
  
    bastarih:any;
    bittarih:any;
    zaman:any;
  
    submitForm() {
      if(new Date(this.endDateControl.value)>=new Date(this.startDateControl.value))
      if (new Date(this.endDateControl.value)<=new Date()) {
        this.bastarih=this.startDateControl.value;
        this.bittarih=this.endDateControl.value;
        this.zaman="ozel";
        this.filtre();
        this.ozel.classList.add("aktif");
        this.today.classList.remove("aktif");
    this.lweek.classList.remove("aktif");
    this.lyear.classList.remove("aktif");
    this.lmonth.classList.remove("aktif");
    this.loginn.classList.add('d-none');
    this.blocker.classList.add('d-none');
    this.renderer.setStyle(document.body, 'overflow', 'auto');
      } else {
      alert('Bitiş tarihi bügünün tarihinden büyük olamaz!');
      }else{
        alert('Başlangıç tarihi bitiş tarihinden büyük olamaz!');
      }
     
    }
    
    
    tavsiye(){
      console.log(this.zaman);
      this.ikihafta=this.tavsiyeler.slice(0);
      this.ikihafta=this.ikihafta.map((item)=>item.degisken);

      if(this.zaman=="today"){
        this.tavsiyelerCopy=this.tavsiyeler.slice(0, 9);
        this.tavsiyelerCopy=this.tavsiyelerCopy.map((item)=>item.degisken);
      }
      if(this.zaman=="week"){
        this.tavsiyelerCopy=this.tavsiyeler.slice(9, 17);
        this.tavsiyelerCopy=this.tavsiyelerCopy.map((item)=>item.degisken);

      }
      if(this.zaman=="month"){
        this.tavsiyelerCopy=this.tavsiyeler.slice(17, 25);
        this.tavsiyelerCopy=this.tavsiyelerCopy.map((item)=>item.degisken);

      }
      if(this.zaman=="year"){
        this.tavsiyelerCopy=this.tavsiyeler.slice(25, 34);
        this.tavsiyelerCopy=this.tavsiyelerCopy.map((item)=>item.degisken);

      }
    console.log(this.tavsiyelerCopy)
    }
    
    
  
    grafikveustfiltre(bas:any,son:any=new Date()){
     
      if(son instanceof Date) {
        son.setHours(0,0,0,0);
        this.satanlarCopy=this.satanlarCopy.filter((item)=> new Date(item.tarih)>=bas);
        this.sepettekilerCopy=this.sepettekilerCopy.filter((item)=> new Date(item.siparis_tarih)>=bas);
      }else{
        son=new Date(son);
        son.setHours(0,0,0,0); 
        this.satanlarCopy=this.satanlarCopy.filter((item)=> new Date(item.tarih)>=bas && son>=new Date(item.tarih));
        this.sepettekilerCopy=this.sepettekilerCopy.filter((item)=> new Date(item.siparis_tarih)>=bas && son>=new Date(item.siparis_tarih));
      }
   
          console.log(this.satanlarCopy);
          let dizi = [];
          let dizi1 = [];
          let idler:any[]=[];
          if(this.deger=="satan" || this.deger=="kar"){
            for (let i = 0; i < this.satanlarCopy.length; i++) {
              let id = this.satanlarCopy[i].urun_ID;
              let ad = this.satanlarCopy[i].urun_ad;
              let tarih = this.satanlarCopy[i].tarih;
              let mal = this.satanlarCopy[i].maliyet;
              let sat = this.satanlarCopy[i].satis;
              let spt = 0;
              for (let j = 0; j < this.satanlarCopy.length; j++) {
                if (id === this.satanlarCopy[j].urun_ID) {
                  spt += this.satanlarCopy[j].toplam_adet;
                }
              }
              if(idler.filter((item)=>item==id).length<=0){
              dizi.push({ id: id, ad:ad, tarih: tarih, adet: spt ,mal:mal ,satis:sat, kar:spt*((parseInt(sat))-(parseInt(mal)))});
              dizi1.push({ id: id, ad:ad, tarih: tarih, adet: spt ,mal:mal ,satis:sat, kar:spt*((parseInt(sat))-(parseInt(mal)))});
              }
              idler.push(id);
            }
            if(this.deger=="satan"){
              dizi.sort((a, b) => b.adet - a.adet);
              this.analiztab=dizi.splice(0,dizi.length);
              this.analiztab1=this.analiztab;
              console.log(this.analiztab);
              if(dizi.length>=10)
                      this.grafik=dizi1.splice(0,10);
                      else
                      this.grafik=dizi1;
            }
                 if(this.deger=="kar"){
                  dizi.sort((a, b) => b.kar - a.kar);
                  this.analiztab=dizi.splice(0,dizi.length);
                  this.analiztab1=this.analiztab;

                  console.log(this.analiztab);
                  if(dizi.length>=10)
                          this.grafik=dizi1.splice(0,10);
                          else
                          this.grafik=dizi1;
                  }
          }
          else{
            for (let i = 0; i < this.sepettekilerCopy.length; i++) {
              let id = this.sepettekilerCopy[i].urun_ID;
              let ad = this.sepettekilerCopy[i].urun_ad;
              let tarih = this.sepettekilerCopy[i].siparis_tarih;
              let spt = 0;
              for (let j = 0; j < this.sepettekilerCopy.length; j++) {
                if (id === this.sepettekilerCopy[j].urun_ID) {
                  spt += this.sepettekilerCopy[j].adet;
                }
              }
              if(idler.filter((item)=>item==id).length<=0){
              dizi.push({ id: id, ad:ad, tarih: tarih, adet: spt });
              dizi1.push({ id: id, ad:ad, tarih: tarih, adet: spt });
              }
              idler.push(id);
            }
     
              dizi.sort((a, b) => b.adet - a.adet);
              this.analiztab=dizi.splice(0,dizi.length);
              this.analiztab1=this.analiztab;

              console.log(this.analiztab);
              if(dizi.length>=10)
                      this.grafik=dizi1.splice(0,10);
                      else
                      this.grafik=dizi1;
              
       
          }
  
     this.chart.destroy();
     this.RenderChart();
    }
  
  
    
    filtre() {
      this.chart.destroy();
      this.RenderChart();
      const kat = this.kat.value;
      const marka = this.mark.value;
 console.log(kat,marka);
 if(this.deger=="satan" || this.deger=="kar"){
  if (kat === '0' && marka === '0') {
    this.satanlarCopy = this.satanlar.filter((item)=>item);
  } else if (kat === "0" && marka !== "0") {
    // Sadece marka filtresi uygula
    this.satanlarCopy = this.satanlar.filter(item => parseInt(item.marka_ID) ===parseInt(marka));
  } else if (kat !== "0" && marka === "0") {
    // Sadece kategori filtresi uygula
    this.satanlarCopy = this.satanlar.filter(item => parseInt(item.kategori_ID) ===parseInt(kat));
  } else {
    // Hem kategori hem de marka filtresi uygula
    this.satanlarCopy = this.satanlar.filter(item => item.kategori_ID== parseInt(kat) && item.marka_ID ===parseInt(marka));
  }
 }
 else{
  if (kat === '0' && marka === '0') {
    this.sepettekilerCopy = this.sepettekiler.filter((item)=>item);
  } else if (kat === "0" && marka !== "0") {
    // Sadece marka filtresi uygula
    this.sepettekilerCopy = this.sepettekiler.filter(item => parseInt(item.marka_ID) ===parseInt(marka));
  } else if (kat !== "0" && marka === "0") {
    // Sadece kategori filtresi uygula
    this.sepettekilerCopy = this.sepettekiler.filter(item => parseInt(item.kategori_ID) ===parseInt(kat));
  } else {
    // Hem kategori hem de marka filtresi uygula
    this.sepettekilerCopy = this.sepettekiler.filter(item => item.kategori_ID== parseInt(kat) && item.marka_ID ===parseInt(marka));
  }
 }     

      
      if(this.zaman=="today"){
        const tarih=new Date();
        tarih.setHours(0, 0, 0, 0);
        this.grafikveustfiltre(tarih);
      }
      if(this.zaman=="week"){
        const tarih=new Date();
        tarih.setHours(0, 0, 0, 0);
        tarih.setDate(tarih.getDate()-7)
        this.grafikveustfiltre(tarih);
      }
      if(this.zaman=="month"){
        const tarih=new Date();
        tarih.setHours(0, 0, 0, 0);
        tarih.setMonth(tarih.getMonth()-1)
        this.grafikveustfiltre(tarih);
      }
      if(this.zaman=="year"){
        const tarih=new Date();
        tarih.setHours(0, 0, 0, 0);
        tarih.setFullYear(tarih.getFullYear()-1)
        this.grafikveustfiltre(tarih);
      }
      if(this.zaman=="ozel"){
        const tarih=new Date(this.bastarih);
        const tarih1=this.bittarih;
        tarih.setHours(0, 0, 0, 0);
        this.grafikveustfiltre(tarih,tarih1);
      }
    }
    
  
    ara(event:any){

      console.log(this.analiztab1);
    
      if(this.deger=="satan"||this.deger=="kar"){
        this.analiztab1=this.analiztab.filter(item => item.ad.toLowerCase().includes(event.target.value.toLowerCase()));
        
        console.log(this.analiztab);
      }
   else
   this.analiztab = this.analiztab1.filter(item => item.ad.includes(event.target.value));
    }
    
      acc(event:Event){
        event.preventDefault();
        this.loginn.classList.remove('d-none');
        this.blocker.classList.remove('d-none');
        this.renderer.setStyle(document.body, 'overflow', 'hidden');
      } 
    
      val(event :any){
    this.deger=event.target.value;
    this.baslik.textContent==event.target.textContent;
    this.filtre();
    this.tavsiye();
    event.preventDefault();
    this.chart.destroy();
    this.RenderChart();

      }
    
      kapatt(event:Event){
        event.preventDefault();
        this.loginn.classList.add('d-none');
        this.blocker.classList.add('d-none');
        this.renderer.setStyle(document.body, 'overflow', 'auto');
      } 
      
  
    btnClick(event:Event){ 
      console.log(event);
     event.preventDefault();
      this.chart.destroy();
      this.RenderChart();
      
      if(this.st.classList.contains("aktif")){
        this.ln.classList.add("aktif");
          this.st.classList.remove("aktif");
      }
      if(this.ln.classList.contains("aktif")){
    this.st.classList.add("aktif");
       this.ln.classList.remove("aktif");
  }
  
    }
  
  
  
    cokAz(){
      this.cokaz.classList.add("aktif");
      this.azcok.classList.remove("aktif");
      if(this.deger=="satan" || this.deger=="sepet")
      this.analiztab.sort((a, b) => b.adet - a.adet);
      else
        this.analiztab.sort((a, b) => b.kar - a.kar);
      
    }
  
    azCok(){
      this.cokaz.classList.remove("aktif");
      this.azcok.classList.add("aktif");
      if(this.deger=="satan" || this.deger=="sepet")
      this.analiztab.sort((a, b) => a.adet - b.adet);
      else
        this.analiztab.sort((a, b) => a.kar - b.kar);
      
    }
  
  todayy(event:any){
  
    this.ozel.classList.remove("aktif");
    this.lweek.classList.remove("aktif");
    this.lyear.classList.remove("aktif");
    this.lmonth.classList.remove("aktif");
    this.today.classList.add("aktif");
    this.zaman="today";
   
   this.filtre();
    this.tavsiye();
    event.preventDefault();
    this.chart.destroy();
    this.RenderChart();
  }
  
    lastWeek(event:any){
    this.ozel.classList.remove("aktif");
  this.lweek.classList.add("aktif");
  this.lyear.classList.remove("aktif");
  this.lmonth.classList.remove("aktif");
  this.today.classList.remove("aktif");
  this.zaman="week";
  
  this.filtre();
  event.preventDefault();
      this.chart.destroy();
      this.RenderChart();
  this.tavsiye();

  }
  
    lastMonth(event:any){
    this.ozel.classList.remove("aktif");
      this.today.classList.remove("aktif");
  this.lweek.classList.remove("aktif");
  this.lyear.classList.remove("aktif");
  this.lmonth.classList.add("aktif");
  this.zaman="month";
  
  
  this.filtre();
  this.tavsiye();
  event.preventDefault();
      this.chart.destroy();
      this.RenderChart();
    }
    
    lastYear(event:any){
    this.ozel.classList.remove("aktif");
      this.today.classList.remove("aktif");
  this.lweek.classList.remove("aktif");
  this.lyear.classList.add("aktif");
  this.lmonth.classList.remove("aktif");
  this.zaman="year";
  
  this.filtre();
  this.tavsiye();
  event.preventDefault();
      this.chart.destroy();
      this.RenderChart();
    }
  
    RenderChart(){
  
      Chart.defaults.backgroundColor = '#a233';
      Chart.defaults.borderColor = 'rgba(239, 238, 238, 0.5)';
       Chart.defaults.color = 'white';
       Chart.defaults.font.size=15;
       Chart.defaults.responsive=true;
       
  
  
  this.chart=new Chart(this.graph, {
        type:this.tip,
        data: {
          labels:this.grafik.map(item => item.ad)
        ,
          datasets: [{
            label: 'Ürünler',
            data:this.grafik.map(item => item.adet),
            borderWidth: 1,
            hoverRadius:12,
            pointRadius:7,
            backgroundColor:['rgba(198, 198, 198, 0.3)'],
          }]
        },
        options: {
          scale: {
            yAxes: [{
              ticks: {
         
              }
            }]
          }
        }
        });
  
  
    }
  
    
  
  }
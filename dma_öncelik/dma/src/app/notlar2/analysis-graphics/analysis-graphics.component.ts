import { Component, ElementRef,ViewChild,OnInit, Renderer2 } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { Chart , Colors, registerables} from 'node_modules/chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-ag',
  templateUrl: './analysis-graphics.component.html',
  styleUrls: ['../../../custom_sources/main.css']
})
export class AnalysisGraphicsComponent {

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
loginn!:Element;
blocker!:Element;
azcok !:Element;
cokaz !:Element;
st !:Element;
ln !:Element;
startDateControl: FormControl;
endDateControl: FormControl;
kat!:any;
mark!:any;
urunlerCopy:any[]=[];
grafik:any[]=[];
urunler:any[]=[];
  constructor(public router: Router,private elementRef: ElementRef, private renderer: Renderer2) {
    this.startDateControl = new FormControl(null, Validators.required);
    this.endDateControl = new FormControl(null, Validators.required);
  }
deger="satan";
 



  ngOnInit(){
    this.mark=document.querySelector('#selectMark')!;
    this.kat=document.querySelector('#selectCat')!;

    this.cokaz=document.querySelector('#cokaz')!;
    this.azcok=document.querySelector('#azcok')!;
    this.lweek=document.querySelector('#LastWeek')!;
    this.lmonth=document.querySelector('#LastMonth')!;
    this.lyear=document.querySelector('#LastYear')!;
    this.group=document.querySelector('#group')!;;
    this.graphics=document.querySelector('#graph')!;
    this.graph=document.querySelector('#chart')!;
    this.analiz=document.querySelector('#analiz')!;
    this.loginn=document.querySelector('#loginn')!;
    this.blocker=document.querySelector('.blocker')!;
    this.st=document.querySelector('#st')!;
    this.ln=document.querySelector('#ln')!;
 this.lastWeek();  
 this.RenderChart();
  }

  zaman="week";

  submitForm() {
    if(new Date(this.endDateControl.value)>=new Date(this.startDateControl.value))
    if (new Date(this.endDateControl.value)<=new Date()) {
      console.log('Başlangıç Tarihi:', this.startDateControl.value);
      console.log('Bitiş Tarihi:', this.endDateControl.value);
      // Form submit işlemleri burada yapılabilir
    } else {
    alert('Bitiş tarihi bügünün tarihinden büyük olamaz!');
    }else{
      alert('Başlangıç tarihi bitiş tarihinden büyük olamaz!');
    }
  }
  
  
  
  
  
  
  filtre() {
    const kat = this.kat.value;
    const marka = this.mark.value;
  
  
    if (kat === "*" && marka === "*") {
      // Tüm ürünleri kopyala
      this.urunlerCopy = [...this.urunler];
      this.urunlerCopy=this.grafik;
    } else if (kat === "*" && marka !== "*") {
      // Sadece marka filtresi uygula
      this.urunlerCopy = this.urunler.filter(item => item.marka_ID === marka);
      this.urunlerCopy=this.grafik;
    } else if (kat !== "*" && marka === "*") {
      // Sadece kategori filtresi uygula
      this.urunlerCopy = this.urunler.filter(item => item.kategori_ID === kat);
      this.urunlerCopy=this.grafik;
    } else {
      // Hem kategori hem de marka filtresi uygula
      this.urunlerCopy = this.urunler.filter(item => item.kategori_ID === kat && item.marka_ID === marka);
      this.urunlerCopy=this.grafik;
    }

  }
  

  ara(event:any){
    if(event.target.value=="")
    this.filtre();
    else
    this.urunlerCopy = this.urunler.filter(item => item.urun_ad.includes(event.targer.value));
  }
  
    acc(event:Event){
      event.preventDefault();
      this.loginn.classList.remove('d-none');
      this.blocker.classList.remove('d-none');
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    } 
  
    val(event :any){
  this.deger=event.target.value
    }
  
    kapatt(event:Event){
      event.preventDefault();
      this.loginn.classList.add('d-none');
      this.blocker.classList.add('d-none');
      this.renderer.setStyle(document.body, 'overflow', 'auto');
    } 
    

  btnClick(event:Event){ 
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
  }

  azCok(){
    this.cokaz.classList.remove("aktif");
    this.azcok.classList.add("aktif");
  }

  lastWeek(){
this.lweek.classList.add("aktif");
this.lyear.classList.remove("aktif");
this.lmonth.classList.remove("aktif");
this.zaman="week";
const tarih=new Date();
tarih.setDate(tarih.getDate() - 7);
this.urunlerCopy=this.urunlerCopy.filter((item)=> item.siparis_tarih>=tarih)
}

  lastMonth(){
this.lweek.classList.remove("aktif");
this.lyear.classList.remove("aktif");
this.lmonth.classList.add("aktif");
this.zaman="month";
const tarih=new Date();
tarih.setDate(tarih.getMonth() - 1);
this.urunlerCopy=this.urunlerCopy.filter((item)=> item.siparis_tarih>=tarih)
  }
  
  lastYear(){
this.lweek.classList.remove("aktif");
this.lyear.classList.add("aktif");
this.lmonth.classList.remove("aktif");
this.zaman="year";
const tarih=new Date();
tarih.setDate(tarih.getFullYear() - 1);
this.urunlerCopy=this.urunlerCopy.filter((item)=> item.siparis_tarih>=tarih)
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
        labels:[
      'a','da','das','dsa','wa','ddsa','fsadas','dadas','gf','hfd'],
        datasets: [{
          label: 'Ürünler',
          data: [12, 19, 3, 5, 2, 3,32,24,23,1],
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
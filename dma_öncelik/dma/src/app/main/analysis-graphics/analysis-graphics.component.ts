import { Component, ElementRef,ViewChild,OnInit, Renderer2 } from '@angular/core';
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
lisance:any;
  constructor(public router: Router,private elementRef: ElementRef, private renderer: Renderer2) {}

 
  acc(event:Event){
    event.preventDefault();
    this.loginn.classList.remove('d-none');
    this.blocker.classList.remove('d-none');
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  } 


  kapatt(event:Event){
    event.preventDefault();
    this.loginn.classList.add('d-none');
    this.blocker.classList.add('d-none');
    this.renderer.setStyle(document.body, 'overflow', 'auto');
  } 
  
  ngOnInit(){
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
   this.RenderChart();
   
   const sk = localStorage.getItem('sk');
   const ls = localStorage.getItem('ls');
   this.lisance=ls;
   if (ls!='1') {
     this.router.navigate(['/hata']);
    
   } else {
    
   }
  }

  zaman="week";

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

  }

  lastMonth(){
this.lweek.classList.remove("aktif");
this.lyear.classList.remove("aktif");
this.lmonth.classList.add("aktif");
this.zaman="month";
  }
  
  lastYear(){
    this.lweek.classList.remove("aktif");
this.lyear.classList.add("aktif");
this.lmonth.classList.remove("aktif");
this.zaman="year";
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
        labels: [
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
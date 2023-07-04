import { Component } from '@angular/core';

@Component({
  selector: 'app-hazir-siparisler',
  templateUrl: './hazir-siparisler.component.html',
  styleUrls: ['./hazir-siparisler.component.css']
})
export class HazirSiparislerComponent  {
sip:any[]=[];  
veriler:any[]=[];
ustBilesenVeri:any[]=[];
ngOnInit(){
this.sip=[{ad:"urun8",tarih:"01/05/2023"},{ad:"urun1",tarih:"01/05/2023"},{ad:"urun2",tarih:"15/05/2023"},{ad:"urun3",tarih:"11/05/2023"},{ad:"urun4",tarih:"11/05/2023"},{ad:"urun5",tarih:"11/05/2023"}];  
this.veriler=this.sip;
this.ustBilesenVeri  = this.sip ;
}



  handleSelectedDate(selectedDate: string) {
console.log(selectedDate);
this.veriler=this.sip.filter((item)=>item.tarih==selectedDate);
console.log(this.veriler);
  }

  Date(veri:any[]){
this.veriler=veri;
  }
  
  
  
  
  
  
  
}

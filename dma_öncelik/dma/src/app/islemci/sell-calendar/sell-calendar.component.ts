import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-sell-calendar',
  templateUrl: './sell-calendar.component.html',
  styleUrls: ['../../../custom_sources/main.css']
})
export class SellCalendarComponent implements OnInit{
  @Output() selectedDateEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() DateEvent: EventEmitter<Array<any[]>> = new EventEmitter<Array<any[]>>();
  
  ileri !:Element
  geri  !:any
  tbod  !:Element
  startDate !: any
  ay  !:any;
  tak !:Element;
  calendar: number[][];
  bugun!:Date;
  
  constructor(private service: AuthService) {
    this.calendar = [];
    this.startDate = new Date();
  }
  
  veri: any[]=[];
  
  ngOnInit(): void {
    this.service.hazirlanan().subscribe(
      (data) => {
        this.veri=data;

      },
      (error) => {
        console.error(error);
        // Hata işlemlerini burada gerçekleştirin
      }
    );
  console.log(this.veri);
  this.startDate = new Date();
  this.startDate.setMonth(this.startDate.getMonth()-1);
  this.bugun=new Date();
  
  this.tbod=document.querySelector('#tbod')!;
  this.ileri=document.querySelector('#ileri')!;
  this.geri=document.querySelector('#geri')!;
  this.tak=document.querySelector('#callendar')!;
   
  this.next();
  }
  
  i=0;
  c:any=0;
  
  isSmallSipDay(sut :any) {
  if(sut<10){
    sut="0"+sut.toString();
  }
  let month:any;
  if(this.bugun.getMonth()+1<10){
     month="0"+(this.bugun.getMonth()+1);
  }
  else{
     month=this.bugun.getMonth()+1;
  }
  

  const filteredItems = this.veri.filter((item) => item.siparis_tarih == `${this.bugun.getFullYear()}-${month}-${sut}T00:00:00` && this.startDate.getMonth()==this.bugun.getMonth() && this.bugun.getDate()>sut);
    
  if (filteredItems.length > 0) {
  
    return true;
  }
      
  
    return false;
  }
  
  isSipDay(sut:any) {
  
    if(sut<10){
      sut="0"+sut.toString();
    }
    let month:any;
    if(this.bugun.getMonth()+1<10){
       month="0"+(this.bugun.getMonth()+1);
    }
    else{
       month=this.bugun.getMonth()+1;
    }
  
    const filteredItems = this.veri.filter((item) => item.siparis_tarih == `${this.bugun.getFullYear()}-${month}-${sut}T00:00:00`  && this.startDate.getMonth()==this.bugun.getMonth()   && new Date().getDate()<=sut);
      
    if (filteredItems.length > 0) {
     
      return true;
    }
        
    
      return false;
    }
   
  
  
  
  
  clearTable() {
    const tableRows = this.tbod.querySelectorAll("tr");
    tableRows.forEach((row) => {
      row.innerHTML = "";
    });
  }
  
  next() {
    this.i += 1;
    this.tbod.classList.add("op");
  
    if (new Date(new Date().getFullYear() + 1, new Date().getMonth() - 1, new Date().getDate()) > this.startDate) {
      if (this.startDate.getMonth() < 11) {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 1);
      } else {
        this.startDate = new Date(this.startDate.getFullYear() + 1, 0, 1);
      }
      this.clearTable();
      this.tarih();
    } else {
      alert("En fazla 1 yıl sonrasını görebilirsiniz!");
    } 
   
    this.tumSip();
    this.tak.addEventListener('animationend', () => {
      this.tbod.classList.remove("op");
    });
  
  
  }
  
  prev() {
    this.i -= 1;
    this.tbod.classList.add("op");
  
    if (new Date() < this.startDate) {
      if (this.startDate.getMonth() > 0) {
        this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() - 1, 1);
      } else {
        this.startDate = new Date(this.startDate.getFullYear() - 1, 11, 1);
      }
      this.clearTable();
      this.tarih();
    }
    this.tumSip();
    this.tak.addEventListener('animationend', () => {
      this.tbod.classList.remove("op");
    });
  }
  
  
  
  
  
  tarih() {
    const options = { weekday: 'long' };
  
  
    const ayAdlari = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];
    let month = this.startDate.getMonth()+1;  // Bir ay geriye gitmek için -1
    let year = this.startDate.getFullYear();
  
  console.log(this.startDate);
    this.ay = ayAdlari[month-1] + " " + year;
  
    const sira = this.calculateSira(this.startDate.toLocaleDateString('tr-TR', options));
  
    const daysInMonth = new Date(year, month + 1 , 0).getDate();
    let gun = 1;
    let spt = 0;
    let hafta: any = [];
  
    
    
    for (gun; gun <= daysInMonth + sira; gun++) {
      if (gun <= sira) {
        hafta.push(null);
      } else {
        hafta.push(gun - sira);
      }
  
      spt++;
  
      if (spt === 7) {
        this.calendar.push(hafta);
        hafta = [];
        spt = 0;
      }
    }
  
    if (spt !== 0) {
      while (spt < 7) {
        hafta.push(null);
        spt++;
      }
      this.calendar.push(hafta);
    }
  }
  
  
  
  
  
  
  
  
  calculateSira(weekday: string): number {
  
    switch (weekday) {
      case 'Pazartesi':
        return 0;
      case 'Salı':
        return 1;
      case 'Çarşamba':
        return 2;
      case 'Perşembe':
        return 3;
      case 'Cuma':
        return 4;
      case 'Cumartesi':
        return 5;
      case 'Pazar':
        return 6;
      default:
        return 0;
    }
  }
  
  tumSip(){
console.log(this.bugun,this.startDate);
    if(this.bugun.getMonth()==this.startDate.getMonth()){
    this.DateEvent.emit(this.veri);
    console.log(this.veri);}
    else{
      let bos:any[] =[]
     this.DateEvent.emit(bos); 
    }
    
  }
  
  selectDate(day: any, month:any, year: any) {
  month+=1;
    if(day<10){
    day="0"+day
  }
  if(month<10){
    month="0"+month
  }
    console.log(`${year}-${month}-${day}T00:00:00`)
    const selectedDate = `${year}-${month}-${day}T00:00:00`;
    this.selectedDateEvent.emit(selectedDate);
  }
  }
  
  
  
  
/////

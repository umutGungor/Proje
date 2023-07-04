import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-hazirlanan',
  templateUrl: './hazirlanan.component.html',
  styleUrls: ['./hazirlanan.component.css']
})
export class HazirlananComponent  implements OnInit {
  constructor(public router : Router, public service : AuthService ) {};
siparisler:any[]=[];
sip:any[]=[];  
veriler:any[]=[];
ustBilesenVeri:any[]=[];
  ngOnInit(): void {


    if (this.service.getMagazalogin()&&(localStorage.getItem('ls')=='2')) {
      // magazalogin true ise
    } else {
      // magazalogin false ise
      this.router.navigate(['/hata']);
    }
    this.service.hazirlanan().subscribe(
      (data) => {
        this.siparisler = data;
        this.veriler = data;
      
   
        // İstediğiniz işlemleri burada gerçekleştirin
      },
      (error) => {
        console.error(error);
        // Hata işlemlerini burada gerçekleştirin
      }
    );
    this.sip=this.siparisler;  
    this.veriler=this.sip;
    this.ustBilesenVeri  = this.sip ;
  }
  sil(urun:any){
    const siparisadet =parseInt(urun.siparis_adeti); // Siparişin ürün ID'si
  
    const siparisid =parseInt(urun.siparis_id); // Siparişin ürün ID'si
  //const adet = parseInt( this.adet.value); // Sipariş adeti
  this.service.sepetsil(siparisid,siparisadet).subscribe(
    () => {
      console.log('siparis silindi.');
      location.reload();
    },
    (error) => {
      console.error('siparis silme hatası:', error);
    }
  );
  }
  handleSelectedDate(selectedDate: string) {
    console.log(selectedDate);
    console.log(this.siparisler);
    this.veriler=this.siparisler.filter((item)=>item.siparis_tarih==selectedDate);
      }
    
      Date(veri:any[]){
    this.veriler=veri;
      }
}

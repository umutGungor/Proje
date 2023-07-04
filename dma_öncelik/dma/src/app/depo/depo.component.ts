import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-depo',
  templateUrl: './depo.component.html',
  styleUrls: ['./depo.component.css']
})
export class DepoComponent  implements OnInit {
  constructor(public router : Router, public service : AuthService ) {};
siparisler:any[]=[];
sip:any[]=[];  
veriler:any[]=[];
ustBilesenVeri:any[]=[];
  ngOnInit(): void {


    if (this.service.getMagazalogin()&&(localStorage.getItem('ls')=='3')) {
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


  basaribitir(urun:any){
    const siparisadet =parseInt(urun.siparis_adeti); // Siparişin ürün ID'si
  
    const siparisid =parseInt(urun.siparis_id); // Siparişin ürün ID'si
  //const adet = parseInt( this.adet.value); // Sipariş adeti
  this.service.basaribitir(siparisid,siparisadet).subscribe(
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

         bitir(urun:any){
    const siparisid =parseInt(urun.siparis_id); // Siparişin ürün ID'si
    const siparisadet =parseInt(urun.siparis_adeti); // Siparişin ürün ID'si
  //const adet = parseInt( this.adet.value); // Sipariş adeti
  this.service.sepetonay(siparisid,siparisadet,3).subscribe(
    () => {
      console.log('sepet onayı eklendi.');
      location.reload();
    },
    (error) => {
      console.error('sepet onayı ekleme hatası:', error);
    }
  );
}
}

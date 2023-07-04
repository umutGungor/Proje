import { Component, Input } from '@angular/core';
//import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; 
import { elements } from 'chart.js';
import { Product_Stock1 } from 'src/app/models/Product';
import { Product_Depo } from 'src/app/models/Products_Depo';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sepet',
  templateUrl: './sepet.component.html',
  styleUrls: ['./sepet.component.css']
})
export class SepetComponent {

element:Element | undefined;
sepet:any[]=[];
  lisance:any='0';

  Product_Depo : Product_Depo;
  constructor(public router : Router,public service:AuthService) {
    this.Product_Depo=new Product_Depo();
  };
    ngOnInit(): void {
      if (this.service.getMagazalogin()) {
        // magazalogin true ise
      } else {
        // magazalogin false ise
        this.router.navigate(['/hata']);
      }
  //  if (this.service.magazalogin==false) {
    //  //  this.router.navigate(['/hata']);
    //    
    //  }

      this.service.sepet().subscribe(
        (data) => {
          this.sepet = data;
         // console.log(this.sepet);
          // İstediğiniz işlemleri burada gerçekleştirin
        },
        (error) => {
          console.error(error);
          // Hata işlemlerini burada gerçekleştirin
        }
      );
      
      
  
this.yenile();
      /*const sk = localStorage.getItem('sk');
      const ls = localStorage.getItem('ls');
      this.lisance=ls;
      if (ls!='4') {
        this.router.navigate(['/hata']);
       
      } else {
       
      }*/
  
  }

  yenile(){
   

    /*fonksiyon drm 5 gelenler authservice.sepette.subscribe(src => data)
          
  
    
    */
  
  

  }
  hepsiniAl() {
    for (let urun of this.sepet) {
      if (urun.iss>=urun.siparis_adeti) {
        this.satinal(urun);
      }
      else
      alert(urun.urun_ad+" adlı ürün yeterli stoğa sahip değil");
      
    }
  }
  
  sil(urun:any){
    const siparisadet =parseInt(urun.siparis_adeti); // Siparişin ürün ID'si
  
    const siparisid =parseInt(urun.siparis_id); // Siparişin ürün ID'si
  //const adet = parseInt( this.adet.value); // Sipariş adeti
  this.service.sepetsil(siparisid,siparisadet).subscribe(
    () => {
    //  console.log('sepet silindi.');
      location.reload();
    },
    (error) => {
      console.error('sepetsilinme hatası:', error);
    }
  );
  }
  hepsinisil(){

  }
  //şuraya gety ile users çekildi sirket_id bilgisi var sen bunu
  satinal(urun:any){
    
    const siparisid =parseInt(urun.siparis_id); // Siparişin ürün ID'si
    const siparisadet =parseInt(urun.siparis_adeti); // Siparişin ürün ID'si
  //const adet = parseInt( this.adet.value); // Sipariş adeti
  this.service.sepetonay(siparisid,siparisadet,1).subscribe(
    () => {
     // console.log('sepet onayı eklendi.');
      location.reload();
    },
    (error) => {
      console.error('sepet onayı ekleme hatası:', error);
    }
  );
  }

  kontrol(event: any,urun : any){
  

    var deger = event.target.value;
    var gerçek_stok=urun.urun_adet;

if(deger<=0 || deger==null || deger>gerçek_stok){
     alert("adet boş veya 0 veya stoktan fazla girilemez!");
  event.target.value=urun.siparis_adeti; 
  }
else{
urun.siparis_adeti=event.target.value;

  const siparisid =parseInt(urun.siparis_id); // Siparişin ürün ID'si
    const siparisadet =parseInt(urun.siparis_adeti); // Siparişin ürün ID'si
  //const adet = parseInt( this.adet.value); // Sipariş adeti
  this.service.sepetonay(siparisid,siparisadet,0).subscribe(
    () => {
    //  console.log('sepet onayı eklendi.');
      location.reload();
    },
    (error) => {
      console.error('sepet onayı ekleme hatası:', error);
    }
  );
}
  }
}
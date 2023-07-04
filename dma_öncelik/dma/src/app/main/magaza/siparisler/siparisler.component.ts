import { Component } from '@angular/core';
//import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-siparisler',
  templateUrl: './siparisler.component.html',
  styleUrls: ['./siparisler.component.css']
})
export class SiparislerComponent { 

  lisance:any='0';
siparisler:any[]=[];
  constructor(public router : Router,public service:AuthService) {
  
  };
    ngOnInit(): void {
      if (this.service.getMagazalogin()) {
        // magazalogin true ise
      } else {
        // magazalogin false ise
        this.router.navigate(['/hata']);
      }

      this.service.getsiparislerim().subscribe(
        (data) => {
          this.siparisler = data;
         // console.log(this.siparisler);
          // İstediğiniz işlemleri burada gerçekleştirin
        },
        (error) => {
          console.error(error);
          // Hata işlemlerini burada gerçekleştirin
        }
      );
  }
  sil(urun:any){
    const siparisadet =parseInt(urun.siparis_adeti); // Siparişin ürün ID'si
  
    const siparisid =parseInt(urun.siparis_id); // Siparişin ürün ID'si
  //const adet = parseInt( this.adet.value); // Sipariş adeti
  this.service.sepetsil(siparisid,siparisadet).subscribe(
    () => {
   //   console.log('sepet silindi.');
      location.reload();
    },
    (error) => {
      console.error('sepetsilinme hatası:', error);
    }
  );
  }
  }

import { Component, OnInit } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-islemci',
  templateUrl: './islemci.component.html',
  styleUrls: ['./islemci.component.css']
})
export class IslemciComponent implements OnInit {
  constructor(public router: Router, public service: AuthService) {}
islemcisepet:any[]=[];
  ngOnInit(): void {
    if (this.service.getMagazalogin() && (localStorage.getItem('ls') === '2')) {
      // magazalogin true ise


      this.service.islemcisepet().subscribe(
        (data) => {
          this.islemcisepet = data;
          console.log(this.islemcisepet);
          // İstediğiniz işlemleri burada gerçekleştirin
        },
        (error) => {
          console.error(error);
          // Hata işlemlerini burada gerçekleştirin
        }
      );

        



    } else {
      // magazalogin false ise
      this.router.navigate(['/hata']);
    }


   
  }
  satinal(urun:any){
    
    const siparisid =parseInt(urun.siparis_id); // Siparişin ürün ID'si
    const siparisadet =parseInt(urun.siparis_adeti); // Siparişin ürün ID'si

  this.service.sepetonay(siparisid,siparisadet,2).subscribe(
    () => {
      console.log('islem hazırlanıyor.');
      location.reload();
    },
    (error) => {
      console.error('işlem hatası:',urun, error);
    }
  );
  }
  
  sil(urun:any){
    const siparisadet =parseInt(urun.siparis_adeti); // Siparişin ürün ID'si
  
    const siparisid =parseInt(urun.siparis_id); // Siparişin ürün ID'si
  //const adet = parseInt( this.adet.value); // Sipariş adeti
  this.service.sepetsil(siparisid,siparisadet).subscribe(
    () => {
      console.log('sepet silindi.');
      location.reload();
    },
    (error) => {
      console.error('sepetsilinme hatası:', error);
    }
  );
  }
}

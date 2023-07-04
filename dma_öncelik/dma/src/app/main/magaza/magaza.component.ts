import { Component,Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { AuthService } from 'src/app/services/auth.service';
import { Product_Stock1 } from "src/app/models/Product";
import { SepetComponent } from './sepet/sepet.component';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-magaza',
  templateUrl: './magaza.component.html',
  styleUrls: ['./magaza.component.css']
})
export class MagazaComponent implements OnInit {
lisance:any='0';

blocker !: Element ;
panel !:Element;
aciklama !:Element;
confirm !:Element;
adet !:any;
drm:number=0;
satal !:Element;
urun_yedek:any;
gercek_stok:any;
element!:Element;
  veri1: any[] = [];
  kategoriler:any[]=[];
  veri1copy: any[]=[];



constructor(public router : Router,private service:AuthService) {
};
  ngOnInit(): void {

//  if (this.service.magazalogin==false) {
    //  //  this.router.navigate(['/hata']);
    //    
    //  }
// Örnek kullanım
if (this.service.getMagazalogin()&&(localStorage.getItem('ls')=='4')) {
  // magazalogin true ise
} else {
  // magazalogin false ise
  this.router.navigate(['/hata']);
}

this.service.getkategori().subscribe(
  (data) => {
    this.kategoriler = data;
  //  console.log(this.kategoriler);
    // İstediğiniz işlemleri burada gerçekleştirin
  },
  (error) => {
    console.error(error);
    // Hata işlemlerini burada gerçekleştirin
  }
);
    
    this.satal=document.querySelector('#satal')!;
    this.blocker=document.querySelector('#blocker')!;
    this.panel=document.querySelector('#panel')!;
    this.aciklama=document.querySelector('#aciklama')!;
    this.adet=document.querySelector('#adet')!;
    this.confirm=document.querySelector('#confirm')!;



this.alphabetA();
const sk = localStorage.getItem('sk');
const ls = localStorage.getItem('ls');
const mk = localStorage.getItem('mk');
this.lisance=ls;
if (ls!='4') {
 // this.router.navigate(['/hata']);
 
} else {     
}


this.service.getveri().subscribe(
  (data) => {
    this.veri1 = data;
    this.veri1=this.veri1.filter((item)=>item.kategori_ID!=-1);
    this.veri1copy=this.veri1;

    //console.log(this.veri1);
    // İstediğiniz işlemleri burada gerçekleştirin
  },
  (error) => {
  //  console.error(error);
    // Hata işlemlerini burada gerçekleştirin
  }
);



const sepet= localStorage.getItem('sepet');
const siparis= localStorage.getItem('siparis');
}






ara(event:any){
  this.veri1copy = this.veri1.filter(item => item.urun_ad.includes(event.target.value));
};


 


accc(urun : Product_Stock1)  {
if(this.drm==1){
  this.aciklama.innerHTML=urun.urun_ad+" "+urun.aciklama;
  this.aciklama.classList.remove("d-none");
  this.drm=0;
}
  this.panel.classList.remove("d-none");
  this.blocker.classList.remove('d-none');
 document.body.style.overflow="hidden";   
 }

satinal(urun : Product_Stock1,event :any){
if(event.target.textContent=="Sepete git")
{
  this.router.navigate(['/magaza/sepet']);
}

  this.satal.classList.remove("d-none");
  this.panel.classList.remove("d-none");
  this.blocker.classList.remove('d-none');
 document.body.style.overflow="hidden";

 this.urun_yedek=urun;
this.gercek_stok=urun.iss;
this.adet.value="";
}


  

 


tamamla() {


    if (this.gercek_stok >= this.adet.value) {
      
 const urunid =parseInt( this.urun_yedek.urun_ID); // Siparişin ürün ID'si
  const adet = parseInt( this.adet.value); // Sipariş adeti
  this.service.insertSiparis(urunid, adet).subscribe(
    () => {
     // console.log('Sipariş eklendi.');
    },
    (error) => {
      console.error('Sipariş ekleme hatası:', error);
    }
  );
      this.urun_yedek.stok = this.adet.value;
      this.urun_yedek.drm=5;
     // localStorage.setItem(this.urun_yedek.id, JSON.stringify(this.urun_yedek));
      this.urun_yedek.stok = this.gercek_stok;
    } else {
      alert("Stokdaki üründen fazla ürün talep edemezsiniz!");
      return;
    }
  
    this.urun_yedek = null;
    this.kapt();
   
  }


alphabetA(){
   this.veri1.sort(function(a, b) {
    return a.urun_ad.localeCompare(b.urun_ad);
  });
}
alphabetZ(){
this.veri1.sort(function(a, b) {
    return b.urun_ad.localeCompare(a.urun_ad);
  });
}


kapt(){
  this.panel.classList.add('d-none');
     this.blocker.classList.add('d-none');
     this.aciklama.classList.add("d-none");
     this.satal.classList.add("d-none");
     document.body.style.overflow="auto"; 
 }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product_Stock1 } from 'src/app/models/Product';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-kayit',
  templateUrl: './kayit.component.html',
  styleUrls: ['./kayit.component.css']
})
export class KayitComponent  implements OnInit {
  urunID:any;
  urunadet:any;
  lisance:any='0';
  adet1: number | undefined;
  blocker !: Element ;
  panel !:Element;
  aciklama !:Element;
  confirm !:any;
  adet !:any;
  drm:number=0;
  satal !:Element;
  urun_yedek:any;
  gercek_stok:any;
  element!:Element;
    veri1: any[] = [];
 veri1copy: any[] = [];
 kategoriler!:any[];
 i:number=1;
  
  
  
  constructor(public router : Router,private service:AuthService) {
  };
    ngOnInit(): void {
  
  //  if (this.service.magazalogin==false) {
      //  //  this.router.navigate(['/hata']);
      //    
      //  }
  // Örnek kullanım
  if (this.service.getMagazalogin()&&(localStorage.getItem('ls')=='3')) {
    // magazalogin true ise
  } else {
    // magazalogin false ise
    this.router.navigate(['/hata']);
  }
  
  

  this.service.getkategori().subscribe(
    (data) => {
      this.kategoriler = data;
      console.log(this.kategoriler);
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
      /*const sk = localStorage.getItem('sk');
      const ls = localStorage.getItem('ls');
      this.lisance=ls;
      if (ls!='4') {
        this.router.navigate(['/hata']);
       
      } else {
       
      }
  */
  
  this.alphabetA();
  const sk = localStorage.getItem('sk');
  const ls = localStorage.getItem('ls');
  const mk = localStorage.getItem('mk');
  this.lisance=ls;

  
  
  this.service.getveri().subscribe(
    (data) => {
      this.veri1 = data;
     
      console.log(this.veri1);
 this.veri1copy = this.veri1;

      // İstediğiniz işlemleri burada gerçekleştirin
    },
    (error) => {
      console.error(error);
      // Hata işlemlerini burada gerçekleştirin
    }
  );
  
  
  
  const sepet= localStorage.getItem('sepet');
  const siparis= localStorage.getItem('siparis');
  }
  
  kalkan(){
    if (this.i==1) {
      this.veri1copy=this.veri1.filter((item)=>item.kategori_ID!=-1);
      this.i=0;
    }else if(this.i==0){
      this.veri1copy=this.veri1;
      this.i=1
    }
 
  }
  
  
  
  
  
  
  
   
  
  
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
  /*
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
  */
 adetekle(urun:any,adet:number){
 this.satal.classList.remove("d-none");
    this.panel.classList.remove("d-none");
    this.blocker.classList.remove('d-none');
   document.body.style.overflow="hidden";
   this.urunID =parseInt(urun.urun_ID); 
   this.urunadet =parseInt(urun.urun_adet); 
 }
  
    
  
 ara(event:any){
  this.veri1copy = this.veri1.filter(item => item.urun_ad.includes(event.target.value));
};

 
  
  
  tamamla(adet:any) {
  
    this.adet1 =parseInt(adet); 
    this.adet1=(this.urunadet+this.adet1);
        
    console.log(this.urunID,adet);
    if (adet.value>0)
    this.service.adetekle(this.urunID, this.adet1!).subscribe(
      () => {
        console.log('urun adeti eklendi.');
        this.adet.value="";
location.reload();
        

      },
      (error) => {
        console.error('urun adeti ekleme hatası:', error);
      }
    );
       
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
       this.adet.value="";
   }
  }
  
  /*
      for(var c=1;c<=localStorage.length;c++){
            let myStoredObject = JSON.parse(localStorage.getItem(+c+".urun")!);
            if(myStoredObject.stok!=this.urun_yedek.stok && myStoredObject.id==this.urun_yedek.id && myStoredObject.firma==this.urun_yedek.firma){
              myStoredObject.stok=this.urun_yedek.stok
              localStorage.setItem(+c+".urun",JSON.stringify(myStoredObject));
              alert("ürün adeti güncellendi");
            }
          }
  */ 
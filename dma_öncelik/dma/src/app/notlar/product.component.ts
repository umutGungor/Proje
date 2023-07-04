/*
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { elements } from 'chart.js';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../../../custom_sources/main.css']
})
export class ProductComponent implements OnInit {
  lisance:any;
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
pro_form!:Element;
kat_form!:Element;
mark_form!:Element;
productForm: FormGroup;
categoryForm:FormGroup;
markForm:FormGroup;
  veri1: any[] = [];
  
  constructor(public router:Router,private service:AuthService,private renderer: Renderer2){
    this.productForm = new FormGroup({
      productName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      category: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      aciklama: new FormControl('', Validators.required),
      cost: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      maliyet: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      sale: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      urunid: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    });
    this.categoryForm = new FormGroup({
      katName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    });
    this.markForm = new FormGroup({
      markName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    });
  };

  ngOnInit(): void {
      
    this.satal=document.querySelector('#satal')!;
    this.blocker=document.querySelector('#blocker')!;
    this.panel=document.querySelector('#panel')!;
    this.aciklama=document.querySelector('#aciklama')!;
    this.adet=document.querySelector('#adet')!;
    this.confirm=document.querySelector('#confirm')!;

    this.pro_form=document.getElementById("pro-add")!;
    this.kat_form=document.getElementById("kat-add")!;
    this.mark_form=document.getElementById("mark-add")!;
    this.blocker=document.getElementById("blocker")!;
    /*const sk = localStorage.getItem('sk');
    const ls = localStorage.getItem('ls');
    this.lisance=ls;
    if (ls!='4') {
      this.router.navigate(['/hata']);
     
    } else {
     
    }


this.alphabetA();
const sk = localStorage.getItem('sk');
const ls = localStorage.getItem('ls');
const mk = localStorage.getItem('mk');
this.lisance=ls; 
    if (ls!='2') {
      this.router.navigate(['/hata']);
     
    } else {
     
    }
    this.service.getveri().subscribe(
      (data) => {
        this.veri1 = data;
        console.log(this.veri1);
        // İstediğiniz işlemleri burada gerçekleştirin
      },
      (error) => {
        console.error(error);
        // Hata işlemlerini burada gerçekleştirin
      }
    );
    
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
    
    satinal(event :any){
    //if(event.target.textContent=="Sepete git")
    //{
    //  this.router.navigate(['/magaza/sepet']);
   // }
    
    //  this.satal.classList.remove("d-none");
    //  this.panel.classList.remove("d-none");
     // this.blocker.classList.remove('d-none');
    // document.body.style.overflow="hidden";
    
    // this.insertyeniurun();


    }
    insertyeniurun(){

      
        const urunid =parseInt( this.productForm.get('urunid')!.value);
         const kategoriid =parseInt(this.productForm.get('category')!.value);
        const  markaid= parseInt(this.productForm.get('brand')!.value);
        const satisfiyat=parseInt( this.productForm.get('sale')!.value);
        const  alisfiyat=parseInt( this.productForm.get('cost')!.value);
        const  urunad=this.productForm.get('productName')!.value;;
        const  aciklama=this.productForm.get('aciklama')!.value;;
      
        console.log( this.productForm.get('urunid')!.value);
        console.log(this.productForm.get('category')!.value);
        console.log(this.productForm.get('brand')!.value);
        console.log( this.productForm.get('sale')!.value);
        console.log( this.productForm.get('cost')!.value);
        console.log(this.productForm.get('productName')!.value);
        console.log(this.productForm.get('aciklama')!.value);
       
         console.log(urunid);
         this.service.insertyeniurun(urunid,kategoriid, markaid
          , satisfiyat, alisfiyat, urunad,aciklama).subscribe(
           () => {

             console.log('Sipariş eklendi.');
             location.reload();
           },
           (error) => {
             console.error('Sipariş ekleme hatası:', error);
           }
         );
    
  }
  insertmarka(){
    const  markaad= this.markForm.get('markName')!.value;
    this.service.insertmarka(markaad).subscribe(
      () => {
        console.log('marka eklendi.');
      },
      (error) => {
        console.error('marka ekleme hatası:', error);
      }
    );

  }
  insertkategori(){
    const  kategori= this.markForm.get('markName')!.value;
    

  }
    ////////////////////

    
      
    ///////////////////

    pro_ac(){
      this.pro_form.classList.remove("d-none");
      this.blocker.classList.remove("d-none");
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    }
    
    pro_kapat(){
      this.pro_form.classList.add("d-none");
      this.blocker.classList.add("d-none");
      this.renderer.setStyle(document.body, 'overflow', 'auto');
    }
    
    
    pro_ekle() {
      const productName = this.productForm.get('productName')!.value;
      const category = this.productForm.get('category')!.value;
      const brand = this.productForm.get('brand')!.value;
      const cost = this.productForm.get('cost')!.value;
      const sale = this.productForm.get('sale')!.value;
    
    
    }
    
    
    
    
    
    kat_ac(){
      this.kat_form.classList.remove("d-none");
      this.blocker.classList.remove("d-none");
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    }
    
    
    
    kat_kapat(){
      this.kat_form.classList.add("d-none");
      this.blocker.classList.add("d-none");
      this.renderer.setStyle(document.body, 'overflow', 'auto');
      this.categoryForm.get('katName')!.reset();
    }
    
    kat_ekle(){
      const kat = this.categoryForm.get('katName')!.value;
      this.service.insertkategori(kat).subscribe(
        () => {
          console.log('kategori eklendi.');
        },
        (error) => {
          console.error('kategori ekleme hatası:', error);
        }
      );
    }
    
    mark_ac(){
      this.mark_form.classList.remove("d-none");
      this.blocker.classList.remove("d-none");
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    }
    
    mark_kapat(){
      this.mark_form.classList.add("d-none");
      this.blocker.classList.add("d-none");
      this.renderer.setStyle(document.body, 'overflow', 'auto');
      this.categoryForm.get('markName')!.reset();
    }
    
    mark_ekle(){
      const mark = this.productForm.get('markName')!.value;
    }
    
    ///////////////////
     
    
    
    tamamla() {
    
    
        if (this.gercek_stok >= this.adet.value) {
          
     const urunid =parseInt( this.urun_yedek.urun_ID); // Siparişin ürün ID'si
      const adet = parseInt( this.adet.value); // Sipariş adeti
      console.log(urunid,adet);
      this.service.insertSiparis(urunid, adet).subscribe(
        () => {
          console.log('Sipariş eklendi.');
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
        return a.ad.localeCompare(b.ad);
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

*/
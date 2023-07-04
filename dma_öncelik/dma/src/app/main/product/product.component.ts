import { Component,OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Product_Stock1 } from 'src/app/models/Product';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../../../custom_sources/main.css']
})
export class ProductComponent implements OnInit {

lisance:any;
  pro_form!:Element;
kat_form!:Element;
mark_form!:Element;
blocker!:Element;
productForm: FormGroup;
categoryForm:FormGroup;
markForm:FormGroup;
veri1:any[]=[];
veri1copy:any[]=[];
markalar:any[]=[];
kategoriler:any[]=[];
ac_ekran!:Element;
aciklama!:Element;
drm=0;
urun:any;
constructor(public router:Router,private service:AuthService,private renderer: Renderer2){

  this.productForm = new FormGroup({
    productName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    category: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    cost: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    sale: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    exp: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
  });
  this.categoryForm = new FormGroup({
    katName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
  });
  this.markForm = new FormGroup({
    markName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
  });
}
ngOnInit(){
  this.service.getveri().subscribe(
    (data) => {
      this.veri1 = data;
      console.log(this.veri1);
      this.veri1=this.veri1.filter((item)=>item.kategori_ID!=-1);

      this.veri1copy=this.veri1;
      // İstediğiniz işlemleri burada gerçekleştirin
    },
    (error) => {
      console.error(error);
      // Hata işlemlerini burada gerçekleştirin
    }
  );

  this.service.getmarka().subscribe(
    (data) => {
      this.markalar = data;
      console.log(this.markalar);
      // İstediğiniz işlemleri burada gerçekleştirin
    },
    (error) => {
      console.error(error);
      // Hata işlemlerini burada gerçekleştirin
    }
  );

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
this.ac_ekran=document.getElementById("ac_ekran")!;
this.aciklama=document.getElementById("aciklama")!; 
this.pro_form=document.getElementById("pro-add")!;
  this.kat_form=document.getElementById("kat-add")!;
  this.mark_form=document.getElementById("mark-add")!;
  this.blocker=document.getElementById("blocker")!;
  this.alphabetA();
  const sk = localStorage.getItem('sk');
const ls = localStorage.getItem('ls');
const mk = localStorage.getItem('mk');
this.lisance=ls; 
    if (ls!='2') {
      this.router.navigate(['/hata']);
     
    } else {
     
    }
}

updateUrun(urun:any){
  this.pro_ac();
  const urunad=this.productForm.get('productName')!.setValue(urun.urun_ad);
  const urunkat=this.productForm.get('category')!.setValue(urun.kategori_ID); 
  const urunmaliyet=this.productForm.get('cost')!.setValue(urun.maliyet); 
  const urunsat=this.productForm.get('sale')!.setValue(urun.satis); 
  const urunmark=this.productForm.get('brand')!.setValue(urun.marka_ID); 
  const urunac=this.productForm.get('exp')!.setValue(urun.aciklama); 
  this.drm=1;
  this.urun=urun;
}

uptadeTamamla(){
  const urunad=this.productForm.get('productName')!.value;
  const urunkat=parseInt(this.productForm.get('category')!.value);
  const urunmaliyet=parseInt(this.productForm.get('cost')!.value);
  const urunsat=parseInt(this.productForm.get('sale')!.value);
  const urunmark=parseInt(this.productForm.get('brand')!.value);
  const urunac=this.productForm.get('exp')!.value;
  
  if(this.urun.urun_ad!=urunad || this.urun.kategori_ID!=urunkat || this.urun.marka_ID!=urunmark  
    ||this.urun.maliyet!=urunmaliyet || this.urun.satis!=urunsat || this.urun.aciklama!=urunac){
      if(urunmaliyet<urunsat){
        this.service.urunupdate(this.urun.urun_ID,urunkat,urunmark,urunsat,urunmaliyet,urunad,urunac).subscribe(
          () => {
            console.log('sepet onayı eklendi.');
            location.reload();
          },
          (error) => {
            console.error('sepet onayı ekleme hatası:', error);
          }
        );
     location.reload();
      }
      else
      alert("Ürün maliyeti, ürün satış fiyatından fazla olamaz!");
    }
    else{
      alert("Aynı değerler girmeyiniz!")
    }
  
}

  
deleteUrun(urun:any){
  var sil = confirm(`${urun.urun_ad} ürününü silmek istediğinize emin misiniz?`);

if (sil) {
  this.service.urunsil(parseInt(urun)).subscribe(
    () => {
      console.log('sepet onayı eklendi.');
      location.reload();
    },
    (error) => {
      console.error('sepet onayı ekleme hatası:', error);
    }
  );
 // location.reload();
} else {
 
}
}

ara(event:any){
  this.veri1copy = this.veri1.filter(item => item.urun_ad.includes(event.target.value));
};
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


insertyeniurun(){
const urunad=this.productForm.get('productName')!.value;
const kategoriid=parseInt(this.productForm.get('category')!.value); 
const markaid=parseInt(this.productForm.get('brand')!.value); 
const aciklama=this.productForm.get('exp')!.value; 
const alisfiyat=parseInt(this.productForm.get('cost')!.value);
const satisfiyat=parseInt(this.productForm.get('sale')!.value);
const urunvar_mı = this.veri1.filter((urun)=> urun.urun_ad==urunad && urun.kategori_ID==kategoriid && markaid==urun.marka_ID && aciklama==urun.aciklama );
if(urunvar_mı.length>0){
alert("Aynı üründen var!");
}
else{
  const urunid = this.veri1.sort((a, b) => b.urun_ID - a.urun_ID)[0].urun_ID+1;
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
this.pro_kapat();
location.reload();
}
}

insertyenikategori(){
const katad=this.categoryForm.get('katName')!.value;
const katvar_mı = this.veri1.filter((urun)=> urun.kategori_AD==katad);
if(katvar_mı.length>0){
  alert("Aynı kategoriden var!");
}
else{
 
  this.service.insertkategori(katad).subscribe(
    () => {
      console.log('kategori eklendi.');
    },
    (error) => {
      console.error('kategori ekleme hatası:', error);
    }
  );
this.kat_kapat();
location.reload();
}
}

insertyenimarka(){
  const markad=this.markForm.get('markName')!.value;
  const markvar_mı = this.veri1.filter((urun)=> urun.marka_AD==markad);
  if(markvar_mı.length>0){
    alert("Aynı markadan var!");
  }
  else{
 
    this.service.insertmarka(markad).subscribe(
      () => {
        console.log('marka eklendi.');
      },
      (error) => {
        console.error('marka ekleme hatası:', error);
      }
    );
   this.mark_kapat();
   location.reload();
  }
}

pro_ac(){
  this.pro_form.classList.remove("d-none");
  this.blocker.classList.remove("d-none");
  this.renderer.setStyle(document.body, 'overflow', 'hidden');
  this.productForm.reset();
  this.drm=0;
}

pro_kapat(){
  this.pro_form.classList.add("d-none");
  this.blocker.classList.add("d-none");
  this.renderer.setStyle(document.body, 'overflow', 'auto');
  this.productForm.reset();
}


kat_ac(){
  this.kat_form.classList.remove("d-none");
  this.blocker.classList.remove("d-none");
  this.renderer.setStyle(document.body, 'overflow', 'hidden');
  this.categoryForm.reset();
}

kat_kapat(){
  this.kat_form.classList.add("d-none");
  this.blocker.classList.add("d-none");
  this.renderer.setStyle(document.body, 'overflow', 'auto');
  this.categoryForm.get('katName')!.reset();
}

mark_ac(){
  this.mark_form.classList.remove("d-none");
  this.blocker.classList.remove("d-none");
  this.renderer.setStyle(document.body, 'overflow', 'hidden');
  this.markForm.reset();
}

mark_kapat(){
  this.mark_form.classList.add("d-none");
  this.blocker.classList.add("d-none");
  this.renderer.setStyle(document.body, 'overflow', 'auto');
  this.markForm.get('markName')!.reset();
}

acikla(acik:any){
  this.ac_ekran.classList.remove("d-none");
  this.blocker.classList.remove("d-none");
  this.renderer.setStyle(document.body, 'overflow', 'hidden');
  this.aciklama.innerHTML=acik.toString();
}

aciklama_kapat(){
  this.ac_ekran.classList.add("d-none");
  this.blocker.classList.add("d-none");
  this.renderer.setStyle(document.body, 'overflow', 'auto');
}

}

//////////////////////////////////////

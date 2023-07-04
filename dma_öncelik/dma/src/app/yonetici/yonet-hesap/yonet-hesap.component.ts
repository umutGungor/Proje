import { Component, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-yonet-hesap',
  templateUrl: './yonet-hesap.component.html',
  styleUrls: ['./yonet-hesap.component.css']
})
export class YonetHesapComponent {
  personels: any[] = [];
  roller: any[] = [];
  rol_ad = "";
  eski_email:any;
  personelForm: FormGroup;
  drm = 0;
  pro_form!: Element;
  blocker!: Element;
  personel: any;
  girislerCopy: any[]=[];
  girisler: any[]=[];
  constructor(public router: Router, private renderer: Renderer2, public service: AuthService) {
    this.personelForm = new FormGroup({
      personel_email: new FormControl('', [Validators.required, Validators.pattern('^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$')]),
      personel_sifre: new FormControl('',[Validators.required, Validators.minLength(6)]),
      personel_rol: new FormControl('', Validators.required),
      personel_isim: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-ZğüşöçİĞÜŞÖÇ ]+$')])
    });
  }
  personelsay: any;
  ngOnInit() {
    this.service.getdakika().subscribe(
      (data) => {
        this.girisler = data;
        this.girisler=this.girisler.filter((item)=>item.ls!=4);
        this.girislerCopy = this.girisler;
        // İstediğiniz işlemleri burada gerçekleştirin
      },
      (error) => {
        console.error(error);
        // Hata işlemlerini burada gerçekleştirin
      }
    );

    if ((localStorage.getItem('ls')=='1')) {
      // magazalogin true ise
    } else {
      // magazalogin false ise
      this.router.navigate(['/hata']);
    }
    console.log(localStorage.getItem('id'));
    this.service.getuser(parseInt(localStorage.getItem('mk1')!)).subscribe(
      (data) => {
        this.personels = data;
        this.personels=this.personels.filter((item)=>item.ls!=4);
        this.personelsay = this.personels.length;
        console.log(this.personels);
 // İstediğiniz işlemleri burada gerçekleştirin
      },
      (error) => {
        console.error(error);
        // Hata işlemlerini burada gerçekleştirin
      }
    );
    this.service.getlisance().subscribe(
      (data) => {
        this.roller = data;
        console.log(this.roller);
 // İstediğiniz işlemleri burada gerçekleştirin
      },
      (error) => {
        console.error(error);
        // Hata işlemlerini burada gerçekleştirin
      }
    );
   
    this.pro_form = document.getElementById("pro-add")!;
    this.blocker = document.getElementById("blocker")!;



    
  }
  
  


  duzenle(personel: any) {
    this.pan_ac();
    const personelemail = this.personelForm.get('personel_email')!.setValue(personel.email);
    const personelsifre = this.personelForm.get('personel_sifre')!.setValue(personel.pass);
    const personelrol = this.personelForm.get('personel_rol')!.setValue(personel.ls);
    const personelisim = this.personelForm.get('personel_isim')!.setValue(personel.firstLast);
    this.drm = 1;
    this.eski_email=this.personelForm.get('personel_email')!.value;
    if (this.personelForm.get('personel_rol')!.value == 1) {
      alert("Şifre yada E-mailiniz değiştirirseniz değişiklikten sonra çıkış yapacaktır!");
      document.querySelector('#pro-kat')!.classList.add('d-none');
    } else {
      document.querySelector('#pro-kat')!.classList.remove('d-none');
    }
    this.personel = personel;
  }
  sil(personel: any) {
    var sil = confirm(`${personel.firstLast} adlı personeli silmek istediğinize emin misiniz? \n \n Eğer Silerseniz: \n 1.Personellerden personel kaldırılacak.`);

    if (sil) {
      //silme api fonksiyonu
      console.log(personel.id);

      this.service.usersil( parseInt(personel.id)).subscribe(
        (error) => {
          console.error(error);
          // Hata işlemlerini burada gerçekleştirin
        }
      );
      location.reload();
    } else {

    }
  }
  hesap(per:any){
    this.girislerCopy=this.girisler.filter((item)=>item.id==per.id);
    }
    
    hepsi(){
      this.girislerCopy=this.girisler.filter((item)=>item);
    }
  uptadeTamamla() {
    const personelemail = this.personelForm.get('personel_email')!.value;
    const personelsifre = this.personelForm.get('personel_sifre')!.value;
    const personelrol = this.personelForm.get('personel_rol')!.value;
    const personelisim = this.personelForm.get('personel_isim')!.value;

    if (this.personel.email != personelemail || this.personel.pass != personelsifre || this.personel.ls != personelrol
      || this.personel.firstLast != personelisim) {
        this.service.updateuser(personelisim,personelemail,parseInt(personelrol),this.eski_email,personelsifre,parseInt(localStorage.getItem('mk1')!)).subscribe(
          () => {
            console.log('hesap onayı eklendi.');
            location.reload();
          },
          (error) => {
            console.log(personelisim,personelemail,parseInt(personelrol),personelemail,personelsifre,parseInt(localStorage.getItem('mk1')!));
            console.error('hesap onayı ekleme hatası:', error);
          }
        );


      if (personelrol.value == 1)
        if (this.personel.email != personelemail || this.personel.pass != personelsifre) {
         this.service.logout();
        }

        else {
          location.reload();
        }

    }
    else {
      alert("Aynı değerler girmeyiniz!")
    }

  }

  insertyenipersonel() {
    const personelemail = this.personelForm.get('personel_email')!.value;
    const personelsifre = this.personelForm.get('personel_sifre')!.value;
    const personelrol = this.personelForm.get('personel_rol')!.value;
    const personelisim = this.personelForm.get('personel_isim')!.value;

    const personelvar_mi = this.personels.filter((per) => per.email == personelemail && per.pass == personelsifre && per.firstLast == personelisim && per.ls == personelrol);
    if (personelvar_mi.length > 0) {
      alert("Personel var!");
    }
    else {
      //  firstlast:string,email1:string,ls1:number, pass1:string, sirket_id: number
      this.service.insertyeniuye(personelisim,personelemail,parseInt(personelrol),personelsifre,parseInt(localStorage.getItem('mk1')!)).subscribe(
        () => {
          console.log('sepet onayı eklendi.');
          console.log(personelisim,personelemail,parseInt(personelrol),personelsifre,parseInt(localStorage.getItem('mk1')!));
         location.reload();
        },
        (error) => {
          console.error('sepet onayı ekleme hatası:', error);
          console.log(personelisim,personelemail,parseInt(personelrol),personelsifre,parseInt(localStorage.getItem('mk1')!));

        }
      );
      //api fonksiyon üstteki değerlerden çek
      this.pan_kapat();
     // location.reload();
    }
  }


  pan_ac() {
    document.querySelector('#pro-kat')!.classList.remove('d-none');
    this.pro_form.classList.remove("d-none");
    this.blocker.classList.remove("d-none");
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    this.personelForm.reset();
    this.drm = 0;
  }

  pan_kapat() {
    this.pro_form.classList.add("d-none");
    this.blocker.classList.add("d-none");
    this.renderer.setStyle(document.body, 'overflow', 'auto');
    this.personelForm.reset();
  }

}

import { Component, OnInit,ElementRef, Renderer2, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import{Product_Stock1} from 'src/app/models/Product'
import{Product_Depo} from 'src/app/models/Products_Depo'

@Component({
selector:"navbar",
templateUrl: "./navbar.component.html",
styleUrls: ["../../custom_sources/main.css"]
})
export class NavbarComponent implements OnInit {
  message: string = ' asd';
  mesaj:string="";
  sayac:number=0;
 private blocker   !: Element;
 private loginn    !: Element; 
 private cross     !: Element;     
 private log_div   !: Element;  
 private log_button!: Element;
 private gir_btn   !: Element;   
 private kayit_btn !: Element;
 private kayit_tık !: Element;
 private log_btn   !: Element;
 private username  !: any;
private giris :any;
 private reg !:Element;
 private log_divi !:Element;
 logCnt="";
 main=false;
 private sayac2:any;

 constructor(private loginAuth: AuthService,public router: Router,private elementRef: ElementRef, private renderer: Renderer2) {

 }

  ngOnInit() {
  
   if (localStorage.getItem("sayac2")=='1') {
    this.startIdleTimer = this.startIdleTimer.bind(this);
    this.resetIdleTime = this.resetIdleTime.bind(this);
    this.checkIdleTime = this.checkIdleTime.bind(this);
    this.giris=new Date(localStorage.getItem('giris')!)
    this.startIdleTimer();
   }

    this.gir_btn = document.getElementById('actLOG')!;
    this.log_button =document.querySelector('#logButton')!;
    this.log_div =document.querySelector('#log')!;
    this.log_divi =document.querySelector('#logi')!;
    this.cross = document.querySelector('#cross')!;
    this.blocker = document.querySelector('#blocker')!;   
    this.loginn = document.querySelector('#login')!;
    this.kayit_btn = document.querySelector('#actREG')!;
    this.kayit_tık = document.querySelector('#kayit_tik')!;
    this.log_btn = document.querySelector('#loginCont')!;
    this.username = document.querySelector('#username')!;
    this.reg=document.querySelector('#reg')!;
 
  
   setTimeout(() => {
    if (localStorage.getItem("cikis")=='1') {
      localStorage.setItem("cikis",'0');
      alert('60 dakika boyunca etkileşimde bulunmadınız. Bu yüzden otomatik çıkış yapılmıştır.');

      
    }
   }, 311);
   

    }    

   /*
    @HostListener('window:beforeunload', ['$event'])
    confirmExit(event: BeforeUnloadEvent) {
      if(this.router.url!==""){
        event.preventDefault();
        event.returnValue = 'Emin misiniz?';
      }
     this.logout();
    }*/



    

  
    async loginSubmited() {
      try {
        const res = await this.loginAuth.loginruser([this.email.value, this.pass.value]).toPromise();
        
        if (res === 'Failure') {
          alert('Login Unsuccessful');
        } else {
          
          this.sayac2=1;
          localStorage.setItem("sayac2",this.sayac2);
         // this.loginAuth.magazalogin=true;
         // Örnek kullanım
         localStorage.setItem('email',this.email.value);
this.loginAuth.setMagazalogin(true);
localStorage.setItem('giris',new Date().toString());
         const data = JSON.parse(res!);
          const veri = data.veri;
          const sepet = data.sepet;
          const siparis = data.siparis;
          const mk = data.mk;
          localStorage.setItem('mk1',data.mk);
          localStorage.setItem('id',data.id);
          this.loginAuth.updateAPIUrl(data.sk);
          this.loginAuth.siparis1 = siparis;
    
          if (data.ls === '4') {
            localStorage.setItem('ls',data.ls);
            this.router.navigate(['/magaza']);
          } else if (data.ls === '3') {
            localStorage.setItem('ls',data.ls);
            this.router.navigate(['/depo']);
          } else if (data.ls === '2') {
            localStorage.setItem('ls',data.ls);
            this.router.navigate(['/islemci']);
          } else if (data.ls === '1') {
            localStorage.setItem('ls',data.ls);
            this.router.navigate(['/main']);
          }
    
          this.kapat();
          this.storeDataInLocalStorage(veri, sepet, siparis, mk);
         
        }
      } catch (error) {
        console.error('An error occurred during login:', error);
      }
    }
    idleTime = 0;
idleTimeout = 50 * 60 * 1000; // 50 dakika (dakika * saniye * milisaniye)
logoutTimeout = 60 * 60 * 1000; // 1 saat (dakika * saniye * milisaniye)
idleInterval:any;
  
 startIdleTimer() {
    this.idleInterval = setInterval(this.checkIdleTime, 60000); // Her dakikada bir zamanlayıcıyı kontrol et
    this.resetIdleTime();
    console.log("çalıştı")
    document.addEventListener('mousemove', this.resetIdleTime); // Fare hareket ettirildiğinde zamanlayıcıyı sıfırla
    document.addEventListener('keypress', this.resetIdleTime); // Tuşa basıldığında zamanlayıcıyı sıfırla
  }
  
 resetIdleTime() {
    this.idleTime = 0;
  }
  
 checkIdleTime() {
    this.idleTime += 60000; // Her seferinde 1 dakika (dakika * saniye * milisaniye)
   console.log(this.idleTime);
    if (this.idleTime === this.idleTimeout) {
      // Kullanıcıya uyarı mesajı ver
    } else if (this.idleTime === this.logoutTimeout) {
      // Kullanıcının oturumunu sonlandır
    let dakika=(((new Date().getHours()*60)+(new Date().getMinutes()))-60)-((this.giris.getHours()*60)+(this.giris.getMinutes()));
    this.loginAuth.dakikaekle(dakika+60).subscribe(
      () => {
        console.log('Dakika güncellendi.');
      },
      (error) => {
        console.error('Dakika güncelleme hatası:', error);
      }
    );
    console.log(dakika);
    this.logoutUser();
      this.logout2();
     localStorage.setItem("cikis",'1');

    }
  }
  
 logoutUser() {
    clearInterval(this.idleInterval); 
    // Zamanlayıcıyı temizle
  }
  
    storeDataInLocalStorage(veri: any, sepet: any, siparis: any, mk: any) {
      localStorage.setItem('veri', JSON.stringify(veri));
      localStorage.setItem('sepet', JSON.stringify(sepet));
      localStorage.setItem('siparis', JSON.stringify(siparis));
      localStorage.setItem('mk', JSON.stringify(mk));
      console.log(localStorage.getItem('mk'));
    }
    






  
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    pass: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
  });
  logout() {
    this.sayac2=0;
    let dakika=(((new Date().getHours()*60)+(new Date().getMinutes())))-((this.giris.getHours()*60)+(this.giris.getMinutes()));
    this.loginAuth.dakikaekle(dakika).subscribe(
      () => {
        console.log('Dakika güncellendi.');
      },
      (error) => {
        console.error('Dakika güncelleme hatası:', error);
      }
    );
    this.logoutUser();
   // this.loginAuth.magazalogin=false;
this.loginAuth.setMagazalogin(false);

    this.loginAuth.logout();
    this.router.navigate(['/']);
    this.ac();
  }  
  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get pass(): FormControl {
    return this.loginForm.get('pass') as FormControl;
  }

  //accounts = [{username : "abc",password : "123"},{username : "def",password : "456"}];
  
  handleClick(event: Event) {
    event.preventDefault();  
  }
logout2(){
  this.loginAuth.logout();
  this.router.navigate(['/']);
  this.ac();

}




 

 kapat(){
  this.renderer.removeClass(this.blocker!, 'd-block');
  this.renderer.addClass(this.blocker!, 'd-none');
  this.renderer.removeClass(this.loginn!, 'd-block');
  this.renderer.addClass(this.loginn!, 'd-none');
  this.renderer.setStyle(document.body, 'overflow', 'auto');
 }


  ac() {
    this.renderer.removeClass(this.blocker!, 'd-none');
    this.renderer.addClass(this.blocker!, 'd-block');
    this.renderer.removeClass(this.loginn!, 'd-none');
    this.renderer.addClass(this.loginn!, 'd-block');
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  gir(){
    this.renderer.removeClass(this.kayit_btn!, 'act');
    this.renderer.addClass(this.gir_btn!, 'act');
    this.renderer.addClass(this.log_div!, 'op');
  
    this.renderer.removeClass(this.log_divi!,'d-none');
    this.renderer.addClass(this.reg!,'d-none');

    
    this.log_div.addEventListener('animationend',()=>{
        this.log_div.classList.remove("op");
    });
}




kayit(){
  
  this.gir_btn.classList.remove("act");
  this.kayit_btn.classList.add("act");   
  this.log_div.classList.add("op");

  this.renderer.removeClass(this.reg!,'d-none');
  this.renderer.addClass(this.log_divi!,'d-none');

  this.log_div.addEventListener('animationend',()=>{
    this.log_div.classList.remove("op");
  });

}

}
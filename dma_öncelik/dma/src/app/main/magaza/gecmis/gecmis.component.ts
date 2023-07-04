import { Component } from '@angular/core';
//import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-gecmis',
  templateUrl: './gecmis.component.html',
  styleUrls: ['./gecmis.component.css']
})
export class GecmisComponent {

  lisance:any='0';
gecmis:any[]=[];
  constructor(public router : Router, public service : AuthService ) {
  
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
     // const sk = localStorage.getItem('sk');
      const ls = localStorage.getItem('ls');
      this.lisance=ls;
      /*if (ls!='4') {
        this.router.navigate(['/hata']);
       
      } else {
       
      }
  */
      this.service.gecmis().subscribe(
        (data) => {
          this.gecmis = data;
         // console.log(this.gecmis);
          // İstediğiniz işlemleri burada gerçekleştirin
        },
        (error) => {
          console.error(error);
          // Hata işlemlerini burada gerçekleştirin
        }
      );
  }
  }
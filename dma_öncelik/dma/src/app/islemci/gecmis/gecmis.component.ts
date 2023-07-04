import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-gecmis-islemci',
  templateUrl: './gecmis.component.html',
  styleUrls: ['./gecmis.component.css']
})
export class GecmisComponent2  implements OnInit {
  constructor(public router : Router, public service : AuthService ) {};
  
  ngOnInit(): void {
  if (this.service.getMagazalogin()&&(localStorage.getItem('ls')=='2')) {
    // magazalogin true ise
  } else {
    // magazalogin false ise
    this.router.navigate(['/hata']);
  }
}
}

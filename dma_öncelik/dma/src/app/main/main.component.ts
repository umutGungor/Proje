import { Component, ElementRef, LOCALE_ID, Renderer2, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['../../custom_sources/main.css']
})
export class MainComponent implements OnInit {
private list !:Element;
message: string = '';
lisance: any='0';
sayac: number=0;
constructor(public router : Router,private elementRef: ElementRef, private renderer1: Renderer2,  private activatedRoute: ActivatedRoute) {}  

ngOnInit(){
this.list=document.querySelector('#list')!;
//this.refreshDepList();
const sk = localStorage.getItem('sk');
    const ls = localStorage.getItem('ls');
    this.lisance=ls;
}

asd(){

  this.sayac+=1;

  
}
/*
refreshDepList(){
  this.authService.getDepList().subscribe(data=>{
      this.DepartmentList=data;
    });
}*/


}

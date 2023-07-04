import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { MainComponent } from './main/main.component';
import { OptionsComponent } from './main/options/options.component';
import { ProductStockComponent } from './main/product-stock/product-stock.component';
import { ProductComponent } from './main/product/product.component';
import { SellCalendarComponent } from './islemci/sell-calendar/sell-calendar.component';


import { Component, OnInit,ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HataComponent } from './hata/hata.component';
import { MagazaComponent } from './main/magaza/magaza.component';
import { SepetComponent } from "./main/magaza/sepet/sepet.component";
import { GecmisComponent} from "./main/magaza/gecmis/gecmis.component";
import { SiparislerComponent } from "./main/magaza/siparisler/siparisler.component";
import { DepoComponent } from './depo/depo.component';
import { IslemciComponent } from './islemci/islemci/islemci.component';
import { EkleComponent } from './islemci/ekle/ekle.component';
import { GecmisComponent2 } from './islemci/gecmis/gecmis.component';
import { HazirlananComponent } from './islemci/hazirlanan/hazirlanan.component';
import { KayitComponent } from './depo/kayit/kayit.component';
import { YonetRaporComponent } from './yonetici/yonet-rapor/yonet-rapor.component';
import { YoneticiComponent } from './yonetici/yonetici.component';
import { YonetGecmisComponent } from './yonetici/yonet-gecmis/yonet-gecmis.component';
import { YonetHesapComponent } from './yonetici/yonet-hesap/yonet-hesap.component';
export const routes: Routes = [
 
  {path:'',component:ContentComponent},
  {path:'main',component:YoneticiComponent } ,
  {path:'main/raport',component:YonetRaporComponent},
  {path:'main/recently', component:YonetGecmisComponent},
  {path:'main/hesap', component:YonetHesapComponent},
  {path:'islemci',component:IslemciComponent},
  {path:'islemci/ekle',component:EkleComponent},
  {path:'islemci/hazirlanan',component:HazirlananComponent},
  {path:'islemci/gecmis',component:GecmisComponent2},
  {path:'depo/stock',component:ProductStockComponent},
  {path:'hata',component:HataComponent},
  {path:'magaza',component:MagazaComponent},
  {path:'magaza/sepet',component:SepetComponent},
  {path:'magaza/gecmis',component:GecmisComponent},
  {path:'magaza/siparis',component:SiparislerComponent},
  {path:'depo',component:DepoComponent},
  {path:'depo/kayit',component:KayitComponent},
  {path:'**',component:HataComponent}
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

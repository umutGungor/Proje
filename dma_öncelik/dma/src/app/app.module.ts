import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';
import { MainComponent } from './main/main.component';
import { AnalysisGraphicsComponent } from './main/analysis-graphics/analysis-graphics.component';
import { ProductStockComponent } from './main/product-stock/product-stock.component';
import { ProductComponent } from './main/product/product.component';
import { OptionsComponent } from './main/options/options.component';
import { SellCalendarComponent } from './islemci/sell-calendar/sell-calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HataComponent } from './hata/hata.component';
import { routes } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MagazaComponent } from './main/magaza/magaza.component';
import { SepetComponent } from './main/magaza/sepet/sepet.component';
import { SiparislerComponent } from './main/magaza/siparisler/siparisler.component';
import { GecmisComponent } from './main/magaza/gecmis/gecmis.component';
import { DepoComponent } from './depo/depo.component';
import { IslemciComponent } from './islemci/islemci/islemci.component';
import { EkleComponent } from './islemci/ekle/ekle.component';
import { GecmisComponent2 } from './islemci/gecmis/gecmis.component';
import { HazirlananComponent } from './islemci/hazirlanan/hazirlanan.component';
import { KayitComponent } from './depo/kayit/kayit.component';
import { FormsModule } from '@angular/forms';
import { YoneticiComponent } from './yonetici/yonetici.component';
import { YonetRaporComponent } from './yonetici/yonet-rapor/yonet-rapor.component';
import { YonetGecmisComponent } from './yonetici/yonet-gecmis/yonet-gecmis.component';
import { YonetHesapComponent } from './yonetici/yonet-hesap/yonet-hesap.component';
import { RaporComponent } from './notlar2/rapor/rapor.component';
@NgModule({
  declarations: [
    RaporComponent,
    AppComponent,
    NavbarComponent,
    ContentComponent,
    MainComponent,
    AnalysisGraphicsComponent,
    ProductStockComponent,
    ProductComponent,
    HataComponent,
    OptionsComponent,
    SellCalendarComponent,
    MagazaComponent,
    SepetComponent,
    SiparislerComponent,
    GecmisComponent,
    DepoComponent,
    IslemciComponent,
    EkleComponent,
    GecmisComponent2,
    HazirlananComponent,
    KayitComponent,
    YoneticiComponent,
    YonetRaporComponent,
    YonetGecmisComponent,
    YonetHesapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
     ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes) // routes değişkenini forRoot() fonksiyonuna parametre olarak gönderiyoruz
  
    
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  siparis1: any;
  mkbilgisi:any;
 // magazalogin:boolean=false;

  constructor(private http: HttpClient) { }

  readonly  APIUrl="https://localhost:44307/api/";
    APIUrl2="";
    tarih:any[]=[];


    ////////////////////////////////////////////////////////////////get bloğu başlangıç/////////////////////////////////////////
    ////////////////////////////////////////////////////////////////get bloğu başlangıç/////////////////////////////////////////
    getMagazalogin(): boolean {
      const magazalogin = localStorage.getItem('magazalogin');
      console.log(magazalogin);
      return magazalogin === 'true'; // localStorage'de 'true' olarak kaydedilmişse true döndürür
    }
    
    getuser( sirket_id: number): Observable<any> {
      const model = {
         sirket_id: sirket_id
      };
      return this.http.post<any>(this.APIUrl + 'User/getuser', model);
    } 
    
    //get methodunu çağırmak için bir şirket kodu gönertmelisin denmesini tam sağlıyamdım.
    getsatisgunlerbirlesik():Observable<any[]>{
      return this.http.get<any>(this.APIUrl+'User/satisgunlerbirlesik');
    } 
    getsepetgecmis():Observable<any[]>{
      return this.http.get<any>(this.APIUrl+'User/sepetgecmis');
    }
    getlisance():Observable<any[]>{
      return this.http.get<any>(this.APIUrl+'User/getlisance');
    }
    
    tavsiye():Observable<any[]>{
      return this.http.get<any>(this.APIUrl+'User/tavsiye');
    } 
   
    getkategori():Observable<any[]>{
      return this.http.get<any>(this.APIUrl+'User/kategori');
    }
    getmarka():Observable<any[]>{
      return this.http.get<any>(this.APIUrl+'User/marka');
    }

    getveri():Observable<any[]>{
      return this.http.get<any>(this.APIUrl+'User/veri');
    }
    getalis():Observable<any[]>{
      return this.http.get<any>(this.APIUrl+'User/alis');
    }
    getsiparislerim():Observable<any[]>{
      return this.http.get<any>(this.APIUrl+'User/siparislerim');
    }
    hazirlanan():Observable<any[]>{
      return this.http.get<any>(this.APIUrl+'User/hazirlanan');
    }
    gecmis():Observable<any[]>{
      return this.http.get<any>(this.APIUrl+'User/gecmis');
    }
    sepet():Observable<any[]> {
    
      return this.http.get<any>(this.APIUrl + "User/sepet");
    }
    islemcisepet():Observable<any[]> {
    
      return this.http.get<any>(this.APIUrl + "User/islemcisepet");
    }
    getdakika():Observable<any[]> {
    
      return this.http.get<any>(this.APIUrl + "User/getdakika");
    }
    ////////////////////////////////////////////////////////////////get bloğu bitiş/////////////////////////////////////////
    ////////////////////////////////////////////////////////////////get bloğu bitiş/////////////////////////////////////////

    ////////////////////////////////////////////////////////////////insert bloğu başlangıç/////////////////////////////////////////
    ////////////////////////////////////////////////////////////////insert bloğu başlangıç/////////////////////////////////////////
    // // public string firstlast { get; set; }
    // // public string email1 { get; set; }
    // // public string ls1 { get; set; }
    // // public int mk1 { get; set; }
    // // public string pass1 { get; set; }
    // // public int sirket_id { get; set; }

    insertyeniuye(
      firstlast:string,email1:string,ls1:number, pass1:string, sirket_id: number): Observable<any> {
      const model = {
        firstlast:firstlast,email1:email1,ls1:ls1,pass1:pass1, sirket_id: sirket_id
      };
    
      return this.http.post<any>(this.APIUrl+"User/yeniuser", model);
    }
    
    insertyeniurun(urunid: number,kategoriid: number, markaid: number
      , satisfiyat: number, alisfiyat: number, urunad: string,aciklama: string ): Observable<any> {
      const model = {
        urun_id: urunid,
        kategori_id: kategoriid,
        marka_id: markaid, urun_adet: 0
        , satis: satisfiyat, maliyet: alisfiyat, 
        urun_ad: urunad,aciklama: aciklama 
      };
    
      return this.http.post<any>(this.APIUrl+"User/yeniurun", model);
    }
    
    
    insertkategori(kategoriad: string): Observable<any> {
      const model = {
        kategori_ad: kategoriad
      };
    
      return this.http.post<any>(this.APIUrl+"User/insertkategori", model);
    }
    
    
    
    
    insertmarka(markaad: string): Observable<any> {
      const model = {
        marka_ad: markaad
      };
    
      return this.http.post<any>(this.APIUrl+"User/insertmarka", model);
    }
    
    
    
    
    
    insertSiparis(urunid: number, adet: number): Observable<any> {
      const model = {
        urunid: urunid,
        adet: adet
      };
    
      return this.http.post<any>(this.APIUrl+"User/insert", model);
    }
    sepetonay(siparisid: number,siparisadet:number ,islemid:number) {
      if (islemid==1) {
        const body = { siparisid: siparisid ,durumyeni:1 ,adet:siparisadet,mk2:1};
        return this.http.put(this.APIUrl+"User/update", body);
      }else  if (islemid==2) {
        const body = { siparisid: siparisid ,durumyeni:2 ,adet:siparisadet,mk2:1};
        return this.http.put(this.APIUrl+"User/update", body);
      }else  if (islemid==3) {
        const body = { siparisid: siparisid ,durumyeni:3 ,adet:siparisadet,mk2:1};
        return this.http.put(this.APIUrl+"User/update", body);
      }
      else{
        const body = { siparisid: siparisid ,durumyeni:4,adet:siparisadet ,mk2:1};
        return this.http.put(this.APIUrl+"User/update", body);
      }
     
    }
    ////////////////////////////////////////////////////////////////insert bloğu bitiş/////////////////////////////////////////
    ////////////////////////////////////////////////////////////////insert bloğu bitiş/////////////////////////////////////////

    ////////////////////////////////////////////////////////////////update bloğu başlangıç/////////////////////////////////////////
    ////////////////////////////////////////////////////////////////update bloğu başlangıç/////////////////////////////////////////
    
    updateuser(firstlast:string,email1:string,ls1:number, email1eski: string,pass1:string, sirket_id: number): Observable<any>
       {
      const model = {
        firstlast:firstlast,email1:email1,ls1:ls1, email1eski: email1eski,pass1:pass1, sirket_id: sirket_id
      };
    
      return this.http.put<any>(this.APIUrl+"User/updateuser", model);
    }
    
    urunupdate(urunid: number,kategoriid: number, markaid: number
      , satisfiyat: number, alisfiyat: number, urunad: string,aciklama: string ): Observable<any> {
      const model = {
        urun_id: urunid,
        kategori_id: kategoriid,
        marka_id: markaid
        , satis: satisfiyat, maliyet: alisfiyat, 
        urun_ad: urunad,aciklama: aciklama 
      };
    
      return this.http.put<any>(this.APIUrl+"User/updateurunler", model);
    }

    sepetsil(siparisid: number,siparisadet:number) {
      const body = { siparisid: siparisid ,durumyeni:0,adet:siparisadet ,mk2:1};
      return this.http.put(this.APIUrl+"User/update", body);
    }
    basaribitir(siparisid: number,siparisadet:number) {
      const body = { siparisid: siparisid ,durumyeni:3,adet:siparisadet ,mk2:1};
      return this.http.put(this.APIUrl+"User/update", body);
    }
    sepet11() {
      const sk = localStorage.getItem('sk');
      const ls = localStorage.getItem('ls');
      const mk = localStorage.getItem('mk');
      const body = { mk2: this.mkbilgisi };
      console.log(localStorage.getItem('mk'));
    
      return this.http.post(this.APIUrl+"User/sepet", body);
    }
    urunsil(urunid: number): Observable<any> {
      const model = {
        urun_id: urunid,
        
      };
    
      return this.http.put<any>(this.APIUrl+"User/urunsil", model);
    }

    adetekle(urunid: number,urunadet: number): Observable<any> {
      const model = {
        urun_id: urunid,
        urun_adet: urunadet,
       
      };
    
      return this.http.put<any>(this.APIUrl+"User/adetekleurunler", model);
    }
    dakikaekle(dakika: number): Observable<any> {
      const model = {
        id2: localStorage.getItem('id'),
        dakika: dakika
      };
    
      return this.http.put<any>(this.APIUrl+"User/dakikaekle", model);
    }
    
  updateAPIUrl(sk: string) {
   // this.APIUrl2 = `${sk}`;
  }
 
    ////////////////////////////////////////////////////////////////update bloğu bitiş/////////////////////////////////////////
    ////////////////////////////////////////////////////////////////update bloğu bitiş/////////////////////////////////////////
    
    ////////////////////////////////////////////////////////////////delete bloğu başlangıç/////////////////////////////////////////
    usersil(id: number): Observable<any> {
      const model = {
        id1: id,
        
      };
    
      return this.http.put<any>(this.APIUrl+"User/deleteuser", model);
    }
    ////////////////////////////////////////////////////////////////delete bloğu bitiş/////////////////////////////////////////
    
   



  setMagazalogin(value: boolean): void {
    localStorage.setItem('magazalogin', String(value));
  }




loginruser(logininfo:Array<String>){
  return this.http.post(this.APIUrl+"User/LoginUser",{
   email:logininfo[0],
   pass:logininfo[1],},
  {responseType:'text',}
  );
}

logout(): void {
  this.APIUrl2="";
  localStorage.clear();
  localStorage.removeItem('sk');
  localStorage.removeItem('ls');
  localStorage.removeItem('mk');
}






}

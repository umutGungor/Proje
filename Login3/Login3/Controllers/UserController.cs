
using Login3.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Login3.Controllers;

namespace Login3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        public readonly UserContext _context;
        public UserController(IConfiguration config, UserContext context)
        {
            _config = config;
            _context = context;
        }
       
        public class LoginResult
        {
            public string Sk { get; set; }
            public string Ls { get; set; }
            public string Mk { get; set; }
            public string id { get; set; }
            public int id2 { get; set; }
            public List<object> Veri { get; set; }
            public List<object> sepet { get; set; }
            public List<object> siparis { get; set; }
            public int urunid { get; set; }
            public int adet { get; set; }
            public int mk2 { get; set; }
            public int siparisid { get; set; }
            public int durumyeni { get; set; }
            public int dakika { get; set; }
         
            ////////////
            public int urun_id { get; set; }

            public int kategori_id { get; set; }
            public int marka_id { get; set; }
            public int urun_adet { get; set; }
            public int maliyet { get; set; }
            public int satis { get; set; }
            public string urun_ad { get; set; }
            public string aciklama { get; set; }
            /////////////
            public string kategori_ad { get; set; }
            public string marka_ad { get; set; }
            ////////////////////////
            public string firstlast { get; set; }
            public string email1 { get; set; }
            public string email1eski { get; set; }
            public int ls1 { get; set; }
            public int mk1 { get; set; }
            public int id1 { get; set; }
            public string pass1 { get; set; }
            public int sirket_id { get; set; }


        }

      

        ///////////////////////////////////////////////////////////////////////////////////////post alanı başlangıcı////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////post alanı başlangıcı////////////////////////////////////////////////////////////

        [HttpPost("insertkategori")]
        public IActionResult insertkategori([FromBody] LoginResult model)
        {

            string queryinsert = @"insert into [AH_firmasi].[dbo].[kategoriler] values(@kategori_ad)";

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (SqlCommand command = new SqlCommand(queryinsert, con))
            {
                command.Parameters.AddWithValue("@kategori_ad", model.kategori_ad);
                con.Open();
                command.ExecuteNonQuery();
            }
            return Ok();
        }
        [HttpPost("insertmarka")]
        public IActionResult insertmarka([FromBody] LoginResult model)
        {

            string queryinsert = @"insert into [AH_firmasi].[dbo].[markalar] values(@marka_ad)";

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (SqlCommand command = new SqlCommand(queryinsert, con))
            {
                command.Parameters.AddWithValue("@marka_ad", model.marka_ad);
                con.Open();
                command.ExecuteNonQuery();
            }
            return Ok();
        }

        [HttpPost("yeniurun")]
        public IActionResult yeniurun([FromBody] LoginResult model)
        {

            string queryinsert = @"insert into [AH_firmasi].[dbo].[urunler] values (@urun_id,@kategori_id,@marka_id,@urun_ad,@urun_adet,NULL,@maliyet,@satis,@aciklama)";

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (SqlCommand command = new SqlCommand(queryinsert, con))
            {
                command.Parameters.AddWithValue("@urun_id", model.urun_id);
                command.Parameters.AddWithValue("@kategori_id", model.kategori_id);
                command.Parameters.AddWithValue("@marka_id", model.marka_id);
                command.Parameters.AddWithValue("@urun_adet", model.urun_adet);
                command.Parameters.AddWithValue("@satis", model.satis);
                command.Parameters.AddWithValue("@maliyet", model.maliyet);
                command.Parameters.AddWithValue("@urun_ad", model.urun_ad);
                command.Parameters.AddWithValue("@aciklama", model.aciklama);

       


        con.Open();
                command.ExecuteNonQuery();
            }

            return Ok();
        }

        [HttpPost("insert")]
        public IActionResult Insert([FromBody] LoginResult model)
        {

            DateTime datetimenow = DateTime.Now;
            string queryinsert = @"insert into siparisler (urun_ID,durum_id,siparis_tarih,adet,anlik_fiyat,aciklama_id,magaza_id) values (@urunid, 4, @datetimenow, @adet,0, 1,1)";

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (SqlCommand command = new SqlCommand(queryinsert, con))
            {
                command.Parameters.AddWithValue("@urunid", model.urunid);
                command.Parameters.AddWithValue("@datetimenow", datetimenow);
                command.Parameters.AddWithValue("@adet", model.adet);
                

                con.Open();
                command.ExecuteNonQuery();
            }

            return Ok();
        }

        [HttpPost("yeniuser")]
        public IActionResult yeniuser([FromBody] LoginResult model)
        {

            string queryinsert = @"INSERT INTO [dbo].[Users]([firstLast],[email],[sk] ,[ls],[pass],[sirket_ID])
     VALUES(@firstlast,@email,@mk,@ls,@pass,@sirket_id)";

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection")))
            using (SqlCommand command = new SqlCommand(queryinsert, con))
            {
                command.Parameters.AddWithValue("@firstlast", model.firstlast);
                command.Parameters.AddWithValue("@email", model.email1);
                command.Parameters.AddWithValue("@ls", model.ls1);
                command.Parameters.AddWithValue("@mk", model.mk1);
                command.Parameters.AddWithValue("@pass", model.pass1);
                command.Parameters.AddWithValue("@sirket_id", model.sirket_id);


                con.Open();
                command.ExecuteNonQuery();
            }

            return Ok();
        }
        ///////////////////////////////////////////////////////////////////////////////////////post alanı bitişi////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////post alanı bitişi////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////////////////////////////put alanı başlangıcı////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////put alanı başlangıcı////////////////////////////////////////////////////////////
        // 
        [HttpPut("updateuser")]
        public IActionResult updateuser([FromBody] LoginResult model)
        {

            string queryupdate = @" UPDATE[dbo].[Users] SET[firstLast] = @firstlast, [email] = @email, [ls] = @ls, [pass] = @pass, [sirket_ID] = @sirket_id WHERE[email] = @email1eski;";

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection")))
            using (SqlCommand command = new SqlCommand(queryupdate, con))
            {
                command.Parameters.AddWithValue("@firstlast", model.firstlast);
                command.Parameters.AddWithValue("@email", model.email1);
                command.Parameters.AddWithValue("@ls", model.ls1);
                command.Parameters.AddWithValue("@email1eski", model.email1eski);
                command.Parameters.AddWithValue("@pass", model.pass1);
                command.Parameters.AddWithValue("@sirket_id", model.sirket_id);

                con.Open();
                command.ExecuteNonQuery();
            }

            return Ok();
        }
        [HttpPut("giris_tarih")]
        public IActionResult giris_tarih([FromBody] LoginResult model)
        {

            DateTime datetimenow = DateTime.Now;
            string queryupdate = @"UPDATE Users SET giris_tarihi = @durumyeni, adet=@adet  WHERE[email] = @email;";

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection")))
            using (SqlCommand command = new SqlCommand(queryupdate, con))
            {
                command.Parameters.AddWithValue("@durumyeni", model.durumyeni);
                command.Parameters.AddWithValue("@siparisid", model.siparisid);
                command.Parameters.AddWithValue("@adet", model.adet);

                con.Open();
                command.ExecuteNonQuery();
            }

            return Ok();
        }

        [HttpPut("update")]
        public IActionResult update([FromBody] LoginResult model)
        {

            DateTime datetimenow = DateTime.Now;
            string queryupdate = @"UPDATE siparisler SET durum_id = @durumyeni, adet=@adet  WHERE siparis_id =@siparisid;";

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (SqlCommand command = new SqlCommand(queryupdate, con))
            {
                command.Parameters.AddWithValue("@durumyeni", model.durumyeni);
                command.Parameters.AddWithValue("@siparisid", model.siparisid);
                command.Parameters.AddWithValue("@adet", model.adet);

                con.Open();
                command.ExecuteNonQuery();
            }

            return Ok();
        }
        [HttpPut("updatesiparis")]
        public IActionResult updatesiparis([FromBody] LoginResult model)
        {

            DateTime datetimenow = DateTime.Now;
            string queryupdate = @"UPDATE siparisler SET adet=@adet  WHERE siparis_id =@siparisid;";

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (SqlCommand command = new SqlCommand(queryupdate, con))
            {
              
                command.Parameters.AddWithValue("@siparisid", model.siparisid);
                command.Parameters.AddWithValue("@adet", model.adet);
                

                con.Open();
                command.ExecuteNonQuery();
            }

            return Ok();
        }
        [HttpPut("updateurunler")]
        public IActionResult updateurunler([FromBody] LoginResult model)
        {

            DateTime datetimenow = DateTime.Now;
            string queryupdate = @"UPDATE [dbo].[urunler] SET [kategori_ID] = @kategori_id,[marka_ID] = @marka_id,[urun_ad] = @urun_ad,
                    [maliyet] = @maliyet,[satis] = @satis,[aciklama] = @aciklama WHERE urun_ID=@urun_id";

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (SqlCommand command = new SqlCommand(queryupdate, con))
            {

                command.Parameters.AddWithValue("@urun_id", model.urun_id);
                command.Parameters.AddWithValue("@kategori_id", model.kategori_id);
                command.Parameters.AddWithValue("@marka_id", model.marka_id);
                command.Parameters.AddWithValue("@satis", model.satis);
                command.Parameters.AddWithValue("@maliyet", model.maliyet);
                command.Parameters.AddWithValue("@urun_ad", model.urun_ad);
                command.Parameters.AddWithValue("@aciklama", model.aciklama);


                con.Open();
                command.ExecuteNonQuery();
            }

            return Ok();
        }
        [HttpPut("adetekleurunler")]
        public IActionResult adetekleurunler([FromBody] LoginResult model)
        {

            DateTime datetimenow = DateTime.Now;
            string queryupdate = @"UPDATE [dbo].[urunler] SET [urun_adet]=@urun_adet WHERE urun_ID=@urun_id";

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (SqlCommand command = new SqlCommand(queryupdate, con))
            {

                command.Parameters.AddWithValue("@urun_id", model.urun_id);
                command.Parameters.AddWithValue("@urun_adet", model.urun_adet);
              


                con.Open();
                command.ExecuteNonQuery();
            }

            return Ok();
        }
        [HttpPut("urunsil")]
        public IActionResult urunsil([FromBody] LoginResult model)
        {

            DateTime datetimenow = DateTime.Now;
            string queryupdate = @"UPDATE [dbo].[urunler] SET [kategori_ID] = -1 WHERE urun_ID=@urun_id";

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (SqlCommand command = new SqlCommand(queryupdate, con))
            {

                command.Parameters.AddWithValue("@urun_id", model.urun_id);
              


                con.Open();
                command.ExecuteNonQuery();
            }

            return Ok();
        }

        [HttpPut("dakikaekle")]
        public IActionResult dakikaekle([FromBody] LoginResult model)
        {

            DateTime datetimenow = DateTime.Now;
            string queryupdate = @"UPDATE [LoginDB].[dbo].[Users]
                       SET [dakika_1gun] = [dakika_1gun] + @dakika,
                           [dakika_7gun] = [dakika_7gun] + @dakika
                       WHERE [id] = @id";

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection")))
            using (SqlCommand command = new SqlCommand(queryupdate, con))
            {

                command.Parameters.AddWithValue("@id", model.id2);
                command.Parameters.AddWithValue("@dakika", model.dakika);



                con.Open();
                command.ExecuteNonQuery();
            }

            return Ok();
        }
        
        ///////////////////////////////////////////////////////////////////////////////////////put alanı bitişi////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////put alanı bitişi////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////////////////////////////get alanı başlangıcı////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////get alanı başlangıcı////////////////////////////////////////////////////////////
        [HttpPost("getuser")]
        public IActionResult getuser([FromBody] LoginResult model)
        {
            string query = @"SELECT TOP (1000) * FROM [LoginDB].[dbo].[Users]where sirket_ID=@sirket_id";
            List<object> getuser = new List<object>();

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection")))
            using (var cmd = new SqlCommand(query, con))
            {

                cmd.CommandType = CommandType.Text;
                cmd.Parameters.AddWithValue("@sirket_id", model.sirket_id); // model nesnesine doğru şekilde erişim sağladığınızdan emin olun

                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader != null)
                {
                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader.GetValue(i);
                        }
                        getuser.Add(row);
                    }
                }
            }

            return Ok(getuser);
        }
   
        [HttpGet("getlisance")]
        public IActionResult getlisance()
        {
            string query = @"SELECT TOP(10)*FROM[LoginDB].[dbo].[lisanslar]";
            List<object> getlisance = new List<object>();

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (var cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.Text;
                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader != null)
                {
                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader.GetValue(i);
                        }
                        getlisance.Add(row);
                    }
                }
            }

            return Ok(getlisance);
        }
        [HttpGet("getdakika")]
        public IActionResult getdakika()
        {
            string query = @"SELECT *FROM users";
            List<object> getdakika = new List<object>();

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection")))
            using (var cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.Text;
                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader != null)
                {
                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader.GetValue(i);
                        }
                        getdakika.Add(row);
                    }
                }
            }

            return Ok(getdakika);
        }
        [HttpGet("islemcisepet")]
        public IActionResult islemcisepet()
        {
            string query = @"SELECT * FROM [AH_firmasi].[dbo].[istekler] WHERE  durum_id=1";
            List<object> islemcisepetveri = new List<object>();

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (var cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.Text;
                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader != null)
                {
                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader.GetValue(i);
                        }
                        islemcisepetveri.Add(row);
                    }
                }
            }

            return Ok(islemcisepetveri);
        }

        [HttpGet("sepet")]
        public IActionResult sepet()
        {
            string query = @"SELECT * FROM [AH_firmasi].[dbo].[istekler] WHERE sirket_ID=1 AND durum_id=4";
            List<object> sepet = new List<object>();

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (var cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.Text;
                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader != null)
                {
                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader.GetValue(i);
                        }
                        sepet.Add(row);
                    }
                }
            }

            return Ok(sepet);
        }
        [HttpGet("gecmis")]
        public IActionResult gecmis()
        {
            string query = @"SELECT * FROM [AH_firmasi].[dbo].[gecmis_view] order by teslim_tarihi desc";
            List<object> gecmis = new List<object>();

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (var cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.Text;
                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader != null)
                {
                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader.GetValue(i);
                        }
                        gecmis.Add(row);
                    }
                }
            }

            return Ok(gecmis);
        }
        [HttpGet("siparislerim")]
        public IActionResult siparislerim()
        {
            string query = @"SELECT * FROM [AH_firmasi].[dbo].[istekler] WHERE sirket_ID=1 and durum_id<4";
            List<object> siparisler = new List<object>();

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (var cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.Text;
                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader != null)
                {
                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader.GetValue(i);
                        }
                        siparisler.Add(row);
                    }
                }
            }

            return Ok(siparisler);
        }
        [HttpGet("tavsiye")]
        public IActionResult tavsiye()
        {
            string query = @"SELECT * FROM [AH_firmasi].[dbo].tavsiye ";
            List<object> tavsiye = new List<object>();

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (var cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.Text;
                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader != null)
                {
                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader.GetValue(i);
                        }
                        tavsiye.Add(row);
                    }
                }
            }

            return Ok(tavsiye);
        }
        [HttpGet("satisgunlerbirlesik")]
        public IActionResult satisgunlerbirlesik()
        {
            string query = @"SELECT urunler.[urun_ID], [tarih], SUM([adet]) AS toplam_adet, [magaza_id],urun_ad,kategori_ID,marka_ID,urunler.maliyet,urunler.satis
FROM [AH_firmasi].[dbo].[satis] AS satis
INNER JOIN dbo.urunler ON satis.urun_ID = urunler.urun_ID
where kategori_ID!=-1
GROUP BY urunler.[urun_ID], [tarih], [magaza_id],urun_ad,kategori_ID,marka_ID,urunler.maliyet,urunler.satis
order by toplam_adet desc
";
            List<object> satisgunlerbirlesik = new List<object>();

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (var cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.Text;
                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader != null)
                {
                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader.GetValue(i);
                        }
                        satisgunlerbirlesik.Add(row);
                    }
                }
            }

            return Ok(satisgunlerbirlesik);
        }
        [HttpGet("sepetgecmis")]
        public IActionResult sepetgecmis()
        {
            string query = @"SELECT  dbo.sepet.urun_ID, dbo.sepet.siparis_tarih, SUM([adet])as adet, dbo.urunler.kategori_ID, dbo.urunler.marka_ID, dbo.urunler.urun_ad
                FROM  dbo.sepet INNER JOIN
                  dbo.urunler ON dbo.sepet.urun_ID = dbo.urunler.urun_ID
				 where kategori_ID!=-1
                GROUP BY sepet.urun_ID,sepet.siparis_tarih,urunler.kategori_ID,urunler.marka_ID,urunler.urun_ad
                order by adet desc
                ";
            List<object> sepetgecmis = new List<object>();

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (var cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.Text;
                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader != null)
                {
                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader.GetValue(i);
                        }
                        sepetgecmis.Add(row);
                    }
                }
            }

            return Ok(sepetgecmis);
        }

        [HttpGet("hazirlanan")]
        public IActionResult hazirlanan()
        {
            string query = @"SELECT * FROM [AH_firmasi].[dbo].[istekler] WHERE sirket_ID=1 and durum_id=2 or durum_id=2";
            List<object> hazirlanan = new List<object>();

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (var cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.Text;
                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader != null)
                {
                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader.GetValue(i);
                        }
                        hazirlanan.Add(row);
                    }
                }
            }

            return Ok(hazirlanan);
        }

        [HttpGet("veri")]
        public IActionResult GetVeri()
        {
            string query = @"SELECT * FROM [AH_firmasi].[dbo].[AH_firma_urunler]";
            List<object> veri = new List<object>();

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (var cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.Text;
                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader != null)
                {
                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader.GetValue(i);
                        }
                        veri.Add(row);
                    }
                }
            }

            return Ok(veri);
        }




        [HttpGet("kategori")]
        public IActionResult kategori()
        {
            string query = @"SELECT * FROM [AH_firmasi].[dbo].[kategoriler]";
            List<object> kategori = new List<object>();

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (var cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.Text;
                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader != null)
                {
                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader.GetValue(i);
                        }
                        kategori.Add(row);
                    }
                }
            }

            return Ok(kategori);
        }

        [HttpGet("marka")]
        public IActionResult marka()
        {
            string query = @"SELECT * FROM [AH_firmasi].[dbo].[markalar]";
            List<object> marka = new List<object>();

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (var cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.Text;
                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader != null)
                {
                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader.GetValue(i);
                        }
                        marka.Add(row);
                    }
                }
            }

            return Ok(marka);
        }
        [HttpGet("alis")]
        public IActionResult alis()
        {
            string query = @"SELECT * FROM [AH_firmasi].[dbo].[alis]";
            List<object> marka = new List<object>();

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (var cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.Text;
                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader != null)
                {
                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader.GetValue(i);
                        }
                        marka.Add(row);
                    }
                }
            }

            return Ok(marka);
        }


        ///////////////////////////////////////////////////////////////////////////////////////get alanı bitişi////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////get alanı bitişi////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////////////////////////////delete alanı başlangıcı////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////delete alanı başlangıcı////////////////////////////////////////////////////////////
        //DELETE FROM [dbo].[Users] WHERE[email] = 'depo2@gmail.com';

        [HttpPut("deleteuser")]
        public IActionResult deleteuser([FromBody] LoginResult model)
        {

            DateTime datetimenow = DateTime.Now;
            string queryupdate = @"DELETE FROM [dbo].[Users] WHERE[id] =@id;";

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection")))
            using (SqlCommand command = new SqlCommand(queryupdate, con))
            {

                command.Parameters.AddWithValue("@id", model.id1);


                con.Open();
                command.ExecuteNonQuery();
            }

            return Ok();
        }

        [HttpDelete("deletesiparis")]
        public IActionResult deletesiparis([FromBody] LoginResult model)
        {

            DateTime datetimenow = DateTime.Now;
            string queryupdate = @"UPDATE siparisler SET adet=@adet  WHERE siparis_id =@siparisid;";

            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (SqlCommand command = new SqlCommand(queryupdate, con))
            {

                command.Parameters.AddWithValue("@siparisid", model.siparisid);
                command.Parameters.AddWithValue("@adet", model.adet);


                con.Open();
                command.ExecuteNonQuery();
            }

            return Ok();
        }


        ///////////////////////////////////////////////////////////////////////////////////////delete alanı bitişi////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////delete alanı bitişi////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////////////////////////////login alanı başlangıcı////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////login alanı başlangıcı////////////////////////////////////////////////////////////

        [EnableCors("AllowOrigin")]
        [HttpPost("LoginUser")]

        public IActionResult Login(Login user)
        {
            string query = @"SELECT TOP (1) [sk] FROM [LoginDB].[dbo].[Users] WHERE email=@Email";
            string sk = "";
           
            string query3 = @"SELECT TOP (1) [sirket_ID] FROM [LoginDB].[dbo].[Users] WHERE email=@Email";

            string mk = "";
            string query6 = @"SELECT TOP (1) [id] FROM [LoginDB].[dbo].[Users] WHERE email=@Email";

            string id = "";
            string query1 = @"SELECT * FROM [AH_firmasi].[dbo].[AH_firma_urunler]";
            List<object> veri = new List<object>();
            string query2 = @"SELECT TOP (1) [ls] FROM [LoginDB].[dbo].[Users] WHERE email=@Email";
            string ls = "";

            string query4 = @"SELECT *FROM [AH_firmasi].[dbo].[siparisler] where magaza_id=@mk and durum_id=4";//96 satırdaki mk bilgisine göre
            List<object> sepet = new List<object>();

            string query5 = @"SELECT *FROM [AH_firmasi].[dbo].[siparisler] where magaza_id=@mk and durum_id=1";//96 satırdaki mk bilgisine göre
            List<object> siparis = new List<object>();


            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (var cmd = new SqlCommand(query1, con))
            {
                cmd.CommandType = CommandType.Text;
                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader != null)
                {
                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader.GetValue(i);
                        }
                        veri.Add(row);
                    }
                }
            }

           
            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection")))
            {
                con.Open();

                sk = new SqlCommand(query, con)
                {
                    CommandType = CommandType.Text,
                    Parameters = { new SqlParameter("@Email", user.email) }
                }.ExecuteScalar()?.ToString();

                mk = new SqlCommand(query3, con)
                {
                    CommandType = CommandType.Text,
                    Parameters = { new SqlParameter("@Email", user.email) }
                }.ExecuteScalar()?.ToString();

                id = new SqlCommand(query6, con)
                {
                    CommandType = CommandType.Text,
                    Parameters = { new SqlParameter("@Email", user.email) }
                }.ExecuteScalar()?.ToString();

                ls = new SqlCommand(query2, con)
                {
                    CommandType = CommandType.Text,
                    Parameters = { new SqlParameter("@Email", user.email) }
                }.ExecuteScalar()?.ToString();
            }

            if (mk != null)
            {
                using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (var cmd = new SqlCommand(query4, con))
            {
                cmd.CommandType = CommandType.Text;
                cmd.Parameters.AddWithValue("@Mk", mk); // move this line up
                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader != null)
                {
                    while (reader.Read())
                    {
                        var row2 = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row2[reader.GetName(i)] = reader.GetValue(i);
                        }
                        sepet.Add(row2);
                    }
                }
            }
            using (var con = new SqlConnection(_config.GetConnectionString("MyDBConnection2")))
            using (var cmd = new SqlCommand(query5, con))
            {
                cmd.CommandType = CommandType.Text;
                cmd.Parameters.AddWithValue("@Mk", mk); // move this line up
                con.Open();
                var reader = cmd.ExecuteReader();
                if (reader != null)
                {
                    while (reader.Read())
                    {
                        var row2 = new Dictionary<string, object>();
                        for (var i = 0; i < reader.FieldCount; i++)
                        {
                            row2[reader.GetName(i)] = reader.GetValue(i);
                        }
                        siparis.Add(row2);
                    }
                }
            }
            }
            else
            {
                return Ok("Failure");
            }

            var userAvailable = _context.Users.FirstOrDefault(u => u.email == user.email && u.pass == user.pass);
            if (userAvailable != null)
            {
                var loginResult = new LoginResult { Sk = sk, Ls = ls,Veri=veri, Mk=mk ,id=id, sepet=sepet,siparis=siparis}; // set the ls value here
                return Ok(loginResult);
            }
            else
            {
                return Ok("Failure");
            }
        }



    }

}
//https://localhost:44307/
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Login3.Models
{
    public class UserContext:DbContext
    {
        public UserContext(DbContextOptions options) : base(options)
        {

        }
        
       
        
        public DbSet<User> Users { get; set; }
      //  public DbSet<urunler> urunler { get; set; }

    }
}

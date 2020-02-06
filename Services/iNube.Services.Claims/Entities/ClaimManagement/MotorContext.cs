using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.Claims.Entities.ClaimManagement
{
    public class MotorContext : DbContext
    {
        public MotorContext()
        {

        }
        public MotorContext(DbContextOptions<MICACMContext> options)
           : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=inubepeg.database.windows.net;Database=MotorClaims_Dev;User ID=Sa_MotorClaims_Dev;Password=inube@123#;");
                
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }

        }
}

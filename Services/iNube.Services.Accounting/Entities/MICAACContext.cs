using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace iNube.Services.Accounting.Entities
{
    public partial class MICAACContext : DbContext
    {
        public MICAACContext()
        {
        }

        public MICAACContext(DbContextOptions<MICAACContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblAccountType> TblAccountType { get; set; }
        public virtual DbSet<TblCoaaccountMapping> TblCoaaccountMapping { get; set; }
        public virtual DbSet<TblCoaaccounts> TblCoaaccounts { get; set; }
        public virtual DbSet<TblSubLedgerReferences> TblSubLedgerReferences { get; set; }
        public virtual DbSet<TblTransaction> TblTransaction { get; set; }
        public virtual DbSet<TblTransactionConditions> TblTransactionConditions { get; set; }
        public virtual DbSet<TblTransactionHeader> TblTransactionHeader { get; set; }
        public virtual DbSet<TblTransactionRuleMapping> TblTransactionRuleMapping { get; set; }
        public virtual DbSet<TblTransactionSubLedger> TblTransactionSubLedger { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#pragma warning disable CS1030 // #warning directive
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=edelweissdb1.coow0ess1gft.ap-south-1.rds.amazonaws.com;Database=EdelweissTest;User ID=admin;Password=micaadmin;Trusted_Connection=False;");
#pragma warning restore CS1030 // #warning directive
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<TblAccountType>(entity =>
            {
                entity.HasKey(e => e.AccountTypeId);

                entity.ToTable("tblAccountType", "AC");

                entity.Property(e => e.AccountTypeId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AccountType).IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.FromRange).IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ToRange).IsUnicode(false);
            });

            modelBuilder.Entity<TblCoaaccountMapping>(entity =>
            {
                entity.HasKey(e => e.AccountMappingId);

                entity.ToTable("tblCOAAccountMapping", "AC");

                entity.Property(e => e.AccountMappingId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AccountType).IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.MicaAccountCode).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<TblCoaaccounts>(entity =>
            {
                entity.HasKey(e => e.AccountId);

                entity.ToTable("tblCOAAccounts", "AC");

                entity.Property(e => e.AccountId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AccountDesc).IsUnicode(false);

                entity.Property(e => e.AccountName).IsUnicode(false);

                entity.Property(e => e.AccountTypeId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CreatedBy).IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy).IsUnicode(false);

                entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<TblSubLedgerReferences>(entity =>
            {
                entity.HasKey(e => e.SubLedgerReferencesId);

                entity.ToTable("tblSubLedgerReferences", "AC");

                entity.Property(e => e.SubLedgerReferencesId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.LedgerColName).IsUnicode(false);

                entity.Property(e => e.LedgerObject).IsUnicode(false);

                entity.Property(e => e.TableName).IsUnicode(false);

                entity.Property(e => e.TransactionRuleMappingId).HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.TransactionRuleMapping)
                    .WithMany(p => p.TblSubLedgerReferences)
                    .HasForeignKey(d => d.TransactionRuleMappingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblTransactionRuleMappingtblSubLedgerReferences");
            });

            modelBuilder.Entity<TblTransaction>(entity =>
            {
                entity.HasKey(e => e.TransactionId);

                entity.ToTable("tblTransaction", "AC");

                entity.Property(e => e.TransactionId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AccountType).IsUnicode(false);

                entity.Property(e => e.Amount).HasColumnType("decimal(18, 0)");

                entity.Property(e => e.ContractId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Currency)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.Event).IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Object).IsUnicode(false);

                entity.Property(e => e.OrganizationId)
                    .HasColumnName("OrganizationID")
                    .HasColumnType("numeric(18, 0)");

                entity.Property(e => e.PartnerId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ProductId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.RuleName).IsUnicode(false);

                entity.Property(e => e.TransactionHeaderId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TypeOfTransaction).IsUnicode(false);

                entity.Property(e => e.Value).IsUnicode(false);

                entity.HasOne(d => d.TransactionHeader)
                    .WithMany(p => p.TblTransaction)
                    .HasForeignKey(d => d.TransactionHeaderId)
                    .HasConstraintName("FK_tblTransactionHeadertblTransaction");
            });

            modelBuilder.Entity<TblTransactionConditions>(entity =>
            {
                entity.HasKey(e => e.TransactionConditionsId);

                entity.ToTable("tblTransactionConditions", "AC");

                entity.Property(e => e.TransactionConditionsId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AccountName).IsUnicode(false);

                entity.Property(e => e.AccountType).IsUnicode(false);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.SubLedgerReference).IsUnicode(false);

                entity.Property(e => e.TransactionRuleMappingId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TypeofTransaction).IsUnicode(false);

                entity.Property(e => e.Value).IsUnicode(false);

                entity.HasOne(d => d.TransactionRuleMapping)
                    .WithMany(p => p.TblTransactionConditions)
                    .HasForeignKey(d => d.TransactionRuleMappingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblTransactionRuleMappingtblTransactionConditions");
            });

            modelBuilder.Entity<TblTransactionHeader>(entity =>
            {
                entity.HasKey(e => e.TransactionHeaderId);

                entity.ToTable("tblTransactionHeader", "AC");

                entity.Property(e => e.TransactionHeaderId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.RuleName).IsUnicode(false);

                entity.Property(e => e.TransactionRuleMappingId).HasColumnType("numeric(18, 0)");

                entity.HasOne(d => d.TransactionRuleMapping)
                    .WithMany(p => p.TblTransactionHeader)
                    .HasForeignKey(d => d.TransactionRuleMappingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblTransactionRuleMappingtblTransactionHeader");
            });

            modelBuilder.Entity<TblTransactionRuleMapping>(entity =>
            {
                entity.HasKey(e => e.TransactionRuleMappingId);

                entity.ToTable("tblTransactionRuleMapping", "AC");

                entity.Property(e => e.TransactionRuleMappingId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Event).IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Object).IsUnicode(false);

                entity.Property(e => e.RuleName).IsUnicode(false);
            });

            modelBuilder.Entity<TblTransactionSubLedger>(entity =>
            {
                entity.HasKey(e => e.TransactionSubLedgerId);

                entity.ToTable("tblTransactionSubLedger", "AC");

                entity.Property(e => e.TransactionSubLedgerId)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.SubLedgerReferencesId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.TransactionHeaderId).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Value).IsUnicode(false);

                entity.HasOne(d => d.SubLedgerReferences)
                    .WithMany(p => p.TblTransactionSubLedger)
                    .HasForeignKey(d => d.SubLedgerReferencesId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblSubLedgerReferencestblTransactionSubLedger");

                entity.HasOne(d => d.TransactionHeader)
                    .WithMany(p => p.TblTransactionSubLedger)
                    .HasForeignKey(d => d.TransactionHeaderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tblTransactionHeadertblTransactionSubLedger");
            });
        }
    }
}

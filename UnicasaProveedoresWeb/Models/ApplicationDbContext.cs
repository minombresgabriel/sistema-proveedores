using Microsoft.EntityFrameworkCore;
using System;

namespace UnicasaProveedoresWeb.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Definir DbSet para cada entidad
        public DbSet<UWP_USER> Users { get; set; }
        public DbSet<UWP_ROL> Roles { get; set; }
        public DbSet<UWP_PERMISSION> Permissions { get; set; }
        public DbSet<UWP_ROL_PERMISSION> RolPermissions { get; set; }
        public DbSet<UWP_EMPLOYEE> Employees { get; set; }
        public DbSet<UWP_PROVEEDOR> Proveedores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurar nombres de tabla
            modelBuilder.Entity<UWP_USER>().ToTable("UWP_USER");
            modelBuilder.Entity<UWP_ROL>().ToTable("UWP_ROL");
            modelBuilder.Entity<UWP_PERMISSION>().ToTable("UWP_PERMISSION");
            modelBuilder.Entity<UWP_ROL_PERMISSION>().ToTable("UWP_ROL_PERMISSION");
            modelBuilder.Entity<UWP_EMPLOYEE>().ToTable("UWP_EMPLOYEE");
            modelBuilder.Entity<UWP_PROVEEDOR>().ToTable("UWP_PROVEEDOR");

            // Configurar relaciones y restricciones

            // Relación UWP_USER -> UWP_ROL
            modelBuilder.Entity<UWP_USER>()
                .HasOne(u => u.rol)
                .WithMany()
                .HasForeignKey(u => u.id_rol)
                .OnDelete(DeleteBehavior.Restrict); // Evita eliminación en cascada

            // Relación UWP_USER -> UWP_USER (created_by)
            modelBuilder.Entity<UWP_USER>()
                .HasOne(u => u.created_by)
                .WithMany()
                .HasForeignKey(u => u.id_created_by)
                .OnDelete(DeleteBehavior.Restrict); // Evita eliminación en cascada

            // Relación UWP_EMPLOYEE -> UWP_USER
            modelBuilder.Entity<UWP_EMPLOYEE>()
                .HasOne(e => e.user)
                .WithMany(u => u.empleado)
                .HasForeignKey(e => e.id_user)
                .OnDelete(DeleteBehavior.Restrict); // Evita eliminación en cascada

            // Relación UWP_PROVEEDOR -> UWP_USER
            modelBuilder.Entity<UWP_PROVEEDOR>()
                .HasOne(p => p.user)
                .WithMany(u => u.proveedor)
                .HasForeignKey(p => p.id_user)
                .OnDelete(DeleteBehavior.Restrict); // Evita eliminación en cascada

            // Relación UWP_ROL_PERMISSION -> UWP_ROL
            modelBuilder.Entity<UWP_ROL_PERMISSION>()
                .HasOne(rp => rp.rol)
                .WithMany(r => r.rol_permission)
                .HasForeignKey(rp => rp.id_rol)
                .OnDelete(DeleteBehavior.Restrict); // Evita eliminación en cascada

            // Relación UWP_ROL_PERMISSION -> UWP_PERMISSION
            modelBuilder.Entity<UWP_ROL_PERMISSION>()
                .HasOne(rp => rp.permission)
                .WithMany(p => p.rol_permission)
                .HasForeignKey(rp => rp.id_permission)
                .OnDelete(DeleteBehavior.Restrict); // Evita eliminación en cascada

            // Relación UWP_ROL_PERMISSION -> UWP_USER (created_by)
            modelBuilder.Entity<UWP_ROL_PERMISSION>()
                .HasOne(rp => rp.created_by)
                .WithMany()
                .HasForeignKey(rp => rp.id_created_by)
                .OnDelete(DeleteBehavior.Restrict); // Evita eliminación en cascada

            // Relación UWP_PERMISSION -> UWP_USER (created_by)
            modelBuilder.Entity<UWP_PERMISSION>()
                .HasOne(p => p.created_by)
                .WithMany()
                .HasForeignKey(p => p.id_created_by)
                .OnDelete(DeleteBehavior.Restrict); // Evita eliminación en cascada

            // Relación UWP_EMPLOYEE -> UWP_USER (created_by)
            modelBuilder.Entity<UWP_EMPLOYEE>()
                .HasOne(e => e.created_by)
                .WithMany()
                .HasForeignKey(e => e.id_created_by)
                .OnDelete(DeleteBehavior.Restrict); // Evita eliminación en cascada

            // Relación UWP_PROVEEDOR -> UWP_USER (created_by)
            modelBuilder.Entity<UWP_PROVEEDOR>()
                .HasOne(p => p.created_by)
                .WithMany()
                .HasForeignKey(p => p.id_created_by)
                .OnDelete(DeleteBehavior.Restrict); // Evita eliminación en cascada
        }
    }
}
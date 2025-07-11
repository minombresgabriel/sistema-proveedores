using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UnicasaProveedoresAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UWP_ROL",
                columns: table => new
                {
                    rol_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    rol_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    date_created = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UWP_ROL", x => x.rol_id);
                });

            migrationBuilder.CreateTable(
                name: "UWP_USER",
                columns: table => new
                {
                    usuario_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    usuario_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    user_email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    user_username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    user_password = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    user_status = table.Column<bool>(type: "bit", nullable: false),
                    id_rol = table.Column<int>(type: "int", nullable: false),
                    id_created_by = table.Column<int>(type: "int", nullable: true),
                    date_created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    user_type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UWP_USER", x => x.usuario_id);
                    table.ForeignKey(
                        name: "FK_UWP_USER_UWP_ROL_id_rol",
                        column: x => x.id_rol,
                        principalTable: "UWP_ROL",
                        principalColumn: "rol_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UWP_USER_UWP_USER_id_created_by",
                        column: x => x.id_created_by,
                        principalTable: "UWP_USER",
                        principalColumn: "usuario_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UWP_EMPLOYEE",
                columns: table => new
                {
                    employee_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    employee_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    id_created_by = table.Column<int>(type: "int", nullable: false),
                    date_created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    id_user = table.Column<int>(type: "int", nullable: false),
                    codigo_proveedor = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UWP_EMPLOYEE", x => x.employee_id);
                    table.ForeignKey(
                        name: "FK_UWP_EMPLOYEE_UWP_USER_id_created_by",
                        column: x => x.id_created_by,
                        principalTable: "UWP_USER",
                        principalColumn: "usuario_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UWP_EMPLOYEE_UWP_USER_id_user",
                        column: x => x.id_user,
                        principalTable: "UWP_USER",
                        principalColumn: "usuario_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UWP_PERMISSION",
                columns: table => new
                {
                    permission_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    permission_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    id_created_by = table.Column<int>(type: "int", nullable: false),
                    date_created = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UWP_PERMISSION", x => x.permission_id);
                    table.ForeignKey(
                        name: "FK_UWP_PERMISSION_UWP_USER_id_created_by",
                        column: x => x.id_created_by,
                        principalTable: "UWP_USER",
                        principalColumn: "usuario_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UWP_PROVEEDOR",
                columns: table => new
                {
                    proveedor_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    proveedor_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    id_created_by = table.Column<int>(type: "int", nullable: false),
                    date_created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    id_user = table.Column<int>(type: "int", nullable: false),
                    codigo_proveedor = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UWP_PROVEEDOR", x => x.proveedor_id);
                    table.ForeignKey(
                        name: "FK_UWP_PROVEEDOR_UWP_USER_id_created_by",
                        column: x => x.id_created_by,
                        principalTable: "UWP_USER",
                        principalColumn: "usuario_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UWP_PROVEEDOR_UWP_USER_id_user",
                        column: x => x.id_user,
                        principalTable: "UWP_USER",
                        principalColumn: "usuario_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UWP_ROL_PERMISSION",
                columns: table => new
                {
                    rol_permission_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_rol = table.Column<int>(type: "int", nullable: false),
                    id_permission = table.Column<int>(type: "int", nullable: false),
                    id_created_by = table.Column<int>(type: "int", nullable: false),
                    date_created = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UWP_ROL_PERMISSION", x => x.rol_permission_id);
                    table.ForeignKey(
                        name: "FK_UWP_ROL_PERMISSION_UWP_PERMISSION_id_permission",
                        column: x => x.id_permission,
                        principalTable: "UWP_PERMISSION",
                        principalColumn: "permission_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UWP_ROL_PERMISSION_UWP_ROL_id_rol",
                        column: x => x.id_rol,
                        principalTable: "UWP_ROL",
                        principalColumn: "rol_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UWP_ROL_PERMISSION_UWP_USER_id_created_by",
                        column: x => x.id_created_by,
                        principalTable: "UWP_USER",
                        principalColumn: "usuario_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UWP_EMPLOYEE_id_created_by",
                table: "UWP_EMPLOYEE",
                column: "id_created_by");

            migrationBuilder.CreateIndex(
                name: "IX_UWP_EMPLOYEE_id_user",
                table: "UWP_EMPLOYEE",
                column: "id_user");

            migrationBuilder.CreateIndex(
                name: "IX_UWP_PERMISSION_id_created_by",
                table: "UWP_PERMISSION",
                column: "id_created_by");

            migrationBuilder.CreateIndex(
                name: "IX_UWP_PROVEEDOR_id_created_by",
                table: "UWP_PROVEEDOR",
                column: "id_created_by");

            migrationBuilder.CreateIndex(
                name: "IX_UWP_PROVEEDOR_id_user",
                table: "UWP_PROVEEDOR",
                column: "id_user");

            migrationBuilder.CreateIndex(
                name: "IX_UWP_ROL_PERMISSION_id_created_by",
                table: "UWP_ROL_PERMISSION",
                column: "id_created_by");

            migrationBuilder.CreateIndex(
                name: "IX_UWP_ROL_PERMISSION_id_permission",
                table: "UWP_ROL_PERMISSION",
                column: "id_permission");

            migrationBuilder.CreateIndex(
                name: "IX_UWP_ROL_PERMISSION_id_rol",
                table: "UWP_ROL_PERMISSION",
                column: "id_rol");

            migrationBuilder.CreateIndex(
                name: "IX_UWP_USER_id_created_by",
                table: "UWP_USER",
                column: "id_created_by");

            migrationBuilder.CreateIndex(
                name: "IX_UWP_USER_id_rol",
                table: "UWP_USER",
                column: "id_rol");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UWP_EMPLOYEE");

            migrationBuilder.DropTable(
                name: "UWP_PROVEEDOR");

            migrationBuilder.DropTable(
                name: "UWP_ROL_PERMISSION");

            migrationBuilder.DropTable(
                name: "UWP_PERMISSION");

            migrationBuilder.DropTable(
                name: "UWP_USER");

            migrationBuilder.DropTable(
                name: "UWP_ROL");
        }
    }
}

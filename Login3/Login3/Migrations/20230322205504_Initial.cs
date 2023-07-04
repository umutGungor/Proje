using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Login3.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    firstLast = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    sk = table.Column<int>(nullable: false),
                    ls = table.Column<int>(nullable: false),
                    pass = table.Column<string>(nullable: true),
                    since = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}

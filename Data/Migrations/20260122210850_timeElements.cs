using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inputTest.Data.Migrations
{
    /// <inheritdoc />
    public partial class timeElements : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "fileName",
                table: "Paintings");

            migrationBuilder.AlterColumn<double>(
                name: "widthInInches",
                table: "Paintings",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<double>(
                name: "heightInInches",
                table: "Paintings",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<DateTime>(
                name: "createdOn",
                table: "Paintings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "lastModified",
                table: "Paintings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "createdOn",
                table: "Paintings");

            migrationBuilder.DropColumn(
                name: "lastModified",
                table: "Paintings");

            migrationBuilder.AlterColumn<int>(
                name: "widthInInches",
                table: "Paintings",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<int>(
                name: "heightInInches",
                table: "Paintings",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AddColumn<string>(
                name: "fileName",
                table: "Paintings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}

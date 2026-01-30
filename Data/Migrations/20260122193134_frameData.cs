using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inputTest.Data.Migrations
{
    /// <inheritdoc />
    public partial class frameData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Year",
                table: "Paintings",
                newName: "widthInInches");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Paintings",
                newName: "frameData");

            migrationBuilder.RenameColumn(
                name: "Artist",
                table: "Paintings",
                newName: "fileName");

            migrationBuilder.AddColumn<int>(
                name: "heightInInches",
                table: "Paintings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "heightInInches",
                table: "Paintings");

            migrationBuilder.RenameColumn(
                name: "widthInInches",
                table: "Paintings",
                newName: "Year");

            migrationBuilder.RenameColumn(
                name: "frameData",
                table: "Paintings",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "fileName",
                table: "Paintings",
                newName: "Artist");
        }
    }
}

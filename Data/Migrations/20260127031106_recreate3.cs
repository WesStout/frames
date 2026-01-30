using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inputTest.Data.Migrations
{
    /// <inheritdoc />
    public partial class recreate3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Frames_Orders_OrderId",
                table: "Frames");

            migrationBuilder.AlterColumn<int>(
                name: "OrderId",
                table: "Frames",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Frames_Orders_OrderId",
                table: "Frames",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Frames_Orders_OrderId",
                table: "Frames");

            migrationBuilder.AlterColumn<int>(
                name: "OrderId",
                table: "Frames",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Frames_Orders_OrderId",
                table: "Frames",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

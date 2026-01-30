using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inputTest.Data.Migrations
{
    /// <inheritdoc />
    public partial class recreate4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Frames_Orders_OrderId",
                table: "Frames");

            migrationBuilder.DropIndex(
                name: "IX_Frames_OrderId",
                table: "Frames");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Frames_OrderId",
                table: "Frames",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Frames_Orders_OrderId",
                table: "Frames",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "OrderId");
        }
    }
}

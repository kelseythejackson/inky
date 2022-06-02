var compare = require("./lib/compare");

describe("PricingTable", () => {
  it("applies a pricing table", () => {
    var input = `
        <price-table title="Something" total="$80"></price-table>
      `;
    var expected = `
        <table role="table">
          <tr>
            <td>
              <h5>Something</h5>
            </td>
            <td>
              <p class="text-right"><strong>$80</strong></p>
            </td>
          </tr>
        </table>
      `;
    compare(input, expected);
  });
});

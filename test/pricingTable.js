var compare = require("./lib/compare");

describe("PricingTable", () => {
  it("applies a pricing table", () => {
    var input = `
        <price-table title="Something" total="$80"></price-table>
      `;
    var expected = `
        <table class="pricing-table" role="table">
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

  it("applies a table with a header and body", () => {
    var input = `
      <price-table>
        <price-heading><td>1</td></price-heading>
        <price-body><td>2</td></price-body>
      </price-table>
    `;

    var expected = `
      <table class="pricing-table" role="table">
        <tr>
          <td>1</td>
        </tr>
        <tr>
          <td>2</td>
        </tr>
      </table>
    `;
    compare(input, expected);
  });
});

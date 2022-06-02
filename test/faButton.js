var compare = require("./lib/compare");

describe("FAButton", () => {
  it("generates an outlook compatable button with a success class and appropriate colors", () => {
    var input = `
            <fa-button class="success radius" href="https://fontawesome.com/icons">
            Browse the Pro Icons
          </fa-button>
        `;
    var expected = `
    <!--[if mso]><div><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:w="urn:schemas-microsoft-com:office:word"
    href="https://fontawesome.com/icons"
    style="height: 40px; v-text-anchor: middle; width: 200px"
    arcsize="20%"
    strokecolor="#1e3650"
    fillcolor="#63E6BE"><w:anchorlock /><center
      style="
        color: #183153;
        font-family: sans-serif;
        font-size: 13px;
        font-weight: bold;
      "
    >
      Browse the Pro Icons
    </center></v:roundrect></div><![endif]-->
    <table class="button success radius" role="presentation">
                <tbody>
                    <tr>
                        <td>
                            <table role="presentation">
                                <tbody>
                                    <tr>
                                        <td><a href="https://fontawesome.com/icons">
                                                Browse the Pro Icons
                                            </a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>

                    </tr>
                </tbody>
            </table>
        `;
    compare(input, expected);
  });

  it("generates an outlook compatable button with an alert class and appropriate colors", () => {
    var input = `
            <fa-button class="alert radius" href="https://fontawesome.com/icons">
            Browse the Pro Icons
          </fa-button>
        `;
    var expected = `
    <!--[if mso]><div><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:w="urn:schemas-microsoft-com:office:word"
    href="https://fontawesome.com/icons"
    style="height: 40px; v-text-anchor: middle; width: 200px"
    arcsize="20%"
    strokecolor="#1e3650"
    fillcolor="#FF8787"><w:anchorlock /><center
      style="
        color: #183153;
        font-family: sans-serif;
        font-size: 13px;
        font-weight: bold;
      "
    >
      Browse the Pro Icons
    </center></v:roundrect></div><![endif]-->
    <table class="button alert radius" role="presentation">
                <tbody>
                    <tr>
                        <td>
                            <table role="presentation">
                                <tbody>
                                    <tr>
                                        <td><a href="https://fontawesome.com/icons">
                                                Browse the Pro Icons
                                            </a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>

                    </tr>
                </tbody>
            </table>
        `;
    compare(input, expected);
  });
});

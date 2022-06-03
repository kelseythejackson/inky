var format = require("util").format;
var $ = require("cheerio");
var getAttrs = require("./util/getAttrs");

/**
 * Returns output for desired custom element
 * @param {object} element - Element as a Cheerio object.
 * @returns {string} HTML converted from a custom element to table syntax.
 */
module.exports = function (element) {
  var inner = element.html();
  var attrs = getAttrs(element);

  switch (element[0].name) {
    // <hr>
    case this.components.hLine:
      var classes = ["h-line"];
      if (element.attr("class")) {
        classes = classes.concat(element.attr("class").split(" "));
      }
      return format(
        '<table class="%s" role="presentation"><tr><th>&nbsp;</th></tr></table>',
        classes.join(" ")
      );

    // <column>
    case this.components.columns:
      return this.makeColumn(element, "columns");

    // <row>
    case this.components.row:
      var classes = ["row"];
      if (element.attr("class")) {
        classes = classes.concat(element.attr("class").split(" "));
      }

      return format(
        '<table %s class="%s" role="presentation"><tbody><tr>%s</tr></tbody></table>',
        attrs,
        classes.join(" "),
        inner
      );

    // <button>
    case this.components.button:
      var expander = "";

      // Prepare optional target attribute for the <a> element
      var target = "";
      if (element.attr("target")) {
        target = " target=" + element.attr("target");
      }

      // If we have the href attribute we can create an anchor for the inner of the button;
      if (element.attr("href")) {
        inner = format(
          '<a %s href="%s"%s>%s</a>',
          attrs,
          element.attr("href"),
          target,
          inner
        );
      }

      // If the button is expanded, it needs a <center> tag around the content
      if (element.hasClass("expand") || element.hasClass("expanded")) {
        inner = format("<center>%s</center>", inner);
        expander = '\n<td class="expander"></td>';
      }

      // The .button class is always there, along with any others on the <button> element
      var classes = ["button"];
      if (element.attr("class")) {
        classes = classes.concat(element.attr("class").split(" "));
      }

      return format(
        '<table class="%s" role="presentation"><tbody><tr><td><table role="presentation"><tbody><tr><td>%s</td></tr></tbody></table></td>%s</tr></tbody></table>',
        classes.join(" "),
        inner,
        expander
      );

    // <container>
    case this.components.container:
      var classes = ["container"];
      if (element.attr("class")) {
        classes = classes.concat(element.attr("class").split(" "));
      }

      return format(
        '<table %s align="center" class="%s" role="presentation"><tbody><tr><td>%s</td></tr></tbody></table>',
        attrs,
        classes.join(" "),
        inner
      );

    // <inky>
    case this.components.inky:
      return '<tr><td><img src="https://raw.githubusercontent.com/arvida/emoji-cheat-sheet.com/master/public/graphics/emojis/octopus.png" /></tr></td>';

    // <block-grid>
    case this.components.blockGrid:
      var classes = ["block-grid", "up-" + element.attr("up")];
      if (element.attr("class")) {
        classes = classes.concat(element.attr("class").split(" "));
      }
      return format(
        '<table class="%s" role="presentation"><tbody><tr>%s</tr></tbody></table>',
        classes.join(" "),
        inner
      );

    // <menu>
    case this.components.menu:
      var classes = ["menu"];
      if (element.attr("class")) {
        classes = classes.concat(element.attr("class").split(" "));
      }
      return format(
        '<table %s class="%s" role="presentation"><tbody><tr><td><table role="presentation"><tbody><tr>%s</tr></tbody></table></td></tr></tbody></table>',
        attrs,
        classes.join(" "),
        inner
      );

    // <item>
    case this.components.menuItem:
      // Prepare optional target attribute for the <a> element
      var target = "";
      if (element.attr("target")) {
        target = " target=" + element.attr("target");
      }
      var classes = ["menu-item"];
      if (element.attr("class")) {
        classes = classes.concat(element.attr("class").split(" "));
      }
      return format(
        '<th %s class="%s"><a href="%s"%s>%s</a></th>',
        attrs,
        classes.join(" "),
        element.attr("href"),
        target,
        inner
      );

    // <center>
    case this.components.center:
      if (element.children().length > 0) {
        element.children().each(function () {
          $(this).attr("align", "center");
          $(this).addClass("float-center");
        });
        element.find("item, .menu-item").addClass("float-center");
      }

      element.attr("data-parsed", "");

      return format("%s", $.html(element, this.cheerioOpts));

    // <callout>
    case this.components.callout:
      var classes = ["callout-inner"];
      if (element.attr("class")) {
        classes = classes.concat(element.attr("class").split(" "));
      }

      return format(
        '<table %s class="callout" role="presentation"><tbody><tr><th class="%s">%s</th><th class="expander"></th></tr></tbody></table>',
        attrs,
        classes.join(" "),
        inner
      );

    // <spacer>
    case this.components.spacer:
      var classes = ["spacer"];
      var size;
      var html = "";
      if (element.attr("class")) {
        classes = classes.concat(element.attr("class").split(" "));
      }
      if (element.attr("size-sm") || element.attr("size-lg")) {
        if (element.attr("size-sm")) {
          size = element.attr("size-sm");
          html += format(
            '<table %s class="%s hide-for-large" role="presentation"><tbody><tr><td height="' +
              size +
              '" style="font-size:' +
              size +
              "px;line-height:" +
              size +
              'px;">&nbsp;</td></tr></tbody></table>',
            attrs
          );
        }
        if (element.attr("size-lg")) {
          size = element.attr("size-lg");
          html += format(
            '<table %s class="%s show-for-large" role="presentation"><tbody><tr><td height="' +
              size +
              '" style="font-size:' +
              size +
              "px;line-height:" +
              size +
              'px;">&nbsp;</td></tr></tbody></table>',
            attrs
          );
        }
      } else {
        size = element.attr("size") || 16;
        html += format(
          '<table %s class="%s" role="presentation"><tbody><tr><td height="' +
            size +
            '" style="font-size:' +
            size +
            "px;line-height:" +
            size +
            'px;">&nbsp;</td></tr></tbody></table>',
          attrs
        );
      }

      if (element.attr("size-sm") && element.attr("size-lg")) {
        return format(html, classes.join(" "), classes.join(" "), inner);
      }

      return format(html, classes.join(" "), inner);

    // <wrapper>
    case this.components.wrapper:
      var classes = ["wrapper"];
      if (element.attr("class")) {
        classes = classes.concat(element.attr("class").split(" "));
      }

      return format(
        '<table %s class="%s" align="center" role="presentation"><tbody><tr><td class="wrapper-inner">%s</td></tr></tbody></table>',
        attrs,
        classes.join(" "),
        inner
      );

    // <price-table>
    case this.components.priceTable:
      var title = element.attr("title");
      var total = element.attr("total");

      if (title && element) {
        return format(
          '<table class="pricing-table" role="table"><tr><td><h5>%s</h5></td><td><p class="text-right"><strong>%s</strong></p></td></tr></table>',
          title,
          total
        );
      }

      return format(
        '<table class="pricing-table" role="table">%s</table>',
        inner
      );

    // <price-header>
    case this.components.priceHeading:
      return format("<tr>%s</tr>", inner);

    // <price-header>
    case this.components.priceBody:
      return format("<tr>%s</tr>", inner);

    // <fa-button>
    case this.components.faButton:
      var expander = "";
      let height = element.attr("ol-height");
      let width = element.attr("ol-width");
      let buttonText = element.html().trim();

      // grab the colors for the outlook button
      function getColors() {
        // Convert the classes to an array
        let colorClass = element.attr("class").split(" ");

        // Create a colors object
        let colors = {
          text: "#183153",
        };

        // set the background color value
        if (colorClass.includes("success")) {
          colors.bg = "#63E6BE";
        } else if (colorClass.includes("alert")) {
          colors.bg = "#FF8787";
        }

        return colors;
      }

      let colors = getColors();

      // Prepare optional target attribute for the <a> element
      var target = "";
      if (element.attr("target")) {
        target = " target=" + element.attr("target");
      }
      // If we have the href attribute we can create an anchor for the inner of the button;
      if (element.attr("href")) {
        // filter out the outlook attributes
        let updatedAttrs = function () {
          // convert attributes to an array
          let attrsArray = attrs.split(" ");

          // filter out the unwanted attributes
          let cleanArray = attrsArray.filter((index) => {
            if (index.includes("ol-height") || index.includes("ol-width")) {
              return false;
            }
            return true;
          });

          // convert bact to a string and return
          return cleanArray.join(" ");
        };
        inner = format(
          '<a %s href="%s"%s>%s</a>',
          updatedAttrs(),
          element.attr("href"),
          target,
          inner
        );
      }

      // If the button is expanded, it needs a <center> tag around the content
      if (element.hasClass("expand") || element.hasClass("expanded")) {
        inner = format("<center>%s</center>", inner);
        expander = '\n<td class="expander"></td>';
      }

      // The .button class is always there, along with any others on the <button> element
      var classes = ["button"];
      if (element.attr("class")) {
        classes = classes.concat(element.attr("class").split(" "));
      }

      return format(
        `<!--[if mso]><div><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:w="urn:schemas-microsoft-com:office:word"
    href="%s"
    style="height: %dpx; v-text-anchor: middle; width: %dpx"
    arcsize="20%"
    strokecolor="#1e3650"
    fillcolor="%s"><w:anchorlock /><center
      style="
        color: %s;
        font-family: sans-serif;
        font-size: 16px;
        font-weight: bold;
      "
    >
      %s
    </center></v:roundrect></div><![endif]-->
    <!--[if !mso]><!-- -->
    <table class="%s" role="presentation">
                <tbody>
                    <tr>
                        <td>
                            <table role="presentation">
                                <tbody>
                                    <tr>
                                        <td>%s</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        %s
                    </tr>
                </tbody>
            </table>
            <!--<![endif]-->`,
        element.attr("href"),
        height,
        width,
        colors.bg,
        colors.text,
        buttonText,
        classes.join(" "),
        inner,
        expander
      );

    default:
      // If it's not a custom component, return it as-is
      return format("<tr><td>%s</td></tr>", $.html(element, this.cheerioOpts));
  }
};

const colors = [
  { color: "#E6B0AA" },
  { color: "#303030" },
  { color: "#C0392B" },
  { color: "#922B21" },
  { color: "#9B59B6" },
];

$(document).ready(function () {
  console.log("Font Color Tabs ready");
  $("#fontColorTab").height(screen.height - 200);
  colors.forEach((color) => {
    console.log("Color: ", color);
    let colorElement = `<div class="col-md-4" style="margin-top: 7px;">
        <div style="background-color: ${color.color};" class="fontColorStyle"></div>
    </div>`;
    $(".fontColorRow").append(colorElement);
  });
});

const backgroundColors = [
  { color: "#E6B0AA" },
  { color: "#303030" },
  { color: "#C0392B" },
  { color: "#922B21" },
  { color: "#9B59B6" },
];

$(document).ready(function () {
  console.log("Background Color Tabs ready");
  $("#backgroundTab").height(screen.height - 200);
  backgroundColors.forEach((color) => {
    console.log("Color: ", color);
    let colorElement = `<div class="col-md-4" style="margin-top: 7px;">
          <div style="background-color: ${color.color};" class="fontColorStyle"></div>
      </div>`;
    $(".backgroundRow").append(colorElement);
  });
});

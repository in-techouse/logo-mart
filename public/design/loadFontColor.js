const colors = [
  { color: "#E6B0AA" },
  { color: "#F3F781" },
  { color: "#C0392B" },
  { color: "#922B21" },
  { color: "#00FFFF" },
  { color: "#8A0829" },
  { color: "#FF0000" },
  { color: "#FFFF00" },
  { color: "#FF0040" },
  { color: "#BDBDBD" },
  { color: "#000000" },
  { color: "#0B3B0B" },
  { color: "#0B0B61" },
  { color: "#FF8000" },
  { color: "#4C0B5F" },
  { color: "#00FFBF" },
  { color: "#F781F3" },
  { color: "#120A2A" },
  { color: "#3B0B24" },
  { color: "#0B3B2E" },
  { color: "#00FF00" },
  { color: "#F7D358" },
  { color: "#0080FF" },
  { color: "#DF013A" },
  { color: "#8A4B08" },
  { color: "#FA5882" },
  { color: "#5882FA" },
];

$(document).ready(function () {
  console.log("Font Color Tabs ready");
  $("#fontColorTab").height(screen.height - 200);
  colors.forEach((color) => {
    let colorElement = `<div class="col-md-4" style="margin-top: 7px;" onclick="colorSelected('${color.color}')">
        <div style="background-color: ${color.color};" class="fontColorStyle"></div>
    </div>`;
    $(".fontColorRow").append(colorElement);
  });
});

const backgroundColors = [
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
  { color: "#E6E6E6" },
  { color: "#F8E0E6" },
  { color: "#FFDAB9" },
  { color: "#BCF5A9" },
  { color: "#F5D0A9" },
  { color: "#F5A9D0" },
  { color: "#E1F5A9" },
  { color: "#F2F5A9" },
  { color: "#FE9A2E" },
  { color: "#E2A9F3" },
  { color: "#81BEF7" },
  { color: "#F6E3CE" },
  { color: "#F78181" },
  { color: "#F7D358" },
  { color: "#A4A4A4" },
  { color: "#088A85" },
  { color: "#FF6347" },
  { color: "#8A084B" },
  { color: "#778899" },
  { color: "#A52A2A" },
  { color: "#FFE4C4" },
  { color: "#00FF00" },
  { color: "#D2691E" },
  { color: "#008080" },

];

$(document).ready(function () {
  console.log("Background Color Tabs ready");
  $("#backgroundTab").height(screen.height - 200);
  backgroundColors.forEach((color) => {
    let colorElement = `<div class="col-md-4" style="margin-top: 7px;" onclick="backgroundSelected('${color.color}')">
          <div style="background-color: ${color.color};" class="fontColorStyle"></div>
      </div>`;
    $(".backgroundRow").append(colorElement);
  });
});

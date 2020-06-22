const listDesings = JSON.parse(localStorage.getItem("selectedDesigns"));
const listColors = JSON.parse(localStorage.getItem("selectedColors"));
const listTextStyles = JSON.parse(localStorage.getItem("selectTextStyles"));

const indexDesign = randomInteger(0, listDesings.length);
const indexColor = randomInteger(0, listColors.length);
const indexTextStyle = randomInteger(0, listTextStyles.length);

$(document).ready(function () {
  console.log("Automated Design page is ready");
  console.log("List of designs: ", listDesings);
  console.log("List of colors: ", listColors);
  console.log("List of text styles: ", listTextStyles);

  console.log("Index of design: ", indexDesign);
  console.log("Index of color: ", indexColor);
  console.log("Index of text style: ", indexTextStyle);
});

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

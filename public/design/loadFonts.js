const fonts = [
  {
    family: "Oswald",
    backEndFamily: "'Oswald', sans-serif",
    class: "oswald",
  },
  {
    family: "Roboto Slab",
    backEndFamily: "'Roboto Slab', serif",
    class: "robotoSlab",
  },
  {
    family: "Playfair",
    backEndFamily: "'Playfair Display', serif",
    class: "playfair",
  },
  {
    family: "Dancing Script",
    backEndFamily: "'Dancing Script', cursive",
    class: "dancingScript",
  },
  {
    family: "Orbitron",
    backEndFamily: "'Orbitron', sans-serif",
    class: "orbitron",
  },
  {
    family: "Lemonada",
    backEndFamily: "'Lemonada', cursive",
    class: "lemonada",
  },
  {
    family: "Lobster",
    backEndFamily: "'Lobster', cursive",
    class: "lobster",
  },
  {
    family: "Pacifico",
    backEndFamily: "'Pacifico', cursive",
    class: "pacifico",
  },
  {
    family: "Indie Flower",
    backEndFamily: "'Indie Flower', cursive",
    class: "indieFlower",
  },
  {
    family: "Shadows Into Light",
    backEndFamily: "'Shadows Into Light', cursive",
    class: "shadowsIntoLight",
  },
  {
    family: "Permanent Marker",
    backEndFamily: "'Permanent Marker', cursive",
    class: "permanentMarker",
  },
  {
    family: "Caveat",
    backEndFamily: "'Caveat', cursive",
    class: "caveat",
  },
  {
    family: "Satisfy",
    backEndFamily: "'Satisfy', cursive",
    class: "satisfy",
  },
  {
    family: "Lobster Two",
    backEndFamily: "'Lobster Two', cursive",
    class: "lobster",
  },
  {
    family: "Kaushan Script",
    backEndFamily: "'Kaushan Script', cursive",
    class: "kaushanScript",
  },
  {
    family: "Sacramento",
    backEndFamily: "'Sacramento', cursive",
    class: "sacramento",
  },
  {
    family: "Gloria Hallelujah",
    backEndFamily: "'Gloria Hallelujah', cursive",
    class: "gloriaHallelujah",
  },
];

$(document).ready(function () {
  $(".fontsContainer").height(screen.height - 200);
  fonts.forEach((font) => {
    let fontText = `<a href="#" class="${font.class}" onclick="fontSelected('${font.class}')">${font.family}</a>`;
    $(".fontsContainer").append(fontText);
  });
});

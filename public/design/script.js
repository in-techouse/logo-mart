const fontFamilies = [
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

let iconCount = 0;
let fontCount = 0;
$(document).ready(function () {
  console.log("Design Doc is ready");
  // Tabs Listener
  $(".btn-pref .btn").click(function () {
    $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
    $(this).removeClass("btn-default").addClass("btn-primary");
  });

  $("#download").click(function () {
    console.log("Download Clicked");
    $("#mainCanvas .designBorder").removeClass("designBorder");
    $(".ui-rotatable-handle").hide();
    html2canvas(document.querySelector("#mainCanvas"), {
      useCORS: true,
    }).then((canvas) => {
      saveAs(canvas.toDataURL(), "file-name.png");
      $(".ui-rotatable-handle").show();
    });
  });

  $("#MainDiv").click(function () {
    console.log("Main Div Clicked");
  });

  $("#MainDiv").resizable({
    containment: "parent",
    resize: function (e, ui) {
      console.log("UI: ", ui);
      console.log("UI: ", ui.size);
      $(".designImage").css({
        height: ui.size.height + "px",
        width: ui.size.width + "px",
      });
    },
  });
  $("#MainDiv").draggable({
    cursor: "pointer",
    containment: "parent",
  });
  $("#MainDiv").rotatable();
});

function saveAs(uri, filename) {
  var link = document.createElement("a");
  if (typeof link.download === "string") {
    link.href = uri;
    link.download = filename;
    //Firefox requires the link to be in the body
    document.body.appendChild(link);
    //simulate click
    link.click();
    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

function iconSelected(iconName) {
  console.log("Selected Icon is: ", iconName);
  let iconDiv = `<i id="icon${iconCount}" class="designBorder designIcon ${iconName}"></i>`;
  $("#mainCanvas").append(iconDiv);
  setTimeout(() => {
    let count = iconCount;
    iconCount++;
    $("#icon" + count).draggable({
      cursor: "pointer",
      containment: "parent",
    });
    $("#icon" + count).resizable({
      containment: "parent",
      resize: function (e, ui) {
        console.log(`Icon ${count} UI: `, ui);
        console.log(`Icon ${count} UI: `, ui.size);
        $("#icon" + count).css({
          "font-size": ui.size.width - ui.size.width * 0.2 + "px",
        });
      },
    });
    $("#icon" + count).rotatable();
  }, 200);
}

function fontSelected(fontFamily) {
  console.log("Selected Font Family: ", fontFamily);
  let input = `
    <div class="designInputUpper designBorder" id="input${fontCount}"><textarea id="font${fontCount}" readonly="readonly" class="designInput designBorder ${fontFamily}" type="text">Double click to edit</textarea></div>`;
  $("#mainCanvas").append(input);
  setTimeout(() => {
    let count = fontCount;
    fontCount++;
    console.log("Font Count, Count: ", count);
    $("#input" + count).draggable({
      cursor: "pointer",
      containment: "parent",
    });
    $("#input" + count).resizable({
      containment: "parent",
      resize: function (e, ui) {
        console.log(`Icon ${count} UI: `, ui);
        console.log(`Icon ${count} UI: `, ui.size);
        $("#font" + count).css({
          height: ui.size.height - 62 + "px",
        });
      },
    });
    $("#input" + count).rotatable();
    $("#input" + count).dblclick(function () {
      $("#font" + count).prop("readonly", false);
    });
    $("#font" + count).blur(function () {
      console.log("On Blur Called");
      $("#font" + count).prop("readonly", true);
    });
  }, 200);
}

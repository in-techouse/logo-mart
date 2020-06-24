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
let map = {};
$(document).ready(function () {
  map["MainDiv"] = false;

  // Tabs Listener
  $(".btn-pref .btn").click(function () {
    $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
    $(this).removeClass("btn-default").addClass("btn-primary");
  });

  initMainListeners();

  $("#download").click(function () {
    for (var i in map) {
      if (map[i] === true) {
        $("#" + i).removeClass("focusDesignBorder");
      } else {
        $("#" + i).removeClass("designBorder");
      }
    }
    $(".ui-rotatable-handle").hide();
    html2canvas(document.querySelector("#mainCanvas"), {
      useCORS: true,
    }).then((canvas) => {
      saveAs(canvas.toDataURL(), "file-name.png");
      $(".ui-rotatable-handle").show();
      for (var i in map) {
        if (map[i] === true) {
          $("#" + i).addClass("focusDesignBorder");
        } else {
          $("#" + i).addClass("designBorder");
        }
      }
    });
  });

  $("#delete").click(function () {
    console.log("Delete Button Clicked");
    let id = "";
    for (var i in map) {
      if (map[i] == true) {
        id = i;
      }
    }
    if (id.length > 0) {
      $("#" + id).remove();
      $("#delete").fadeOut(300);
    }
  });

  $("#fontSize").on("change", function () {
    let widget = "";
    for (var i in map) {
      if (map[i] === true) {
        widget = i;
      }
    }
    if (widget.includes("input")) {
      let str = widget.split("input");
      let fontId = "font" + str[1];
      $("#" + fontId).css({ "font-size": this.value });
    }
  });
});

function initMainListeners() {
  $("#MainDiv").resizable({
    containment: "parent",
    resize: function (e, ui) {
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
  $("#MainDiv").click(function () {
    elementClicked("MainDiv");
  });
}

function elementClicked(id) {
  for (var i in map) {
    map[i] = false;
    $("#" + i).removeClass("focusDesignBorder");
    $("#" + i).addClass("designBorder");
  }
  map[id] = true;
  $("#" + id).removeClass("designBorder");
  $("#" + id).addClass("focusDesignBorder");
  if (id.includes("icon")) {
    $("#delete").fadeIn(300);
    $("#fontStylingCard").show(300);
    $("#fontStylingError").hide(300);
  } else if (id.includes("input")) {
    var size = $("#" + id + " .designInput").css("font-size");
    $("#delete").show(300);
    $("#fontSize").val(size);
    $("#fontStylingCard").show(300);
    $("#fontStylingError").hide(300);
  } else {
    $("#fontStylingError").show(300);
    $("#fontStylingCard").hide(300);
    $("#delete").fadeOut(300);
  }
}

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
  let iconDiv = `<i id="icon${iconCount}" class="designBorder designIcon ${iconName}" onmousedown="elementClicked('icon${iconCount}')"></i>`;
  $("#mainCanvas").append(iconDiv);
  map["icon" + iconCount] = true;
  elementClicked("icon" + iconCount);
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
        $("#icon" + count).css({
          "font-size": ui.size.width - ui.size.width * 0.2 + "px",
        });
      },
    });
    $("#icon" + count).rotatable();
  }, 200);
}

function fontSelected(fontFamily) {
  let input = `
    <div onmousedown="elementClicked('input${fontCount}')" class="designInputUpper designBorder" id="input${fontCount}"><textarea id="font${fontCount}" readonly="readonly" class="designInput designBorder ${fontFamily}" type="text">Double click to edit</textarea></div>`;
  $("#mainCanvas").append(input);
  map["input" + fontCount] = true;
  elementClicked("input" + fontCount);
  setTimeout(() => {
    let count = fontCount;
    fontCount++;
    $("#input" + count).draggable({
      cursor: "pointer",
      containment: "parent",
    });
    $("#input" + count).resizable({
      containment: "parent",
      resize: function (e, ui) {
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
      $("#font" + count).prop("readonly", true);
    });
  }, 200);
}

function initFontListeners(fCount) {
  map["input" + fCount] = true;
  elementClicked("input" + fCount);
  setTimeout(() => {
    let count = fCount;
    $("#input" + count).draggable({
      cursor: "pointer",
      containment: "parent",
    });
    $("#input" + count).resizable({
      containment: "parent",
      resize: function (e, ui) {
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
      $("#font" + count).prop("readonly", true);
    });
  }, 200);
}

function colorSelected(color) {
  let widget = "";
  for (var i in map) {
    if (map[i] === true) {
      widget = i;
    }
  }
  if (widget.includes("input")) {
    let str = widget.split("input");
    let fontId = "font" + str[1];
    $("#" + fontId).css({ color: color });
  } else if (widget.includes("icon")) {
  }
}

function backgroundSelected(color) {
  $(".designInnerLevelTwo").css({ "background-color": color });
}

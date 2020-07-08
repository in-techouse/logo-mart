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
let companyName = "";
let tagline = "";
let imageCount = 0;

$(document).ready(function () {
  map["MainDiv"] = false;

  companyName = $("#companyName").val().trim();
  tagline = $("#tagline").val().trim();
  console.log("Company Name: ", companyName);
  console.log("Tagline: ", tagline);

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
      let fileName = "";
      if (
        companyName === null ||
        companyName === undefined ||
        companyName.length < 1
      ) {
        fileName = "file-name.png";
      } else {
        fileName = companyName + ".png";
      }
      saveAs(canvas.toDataURL(), fileName);
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

  $("#addImage").click(function () {
    $("#addImageInput").trigger("click");
  });

  $("#addImageInput").change(function () {
    imageCount++;
    let content = `
      <div id="MainDiv${imageCount}" class="designBorder">
        <img src="" class="designImage" id="designImage${imageCount}"/>
      </div>`;
    $("#mainCanvas").append(content);
    readDesignImageURL(this);
  });
});

function readDesignImageURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#designImage" + imageCount).attr("src", e.target.result);

      $("#MainDiv" + imageCount).resizable({
        containment: "parent",
        resize: function (e, ui) {
          $("#designImage" + imageCount).css({
            height: ui.size.height + "px",
            width: ui.size.width + "px",
          });
        },
      });
      map["MainDiv" + imageCount] = true;
      $("#MainDiv" + imageCount).draggable({
        cursor: "pointer",
        containment: "parent",
      });
      $("#MainDiv" + imageCount).rotatable();
      $("#MainDiv" + imageCount).click(function () {
        elementClicked("MainDiv" + imageCount);
      });
    };
    reader.readAsDataURL(input.files[0]);
  }
}

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
  } else if (id.includes("MainDiv") && id !== "MainDiv") {
    $("#delete").fadeIn(300);
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
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }

  let dateTime = new Date().getTime();
  var fileName = "" + dateTime + filename;
  console.log("File Name: ", fileName);
  var ref = firebase.storage().ref("Users").child("Designs").child(fileName);
  console.log("Ref Created");
  var uploadTask = ref.putString(uri.split(",")[1], "base64", {
    contentType: "image/png",
  });

  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      progress = progress.toFixed(2);
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
      }
    },
    function (error) {
      console.log("Upload Error: ", error);
    },
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log("File available at", downloadURL);
        const userDesignId = $("#userDesignId").val();
        console.log("userDesignId: ", userDesignId);
        firebase
          .database()
          .ref()
          .child("UserDesign")
          .child(userDesignId)
          .child("designUrl")
          .set(downloadURL);
      });
    }
  );
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

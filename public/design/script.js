$(document).ready(function () {
  console.log("Design Doc is ready");
  // Tabs Listener
  $(".btn-pref .btn").click(function () {
    $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
    $(this).removeClass("btn-default").addClass("btn-primary");
  });

  $("#MainDiv").resizable({
    containment: "parent",
  });
  $("#capture").resizable({
    containment: "parent",
  });
  $("#MainDiv").draggable({
    cursor: "pointer",
    containment: "parent",
  });
  $("#capture").draggable({
    cursor: "pointer",
    containment: "parent",
  });

  $("#MainDiv").rotatable();

  $("#capture").click(function () {
    html2canvas(document.querySelector("#mainCanvas"), {
      useCORS: true,
    }).then((canvas) => {
      saveAs(canvas.toDataURL(), "file-name.png");
    });
  });
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
}

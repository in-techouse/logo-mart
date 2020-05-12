$(document).ready(function () {
  // Enable search on all selects
  $(".selectpicker").selectpicker();

  loadChat();

  $("#messageForm").submit(function (e) {
    e.preventDefault();
    var name = $("#mes-name").val();
    var email = $("#mes-email").val();
    var text = $("#mes-text").val();
    $.ajax({
      type: "POST",
      url: "/emailUs",
      data: {
        name: name,
        email: email,
        text: text,
      },
      success: function (data) {
        $("#messageForm").trigger("reset");
        console.log("Success:", data);
        localStorage.setItem("rId", data);
        $("#successMessage").show(500);
        $("#sound_tag")[0].play();
        setTimeout(function () {
          $("#successMessage").hide(500);
        }, 7000);
      },
      error: function (error) {
        console.log("Error:", error);
      },
    });
  });
});

function loadChat() {
  let id = localStorage.getItem("rId");
  if (id !== null && id !== null && id.length > 0) {
    $("#miniChatBox").show(500);
    setTimeout(function () {
      console.log("Mini Chat Box, going to bounce");
      $("#sound_tag")[0].play();
      $("#miniChatBox").effect("bounce", { times: 7 }, 2000);
    }, 2400);
  }
}

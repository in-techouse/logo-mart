$(document).ready(function () {
  console.log("Chat Document is ready");
  setTimeout(function () {
    $(".scrollbar-container").scrollTop($("#mainChatRoom")[0].scrollHeight);
  }, 1500);
  $("#messageBox").keypress(function (e) {
    if (e.which == 13) {
      let message = $("#messageBox").val();
      if (message.length < 1) {
        return;
      }

      console.log("Send Message: ", message);
      let box = `<div class="row" style="margin-left: 20px; margin-right: 20px;"> 
        <div class="float-right" style="float: right; width: 100%;">
            <div class="chat-box-wrapper chat-box-wrapper-right">
                <div style="float: right; width: 100%;">
                    <div class="chat-box">
                    <p style="width: 100%; text-align: right;">${message}</p>
                    </div>
                    <small class="opacity-6">
                        <i class="fa fa-calendar-alt mr-1"></i>
                        11:01 AM | Yesterday
                    </small>
                </div>
            </div>
        </div>
    </div>`;
      $("#mainChatRoom").append(box);
      $("#messageBox").val("");
      //   console.log("Height of Scroll Container: ", $(".scrollbar-container")[0]);
      //   $(".scrollbar-container").scrollTop(
      //     $(".scrollbar-container")[0].scrollHeight
      //   );

      $(".scrollbar-container").scrollTop($("#mainChatRoom")[0].scrollHeight);

      //   $(".scrollbar-container").scrollBottom(0);

      return false;
    }
  });
});

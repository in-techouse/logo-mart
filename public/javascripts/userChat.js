$(document).ready(function () {
  console.log("Chat page is ready");
  let rId = localStorage.getItem("rId");
  console.log("Rid: ", rId);
  let dbRef = firebase.database().ref();

  dbRef
    .child("Requests")
    .child(rId)
    .once("value")
    .then((data) => {
      let firstMessage = `
      <div class="row msg" style="margin-left: 20px; margin-right: 20px;">
            <div class="float-right" style="float: right; width: 100%;">
                <div class="chat-box-wrapper chat-box-wrapper-right">
                    <div style="float: right; width: 100%;">
                        <div class="chat-box">
                            <p style="width: 100%; text-align: right; color: #303030;">
                                <u>${data.val().email}</u>
                                <br />
                                <b>${data.val().name}</b>
                                <br />
                                ${data.val().text}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

      $("#userMainChatRoom").append(firstMessage);
      loadPreviousChat(rId, data.val().email);
      enableUserMessaging(rId, data.val().email);
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
});

function enableUserMessaging(rId, email) {
  $("#userMessageBox").keypress(function (e) {
    if (e.which == 13) {
      console.log("Key is pressed");
      console.log("Before Scrolled Done");
      $(".scrollbar-container").scrollTop(
        $("#userMainChatRoom")[0].scrollHeight
      );
      console.log("Scrolled Done");

      let message = $("#userMessageBox").val();
      if (message.length < 1) {
        return;
      }
      let messageObj = {
        id: "",
        timeStamps: new Date().getTime(),
        message: message,
        userId: email,
      };

      var formattedTime = moment(messageObj.timeStamps).format(
        "HH:mm:ss a, dddd MMM YYYY"
      );
      console.log("messageObj: ", messageObj);
      console.log("Formatted Time: ", formattedTime);
      let messageDiv = `
            <div class="row msg" style="margin-left: 20px; margin-right: 20px;">
                <div class="float-right" style="float: right; width: 100%;">
                    <div class="chat-box-wrapper chat-box-wrapper-right">
                        <div style="float: right; width: 100%;">
                            <div class="chat-box">
                                <p style="width: 100%; text-align: right; color: #303030;">${messageObj.message}</p>
                            </div>
                            <small class="opacity-6">
                                <i class="fa fa-calendar-alt mr-1"></i>
                                ${formattedTime}
                            </small>
                        </div>
                    </div>
                </div>
            </div>`;

      $("#userMainChatRoom").append(messageDiv);
      $("#userMessageBox").val("");

      $("#userChatBottomBox").animate(
        { scrollTop: $("#userChatBottomBox").prop("scrollHeight") },
        500
      );

      // $(".scrollbar-container").scrollTop(
      //   $("#userMainChatRoom")[0].scrollHeight
      // );
      $("#userMessageBox").val("");
    }
  });
}

function loadPreviousChat(rId, email) {
  firebase
    .database()
    .ref()
    .child("Chats")
    .child(rId)
    .once("value")
    .then((data) => {
      data.forEach((d) => {
        let message = d.val();
        let messageDiv = "";
        var formattedTime = moment(message.timeStamps).format(
          "HH:mm:ss a, dddd MMM YYYY"
        );
        if (message.userId === email) {
          messageDiv = `
            <div class="row msg" style="margin-left: 20px; margin-right: 20px;">
                <div class="float-right" style="float: right; width: 100%;">
                    <div class="chat-box-wrapper chat-box-wrapper-right">
                        <div style="float: right; width: 100%;">
                            <div class="chat-box">
                                <p style="width: 100%; text-align: right; color: #303030;">${message.message}</p>
                            </div>
                            <small class="opacity-6">
                                <i class="fa fa-calendar-alt mr-1"></i>
                                ${formattedTime}
                            </small>
                        </div>
                    </div>
                </div>
            </div>`;
        } else {
          messageDiv = `
            <div class="chat-wrapper p-1 msg">
                <div class="chat-box-wrapper">
                    <div>
                        <div class="chat-box">
                            <p style="width: 100%; text-align: left; color: #303030;">${message.message}</p>
                        </div>
                        <small class="opacity-6">
                            <i class="fa fa-calendar-alt mr-1"></i>
                            ${formattedTime}
                        </small>
                    </div>
                </div>
            </div>`;
        }

        $("#userMainChatRoom").append(messageDiv);
        // $("#userMainChatRoom").scrollTop(
        //   $("#userMainChatRoom")[0].scrollHeight
        // );
      });
      // $(".scrollbar-container").scrollTop(
      //   $("#userMainChatRoom")[0].scrollHeight
      // );

      // var objDiv = document.getElementById(".scrollbar-container");
      // objDiv.scrollTop = objDiv.scrollHeight;
      // $("#userMainChatRoom").animate({
      //   scrollTop: $("#userMainChatRoom").prop("scrollHeight"),
      // });
      // $(".scrollbar-container").animate(
      //   {
      //     scrollTop: $("#userMainChatRoom").position().top,
      //   },
      //   1000
      // );
      console.log("Before Scrolled Done");
      // $("#userChatBottomBox").scrollTop(
      //   $("#userChatBottomBox")[0].scrollHeight
      // );
      // $("#userChatBottomBox")[0].scrollTop = $(
      //   "#userChatBottomBox"
      // )[0].scrollHeight;
      $("#userChatBottomBox").animate(
        { scrollTop: $("#userChatBottomBox").prop("scrollHeight") },
        500
      );
      console.log("Scrolled Done");

      // $("#userMainChatRoom").animate(
      //   {
      //     scrollTop: $("#userMainChatRoom .msg:last-child").position().bottom,
      //   },
      //   "slow"
      // );
    })
    .catch((err) => {});
}

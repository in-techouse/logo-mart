$(document).ready(function () {
  console.log("Chat Document is ready");
  setTimeout(function () {
    $(".scrollbar-container").scrollTop($("#mainChatRoom")[0].scrollHeight);
  }, 1500);
  loadPreviousChat();
  $("#messageBox").keypress(function (e) {
    if (e.which == 13) {
      let message = $("#messageBox").val();
      if (message.length < 1) {
        return;
      }

      let requestId = $("#requestId").val();
      let userId = $("#userId").val();

      let messageObj = {
        id: "",
        timeStamps: new Date().getTime(),
        message: message,
        userId: userId,
      };
      var formattedTime = moment(messageObj.timeStamps).format(
        "HH:mm:ss a, dddd MMM YYYY"
      );
      console.log("messageObj: ", messageObj);
      console.log("Formatted Time: ", formattedTime);

      let box = `<div class="row" style="margin-left: 20px; margin-right: 20px;"> 
          <div class="float-right" style="float: right; width: 100%;">
              <div class="chat-box-wrapper chat-box-wrapper-right">
                  <div style="float: right; width: 100%;">
                      <div class="chat-box">
                      <p style="width: 100%; text-align: right;">${messageObj.message}</p>
                      </div>
                      <small class="opacity-6">
                          <i class="fa fa-calendar-alt mr-1"></i>
                          ${formattedTime}
                      </small>
                  </div>
              </div>
          </div>
      </div>`;
      $("#mainChatRoom").append(box);
      $("#messageBox").val("");

      $(".scrollbar-container").animate(
        {
          scrollTop: $("#mainChatRoom").height(),
        },
        1000
      );

      let mId = firebase.database().ref().child("Chats").child(requestId).push()
        .key;

      messageObj.id = mId;
      firebase
        .database()
        .ref()
        .child("Chats")
        .child(requestId)
        .child(messageObj.id)
        .set(messageObj);

      return false;
    }
  });
});

function loadPreviousChat() {
  let requestId = $("#requestId").val();
  let userId = $("#userId").val();
  firebase
    .database()
    .ref()
    .child("Chats")
    .child(requestId)
    .once("value")
    .then((data) => {
      data.forEach((d) => {
        console.log("Single Message: ", d.val());
        let m = d.val();
        if (m.userId === userId) {
          // Admin Message
          var formattedTime = moment(m.timeStamps).format(
            "HH:mm:ss a, dddd MMM YYYY"
          );
          let box = `
          <div class="row" style="margin-left: 20px; margin-right: 20px;"> 
              <div class="float-right" style="float: right; width: 100%;">
                  <div class="chat-box-wrapper chat-box-wrapper-right">
                      <div style="float: right; width: 100%;">
                          <div class="chat-box">
                          <p style="width: 100%; text-align: right;">${m.message}</p>
                          </div>
                          <small class="opacity-6">
                              <i class="fa fa-calendar-alt mr-1"></i>
                              ${formattedTime}
                          </small>
                      </div>
                  </div>
              </div>
          </div>`;
          $("#mainChatRoom").append(box);
        } else {
          // User Message
        }
      });
      $(".scrollbar-container").animate(
        {
          scrollTop: $("#mainChatRoom").height(),
        },
        1000
      );
    })
    .catch((err) => {});
}

const adminMessages = [];
let requestId = "";
let userId = "";
let currentUserId = "";
$(document).ready(function () {
  console.log("Chat Document is ready");
  requestId = $("#requestId").val();
  userId = $("#userId").val();
  currentUserId = $("#currentUserId").text();
  console.log("User Id: ", userId);
  console.log("Request Id: ", requestId);
  console.log("Current User Id: ", currentUserId);
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
  firebase
    .database()
    .ref()
    .child("Chats")
    .child(requestId)
    .once("value")
    .then((data) => {
      data.forEach((d) => {
        let m = d.val();
        adminMessages.push(m);
        let box = "";
        var formattedTime = moment(m.timeStamps).format(
          "HH:mm:ss a, dddd MMM YYYY"
        );
        if (m.userId === userId) {
          // Admin Message
          box = `
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
        } else {
          // User Message
          box = `
          <div class="chat-wrapper p-1">
            <div class="chat-box-wrapper">
              <div>
                <div class="chat-box">
                  ${m.message}
                </div>
                <small class="opacity-6">
                  <i class="fa fa-calendar-alt mr-1"></i>
                  ${formattedTime}
                </small>
              </div>
            </div>
          </div>`;
        }
        $("#mainChatRoom").append(box);
      });
      $(".scrollbar-container").animate(
        {
          scrollTop: $("#mainChatRoom").height(),
        },
        1000
      );
      listenToUserMessages();
    })
    .catch((err) => {});
}

function listenToUserMessages() {
  console.log(
    "Listen to user messages called, with Current User Id: ",
    currentUserId
  );
  console.log("Listen to user messages called, with Request Id: ", requestId);

  const messageRef = firebase
    .database()
    .ref()
    .child("Chats")
    .child(requestId)
    .orderByChild("userId")
    .equalTo(currentUserId);
  messageRef.on("value", function (snapshot) {
    const maxTimeStamps = Math.max.apply(
      Math,
      adminMessages.map(function (o) {
        return o.timeStamps;
      })
    );
    console.log("Max Timestamps: ", maxTimeStamps);
    console.log("Admin Previous Messages are: ", adminMessages);
    let playSound = false;
    snapshot.forEach((m) => {
      if (m.val().timeStamps > maxTimeStamps) {
        playSound = true;
        adminMessages.push(m.val());
        setUserMessage(m.val());
      }
    });
    if (playSound) {
      $("#sound_tag")[0].play();
    }
  });
}

function setUserMessage(m) {
  const formattedTime = moment(m.timeStamps).format(
    "HH:mm:ss a, dddd MMM YYYY"
  );
  const box = `
          <div class="chat-wrapper p-1">
            <div class="chat-box-wrapper">
              <div>
                <div class="chat-box">
                  ${m.message}
                </div>
                <small class="opacity-6">
                  <i class="fa fa-calendar-alt mr-1"></i>
                  ${formattedTime}
                </small>
              </div>
            </div>
          </div>`;
  $("#mainChatRoom").append(box);
  $(".scrollbar-container").animate(
    {
      scrollTop: $("#mainChatRoom").height(),
    },
    1000
  );
}

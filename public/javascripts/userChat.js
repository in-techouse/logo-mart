const messages = [];
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
      $("#userOrderDetail").append(firstMessage);
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
      firebase.database().ref().child("Chats").child(rId).push(messageObj);
      $(".scrollbar-container").animate(
        {
          scrollTop: $("#userMainChatRoom").height(),
        },
        1000
      );
      return false;
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
        messages.push(message);
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
      });
      $(".scrollbar-container").animate(
        {
          scrollTop: $("#userMainChatRoom").height(),
        },
        1000
      );
      listenToMessages(rId);
    })
    .catch((err) => {});
}

function listenToMessages(rId) {
  const messageRef = firebase
    .database()
    .ref()
    .child("Chats")
    .child(rId)
    .orderByChild("userId")
    .equalTo("admin-gmail_com");
  messageRef.on("value", function (snapshot) {
    const maxTimeStamps = Math.max.apply(
      Math,
      messages.map(function (o) {
        return o.timeStamps;
      })
    );
    console.log("Max Timestamps: ", maxTimeStamps);
    let playSound = false;
    snapshot.forEach((m) => {
      if (m.val().timeStamps > maxTimeStamps) {
        playSound = true;
        messages.push(m.val());
        if (m.val().userId === "admin-gmail_com") {
          setAdminMessage(m.val());
        }
      }
    });
    if (playSound) {
      $("#sound_tag")[0].play();
    }
  });
}

function setAdminMessage(message) {
  const formattedTime = moment(message.timeStamps).format(
    "HH:mm:ss a, dddd MMM YYYY"
  );
  const messageDiv = `
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
  $("#userMainChatRoom").append(messageDiv);
  $(".scrollbar-container").animate(
    {
      scrollTop: $("#userMainChatRoom").height(),
    },
    1000
  );
}

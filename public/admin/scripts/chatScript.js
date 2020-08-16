const adminMessages = [];
let requestId = "";
let userId = "";
let currentUserId = "";
$(document).ready(function() {
    // console.log("Chat Document is ready");
    requestId = $("#requestId").val();
    userId = $("#userId").val();
    currentUserId = $("#currentUserId").text().trim();
    console.log("User Id: ", userId);
    console.log("Request Id: ", requestId);
    console.log("Current User Id: ", currentUserId);
    setTimeout(function() {
        $(".scrollbar-container").scrollTop($("#mainChatRoom")[0].scrollHeight);
    }, 1500);
    loadPreviousChat();
    $("#sendAdminMessage").click(function() {
        console.log("Send Button is Clicked");
        sendAdminMessageToUser();
    });
    $("#messageBox").keypress(function(e) {
        if (e.which == 13) {
            return sendAdminMessageToUser();
        }
    });
});

function sendAdminMessageToUser() {
    let message = $("#messageBox").val();
    message = message.trim();
    if (message.length < 1) {
        return;
    }

    let messageObj = {
        id: "",
        timeStamps: new Date().getTime(),
        message: message,
        userId: userId,
        url: "",
        fileName: "",
    };
    var formattedTime = moment(messageObj.timeStamps).format(
        "HH:mm:ss a, dddd MMM YYYY"
    );
    // console.log("messageObj: ", messageObj);
    // console.log("Formatted Time: ", formattedTime);

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

    $(".scrollbar-container").animate({
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
                    let mainMessage = ``;
                    if (m.message === undefined || m.message.length < 1) {
                        mainMessage = `<a href="${m.url}" target="_blank">${m.fileName}</a>`;
                    } else {
                        mainMessage = m.message;
                    }
                    box = `
          <div class="row" style="margin-left: 20px; margin-right: 20px;"> 
              <div class="float-right" style="float: right; width: 100%;">
                  <div class="chat-box-wrapper chat-box-wrapper-right">
                      <div style="float: right; width: 100%;">
                          <div class="chat-box">
                          <p style="width: 100%; text-align: right;">${mainMessage}</p>
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
                    let mainMessage = ``;
                    if (m.message === undefined || m.message.length < 1) {
                        mainMessage = `<a href="${m.url}" target="_blank">${m.fileName}</a>`;
                    } else {
                        mainMessage = m.message;
                    }
                    // User Message
                    box = `
          <div class="chat-wrapper p-1">
            <div class="chat-box-wrapper">
              <div>
                <div class="chat-box">
                  ${mainMessage}
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
            $(".scrollbar-container").animate({
                    scrollTop: $("#mainChatRoom").height(),
                },
                1000
            );
            listenToUserMessages();
        })
        .catch((err) => {});

    $("#chatSelectFileAdmin").click(function() {
        $("#chatFileAdmin").click();
    });

    $("#chatFileAdmin").change(function() {
        selectedFiles = $("#chatFileAdmin").prop("files");
        console.log("Files are: ", selectedFiles);
        uploadAdminChatFile(selectedFiles[0]);
    });
}

function uploadAdminChatFile(file) {
    let dateTime = new Date().getTime();
    var fileName = dateTime + file.name;
    console.log("File: ", file);
    console.log("Date Tme: ", dateTime);
    console.log("File Name: ", fileName);

    var ref = firebase.storage().ref("Chats").child("Order").child(requestId).child(fileName);
    var uploadTask = ref.put(file);
    console.log("File Upload Started");

    uploadTask.on(
        "state_changed",
        function(snapshot) {
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
        function(error) {
            $("#submit").prop("disabled", false);
            console.log("Upload Error: ", error);
        },
        function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log("File available at", downloadURL);
                sendAdminFileToUser(downloadURL, file.name);
            });
        }
    );
}

function sendAdminFileToUser(url, fileName) {
    let messageObj = {
        id: "",
        timeStamps: new Date().getTime(),
        message: "",
        userId: userId,
        url: url,
        fileName: fileName,
    };

    var formattedTime = moment(messageObj.timeStamps).format(
        "HH:mm:ss a, dddd MMM YYYY"
    );
    // console.log("messageObj: ", messageObj);
    // console.log("Formatted Time: ", formattedTime);

    let box = `<div class="row" style="margin-left: 20px; margin-right: 20px;"> 
    <div class="float-right" style="float: right; width: 100%;">
        <div class="chat-box-wrapper chat-box-wrapper-right">
            <div style="float: right; width: 100%;">
                <div class="chat-box">
                <p style="width: 100%; text-align: right;">
                    <a href="${messageObj.url}" target="_blank">${messageObj.fileName}</a>
                </p>
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

    $(".scrollbar-container").animate({
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
}

function listenToUserMessages() {
    // console.log("Listen to user messages called, with Current User Id: ", currentUserId.trim());
    // console.log("Listen to user messages called, with Request Id: ", requestId);
    const messageRef = firebase
        .database()
        .ref()
        .child("Chats")
        .child(requestId)
        .orderByChild("userId")
        .equalTo(currentUserId);
    messageRef.on("value", function(snapshot) {
        // console.log("New Message Received");
        const maxTimeStamps = Math.max.apply(
            Math,
            adminMessages.map(function(o) {
                return o.timeStamps;
            })
        );
        console.log("Max Timestamps: ", maxTimeStamps);
        // console.log("Admin Previous Messages are: ", adminMessages);
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
    let mainMessage = ``;
    if (m.message === undefined || m.message.length < 1) {
        mainMessage = `<a href="${m.url}" target="_blank">${m.fileName}</a>`;
    } else {
        mainMessage = m.message;
    }
    const box = `
          <div class="chat-wrapper p-1">
            <div class="chat-box-wrapper">
              <div>
                <div class="chat-box">
                  ${mainMessage}
                </div>
                <small class="opacity-6">
                  <i class="fa fa-calendar-alt mr-1"></i>
                  ${formattedTime}
                </small>
              </div>
            </div>
          </div>`;
    $("#mainChatRoom").append(box);
    $(".scrollbar-container").animate({
            scrollTop: $("#mainChatRoom").height(),
        },
        1000
    );
}
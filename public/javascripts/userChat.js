const messages = [];
let currentChattingUserEmail = "";
$(document).ready(function() {
    // console.log("Chat page is ready");
    let rId = localStorage.getItem("rId");
    // console.log("Rid: ", rId);
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
            let contact = "";
            if (data.val().contact !== undefined) {
                contact = `<b>Contact: ${data.val().contact}</b><br />`;
            }
            let quantity = "";
            if (data.val().quantity !== undefined) {
                quantity = `<b>Quantity: ${data.val().quantity}</b><br />`;
            }
            let type = "";
            if (data.val().type !== undefined) {
                type = `<b>Type: ${data.val().type}</b><br />`;
            }
            let size = "";
            if (data.val().size !== undefined) {
                size = `<b>Size: ${data.val().size}</b><br />`;
            }
            let sealType = "";
            if (data.val().sealType !== undefined) {
                sealType = `<b>Seal Type: ${data.val().sealType}</b><br />`;
            }
            const userOrderDetail = `
            <div class="row msg" style="margin-left: 20px; margin-right: 20px;">
                <div class="float-right" style="float: right; width: 100%;">
                    <div class="chat-box-wrapper chat-box-wrapper-right">
                        <div style="float: right; width: 100%;">
                            <div class="chat-box">
                                <p style="width: 100%; text-align: left; color: #303030;">
                                    <u>Email: ${data.val().email}</u>
                                    <br />
                                    <b>Name: ${data.val().name}</b>
                                    ${contact}
                                    ${quantity}
                                    ${type}
                                    ${size}
                                    ${sealType}
                                    ${data.val().text}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

            $("#userMainChatRoom").append(firstMessage);
            $("#userOrderDetail").append(userOrderDetail);
            currentChattingUserEmail = data.val().email;
            loadPreviousChat(rId, data.val().email);
            enableUserMessaging(rId, data.val().email);
        })
        .catch((err) => {
            // console.log("Error: ", err);
        });

    $("#chatSelectFileUser").click(function() {
        $("#chatFileUser").click();
    });

    $("#chatFileUser").change(function() {
        selectedFiles = $("#chatFileUser").prop("files");
        console.log("Files are: ", selectedFiles);
        uploadUserChatFile(selectedFiles[0]);
    });
});

function uploadUserChatFile(file) {
    let rId = localStorage.getItem("rId");
    let dateTime = new Date().getTime();
    var fileName = dateTime + file.name;
    console.log("File: ", file);
    console.log("Date Tme: ", dateTime);
    console.log("File Name: ", fileName);

    var ref = firebase.storage().ref("Chats").child("Order").child(rId).child(fileName);
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
                sendUserFileToAdmin(rId, downloadURL, file.name)
            });
        }
    );
}


function sendUserFileToAdmin(rId, url, fileName) {
    let messageObj = {
        id: "",
        timeStamps: new Date().getTime(),
        message: "",
        userId: currentChattingUserEmail,
        url: url,
        fileName: fileName,
    };

    // console.log("Message Obj is: ", messageObj);

    var formattedTime = moment(messageObj.timeStamps).format(
        "HH:mm:ss a, dddd MMM YYYY"
    );

    let messageDiv = `
    <div class="row msg" style="margin-left: 20px; margin-right: 20px;">
        <div class="float-right" style="float: right; width: 100%;">
            <div class="chat-box-wrapper chat-box-wrapper-right">
                <div style="float: right; width: 100%;">
                    <div class="chat-box">                        
                        <p style="width: 100%; text-align: right; color: #303030;">
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

    $("#userMainChatRoom").append(messageDiv);
    $("#userMessageBox").val("");
    let mId = firebase.database().ref().child("Chats").child(rId).push().key;
    messageObj.id = mId;
    firebase.database().ref().child("Chats").child(rId).child(mId).set(messageObj);
    // console.log("Message Obj Saved to database");
    $(".scrollbar-container").animate({
            scrollTop: $("#userMainChatRoom").height(),
        },
        1000
    );
    // console.log("Scroll to bottom");
}

function enableUserMessaging(rId, email) {
    $("#userSendMessage").click(function() {
        senduserMessageToAdmin(rId, email);
    });
    $("#userMessageBox").keypress(function(e) {
        if (e.which == 13) {
            // console.log("Key is pressed");
            return senduserMessageToAdmin(rId, email);
        }
    });
}

function senduserMessageToAdmin(rId, email) {
    let message = $("#userMessageBox").val();
    message = message.trim();
    if (message.length < 1) {
        return;
    }
    let messageObj = {
        id: "",
        timeStamps: new Date().getTime(),
        message: message,
        userId: email,
        url: "",
        fileName: ""
    };

    var formattedTime = moment(messageObj.timeStamps).format(
        "HH:mm:ss a, dddd MMM YYYY"
    );
    // console.log("messageObj: ", messageObj);
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
    let mId = firebase.database().ref().child("Chats").child(rId).push().key;
    messageObj.id = mId;
    firebase.database().ref().child("Chats").child(rId).child(mId).set(messageObj);
    $(".scrollbar-container").animate({
            scrollTop: $("#userMainChatRoom").height(),
        },
        1000
    );
    return false;
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
                    let mainMessage = ``;
                    if (message.message === undefined || message.message.length < 1) {
                        mainMessage = `<a href="${message.url}" target="_blank">${message.fileName}</a>`;
                    } else {
                        mainMessage = message.message;
                    }
                    messageDiv = `
            <div class="row msg" style="margin-left: 20px; margin-right: 20px;">
                <div class="float-right" style="float: right; width: 100%;">
                    <div class="chat-box-wrapper chat-box-wrapper-right">
                        <div style="float: right; width: 100%;">
                            <div class="chat-box">
                                <p style="width: 100%; text-align: right; color: #303030;">${mainMessage}</p>
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
                    if (message.message === undefined || message.message.length < 1) {
                        mainMessage = `<a href="${message.url}" target="_blank">${message.fileName}</a>`;
                    } else {
                        mainMessage = message.message;
                    }
                    messageDiv = `
            <div class="chat-wrapper p-1 msg">
                <div class="chat-box-wrapper">
                    <div>
                        <div class="chat-box">
                            <p style="width: 100%; text-align: left; color: #303030;">${mainMessage}</p>
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
            $(".scrollbar-container").animate({
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
    messageRef.on("value", function(snapshot) {
        const maxTimeStamps = Math.max.apply(
            Math,
            messages.map(function(o) {
                return o.timeStamps;
            })
        );
        // console.log("Max Timestamps: ", maxTimeStamps);
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
    let mainMessage = ``;
    if (message.message === undefined || message.message.length < 1) {
        mainMessage = `<a href="${message.url}" target="_blank">${message.fileName}</a>`;
    } else {
        mainMessage = message.message;
    }
    const messageDiv = `
    <div class="chat-wrapper p-1 msg">
        <div class="chat-box-wrapper">
            <div>
                <div class="chat-box">
                    <p style="width: 100%; text-align: left; color: #303030;">${mainMessage}</p>
                </div>
                <small class="opacity-6">
                    <i class="fa fa-calendar-alt mr-1"></i>
                    ${formattedTime}
                </small>
            </div>
        </div>
    </div>`;
    $("#userMainChatRoom").append(messageDiv);
    $(".scrollbar-container").animate({
            scrollTop: $("#userMainChatRoom").height(),
        },
        1000
    );
}
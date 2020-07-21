let orderFiles = [];
let orderUrls = [];
$(document).ready(function () {
  console.log("Deliver Order is ready");
  $("#deliverOrder").prop("disabled", true);
  $("#files").change(function () {
    orderFiles = $("#files").prop("files");
    console.log("Files are: ", orderFiles);
    $("#orderUpload").show(300);
  });

  $("#orderUpload").click(function () {
    console.log("Files to be deliver are: ", orderFiles);
    $("#orderUpload").prop("disabled", true);
    $(".progress").show(100);
    uploadOrderFile(orderFiles[0]);
  });
  $("#deliverOrder").submit(function (e) {
    e.preventDefault();
    saveToDatabase();
  });
});

function uploadOrderFile(file) {
  let dateTime = new Date().getTime();
  var fileName = dateTime + file.name;
  console.log("File: ", file);
  console.log("Date Tme: ", dateTime);
  console.log("File Name: ", fileName);

  var ref = firebase.storage().ref("Admins").child("Order").child(fileName);
  var uploadTask = ref.put(file);
  console.log("File Upload Started");

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
      $("#submit").prop("disabled", false);
      console.log("Upload Error: ", error);
    },
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log("File available at", downloadURL);
        orderUrls.push(downloadURL);
        if (orderUrls.length >= orderFiles.length) {
          console.log("Order URLS are: ", orderUrls);
          $("#orderUpload").prop("disabled", false);
          $(".progress").hide(100);
          $("#orderUpload").hide(100);
          $("#deliverOrder").prop("disabled", false);
        } else {
          uploadOrderFile(orderFiles[orderUrls.length]);
        }
      });
    }
  );
}

function saveToDatabase() {
  let order = {
    id: requestId,
    files: orderUrls,
    userId: currentUserId,
    status: "Delivered",
    content: $("#orderContent").val(),
  };
  console.log("Order is: ", order);
  firebase
    .database()
    .ref()
    .child("Orders")
    .child(order.id)
    .set(order)
    .then((r) => {
      window.location.reload();
    })
    .catch((e) => {});
}

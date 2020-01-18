// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB-oh_jVJatT5kMBk2NYb7wZ15CRLQ7BDo",
  authDomain: "logo-mart.firebaseapp.com",
  projectId: "logo-mart",
  storageBucket: "logo-mart.appspot.com",
  appId: "1:654640285591:web:9dceebf9d27f8ec999a6d2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(function() {
    console.log("Upload is Ready");
    $("#submit").prop("disabled", true);

    $("#upload").click(function() {
        $(".progress").show(100);
        console.log("Image Upload Button Clicked");
        var file = document.getElementById("designFile").files[0];
        let dateTime = new Date().getTime();
        var fileName = dateTime + file.name;
        console.log("File: ", file);
        console.log("Date Tme: ", dateTime);
        console.log("File Name: ", fileName);
    
        var ref = firebase
          .storage()
          .ref("Admins")
          .child("Designs")
          .child(fileName);
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
              console.log('Upload Error: ', error);
          },
          function() {
            
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log("File available at", downloadURL);
                $("#designURL").val(downloadURL);
                $(".progress").hide(100);   
                $("#submit").prop("disabled", false);             
            });
          }
        );
      });
});

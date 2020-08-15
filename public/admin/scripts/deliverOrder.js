let orderFiles = [];
let orderUrls = [];
$(document).ready(function() {
    console.log("Deliver Order is ready");
    $("#deliverOrder").prop("disabled", true);
    $("#files").change(function() {
        orderFiles = $("#files").prop("files");
        console.log("Files are: ", orderFiles);
        $("#orderUpload").show(300);
    });

    $("#orderUpload").click(function() {
        console.log("Files to be deliver are: ", orderFiles);
        $("#orderUpload").prop("disabled", true);
        $(".progress").show(100);
        uploadOrderFile(orderFiles[0]);
    });
    $("#deliverOrder").submit(function(e) {
        e.preventDefault();
        saveToDatabase();
    });
    loadOldDeliveries();
});

function loadOldDeliveries() {
    firebase.database().ref().child("Orders").orderByChild("requestId").equalTo(requestId).once('value').then(data => {
        const deliveries = [];
        data.forEach(d => {
            console.log("Delivery: ", d.val());
            deliveries.push(d.val());
        });
        deliveries.reverse();
        showOrderDeliveries(deliveries);
    }).catch(err => {
        console.log("Old Deliveries Error: ", err);
    });
}

function showOrderDeliveries(deliveries) {
    let count = deliveries.length;
    deliveries.forEach(d => {
        let fileContent = ``;
        const files = d.files;
        let fileCount = 1;
        files.forEach(f => {
            fileContent = fileContent + `<a href=${f} target="_blank" style="text-decoration: none; cursor: pointer;">File ${fileCount}</a><br/>`;
            fileCount++;
        });
        const content = `
          <div class="col-md-12">
            <h4>Order Delivery ${count} <b>(${d.status})</b></h4>
            <p><b>YOUR MESSAGE</b><p>
            <p>${d.content}</p>
            <p><b>CLIENT's MESSAGE</b><p>
            <p>${d.userContent === undefined ? "" : d.userContent}</p>
            ${fileContent}            
          </div>
          <hr/>
        `;
        $("#oldDeliveries").append(content);
        count--;
    });
}

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
        id: "",
        requestId,
        files: orderUrls,
        userId: currentUserId,
        status: "Delivered",
        content: $("#orderContent").val(),
    };
    console.log("Order is: ", order);
    let oId = firebase.database().ref().child("Orders").push().key;
    order.id = oId;
    firebase
        .database()
        .ref()
        .child("Orders")
        .child(order.id)
        .set(order)
        .then((r) => {
            window.location.reload();
        })
        .catch((e) => {
            window.location.reload();
        });
}
$(document).ready(function() {
    let rId = localStorage.getItem("rId");
    let dbRef = firebase.database().ref();
    dbRef.child("Orders").orderByChild("requestId").equalTo(rId).once("value").then(data => {
        let count = 1;
        data.forEach(d => {
            displayOrder(d.val(), count, data.numChildren());
            count++;
        });
    }).catch(e => {
        console.log("Get Order error: ", e);
    });
});

function displayOrder(data, count, length) {
    let fileContent = ``;
    const files = data.files;
    let fileCount = 1;
    files.forEach(f => {
        fileContent = fileContent + `<a href=${f} target="_blank" style="text-decoration: none; cursor: pointer;">File ${fileCount}</a><br/>`;
        fileCount++;
    });
    let buttons = ``;
    if (count === length && data.status === "Delivered") {
        buttons = `
            <div class="row">
                <div class="col-md-12">
                    <textarea id="userMessageOnOrder" class="form-control" style="width: 100%; resize: none; margin-bottom: 17px; margin-top: 17px;" placeholder="Your message"></textarea>
                    <p id="errorMessage" style="display: none;">Your feedback on order is required</p>
                </div>
                <br/><br/>
                <div class="col-md-5">
                    <p class="btn btn-danger btn-block" onclick="submitOrderStatus('Rejected', '${data.id}')">REJECT</p>
                </div>
                <div class="col-md-2"></div>
                <div class="col-md-5">
                    <p class="btn btn-success btn-block" onclick="submitOrderStatus('Accepted', '${data.id}')">ACCEPT</p>
                </div>
            </div>
        `;
    }
    const content = `
    <div class="col-md-12">
        <h4>Order Delivery ${count} <b>(${data.status})</b></h4>
        <p><b>ADMIN MESSAGE</b><p>
        <p>${data.content}</p>
        <p><b>YOUR MESSAGE</b><p>
        <p>${data.userContent === undefined ? "" : data.userContent}</p>
        ${fileContent} 
        ${buttons}           
    </div>
    <hr style="background-color: white;" />`;
    $("#userOrderDeliveries").prepend(content);
}

function submitOrderStatus(status, id) {
    let userMessageOnOrder = $("#userMessageOnOrder").val();
    userMessageOnOrder = userMessageOnOrder.trim();
    if (userMessageOnOrder.length < 1) {
        $("#errorMessage").show(300);
        return;
    }
    $("#errorMessage").hide(300);
    let dbRef = firebase.database().ref();
    dbRef.child("Orders").child(id).once("value").then(data => {
        let order = data.val();
        order.status = status;
        order.userContent = userMessageOnOrder;
        dbRef.child("Orders").child(id).set(order).then(r => {
            window.location.reload();
        }).catch(r => {
            window.location.reload();
        });
    }).catch(e => {
        console.log("Get Order error: ", e);
    });
}
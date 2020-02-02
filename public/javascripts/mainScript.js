$(document).ready(function() {
  // Enable search on all selects
  $(".selectpicker").selectpicker();
  $("#messageForm").submit(function(e) {
    e.preventDefault();
    console.log("Form is Submit");
    var name = $("#mes-name").val();
    console.log("Name value is:", name);
    var email = $("#mes-email").val();
    console.log("Email value is:", email);
    var text = $("#mes-text").val();
    console.log("Text value is:", text);
    $.ajax({
      type: "POST",
      url: "/emailUs",
      data:{
        name: name,
        email:email,
        text:text,
      },
      success: function(data){
        console.log("Success:",data);

      },
      error:function(error){
        console.log ("Error:",error);

      }
    });
  });
});

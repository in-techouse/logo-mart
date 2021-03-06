$(document).ready(function () {
  // Enable search on all selects
  $(".selectpicker").selectpicker();

  loadDesigns();
  loadChat();

  $("#messageForm").submit(function (e) {
    e.preventDefault();
    var name = $("#mes-name").val();
    var email = $("#mes-email").val();
    var text = $("#mes-text").val();
    $.ajax({
      type: "POST",
      url: "/emailUs",
      data: {
        name: name,
        email: email,
        text: text,
      },
      success: function (data) {
        $("#messageForm").trigger("reset");
        console.log("Success:", data);
        localStorage.setItem("rId", data);
        $("#successMessage").show(500);
        $("#sound_tag")[0].play();
        setTimeout(function () {
          $("#successMessage").hide(500);
          window.location.href = "/chat";
        }, 7000);
      },
      error: function (error) {
        console.log("Error:", error);
      },
    });
  });
});

function loadDesigns() {
  firebase
    .database()
    .ref()
    .child("UserDesign")
    .limitToLast(15)
    .once("value")
    .then((result) => {
      let count = 0;
      let designs = [];
      result.forEach((r) => {
        const design = r.val();
        if (
          design.designUrl !== null &&
          design.designUrl !== undefined &&
          design.designUrl.length > 0
        ) {
          designs.push(design);
        }
      });
      designs.reverse();
      designs.forEach((design) => {
        if (count < 6) {
          let content = `
            <li class="slide-item swiper-slide">
                <div class="item-wrapper">
                <div class="illustr" style="height: 700px !important;">
                    <img src="${design.designUrl}" alt="Image" class="img" style="height: 700px !important;"/>
                </div>
                <a class="legend" href="item.html#project_url">
                    <h3 class="display-3">${design.companyName}</h3>
                    <h4>${design.tagline}</h4>
                </a>
                </div>
            </li>`;
          $("#logoMartProjects").append(content);
          count++;
        }
      });
      // 4 Carousel Slider
      new Swiper(".carousel-swiper-beta-demo .swiper-container", {
        pagination: ".carousel-swiper-beta-demo .items-pagination",
        paginationClickable: ".carousel-beta-alpha-demo .items-pagination",
        nextButton: ".carousel-swiper-beta-demo .items-button-next",
        prevButton: ".carousel-swiper-beta-demo .items-button-prev",
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        slidesPerView: 1,
        spaceBetween: 0,
        breakpoints: {
          1024: {
            slidesPerView: 1,
          },
          800: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          440: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        },
      });
    });
}

function loadChat() {
  let id = localStorage.getItem("rId");
  if (id !== null && id !== null && id.length > 0) {
    console.log("Current Location: ", window.location.href);
    let url = window.location.href;
    if (!url.includes("chat")) {
      $("#miniChatBox").show(500);
      // setTimeout(function () {
      //   console.log("Mini Chat Box, going to bounce");
      //   $("#sound_tag")[0].play();
      $("#miniChatBox").effect("bounce", { times: 7 }, 2000);
      // }, 2400);
    }
  }
}

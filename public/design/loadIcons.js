const icons = [
  // Ion Icons
  { icon: "ion-android-add", text: "Add" },
  { icon: "ion-android-add-circle", text: "Add Circle" },
  { icon: "ion-android-alarm-clock", text: "Alarm Clock" },
  { icon: "ion-android-alert", text: "Alert Circle" },
  { icon: "ion-android-apps", text: "Apps" },
  { icon: "ion-android-arrow-back", text: "Arrow Back" },
  { icon: "ion-android-arrow-down", text: "Arrow Down" },
  { icon: "ion-android-arrow-dropdown", text: "Arrow Down" },
  { icon: "ion-android-arrow-dropdown-circle", text: "Arrow Down" },
  { icon: "ion-android-arrow-dropleft", text: "Arrow Left" },
  { icon: "ion-android-arrow-dropleft-circle", text: "Arrow Left" },
  { icon: "ion-android-arrow-dropright", text: "Arrow Right" },
  { icon: "ion-android-arrow-dropright-circle", text: "Arrow Right" },
  { icon: "ion-android-arrow-dropup", text: "Arrow Top" },
  { icon: "ion-android-arrow-dropup-circle", text: "Arrow Top" },
  { icon: "ion-android-arrow-dropup-circle", text: "Arrow Top" },
  { icon: "ion-android-arrow-forward", text: "Arrow Right" },
  { icon: "ion-android-bar", text: "Bar" },
  { icon: "ion-android-boat", text: "Boat" },
  { icon: "ion-alert", text: "My Text" },
  { icon: "icon-name-from-file", text: "Icon text to be displayed to user" },

  // Font Awesome Icons
  { icon: "faIcon fa fa-automobile", text: "Automobile" },
  { icon: "faIcon fa fa-ambulance", text: "Ambulance" },
  { icon: "faIcon fa fa-balance-scale", text: "Ambulance" },
  { icon: "faIcon fa fa-android", text: "Android Icon" },
  { icon: "faIcon fa icon-name-from-file", text: "Icon text to be displayed to user" },
];

$(document).ready(function () {
  console.log("Screen height", screen.height);
  $("#iconTabs").height(screen.height - 200);
  icons.forEach((icon) => {
    let iconDiv = `<div class="col-md-4 designCol" onclick="iconSelected('${icon.icon}')">
        <i class="icon designTemplateIcon ${icon.icon}"></i>
        <br />
        <p class="designTemplateText">${icon.text}</p>
    </div>`;
    $("#iconTabs").append(iconDiv);
  });
});

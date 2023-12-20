$(function () {

  //Select the save button element and add an event listener that executes handleSave() on click.
  var saveButton = $('[aria-label="save"]');
  $(saveButton).on('click', handleSave)

  //gets current date and displays it at the top of the page.
  var today = dayjs();
  var currentDayEl = $('#currentDay');
  currentDayEl.text(today.format('dddd, MMMM D'));

  loadSlots();
});


//when button is clicked the textarea input is stored into localStorage and 
//stored under the id of that time slot.
function handleSave(event) {
  var btn = event.target

  //clicking on the icon will also be treated as pressing on the button.
  if ($(event.target).is('i')) {
    btn = $(btn).parent();
  }
  var textareaEl = $(btn).siblings()[1];
  var input = $(textareaEl).val();
  var timeSlot = $(btn).parent().attr("id");
  localStorage.setItem(timeSlot, input);
}

//gets the current hour and sets a past, present or future class for each slot from 9am to 5pm, 
//then loads the stored text in localStorage for that slot.
function loadSlots() {
  var time = dayjs().format('H');

  for (var i = 9; i <= 17; i++) {
    var elementId = "hour-" + i;
    var savedContent = localStorage.getItem(elementId)

    if (i < time) {
      slotEl = ("#" + elementId);
      $(slotEl).addClass("past");
    }
    else if (i > time) {
      slotEl = ("#" + elementId);
      $(slotEl).addClass("future");
    }
    else if (i == time) {
      slotEl = ("#" + elementId);
      $(slotEl).addClass("present");
    }

    var textEl = $(slotEl).children("textarea")[0];
    $(textEl).text(savedContent);
  }
}

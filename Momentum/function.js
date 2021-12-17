$("#userName").html(getSavedName("userName"));
$("#To-do").html(getSavedToDo("toDo"));

for (var i in localStorage) {
  if (i == "visibility") {
    localStorage.removeItem(i);
  }
}

function doneTyping() {
  $(".continue").css({ visibility: "visible", opacity: "1" });
}

function time() {
  const DATE = document.querySelector(".time");
  const HOUR = new Date().getHours();
  const MINUTE = new Date().getMinutes();
  DATE.innerHTML = ("0" + HOUR).substr(-2) + ":" + ("0" + MINUTE).substr(-2);

  if (HOUR <= 11) {
    $("#sayWelcome").html("Good morning, ");
  } else if (HOUR >= 12 && HOUR < 18) {
    $("#sayWelcome").html("Good afternoon, ");
  } else if (HOUR >= 18) {
    $("#sayWelcome").html("Good evening, ");
  }
}

function setTime() {
  setInterval(time, 1000);
}

function submit() {
  $(".symbol").fadeOut(640);
  $(".name").fadeOut(640);
  $(".continue").hide();
  $(".welcome").delay(780).fadeIn(640);
  $(".time").delay(780).fadeIn(640);
  $(".warning").css("display", "none");
  $(".toDoList").delay(780).fadeIn(640);
  $(".askToDo").delay(780).fadeIn(640);
}

function setDisplay(target, value) {
  $(target).css("display", value);
  $(target + " *").css("display", value);
}

function doneShow() {
  $(".toDoList").css({
    transition: "visibility 0.5s, opacity 0.5s linear",
    visibility: "visible",
    opacity: "1",
  });
}

function setDisplayToDoList() {
  setDisplay(".toDoList", "none");
}

function saveName(name) {
  var val = name.value;
  localStorage.setItem("userName", val);
}

function getSavedName(name) {
  if (!localStorage.getItem(name)) {
    setTimeout(function () {
      $(".symbol").fadeIn(600);
      $(".symbol *").fadeIn(600);
      $(".name").fadeIn(600);
      $(".name *").fadeIn(600);
    }, 1000);
  } else {
    setTimeout(function () {
      $(".welcome").fadeIn(600);
      $(".time").fadeIn(600);
      $(".continue").hide();
      $(".warning").css("display", "none");
      $(".askToDo").fadeIn(600);
    }, 1000);
  }

  return localStorage.getItem(name);
}

function saveToDo(toDo) {
  var val = toDo.value;
  localStorage.setItem("toDo", val);
}

function getSavedToDo(toDo) {
  if (localStorage.getItem(toDo)) {
    $(".askToDo").css({
      visibility: "hidden",
      opacity: "0",
      transition: "visibility 0.5s, opacity 0.5s linear",
    });
    setTimeout(function () {
      setDisplay(".toDoList", "block");
      setDisplay(".hover *", "inline");

      showToDoList = setTimeout(doneShow, 500);

      $(".toDoList h3").css({ visibility: "visible", opacity: "1" });
      $(".toDoList #To-do").css({
        display: "inline",
        visibility: "visible",
        opacity: "1",
      });
    }, 570);
  }

  return localStorage.getItem("toDo");
}

function saveCheckbox(check) {
  localStorage.setItem("check", check);
}

function getSavedCheckbox() {
  if (!localStorage.getItem("check")) {
    $(".checkbox i").attr("class", "far fa-square");
    $("#To-do").css("text-decoration", "none");
  } else {
    $(".checkbox i").attr("class", "far fa-check-square");
    $("#To-do").css("text-decoration", "line-through");
  }
}

setTime();

getSavedCheckbox();

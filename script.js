var hideToDoList;
var showToDoList;
const DONE_TYPING_INTERVAL = 4000;
const DONE_HIDE_INTERVAL = 480;
let compliments = ["Good job!", "Great!", "Nice.", "Great work!", "Way to go!"];

$(document).ready(function () {
  $("#askName").keydown(function (e) {
    if (e.which == 13) {
      $(".continue").css({ visibility: "hidden", opacity: "0" });
      $(".warning").css({
        transition: "visibility 0s, opacity 0.9s",
        visibility: "visible",
        opacity: "1",
      });
    }
  });

  $("#askName").keyup(function (e) {
    if ($(this).val().length > 0 && $(this).val().match(/^ *$/) == null) {
      $(".continue").css({ bottom: "21px", top: "-21px" });
      $(".warning").css({
        transition: "visibility 0.5s, opacity 0.5s",
        visibility: "hidden",
        opacity: "0",
      });

      typingTimer = setTimeout(doneTyping, DONE_TYPING_INTERVAL);

      $(this).keydown(function () {
        clearTimeout(typingTimer);
      });

      $(this).on("keydown", function (e) {
        if (e.which == 13) {
          saveName(this);
          $(".warning").css({
            transition: "visibility 0.4s, opacity 0.4s",
            visibility: "hidden",
            opacity: "0",
          });
          $(".continue button").click(submit);
          $(".continue button").click();
        }
      });
    } else {
      $(".continue button").prop("onclick", null).off("click");
      $("#askName").off("keydown");
      $("#askName").keydown(function (e) {
        if (e.which == 13) {
          $(".continue").css({ bottom: "0", top: "21px" });
          if ($(".continue").css("visibility") === "visible") {
            $(".warning").css({
              transition: "visibility 0s 0.2s, opacity 0.5s 0.2s",
              visibility: "visible",
              opacity: "1",
            });
          } else {
            $(".warning").css({
              visibility: "visible",
              opacity: "1",
            });
          }
        }
      });
    }

    $(".welcome").attr("data-name", $(this).val());
    $("#userName").html($(this).val());
  });

  $("#userName").dblclick(function () {
    $(this).hide();
    $("#changeName").val($(this).html());
    $("#changeName").css("background-color", "white");
    $("#changeName").show();
    $("#changeName").css("background-color", "transparent");
    $("#changeName").focus();
  });

  $("#changeName").focus(function (e) {
    $("#userName").css("background-color", "white");
    $(this).keydown(function (e) {
      if (e.which == 13) {
        $(this).hide();
        $("#userName").show();
        $("#userName").css("background-color", "transparent");
      }
    });
  });

  $("#changeName").keyup(function (e) {
    $(this).keydown(function (e) {
      if (e.which == 13 || e.which == 27) {
        $("#changeName").hide();
        if ($("#changeName").val().length > 0) {
          saveName(this);
          $("#userName").html($("#changeName").val());
        }

        $("#userName").show();
        $("#userName").css("background-color", "transparent");
      }
    });
  });

  $(window).click(function (event) {
    if (!event.target.matches("#changeName")) {
      $("#changeName").hide();
      if ($("#changeName").val().length > 0) {
        $("#userName").html($("#changeName").val());
        saveName(document.querySelector("#changeName"));
      }

      $("#userName").show();
      $("#userName").css("background-color", "transparent");
    }
  });

  $("#askToDo").focus(function () {
    if ($(this).val().length > 0) {
      $(this).keydown(function (e) {
        if (e.which == 13) {
          saveToDo(this);
          localStorage.setItem("check", "not-check");
          $(".askToDo").css({
            visibility: "hidden",
            opacity: "0",
            transition: "visibility 0.5s, opacity 0.5s linear",
          });

          setDisplay(".toDoList", "block");
          setDisplay(".hover *", "inline");
          showToDoList = setTimeout(doneShow, 700);

          $(".toDoList h3").css({ visibility: "visible", opacity: "1" });
          $(".toDoList #To-do").css({
            display: "inline",
            visibility: "visible",
            opacity: "1",
          });
        }
      });
    } else {
      $(this).off("keydown");
    }
    $(".toDoList").css({
      visibility: "hidden",
      opacity: "0",
    });
  });

  $("#askToDo").keyup(function (e) {
    $(".checkbox i").attr("class", "far fa-square");
    $("#To-do").css("text-decoration", "none");
    clearTimeout(hideToDoList);
    if ($(this).val().length > 0 && $(this).val().match(/^ *$/) == null) {
      $(this).keydown(function (e) {
        if (e.which == 13) {
          saveToDo(this);
          localStorage.removeItem("check");
          $(".askToDo").css({
            visibility: "hidden",
            opacity: "0",
            transition: "visibility 0.5s, opacity 0.5s linear",
          });

          setDisplay(".toDoList", "block");
          setDisplay(".hover *", "inline");

          showToDoList = setTimeout(doneShow, 700);

          $(".toDoList h3").css({ visibility: "visible", opacity: "1" });
          $(".toDoList #To-do").css({
            display: "inline",
            visibility: "visible",
            opacity: "1",
          });
        }
      });
    } else {
      $("#askToDo").off("keydown");
    }
    $("#To-do").html($("#askToDo").val());
  });

  $("#To-do").dblclick(function (e) {
    $("#askToDo").val(localStorage.getItem("toDo"));
    $(".toDoList").css({
      transition: "visibility 0.5s opacity 0.5s",
      visibility: "hidden",
      opacity: "0",
    });

    hideToDoList = setTimeout(setDisplayToDoList, DONE_HIDE_INTERVAL);

    $(".askToDo").css({
      visibility: "visible",
      opacity: "1",
      transition: "visibility 0.5s 0.65s, opacity 0.5s 0.65s linear",
    });

    setTimeout(function () {
      $("#askToDo").focus();
    }, 800);
  });

  $(".toDoList").hover(
    function () {
      $(".checkbox").css({ visibility: "visible", opacity: "1" });
      $(".checkbox i").css({ visibility: "visible", opacity: "1" });
      $(".cancel").css({ visibility: "visible", opacity: "1" });
      $(".cancel *").css({ visibility: "visible", opacity: "1" });
    },
    function () {
      $(".checkbox").css({ visibility: "hidden", opacity: "0" });
      $(".checkbox i").css({ visibility: "hidden", opacity: "0" });
      $(".cancel").css({ visibility: "hidden", opacity: "0" });
      $(".cancel *").css({ visibility: "hidden", opacity: "0" });
    }
  );

  $(".checkbox").click(function () {
    if ($(".checkbox i").hasClass("fa-square")) {
      saveCheckbox("checked");
      $(".checkbox i").attr("class", "far fa-check-square");
      $("#To-do").css("text-decoration", "line-through");
      $("#To-do").off("dblclick");
      $(".compliment").css({ visibility: "visible", opacity: "1" });
      var compliment =
        compliments[Math.floor(Math.random() * compliments.length)];
      $(".compliment").html(compliment);
      var ShowCompliment = setTimeout(function () {
        $(".compliment").css({ visibility: "hidden", opacity: "0" });
      }, 1200);
    } else {
      clearTimeout(ShowCompliment);
      localStorage.removeItem("check");
      $(".compliment").css({ visibility: "hidden", opacity: "0" });
      $(".checkbox i").attr("class", "far fa-square");
      $("#To-do").css("text-decoration", "none");

      $("#To-do").dblclick(function (e) {
        $(".toDoList").css({
          transition: "visibility 0.5s opacity 0.5s",
          visibility: "hidden",
          opacity: "0",
        });

        hideToDoList = setTimeout(setDisplayToDoList, DONE_HIDE_INTERVAL);

        $(".askToDo").css({
          visibility: "visible",
          opacity: "1",
          transition: "visibility 0.5s 0.65s, opacity 0.5s 0.65s linear",
        });

        setTimeout(function () {
          $("#askToDo").focus();
        }, 800);
      });
    }
  });

  $(".cancel").click(function () {
    $("#To-do").dblclick(function (e) {
      $(".toDoList").css({
        transition: "visibility 0.5s opacity 0.5s",
        visibility: "hidden",
        opacity: "0",
      });

      hideToDoList = setTimeout(setDisplayToDoList, DONE_HIDE_INTERVAL);

      $(".askToDo").css({
        visibility: "visible",
        opacity: "1",
        transition: "visibility 0.5s 0.65s, opacity 0.5s 0.65s linear",
      });

      setTimeout(function () {
        $("#askToDo").focus();
      }, 800);
    });

    localStorage.removeItem("toDo");
    localStorage.removeItem("check");

    $(".compliment").css({
      visibility: "hidden",
      opacity: "0",
      transition: "visibility 0.4s, opacity 0.4s linear",
    });

    $(".toDoList").css({
      transition: "visibility 0.5s opacity 0.5s",
      visibility: "hidden",
      opacity: "0",
    });

    hideToDoList = setTimeout(setDisplayToDoList, DONE_HIDE_INTERVAL);

    $(".askToDo").css({
      visibility: "visible",
      opacity: "1",
      transition: "visibility 0.5s 0.6s, opacity 0.5s 0.6s linear",
    });

    $("#askToDo").val("");
  });
});

function stopVideos() {
  videos.forEach((vid) => {
    vid.pause();
  });
  console.log("videos stopped");
}
function playVideos(playDelay) {
  timePlayVideo = setTimeout(() => {
    videos.forEach((vid) => {
      vid.currentTime = 0;
      vid.play();
    });
  }, playDelay);
  console.log("videos played");
}
function MainSlider() {
  $(".slider").each(function () {
    playVideos();
    var $this = $(this);
    var $group = $this.find(".slide_group");
    var $slides = $this.find(".slide");
    var bulletArray = [];
    var currentIndex = 0;
    var timeout, timeStop, timePlayVideo;
    function move(newIndex) {
      var animateLeft, slideLeft;
      advance(newIndex);

      if ($group.is(":animated") || currentIndex === newIndex) {
        return;
      }

      bulletArray[currentIndex].removeClass("active");
      bulletArray[newIndex].addClass("active");

      if (newIndex > currentIndex) {
        slideLeft = "100%";
        animateLeft = "-100%";
      } else {
        slideLeft = "-100%";
        animateLeft = "100%";
      }

      $slides.eq(newIndex).css({
        display: "block",
        left: slideLeft,
      });
      $group.animate(
        {
          left: animateLeft,
        },
        function () {
          $slides.eq(currentIndex).css({
            display: "none",
          });
          $slides.eq(newIndex).css({
            left: 0,
          });
          $group.css({
            left: 0,
          });
          currentIndex = newIndex;
        }
      );
    }

    function advance(newIndex) {
      clearTimeout(timeout);
      clearTimeout(timePlayVideo);
      clearTimeout(timeStop);

      timeStop = setTimeout(() => {
        stopVideos();
      }, SlidesTime[newIndex] - 100);
      playVideos(SlidesTime[newIndex]+200);
      timeout = setTimeout(function () {
        if (currentIndex < $slides.length - 1) {
          move(currentIndex + 1);
          setTimeout(() => {
            document.querySelector(".title").style = "animation-name:title;";
          }, 2000);
        } else {
          move(0);
        }
      }, SlidesTime[newIndex]);
    }

    $(".next_btn").on("click", function () {
      if (currentIndex < $slides.length - 1) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    });

    $(".previous_btn").on("click", function () {
      if (currentIndex !== 0) {
        move(currentIndex - 1);
      } else {
        move(3);
      }
    });

    $.each($slides, function (index) {
      var $button = $('<a class="slide_btn">&bull;</a>');

      if (index === currentIndex) {
        $button.addClass("active");
      }
      $button
        .on("click", function () {
          move(index);
        })
        .appendTo(".slide_buttons");
      bulletArray.push($button);
    });

    advance(0);
  });
}

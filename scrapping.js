(function(console) {
  console.save = function(data, filename) {
    if (!data) {
      console.error("Console.save: No data");
      return;
    }

    if (!filename) filename = "console.json";

    if (typeof data === "object") {
      data = JSON.stringify(data, undefined, 4);
    }

    var blob = new Blob([data], { type: "text/json" }),
      e = document.createEvent("MouseEvents"),
      a = document.createElement("a");

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
    e.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    a.dispatchEvent(e);
  };
})(console);

function scrape(cb) {
  let obj = {};
  obj.descriptions = grabDescriptionBullets();
  obj.specs = grabSpecifications();
  $('a[href="#collapseQuestions"]')[1].click();
  clickMoreReviews($("a.btn.lazyload-btn.btn-primary"), () => {
    obj.reviews = grabReviews();
    $('div.v-spacing-mini a[role="button"]').click();
    setTimeout(() => {
      openAllQuestionsAndAnswers(() => {
        obj.questions = getQuestionsAndAnswers();
        cb(obj);
      });
    }, 1000);
  });
}

function grabDescriptionBullets() {
  let arr = [];
  Array.from($(".list.disc")[1].children).forEach(value =>
    arr.push(value.innerHTML)
  );
  return arr;
}

function grabSpecifications() {
  let arr = [];
  let obj = {};
  $("tbody").each((i, element) => {
    Array.from($(element)[0].children).forEach(tr => {
      Array.from($(tr)[0].children).forEach((tableEl, i) => {
        if (i % 2 === 0) {
          obj = {};
          obj.title = tableEl.innerText.trim();
        } else {
          let icon = $(tableEl).find("span.ada.screen-reader-only");
          if (icon.length) {
            console.log(icon);
            obj.spec = icon[0].innerText === "Yes" ? 1 : 0;
            arr.push(obj);
          } else {
            obj.spec = tableEl.children[0].innerText.trim();
            arr.push(obj);
          }
        }
      });
    });
  });
  return arr;
}

function clickMoreReviews($el, cb) {
  if (
    ($el[0] && $el[0].style.display !== "none") ||
    ($el[1] && $el[1].style.display !== "none")
  ) {
    $el.click();
    setTimeout(() => {
      clickMoreReviews($el, cb);
    }, 500);
  } else {
    cb();
  }
}

function grabReviews() {
  let arr = [];
  $('div[itemprop="review"]').each((i, el) => {
    arr[i] = {};
    arr[i].title = el.children[0].innerText;
    arr[i].rating = Number(
      $("div[itemprop=reviewRating] span")[i].innerText.split(" ")[2]
    );
    arr[i].date = $(el)
      .find("small")[0]
      .innerText.split(" ")[2];
    if ($(el).find("small")[1]) {
      arr[i].recommended = $(el).find("small")[1].innerText === "Recommended";
    } else {
      arr[i].recommended = null;
    }
    arr[i].text = $(".reviews-helpful-text")[i].innerText.trim();
    arr[i].author = $("span[itemprop=author]")[i].innerText.trim();
    arr[i].verifiedPurchaser = !+!$(el).find("span.verified-purchaser").length;
    arr[i].sweepstakesEntry = !+!$(el).find("span.sweepstakes-entry").length;
    if ($($('div[itemprop="review"]')[i]).find("a.js-review-vote").length) {
      arr[i].helpful = {
        yes: Number(
          $($('div[itemprop="review"]')[i])
            .find("a.js-review-vote")
            .find("span")[0].innerText
        ),
        no: Number(
          $($('div[itemprop="review"]')[i])
            .find("a.js-review-vote")
            .find("span")[1].innerText
        )
      };
    }
  });
  return arr;
}

function openAllQuestionsAndAnswers(cb) {
  $("div.view-more-answers a.js-show-more").click();
  if ($("div.view-more-answers a.js-show-more").length) {
    setTimeout(() => {
      openAllQuestionsAndAnswers();
    }, 500);
  } else {
    cb();
  }
}

function getQuestionsAndAnswers() {
  let arr = [];
  $("div.question").each((i, question) => {
    arr[i] = {};
    arr[i].question = $(question).find('[role="button"] strong')[0].innerText;
    let authorAndDate = $(question).find("div.v-spacing-mini")[0]
      .nextElementSibling.innerText;
    arr[i].author = authorAndDate.split(" ")[0];
    arr[i].date = authorAndDate.split(" ")[2];
    console.log($(question).find("div.answer").length);
    if ($(question).find("div.answer").length) {
      arr[i].answers = [];
      $(question)
        .find("div.answer")
        .each((j, answer) => {
          arr[i].answers[j] = {};
          arr[i].answers[j].author = answer.children[0].innerText.split(" ")[0];
          arr[i].answers[j].date = answer.children[0].innerText.split(" ")[2];
          arr[i].answers[j].text = answer.children[1].innerText;
          arr[i].answers[j].helpful = {
            yes: Number(
              $(answer)
                .find("div.v-spacing-jumbo")
                .find("span")[0].innerText
            ),
            no: Number(
              $(answer)
                .find("div.v-spacing-jumbo")
                .find("span")[1].innerText
            )
          };
        });
    }
  });
  return arr;
}

scrape(function(obj) {
  console.save(obj, "test.json");
});

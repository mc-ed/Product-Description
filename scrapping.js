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
    obj.reviewStats = {
    	reviewCount : obj.reviews.length,
    	percentRecommended: percentRecommended(obj.reviews),
    	averageStars:averageStars(obj.reviews),
    	starCounts : {
    		five : countStars(obj.reviews, 5),
    		four : countStars(obj.reviews, 4),
    		three : countStars(obj.reviews, 3),
    		two : countStars(obj.reviews, 2),
    		one : countStars(obj.reviews, 1),
    	}
    }
    setTimeout(() => {
      openAllQuestionsAndAnswers(() => {
        obj.questions = getQuestionsAndAnswers();
        cb(obj);
      });
    }, 1000);
  });
}

  function countStars(arr, stars) {
    if (!arr.length) {
      return 0;
    } else {
      let count = 0;
      arr.forEach(review => {
        if (review.rating === stars) {
          count++;
        }
      });
      return count;
    }
  }

  function averageStars(arr) {
    if (!arr.length) {
      return "5.0";
    } else {
      let starSum = 0;
      arr.forEach(review => {
        starSum += review.rating;
      });
      return (starSum / arr.length).toFixed(1).toString();
    }
  }


  function percentRecommended(arr) {
    if (!arr.length) {
      return "";
    } else {
      let recommendedCount = 0;
      arr.forEach(review => {
        if (review.recommended) {
          recommendedCount++;
        }
      });
      return Math.floor(
        (recommendedCount / arr.length) * 100
      ).toString();
    }
  }



function grabDescriptionBullets() {
  let obj = {};
  if ($("#collapseDesc").find("p").length) {
    obj.overview = $("#collapseDesc").find("p")[0].innerText;
  }

  obj.list = [];
  Array.from($(".list.disc")[1].children).forEach(value =>
    obj.list.push(value.innerHTML)
  );
  return obj;
}

function grabSpecifications() {
  let arr = [];
  let obj = {};
  $('tbody').slice(0,2).each((i, element) => {
    Array.from($(element)[0].children).forEach(tr => {
      Array.from($(tr)[0].children).forEach((tableEl, i) => {
        if (i % 2 === 0) {
          obj = {};
          obj.title = tableEl.innerText.trim();
        } else {
          let icon = $(tableEl).find("span.ada.screen-reader-only");
          if (icon.length) {
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
    $('div.v-spacing-mini a[role="button"][aria-expanded="false"]').click()
    openAllQuestionsAndAnswers(() => {
    	setTimeout(() => {
      clickMoreReviews($el, cb);
    }, 500);
    })
  } else {
    cb();
  }
}

function grabReviews() {
  let arr = [];
  $('div[itemprop="review"]').each((i, el) => {
    arr[i] = {};
    const images = $(el).find('img');
  	if(images.length) {
  		arr[i].images = [];
  		images.each((__i,img) => {
  			if(img.attributes['data-largeurl']) {
  				const smallImage = img.attributes.src.value;
  				const largeImage = img.attributes['data-largeurl'].value;
  						arr[i].images.push({smallName: smallImage.split('/').slice(-1)[0], 
			largeName: largeImage.split('/').slice(-1)[0]})
		$.ajax({
					url: 'https://chrisfauries.com/lowesS3BucketSave',
					type: "POST",
					data: JSON.stringify({url: smallImage, path: 'userReviewPics'}),
					contentType: 'application/JSON'
				})
				$.ajax({
					url: 'https://chrisfauries.com/lowesS3BucketSave',
					type: "POST",
					data: JSON.stringify({url: largeImage, path: 'userReviewPics'}),
					contentType: 'application/JSON'
				})
  			}
  			

  	})
  	}
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
    console.log()
    if($(question).find('[role="button"] strong').length) {
    	 arr[i].question = $(question).find('[role="button"] strong')[0].innerText;
    	arr[i].author = $(question).find('small.darkMidGrey span')[0].innerText;	
    	arr[i].date = $(question).find('small.darkMidGrey')[0].outerText.replace(/\s+/g,' ').trim().split(' ')[2];
    } else {
    	arr[i].question = $(question).find('div.grid-60.tablet-grid-60.push-5 strong')[0].innerText;
    	arr[i].author = $(question).find('div.grid-60.tablet-grid-60.push-5 div span')[0].innerText;
    	arr[i].date = $(question).find('div.grid-60.tablet-grid-60.push-5 div')[0].outerText.replace(/\s+/g,' ').trim().split(' ')[2];
    }
   

    if ($(question).find("div.answer").length) {
      arr[i].answers = [];
      $(question)
        .find("div.answer")
        .each((j, answer) => {
          arr[i].answers[j] = {};
          const img = $(answer).find('img');
        	if(img.length) { 
        	arr[i].answers[j].badgeName = img[0].src.split('/').slice(-1)[0];				
				$.ajax({
					url: 'https://chrisfauries.com/lowesS3BucketSave',
					type: "POST",
					data: JSON.stringify({url: img[0].src, path: 'badges'}),
					contentType: 'application/JSON'
				})
           }
           arr[i].answers[j].author = $(answer.children).find('span.secondary-text')[0].innerText.trim();
           arr[i].answers[j].date = $(answer.children).find('.darkMidGrey')[0].innerText.trim().split(' ').slice(-1)[0];
           arr[i].answers[j].text = $(answer).find('p.v-spacing-medium.secondary-text')[0].innerText.trim();
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
  console.save(obj, "product23.json");
// console.log(obj)
});
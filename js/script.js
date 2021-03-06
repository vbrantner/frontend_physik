const APIurl = 'https://vm.elearning.physik.uni-frankfurt.de/po-fp-rating/rating';

function dateAggregation(arr) {
  const a = []; const b = []; let
    prev;

  arr.sort();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }

  return [a, b];
}

$(document).ready(() => {
  const ctx = document.getElementById('myChart').getContext('2d');
  function init() {
    $.ajax({
      url: 'http://proxy.hackeryou.com',
      dataType: 'json',
      method: 'GET',
      data: {
        reqUrl: APIurl,
        xmlToJSON: false,
        useCache: false,
      },
    }).then((res) => {
      const feedbackData = res;
      let sumReview = 0;
      let averageReview = 0;
      const starsData = [];
      const dateData = [];

      for (let i = 0; i < feedbackData.length; i++) {
        sumReview += feedbackData[i].stars;
        dateData.push(feedbackData[i].date.slice(0, 10));
      }

      const reviewsPerDay = dateAggregation(dateData);

      averageReview = sumReview / feedbackData.length;

      $('div').data('test', { first: feedbackData.length, last: Math.round(averageReview * 100) / 100 });
      $('span:first').text($('div').data('test').first);
      $('span:last').text($('div').data('test').last);

      $('#feedbackTable').DataTable({
        destroy: true,
        data: feedbackData,
        paging: false,
        searching: false,
        columns: [
          { data: 'stars' },
          { data: 'feedback' },
          { data: 'project' },
          { data: 'date' },
        ],
      });
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: reviewsPerDay[0],
          datasets: [{
            label: 'Anzahl der Bewertungen pro Tag',
            backgroundColor: 'rgba(39, 60, 117,0.8)',
            data: reviewsPerDay[1],
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            }],
          },
        },
      });
    });
  }
  init();

  $('button').click(function (event) {
    init();
    if ($(this).hasClass('updated')) {
      event.preventDefault();
      return;
    }
    $(this).addClass('updated');
    $(this).html('loading...');

    setTimeout(goback, 1000);
  });
  function goback() {
    $('button').removeClass('updated').html('Aktualisieren');
  }
  $('button').mousedown(function () {
    if ($(this).hasClass('updated')) $(this).addClass('error');
  }).mouseup(function () {
    $(this).removeClass('error');
  });
});

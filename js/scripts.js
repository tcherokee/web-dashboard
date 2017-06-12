var mobileBtn = document.getElementById("mobile-btn");
var navMenu = document.getElementById("nav-container");
var alertBox = document.getElementsByClassName('closeAlert');
var popNotifyBox = document.getElementsByClassName('closeNotify');
var infoNotifications = document.getElementsByClassName('alert-info');
var numOfNotifications = alertBox.length;
var notificationbell = document.getElementById('notifications');
var hundredChart = document.getElementById('hundred-chart');
var hundredList = document.getElementsByTagName('a');


function toggleBtnClass() {
  var mobileClass = mobileBtn.className;
  var navMenuClass = navMenu.className;

  if (mobileClass === "closed" || mobileClass === "") {
    mobileBtn.className = "open";
    navMenu.className = "open"
  } else  {
    mobileBtn.className = "";
    navMenu.className = ""
  }
}

function updatenotification() {
  notificationbell.setAttribute("data-notify-number",numOfNotifications);

  if (numOfNotifications === 0) {
    setTimeout(function(){
      notificationbell.className = "no-notify";
      showPopUp("Your are all up to date. No more notifications here");
    }, 800);
  } else if (numOfNotifications > 0 && notificationbell.className) {
    notificationbell.className = "";
  }
}

function closeAlertBox(clickEvent) {
  var clickBtnParent = clickEvent.parentElement;
  clickBtnParent.style.opacity = 0;

  console.log(this);

  if (clickEvent.className === "closeAlert") {
    setTimeout(function(){clickBtnParent.outerHTML = ""}, 800);
    numOfNotifications -=1;
    updatenotification();
  } else if (clickEvent.className === "closeNotify") {
    removePopUp(clickBtnParent);
  }
}

function showNotifications(){
  if (infoNotifications.length > 0) {
    //added the -1 to account for the Alert which is showing.
    for(var i=0; i < infoNotifications.length ; i++) {
      infoNotifications[i].style.display = "block";
    }
  }
}

function showPopUp(message) {
  var notifyContainer = document.getElementsByClassName('alert-notify');

  for (var i = 0;  i < notifyContainer.length; i++) {
    var notify = notifyContainer[i];

    notifyContainer[i].innerHTML += `<p>${message}</p>`;
    notify.classList.add("visible");

    removePopUp(notify);
  }
}

function removePopUp(item) {
  setTimeout(function(){
      item.classList.remove("visible");
  }, 3600);

  setTimeout(function(){
    item.removeChild(item.lastChild);
  }, 4500);
}

updatenotification();

mobileBtn.addEventListener("click", toggleBtnClass);

notificationbell.addEventListener("click", showNotifications);

for (i=0; i<alertBox.length; i++) {
  alertBox[i].addEventListener("click", function(e) {
    closeAlertBox(e.target);
  });
}

for (i=0; i<popNotifyBox.length; i++) {
  console.log(popNotifyBox[i]);
  popNotifyBox[i].addEventListener("click", function(e) {
    closeAlertBox(e.target);
    console.log(e.target);
  });
}

document.addEventListener("click", function(e){
  console.log(e.target);
})

//Chart Stuff
Chart.defaults.global.defaultFontColor = '#EEE';

var hourlyData = {
    '8 A.M':20,
    '10 A.M':60,
    '12 P.M':35,
    '14 P.M':99,
    '16 P.M':120,
    '18 P.M':134,
    '20 P.M':80,
    '22 P.M':145,
    '24 A.M':95,
    '2 A.M':150,
    '4 A.M':168,
    '6 A.M':200
}

var dailyData = {
  'Mon': 900,
  'Tue': 1400,
  'Wed': 1100,
  'Thur': 2600,
  'Fri': 2000,
  'Sat': 750,
  'Sun': 1300
};

var weeklyData = {
  'Week 1':8500,
  'Week 2':12000,
  'Week 3':10008,
  'Week 4':15600,
  'Week 5':16000,
  'Week 6':14600,
  'Week 7':20000,
};

var monthlyData = {
  'Month 1':87000,
  'Month 2':90000,
  'Month 3':85000,
  'Month 4':100200,
  'Month 5':150000,
  'Month 6':145000,
  'Month 7':135000,
  'Month 8':160000,
  'Month 9':175000,
  'Month 10':180000,
  'Month 11':190000,
  'Month 12':210000,
};

function options(chartTitle, chartScaleDisplay, chartDrawBorder, legendDisplay) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    drawBorder: true,
    title: {
      display: true,
      fontColor: '#00bcd4',
      fontSize: 16,
      text: chartTitle,
      position: 'top',
      padding: 20
    },
    legend: {
      display: legendDisplay,
      position: 'right'
    },
    scales: {
      xAxes: [{
        gridLines: {
          display:chartScaleDisplay,
          drawBorder: chartDrawBorder,
          color: '#4d4d4d',
          drawOnChartArea: true,
          drawTicks: true,
          tickMarkLength: 20
        },
        ticks: {
          display: chartScaleDisplay
        }
      }],
      yAxes: [{
        gridLines: {
          display: chartScaleDisplay,
          drawBorder: chartDrawBorder,
          color: '#4d4d4d',
          drawOnChartArea: true,
          drawTicks: true,
          tickMarkLength: 20
        },
        ticks: {
          display: chartScaleDisplay
        }
      }]
    }
  }
}

function addData(chart, trafficData) {
  chart.data.labels = [];
  chart.data.datasets.forEach((dataset) => {
      dataset.data = [];
  });

  for (newKey in trafficData) {
      chart.data.labels.push(newKey);
      chart.data.datasets.forEach((dataset) => {
          dataset.data.push(trafficData[newKey]);
      });
  }
  chart.update();

}



function trafficDataType(clickTargetAttribute) {
  if (clickTargetAttribute === "hourly") {
    return hourlyData;
  } else if (clickTargetAttribute === "daily") {
    return dailyData;
  } else if (clickTargetAttribute === 'weekly') {
    return weeklyData
  } else if (clickTargetAttribute === 'monthly') {
    return monthlyData
  }

  window.addEventListener("load", function() {
    // console.log('test');
    test = weeklyData;
  });

  return weeklyData;
}

hundredChart.addEventListener("click", function(e) {
  var clickTarget = e.target;
  clickTargetAttribute = (clickTarget.getAttribute('data-traffic-segment'));

  console.log(hundredList);

  for (i=0; i < hundredList.length; i++) {
    hundredList[i].className = "";
  }

  clickTarget.className = "active";


  // clickTarget.className = "active";

  addData(lineChart1, trafficDataType(clickTargetAttribute));
});

var ctx1 = document.getElementById("line-chart");
var lineChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '# of Votes',
            data: [],
            fill: true,
            lineTension: 0,
            pointRadius: 5,
            pointBackgroundColor: '#EEE',
            pointBorderColor:'#c358ed',
            pointBorderWidth: 1,
            backgroundColor: 'rgba(195, 88, 237, 0.6)',
            borderColor: '#c358ed',
            borderWidth: 3
        }]
    },
    options: options("TRAFFIC", true, true, false)
});

addData(lineChart1, weeklyData);

var ctx2 = document.getElementById("bar-chart");

var lineChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ["M", "T", "W", "T", "F", "S", "S"],
        datasets: [{
            label: '# of Votes',
            data: [900, 1400, 1100, 2600, 2000, 750, 1300],
            fill: true,
            backgroundColor: 'rgba(58, 176, 237, 0.6)',
            borderColor: '#3ab0ed',
            borderWidth: 3
        }]
    },
    options: options("DAILY TRAFFIC", true, true, false)
});

var ctx3 = document.getElementById("pie-chart");
var lineChart3 = new Chart(ctx3, {
    type: 'doughnut',
    data: {
        labels: ["Phones", "Tablet", "Desktop"],
        datasets: [{
            label: '# of Votes',
            data: [50, 20, 30],
            fill: true,
            lineTension: 0,
            backgroundColor: [
              '#2ce9c0',
              '#fbe972',
              '#ea5743'
            ],
            borderColor: [
              '#2ce9c0',
              '#fbe972',
              '#ea5743'
            ],
            borderWidth: 3
        }]
    },
    options: options("MOBILE USERS", false, false, true)
});

hundredChart.addEventListener("click", function(e) {
  var clickTarget = e.target;
  console.log(clickTarget.getAttribute('data-traffic-segment'));
});


//Random Photos
var httpRequest;
var jsonObject;
var postsObject = [
  {
    post: 'This is a first post',
    time: '4 hours ago'
  },
  {
    post: 'This is a second post',
    time: '5 hours ago'
  },
  {
    post: 'This is a third post',
    time: '5 hours ago'
  },
  {
    post: 'This is a fourth post',
    time: '6 hours ago'
  },
  {
    post: 'This is a fifth post',
    time: '7 hours ago'
  }
];
var buildProfileHTML ="";
var buildActivityHTML ="";

function randomUserRequest() {
  httpRequest = new XMLHttpRequest();
  if (!httpRequest) {
    console.log("I just can't do it man :(... better try jquery)");
    return false;
  }

  httpRequest.onreadystatechange = getRandomUserData;
  httpRequest.open('GET', 'https://randomuser.me/api/?results=5&inc=name,email,dob,picture');
  httpRequest.send();
}

function getRandomUserData() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      jsonObject = JSON.parse(httpRequest.responseText);

      console.log(jsonObject);

      processUserJson(jsonObject);
    } else {
      console.log("I give up man... No idea what is wrong.");
    }
  }
}

function createUserNameHTML(nameObject) {
  userNameHTML = '<span class="member-name">';
  for (newKey in nameObject) {
    userNameHTML += `${nameObject[newKey]} `;
  }
  userNameHTML += '</span>';

  return userNameHTML;
}

function createUserPictureHTML(pictureObject) {
  userPictureHTML = `
                      <div class="member-image">
                        <img src="${pictureObject['medium']}" />
                      </div>
                    `;
  return userPictureHTML;
}

function createHTML(detail1, detail2, meta, pic, buildVar) {
  if (buildVar === 'profile') {
    buildProfileHTML += `
                  <div class="member-card">
                    ${pic}
                    <div class="member-details">
                      ${detail1}
                      ${detail2}
                    </div>
                    ${meta}
                  </div>
                `;
    return buildProfileHTML;
  } else {
    buildActivityHTML += `
                  <div class="member-card">
                    ${pic}
                    <div class="member-details">
                      ${detail1}
                      ${detail2}
                    </div>
                    ${meta}
                  </div>
                `;
    return buildActivityHTML;
  }
}

function processUserJson(jsonObject) {

  var userNameHTML = "";
  var userPictureHTML = "";
  var fullProfileHTML;
  var fullActivityHTML;

  if (localStorage.getItem("fullProfileHTML") === null || localStorage.getItem("fullActivityHTML") === null) {
    for(var i = 0; i < jsonObject.results.length; i++) {
      var resultObject = jsonObject.results[i];
      for (key in resultObject) {
        if(key === 'name') {
          userNameHTML = createUserNameHTML(resultObject[key]);
        } else if (key === 'picture') {
          userPictureHTML = createUserPictureHTML(resultObject[key])
        }
      };

      var dobHtml = resultObject['dob'];
      dobHtml = dobHtml.split(" ");
      dobHtml = dobHtml[0];

      var userEmailHTML = `<span class="member-email">${resultObject['email']}</span>`;
      var userDobHTML = `<span class="more-details">${dobHtml}</span>`;

      var userPostHTML = `<span class="post-details">${postsObject[i]['post']}</span>`;
      var userTimeHTML = `<span class="post-time">${postsObject[i]['time']}</span>`;
      var userMoreDetailsHTML = `<span class="more-details">></span>`;

      fullProfileHTML = createHTML(userNameHTML, userEmailHTML, userDobHTML, userPictureHTML, 'profile');
      fullActivityHTML = createHTML(userPostHTML, userTimeHTML, userMoreDetailsHTML, userPictureHTML, 'activity');
    }

    localStorage.setItem("fullProfileHTML", fullProfileHTML);
    localStorage.setItem("fullActivityHTML", fullActivityHTML);
  } else {
    fullProfileHTML = localStorage.getItem("fullProfileHTML");
    fullActivityHTML = localStorage.getItem('fullActivityHTML');
  }

  document.getElementById('member-profile').innerHTML = fullProfileHTML;
  document.getElementById('member-activities').innerHTML = fullActivityHTML;
}

randomUserRequest();


//Search USERS
var searchBox = document.getElementById('search-user');
var messageBox = document.getElementById('message-user');
var memberNames = document.getElementsByClassName('member-name');
var searchContainer = document.getElementById("search-autocomplete");
var submitBtn = document.getElementById('submit-btn');

function submitMessage() {

  if (!searchBox.value) {
    showPopUp("You need to select a user to send your message to");
  } else if (!messageBox.value) {
    showPopUp("Ooops, you forgot to include a message");
  } else {
    searchBox.value = "";
    messageBox.value = "";
    showPopUp("Congrats, your message was sent successfully :)");
  }

}

searchBox.addEventListener('keyup', function(e){
  var searchTyped = "";
  var memberLowercase;
  var searchArray = "";

  searchTyped = this.value.toLowerCase();
  searchContainer.innerHTML = "";

  for (var i=0; i < memberNames.length; i++) {
    memberLowercase = memberNames[i].innerHTML.toLowerCase();

    if (memberLowercase.indexOf(searchTyped) !== -1) {
      if (searchTyped.length > 0) {
        searchArray += memberNames[i].outerHTML;
      } else {
        searchContainer.innerHTML = "";
        // console.log('else');
      }
    }
  }

  searchContainer.innerHTML = searchArray;
});


searchContainer.addEventListener("click", function(e){
  console.log(e.srcElement.innerHTML);

  searchBox.value = e.srcElement.innerHTML;
  searchContainer.innerHTML = "";
})

submitBtn.addEventListener("click", function(e){

  e.preventDefault();
  submitMessage();

});




// Setting Saving
var settingSaveBtn = document.getElementById('save-btn');

var emailNotification = document.getElementById('email-notify');
var publicProfile = document.getElementById('public-profile');
var timezoneSelect = document.getElementById('timezone');

settingSaveBtn.addEventListener("click", function(e) {
  e.preventDefault();

  var settings = [
    emailNotification.checked,
    publicProfile.checked,
    timezoneSelect.selectedIndex
  ]

  localStorage.setItem('settings', JSON.stringify(settings));

  showPopUp("Your Settings have been saved");
})

function getUserSettings() {
  var settings;

  if (localStorage.getItem('settings') !== null) {
    settings = localStorage.getItem('settings');
    settings = JSON.parse(settings);

    emailNotification.checked = settings[0];
    publicProfile.checked = settings[1];
    timezoneSelect.selectedIndex = settings[2];
    console.log(settings[2]);
  }
}

getUserSettings();

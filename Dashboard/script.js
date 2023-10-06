function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  document.getElementById("latitude").textContent = latitude;
  document.getElementById("longitude").textContent = longitude;
  console.log(latitude);
  console.log(longitude);
}
document.getElementById('latitude').innerHTML
function showError(error) {
  switch(error.code) {
      case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
      case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
      case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
      case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
  }
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
  alert("Geolocation is not supported by this browser.");
}
// Define the initial data for the area chart
var initialAreaChartData = {
  AQI: [25, 25, 25, 25, 25, 25, 25],
  WQI: [15, 15, 15, 15, 15, 15, 15],
};

// Define initial data for pie charts
var initialPieChartDataAQI = [12, 0, 0, 0, 0, 0, 0, 0];
var initialPieChartDataWQI = [12, 0, 0, 0, 0, 0, 0];

// Define options for diffrent charts
var areaChartOptions = {
  series: [
    {
      name: "AQI",
      data: initialAreaChartData.AQI,
    },
    {
      name: "WQI",
      data: initialAreaChartData.WQI,
    },
  ],
  chart: {
    type: "area",
    background: "transparent",
    height: 350,
    stacked: false,
    toolbar: {
      show: false,
    },
  },
  colors: ["#d50000", "#2962ff"],
  labels: getLast5DaysLabels(),
  dataLabels: {
    enabled: false,
  },
  fill: {
    gradient: {
      opacityFrom: 0.4,
      opacityTo: 0.1,
      shadeIntensity: 1,
      stops: [0, 100],
      type: "vertical",
    },
    type: "gradient",
  },
  grid: {
    borderColor: "#55596e",
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: "#2b2222",
    },
    show: true,
    position: "bottom",
  },
  markers: {
    size: 5,
    strokeColors: "#2b2222",
    strokeWidth: 3,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    axisBorder: {
      color: "#2b2222",
      show: true,
    },
    axisTicks: {
      color: "#57ff55",
      show: true,
    },
    labels: {
      offsetY: 5,
      style: {
        colors: "#2b2222",
      },
    },
  },
  yaxis: [
    {
      title: {
        text: "Pollution Meter",
        style: {
          color: "#2b2222",
        },
      },
      labels: {
        style: {
          colors: ["#2b2222"],
        },
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
    theme: "dark",
  },
};

var optionsWQI = {
  series: initialPieChartDataWQI,
  chart: {
    width: 440,
    type: "pie",
  },
  labels: [
    "Temperature",
    "pH",
    "Conductivity",
    "BOD",
    "Nitrate",
    "Faecal Coliform",
    "Total Coliform",
  ],
  responsive: [
    {
      breakpoint: 420,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

var optionsAQI = {
  series: initialPieChartDataAQI,
  chart: {
    width: 390,
    type: "pie",
  },

  labels: ["CO", "NO", "NO2", "O3", "SO2", "PM2.5", "PM10", "NH3"],
  responsive: [
    {
      breakpoint: 420,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

//rendering charts
chartAQI = new ApexCharts(document.querySelector("#pie-chart-AQI"), optionsAQI);
chartAQI.render();

chartWQI = new ApexCharts(document.querySelector("#pie-chart-WQI"), optionsWQI);
chartWQI.render();

loadAreaChart(initialAreaChartData);

//some variables
var chartLoaded = false;
var areaChart; // REFrence to areachart
var chartAQI; // Reference to AQI pie chart
var chartWQI; // Reference to WQI pie chart

// Function to load the area chart with given data
function loadAreaChart(data) {
  if (!chartLoaded){
    // Initialize the area chart
    areaChart = new ApexCharts(
      document.querySelector("#area-chart"),
      areaChartOptions
    );
    areaChart.render();
    chartLoaded = true;
  }

  // Update the data of the area chart
  areaChart.updateSeries([
    {
      name: "AQI",
      data: data.AQI,
    },
    {
      name: "WQI",
      data: data.WQI,
    },
  ]);
}

//functions related to pie chart
function removetextconstituents() {
  // Select all div elements with the class "pie-chart"
  var pieChartDivs = document.querySelectorAll(".pie-chart");

  // Loop through each div
  pieChartDivs.forEach(function (div) {
    // Select all span elements within the current div
    var spans = div.querySelectorAll("span");

    // Loop through each span and change its color
    spans.forEach(function (span) {
      span.style.visibility = "hidden";
    });
  });
}
function updatePieCharts() {
  // Update the AQI Constituents pie chart with random data
  var newDataAQI = Array.from(
    { length: 8 },
    () => Math.floor(Math.random() * 20) + 10
  );
  chartAQI.updateSeries(newDataAQI);

  // Update the WQI Constituents pie chart with random data
  var newDataWQI = Array.from(
    { length: 7 },
    () => Math.floor(Math.random() * 20) + 10
  );
  chartWQI.updateSeries(newDataWQI);
}

function resetPieCharts() {
  chartAQI.updateSeries(initialPieChartDataAQI); // Reset AQI pie chart
  chartWQI.updateSeries(initialPieChartDataWQI); // Reset WQI pie chart
}

//Function to get last 5 dates
function getLast5DaysLabels() {
  var labels = [];
  var today = new Date();

  for (var i = 6; i >= 0; i--) {
    var date = new Date(today);
    date.setDate(today.getDate() - i);
    var month = date.toLocaleString("default", { month: "short" });
    var day = date.getDate();
    labels.push(month + " " + day);
  }

  return labels;
}

//main function which works for the iframe map clicks(the main building block)
function accessSecondaryElement() {
  // Get the iframe element
  var iframe = document.getElementById("myFrame");

  // Keep track of the currently selected city
  var selectedCity = null;

  // Check if the iframe content has loaded
  if (iframe.contentDocument) {
    var Cities = iframe.contentDocument.querySelectorAll(".svg-path");
    Cities.forEach(function (city) {
      if (city) {
        city.addEventListener("click", function () {
          // Check if the clicked city is the same as the previously selected one
          if (selectedCity === city) {
            loadAreaChart(initialAreaChartData);
            // Toggle the color back to blue
            city.style.fill = "blue";
            selectedCity = null; // Reset the selected city
          } else {
            // Remove the yellow fill from the previously selected city
            if (selectedCity) {
              selectedCity.style.fill = "blue";
            }

            // Set the new selected city to yellow
            city.style.fill = "yellow";

            // Update the currently selected city
            selectedCity = city;
          }

          // Variables to store the most recent values
          var lastRandomAQI;
          var lastRandomWQI;
          var PAQI;
          var PWQI;

          // Function to generate random values between -5 and 5
          var randomDelta = () => Math.floor(Math.random() * 11) - 5;

          // Create a new data object based on the initial data
          var newData = {
            AQI: initialAreaChartData.AQI.map((value) => {
              lastRandomAQI = value + randomDelta(); // Store the last random value for AQI
              return lastRandomAQI;
            }),
            WQI: initialAreaChartData.WQI.map((value) => {
              lastRandomWQI = value + randomDelta(); // Store the last random value for WQI
              return lastRandomWQI;
            }),
          };

          if (selectedCity) {
            loadAreaChart(newData);
            updatePieCharts();
            PAQI = "Expected Aqi  " + (lastRandomAQI - 8);
            PWQI = "Expected Aqi  " + (lastRandomWQI + 8);
          } else {
            lastRandomAQI = "--";
            lastRandomWQI = "--";
            PAQI = "Expected Aqi  " + "--";
            PWQI = "Expected Aqi  " + "--";

            resetPieCharts();
            removetextconstituents();
          }
          //changing header subtexts
          var subtextSpans = document.querySelectorAll(".subtext");
          subtextSpans[0].textContent = " " + lastRandomAQI;
          subtextSpans[1].textContent = " " + lastRandomWQI;
          subtextSpans[2].textContent = " " + PAQI;
          subtextSpans[3].textContent = " " + PWQI;
        });

        city.addEventListener("mouseenter", function () {
          // Change fill color to red on mouse enter
          if (city !== selectedCity) {
            city.style.fill = "red";
          }
        });

        city.addEventListener("mouseleave", function () {
          // Change fill color back to blue on mouse leave
          if (city !== selectedCity) {
            city.style.fill = "blue";
          }
        });
      }
    });
  }
}

//initially no constituent should be seen
removetextconstituents();
var iframe = document.getElementById("myFrame");
iframe.onload = function () {
  accessSecondaryElement();
};

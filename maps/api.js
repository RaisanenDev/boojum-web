//<![CDATA[

//Change this string to change API key
loadMapsAPI("AIzaSyDFtZQnGWlsgSpdtpaoQmIbmMX8-yvZcmg",function() {
  let myOptions = {
    zoom: 3,
    center: {lat:58,lng:-98},
    mapTypeControl: true,
    mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
    navigationControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById("map"), myOptions);

  jsonPull(process_it_geo);
});

//Grab JSON data that python made.
var jsonPull = function(callback) {
  let request = new XMLHttpRequest();
  request.open('GET', 'jsonGEO.json', true);
  request.send();
  request.onload = function() {
    callback(JSON.parse(request.responseText),createMarker);
  };
};

//Adds Maps api to document
function loadMapsAPI(key,callback) {
  let keyscript =  document.createElement('script');
  keyscript.type = 'text/javascript';
  keyscript.src = `//maps.googleapis.com/maps/api/js?key=${key}`;
  keyscript.onload = callback;
  document.head.appendChild(keyscript);
};

// this variable will collect the html which will eventually be placed in the side_bar
var side_bar_html = "";

// arrays to hold copies of the markers and html used by the side_bar
// because the function closure trick doesnt work there
var gmarkers = [];
var i = 0;

  
// A function to create the marker and set up the event window
function createMarker(point, name, html) {
  var marker = new google.maps.Marker({
    position: point,
    map: map,
    title: name
  });
  var infowindow = new google.maps.InfoWindow(
    {
      content: html
    });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  // save the info we need to use later for the side_bar
  gmarkers[i] = marker;
  // add a line to the side_bar html to open markers on click
  side_bar_html += `<a href='javascript:google.maps.event.trigger(gmarkers[${i}], "click")'>${name}</a><br>`;
  i++;
}


process_it_geo = function (json, createMarker) {
  // === split Json to be inputted into markers
 var Regex = /(-?\d+\.\d+),(-?\d+\.\d+)/;
  for (let i = 0; i < json.length-1; i++) {

    var GeoData = [];
    var LocationData = [];
    //Checks the coverage of each report, puts the location, and geo data in right place
    //Need to account for doubles
    //Need to add duplication locations to the same marker
    json[i].coverage.forEach(item => {
      //Does entry match regex? If yes, its geo data put there. If not its location data.
      (item.match(Regex))? GeoData.push(Regex.exec(item)):LocationData.push(item);
    });
    //Check if coverage even had geo data.
    if(GeoData.length !== 0) {
      
      //Point,Name,HTML
      createMarker(
        {
          lat:parseFloat(GeoData[0][1]),
          lng:parseFloat(GeoData[0][2])
        },
        LocationData[0],
        `${LocationData[0]}<br><br><br>Reports:<br><br><a href=${json[i].identifier}>${json[i].title}</a><br><br>`);
    }

  }
  // put the assembled side_bar_html contents into the side_bar div
  document.getElementById("side_bar").innerHTML = side_bar_html;
}

//]]>
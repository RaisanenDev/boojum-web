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
  oms = new OverlappingMarkerSpiderfier(map, {
    markersWontMove: true,
    markersWontHide: true,
    basicFormatEvents: true
  });
  jsonPull(process_it_geo);
});

//Grab JSON data that python made.
var jsonPull = function(callback) {
  let request = new XMLHttpRequest();
  request.open('GET', 'sites.json', true);
  request.send();
  request.onload = function() {
    callback(JSON.parse(request.responseText),createMarker);
  };
};

//Adds Maps api, clustering, spyder to document
function loadMapsAPI(key,callback) {
  let clusterscript = document.createElement("script");
  clusterscript.type = "text/javascript";
  clusterscript.src = "/Templates/MarkerCluster/markerclusterer.js";
  let keyscript =  document.createElement("script");
  keyscript.type = "text/javascript";
  keyscript.src = `//maps.googleapis.com/maps/api/js?key=${key}`;
  keyscript.onload = callback;
  let spiderscript =  document.createElement("script");
  spiderscript.type = "text/javascript";
  spiderscript.src = "/Templates/MarkerCluster/oms.min.js";
  spiderscript.onload = callback;
  document.head.appendChild(keyscript);
  document.head.appendChild(clusterscript);
  document.head.appendChild(spiderscript);
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
  marker.addListener('spider_click', function() {
    infowindow.open(map, marker);
  });
  oms.addMarker(marker)
  // save the info we need to use later for the side_bar
  gmarkers[i] = marker;
  // add a line to the side_bar html to open markers on click
  //side_bar_html += `<a href='javascript:google.maps.event.trigger(gmarkers[${i}], "click")'>${name}</a><br>`;
  i++;
}

process_it_geo = function(json, createMarker) {
  for (let i = 0; i < json.length-1; i++) {
    var sitename = json[i][0]["site"]
    console.log(json[i][0]["coverage"])
    var reportHTML = []
    for (let index = 1; index < json[i].length; index++) {
      createMarker(
        {
          lat:json[i][0]["coverage"][0],
          lng:json[i][0]["coverage"][1]
        },
        sitename,
        //For marker HTML
        `${sitename}<br><br>Year: ${json[i][index]["date"][0]}<br><br>Report:<br><a href=${json[i][index]["identifier"][0]}>${json[i][index]["title"][0]}</a>`
      );
      //Make list of all reports from that site
      reportHTML += `<li><a href=${json[i][index]["identifier"][0]}>${json[i][index]["title"][0]}</a></li><br>`     
    }
    //Add site + reports to sidebar 
    side_bar_html += `<a href='javascript:map.setCenter({lat:${json[i][0]["coverage"][0]}, lat:${json[i][0]["coverage"][1]})'><h4>${sitename}</h4></a><ul>${reportHTML}</ul>`
    
  }
  var markerCluster = new MarkerClusterer(map, gmarkers,
    {
      maxZoom: 10,
      imagePath: '/Templates/MarkerCluster/images/m'});
  // put the assembled side_bar_html contents into the side_bar div
  document.getElementById("side_bar").innerHTML = side_bar_html; 
}


//Make this read nongeo data, then add to sidebar
// process_it = function(json, createMarker) {
//   for (let i = 0; i < json.length-1; i++) {
//     var sitename = json[i][0]["site"][0]
//     for (let index = 0; index < json[i].length-1; index++) {
//       createMarker(
//         {
//           lat:json[i][index]["coverage"][0],
//           lng:json[i][index]["coverage"][1]
//         },
//         sitename,
//         `${sitename}<br><br><br>Reports:<br><br><a href=${json[i][index]["identifier"][0]}>${json[i][index]["title"][0]}</a><br><br>`
//       );        
//     }      
//   }
//   var markerCluster = new MarkerClusterer(map, gmarkers,
//     {imagePath: '../maps/MarkerCluster/images/m'});
//   // put the assembled side_bar_html contents into the side_bar div
//   document.getElementById("side_bar").innerHTML = side_bar_html; 
// }

//]]>
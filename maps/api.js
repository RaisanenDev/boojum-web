//<![CDATA[

// this variable will collect the html which will eventually be placed in the side_bar
var side_bar_html = "";

// arrays to hold copies of the markers and html used by the side_bar
// because the function closure trick doesnt work there
var gmarkers = [];
var htmls = [];
var i = 0;
var map = null;

var infowindow = new google.maps.InfoWindow(
  {
    size: new google.maps.Size(150, 50)
    
  });

// A function to create the marker and set up the event window
function createMarker(point, name, html) {
  var marker = new google.maps.Marker({
    position: point,
    map: map
  });
  google.maps.event.addDomListener(marker, "click", function () {
    infowindow.setContent(html);
    infowindow.open(map, marker);
  });
  // save the info we need to use later for the side_bar
  gmarkers[i] = marker;
  htmls[i] = html;
  // add a line to the side_bar html
  side_bar_html += '<a href="javascript:myclick(' + i + ')">' + name + '</a><br>';
  i++;
  return marker;
}


// This function picks up the click and opens the corresponding info window
function myclick(i) {
  google.maps.event.trigger(gmarkers[i], "click");
}

function initMap() {
  var myOptions = {
    zoom: 8,
    center: new google.maps.LatLng(58, -98),
    mapTypeControl: true,
    mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
    navigationControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById("map"), myOptions);
}
  // google.maps.event.addListener(map, 'click', function () {
  //   infowindow.close();
  // });

  // === Define the function thats going to process the text file ===
  process_it = function (doc) {
    // === split the document into lines ===
    lines = doc.split("\n");
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].length > 1) {
        // === split each line into parts separated by "|" and use the contents ===
        parts = lines[i].split("|");
        var lat = parseFloat(parts[0]);
        var lng = parseFloat(parts[1]);
        var html = parts[2];
        var label = parts[3];
        var point = {
          position: new google.maps.LatLng(lat, lng),
        };
        // create the marker
        var marker = createMarker(point, label, html);
      }
    }
    // put the assembled side_bar_html contents into the side_bar div
    document.getElementById("side_bar").innerHTML = side_bar_html;
  }


  currentIndex = function () {
    var page = window.location.pathname.split("/").pop();
    page.split(".").pop();
    page += ".txt";
    return page;
  }

  var processRequest = new XMLHttpRequest();
  processRequest.open("GET", currentIndex, true);
  processRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      var doc = processRequest.response;
      process_it(doc);
    }
  };
    //]]>

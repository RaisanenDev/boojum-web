//<![CDATA[

// this variable will collect the html which will eventually be placed in the side_bar
var side_bar_html = "";

// arrays to hold copies of the markers and html used by the side_bar
// because the function closure trick doesnt work there
var gmarkers = [];
var htmls = [];
var i = 0;
var map = null;
//making json global
var jsonresponse

  //To be moved into mapinit??
  //this is for new JSON data
  var jsonxObj = new XMLHttpRequest();
jsonxObj.overrideMimeType("application/json");
jsonxObj.open('GET', 'jsonGEO.json', true);
jsonxObj.send();
jsonxObj.onreadystatechange = function () {
if (jsonxObj.readyState == 4 && jsonxObj.status == "200") {
jsonresponse = JSON.parse(jsonxObj.responseText);

// Assuming json data is wrapped in square brackets this just prints out for testing
console.log(jsonresponse[0].coverage[0]); } 
};



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
  // google.maps.event.addDomListener(marker, "click", function () {
  //   infowindow.setContent(html);
  //   infowindow.open(map, marker);
  // });
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
    zoom: 3,
    center: {lat:58,lng:-98},
    mapTypeControl: true,
    mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
    navigationControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById("map"), myOptions);

  //This is for old Txt based data
  var processRequest = new XMLHttpRequest();
  processRequest.open("GET", currentIndex(), true);
  processRequest.send();
  processRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      process_it_geo(processRequest.response);
    }
  };


}

//needs to kind of look like this, but with my data

//48.2439|
//-71.0748|
//<a href=http://sirsiweb.laurentian.ca/uhtbin/cgisirsi/x/x/x/57/5?user_id=WEBSERVER&library=DESMARAIS&searchdata1=Chicoutimi,%20Que.%20Mine%20Site{830}>Chicoutimi, Que. Mine Site</a>
//<br>(Chicoutimi, Que.)<br>
//<a href=http://sirsiweb.laurentian.ca/uhtbin/cgisirsi/x/x/x/57/5?user_id=WEBSERVER&library=DESMARAIS&searchdata1=ALCAN{830}>ALCAN</a>
//<br>1985|
//ALCAN, Chicoutimi, Que. Mine Site

process_it_geo = function (doc) {
  // === split the document into lines ===


  lines = doc.split("\n");
  for (var i = 0; i < jsonresponse.length-1; i++) {
    jsonresponse[i].title
    jsonresponse[i].coverage
    jsonresponse[i].date
    jsonresponse[i].identifier


    if (lines[i].length > 1) {
      // === split each line into parts separated by "|" and use the contents ===

      //This need to be edited to regex search for geo data, and then maybe put it into a single variable
      var lat = parseFloat(parts[0]);
      var lng = parseFloat(parts[1]);

      //This needs to parse out the identifier, generate a good name for the report, and give the location (Maybe instead of giving location, make it give the year... dunno)
      var html = `<a href=${jsonresponse[i].identifier}>${jsonresponse[i].title[0]} - ${jsonresponse[i].coverage[1]}</a>`;
      //This is the title of the paper, but originally it looks like the site name
      var label = parts[3];
      //See this is what I meant for geo data, instead of making two variables just automatically put it into the point object
      var point = {
        lat: lat,
        lng: lng
      };
      //Then create marker as normal
      // create the marker
      var marker = createMarker(point, label, html);
    }
  }
  // put the assembled side_bar_html contents into the side_bar div
  document.getElementById("side_bar").innerHTML = side_bar_html;
}

//Now need to think about what to do with non geo data. Have a seperate sidebar maybe?


function currentIndex() {
  var page = window.location.pathname.split("/").pop();
  return page.split(".")[0] + ".txt";
}

//Old processing of text file
  // google.maps.event.addListener(map, 'click', function () {
  //   infowindow.close();
  // });

  // === Define the function thats going to process the text file ===
  // process_it_geo = function (doc) {
  //   // === split the document into lines ===
  //   lines = doc.split("\n");
  //   for (var i = 0; i < lines.length; i++) {
  //     if (lines[i].length > 1) {
  //       // === split each line into parts separated by "|" and use the contents ===
  //       parts = lines[i].split("|");
  //       var lat = parseFloat(parts[0]);
  //       var lng = parseFloat(parts[1]);
  //       var html = parts[2];
  //       var label = parts[3];
  //       var point = {
  //         lat: lat,
  //         lng: lng
  //       };
  //       // create the marker
  //       var marker = createMarker(point, label, html);
  //     }
  //   }
  //   // put the assembled side_bar_html contents into the side_bar div
  //   document.getElementById("side_bar").innerHTML = side_bar_html;
  // }



    //]]>

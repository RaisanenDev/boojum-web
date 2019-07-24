//Update this to update the key everywhere
var pkey = "AIzaSyDFtZQnGWlsgSpdtpaoQmIbmMX8-yvZcmg";


//This is inserted into the html pages
var keyscript = document.createElement('script');
    keyscript.type = 'text/javascript';
    keyscript.src = `//maps.googleapis.com/maps/api/js?key=${pkey}&amp;callback=initMap`;
    keyscript.async = true;
    keyscript.defer = true;
var apiscript = document.createElement('script');
    apiscript.type = 'text/javascript';
    apiscript.src = `api.js`;
    apiscript.async = true;
    apiscript.defer = true;

//for production
//document.body.appendChild(keyscript);
//document.body.appendChild(apiscript);

//for testing
var nodes = document.body.childNodes;
document.body.insertBefore(keyscript, document.body.childNodes[nodes.length-2]);
document.body.insertBefore(apiscript, document.body.childNodes[nodes.length-2]);

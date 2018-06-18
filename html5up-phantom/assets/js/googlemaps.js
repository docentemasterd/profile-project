function initMap() {
	// MAO OPTIONS
	var options = {
		zoom:8,
		center:{lat:36.7585406, lng:-4.3971722 }
	}
	//NEW MAP
	var map = new google.maps.Map(document.getElementById('map'), options);

	//MAP MARKER
	var marker = new google.maps.Marker({
		position:{lat:36.7222, lng:-4.4464},
		map:map
	});

	//INFOWINDOW
	var infoWindow = new google.maps.InfoWindow({
		content:'<p>Mi ubicacion</p>'
	});

	marker.addListener('click', function(){
		infoWindow.open(map, marker);
	});
      
}

var x = document.getElementById("geoLocation");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
}

$(document).on('click', '#getGeolocation', function(){
    console.log("clicked");
    getLocation();
});
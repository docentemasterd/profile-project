//Added Globals Start
var loadMap = document.getElementById('map');
var map;
var latitude = "";
var longitude = "";
var myLat = 36.7222;
var myLng = -4.4464;
var myLatCtr = 36.7585406;
var myLngCtr = -4.3971722
var y = document.getElementById("latitudeInput");
var z = document.getElementById("longitudeInput");
var destination;
//Added Globals End

function initMap() {
	//Added Directions service feature start
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	//Added Directions service feature end
	
	//Updated to based Destination on a global that doesn't change
	destination = new google.maps.LatLng(myLat, myLng);
	
	// MAO OPTIONS
	var options = {
		zoom:8,
		//Updated center to reflect global variable center
		center:{lat:myLatCtr,lng:myLngCtr}
	}
	//NEW MAP
	map = new google.maps.Map(loadMap, options);
	//Added directions Display to the map - This is a global map now.
	directionsDisplay.setMap(map);

	//MAP MARKER
	var marker = new google.maps.Marker({
		//Position is set by variable, as declared if needed above
		position: destination,
		//map is set by global variable.
		map:map
	});

	//INFOWINDOW
	var infoWindow = new google.maps.InfoWindow({
		//Added styling to p tag so it can be viewed when the pin is clicked.
		content:'<p style="color:black;">Mi ubicacion</p>'
	});

	//added on change handler. if this runs, it is because the hidden input in the page has been updated to reflect having a longitude (denoted by the z variable)
	var onChangeHandler = function() {
		//function that is to run if the change handler triggers. Passes in variables...local and global.
		calculateAndDisplayRoute(directionsService, directionsDisplay);
	};
	//If hidden field is filled in by longitude, trigger change handler
	z.addEventListener('change', onChangeHandler);

	marker.addListener('click', function(){
		infoWindow.open(map, marker);
	});

}

//Function that is run when hidden input contains longitude
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
	//this function calls an api call that will look for directions based upon the parameters given.
	directionsService.route({
		//set origin of the person - Their browser's api call for the lat and lng
		origin: new google.maps.LatLng(latitude, longitude),
		//set destination - your pin
		destination: destination,
		travelMode: 'DRIVING'
	}, function(response, status) {
		//if the API was successful at finding directions, set them on the map, otherwise send an alert that says it didn't work and why.
		if (status === 'OK') {
			directionsDisplay.setDirections(response);
		} else {
			window.alert('Directions request failed due to ' + status);
		}
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

	//set globals to have position from above.
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	//set hidden inputs so that the form can grab them
	y.value = latitude;
	z.value = longitude;
	//create change event, so we can trigger map to reload
	var event = new Event('change');
	//trigger event to happen so map will reload.
	z.dispatchEvent(event);
}

$(document).on('click', '#getGeolocation', function(){
	console.log("clicked");
	getLocation();
});

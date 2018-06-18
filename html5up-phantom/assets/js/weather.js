$(document).ready(function() {
    
    $("#submitweather").click(function(){
        var city = $("#input_weather").val();

        if (city != ""){
            $.ajax({
                
                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&lang={es}" 
                + "&APPID=d8ea24a98a6320af5a323c4541a6136c",
                type:"GET",
                dataType: "jsonp",
                success: function(data){
                    var widget = show(data);

                    $("#show").html(widget);
                    $("#city").val("");
                    
                }



            });
        }
        else{
            $("#error").html("Has escrito el nombre de tu ciudad mal.");
        }
    });
});

function show(data){
    return "<h4>Clima para "+ data.name +", "+ data.sys.country +"</h4>" +
           "<p>" + "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'" + "</p>" +
           "<p>Temperatura: "+ data.main.temp +" ºC" + "</p>" +
           "<p>Temperatura minima: "+ data.main.temp_min +" ºC" + "</p>" + 
           "<p>Temperatura maxima: "+ data.main.temp_max + " ºC" + "</p>";
}
    $(".aside").html(function(){
        $(".aside").hide();
    })

    $("#botonClima").click(function(){
        $(".aside").toggle();
    })

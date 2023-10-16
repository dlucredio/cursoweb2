O conteúdo desta parte é baseado no tutorial [W3Schools HTML Geolocation](https://www.w3schools.com/html/html5_geolocation.asp)

Depois de seguir os conceitos básicos, vamos construir uma aplicação que utiliza uma API de mapas. É possível utilizar Google Maps, que é a opção mais famosa e utilizada. Mas aqui vamos utilizar outras opções:
* [openstreetmap](https://www.openstreetmap.org)
* [leafletjs](https://leafletjs.com/)

1. Exemplo de aplicação que mostra a localização do usuário no mapa:

```html
<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css"
        integrity="sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14=" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.9.2/dist/leaflet.js"
        integrity="sha256-o9N1jGDZrf5tS+Ft4gbIK7mYMipq9lqpVJ91xHSyKhg=" crossorigin=""></script>
    <style>
        #mapid {
            height: 600px;
        }
    </style>
    <title>OpenLayers example</title>
</head>

<body>

    <p>Click the button to get your coordinates.</p>

    <button onclick="getLocation()">Try It</button>

    <p id="demo"></p>

    <div id="mapid"></div>

    <script>
        var x = document.getElementById("demo");
        var mymap = L.map('mapid').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'your.mapbox.access.token'
        }).addTo(mymap);

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            x.innerHTML = "Latitude: " + position.coords.latitude +
                "<br>Longitude: " + position.coords.longitude;
            var latlon = new L.LatLng(position.coords.latitude, position.coords.longitude);
            mymap.setView(latlon, 15);
            L.marker(latlon).addTo(mymap);
        }

        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    x.innerHTML = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    x.innerHTML = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    x.innerHTML = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    x.innerHTML = "An unknown error occurred."
                    break;
            }
        }
    </script>

</body>

</html>
```

2. Exemplo de aplicação que usa geocodificação reversa. Dá para fazer pelo Google Maps, mas vamos utilizar uma alternativa *open source* chamada [Nominatim](https://nominatim.org).

```html
<!DOCTYPE html>
<html>

<head>
    <title>Nominatim example</title>
</head>

<body>

    <p>Click the button to get your coordinates.</p>

    <button onclick="getLocation()">Try It</button>

    <p id="demo">Results here</p>

    City: <input type="text" id="city" /> <br/>
    State / district: <input type="text" id="state_district" /> <br/>
    State: <input type="text" id="state" /> <br/>
    Postal code: <input type="text" id="postcode" /> <br/>
    Country: <input type="text" id="country" /> <br/>
    Country code: <input type="text" id="country_code" /> <br/>

    <script>
        var x = document.getElementById("demo");

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            var url = "https://nominatim.openstreetmap.org/reverse?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&format=json&json_callback=showPositionInfo";
            var script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
        }

        function showPositionInfo(positionInfo) {
            document.getElementById("city").value = positionInfo.address.city;
            document.getElementById("state_district").value = positionInfo.address.state_district;
            document.getElementById("state").value = positionInfo.address.state;
            document.getElementById("postcode").value = positionInfo.address.postcode;
            document.getElementById("country").value = positionInfo.address.country;
            document.getElementById("country_code").value = positionInfo.address.country_code;
        }

        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    x.innerHTML = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    x.innerHTML = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    x.innerHTML = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    x.innerHTML = "An unknown error occurred."
                    break;
            }
        }
    </script>

</body>

</html>
```

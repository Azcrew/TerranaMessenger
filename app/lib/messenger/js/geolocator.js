$(document).ready(() => {
    const socket = io.connect('/');
    const id = Math.random().toString(16).substring(2, 15);

    let latHist = Array()
        , lonHist = Array();
    let latAvg, lonAvg;

    if (!navigator.geolocation) {
        $('#position').html("<p>Seu dispositivo nao tem suporte para Geolocalização</p>");
        return;
    }

    function sendPosition(position) {
        let latSum = 0, lonSum = 0
        latHist.push(position.coords.latitude);
        lonHist.push(position.coords.longitude);

        if (latHist.length > 10 && lonHist.length > 10) {
            latHist.shift()
            lonHist.shift()
        }

        for (var i = 0; i < latHist.length; i++) {
            latSum = latSum + parseFloat(latHist[i]);
        }
        for (var i = 0; i < lonHist.length; i++) {
            lonSum = lonSum + parseFloat(lonHist[i]);
        }

        latAvg = latSum / latHist.length;
        lonAvg = lonSum / lonHist.length;

        latAvg = latAvg.toFixed(6);
        lonAvg = lonAvg.toFixed(6);

        const data = {
            id: id,
            lat: latAvg,
            lon: lonAvg
        }

        socket.emit('coords:send', data);
        $('#position').html('<p>Latitude: ' + latAvg + '° - Longitude: ' + lonAvg + '°</p>');
    }

    function error() {

    }

    $('#position').html("<p>Localizando...</p>");

    var options = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 600
    };

    var warpid = navigator.geolocation.watchPosition(sendPosition, error, options);
});

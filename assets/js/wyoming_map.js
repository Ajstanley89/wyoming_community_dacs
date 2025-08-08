// helper function to convert area of a circle in acres to the radius of that circle in meters
function acresToRadius(acres) {
    var areaSqMeters = 4046.86 * acres
    return Math.sqrt(areaSqMeters / Math.PI)
};

var facilityData = {'coords':[41.46028, -110.09337],
                    'size': acresToRadius(235),
                    'hoverText': 'Hypothetical DACS Facility'
                };

var injectionData = {'coords': [41.47616, -110.07159],
                    'hoverText': 'Class VI Injection Well'
                };

var gasData = {'coords': [41.83331, -110.37541],
                'hoverText': 'Gas Plant with CCS'
                };

var windData = [{'coords':[41.41834, -108.86987],
                    'hoverText': '3000 Acres Wind Energy'},
                {'coords': [42.05076, -109.39179],
                    'hoverText': '3000 Acres Wind Energy'},
                {'coords': [41.38178, -110.47996],
                    'hoverText': '3000 Acres Wind Energy'}];

var map = L.map('map').setView(facilityData['coords'], 8);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 11,
    minZoom: 5,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// custom icons
var LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [64, 64], // size of the icon
        // shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [32, 48], // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -54] // point from which the popup should open relative to the iconAnchor
    }
});

var facilityIcon = new LeafIcon({iconUrl: '../assets/icons/facilityIcon.png'}),
    gasIcon = new LeafIcon({iconUrl: '../assets/icons/gasIcon.png'}),
    windIcon = new LeafIcon({iconUrl: '../assets/icons/windIcon.png'});

// Show markers
addMarkers(facilityData, facilityIcon);
addMarkers(gasData, gasIcon);

windData.forEach(d => addMarkers(d, windIcon));

L.marker(injectionData.coords).addTo(map).bindPopup(injectionData.hoverText);

var pipeline = new L.Polyline([facilityData.coords, injectionData.coords], {
    color: 'blue',
    weight: 5,
    opacity: 0.75,
    smoothFactor: 1
})

var ccsPipeline = new L.Polyline([gasData.coords, injectionData.coords], {
    color: 'blue',
    weight: 5,
    opacity: 0.75,
    smoothFactor: 1
})

map.addLayer(pipeline.bindPopup('Pipeline from Facility to Injection Site'))
map.addLayer(ccsPipeline.bindPopup('Pipeline from Gas Plant to Injection Site'))

function addMarkers(data, custom_icon) {
    L.marker(data.coords, {icon: custom_icon})
        .addTo(map)
        .bindPopup(data.hoverText)
}

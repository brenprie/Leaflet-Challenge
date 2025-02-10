// Basemap tile layers, to serve as background map options
var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
});

var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

var Esri_WorldPhysical = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service',
	maxZoom: 8
});

var stadiaGreyscaleMap = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});

var stadiaGreyscaleDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});

var stadiaSatelliteMap = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'jpg'
});

var USGS_USImageryTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 20,
	attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
});

// Create basemaps object (this will be passed into toggle control below)
let basemaps = {
    "ESRI World Street Map": Esri_WorldStreetMap,
    "ESRI World Physical Map": Esri_WorldPhysical,
    "ESRI National Geographic World Map": Esri_NatGeoWorldMap,
    "USGS USImagery Topo Map": USGS_USImageryTopo
};

// Create map object, specifying center, initial zoom level, and default base layer
let map = L.map("map", {
    center: [40.7, -94.5],
    zoom: 4,
    layers: [Esri_WorldStreetMap]
});

/* Alt formulation, if were to hardcode a single basemap; first create map object, then:
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map); 
*/

// Create tectonic plates layer
let tectonicplates = new L.layerGroup();

// Call API to get tectonic plate data
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/refs/heads/master/GeoJSON/PB2002_boundaries.json").then(
    (plateData)=>{
        // console log to verify data loaded
        console.log(plateData);
        // load data using geoJson, add styling, and add to tectonic plates layer
        L.geoJson(plateData, {
            color: "darkred",
            weight: 2
        }).addTo(tectonicplates);
    }        
);

// Add tectonic plates layer to map (loads tectonic plates to map when map first opens)
tectonicplates.addTo(map);

// Create earthquakes layer
let earthquakes = new L.layerGroup();

// Call API to get earthquake data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(
    (quakeData)=>{
        // console log to verify data loaded
        console.log(quakeData);
        // make function that chooses color of circle markers
        function dataColor(depth){
            if (depth > 90)
                return "#D3212C";
            else if(depth > 70)
                return "#FF681E";
            else if(depth > 50)
                return "#FF980E";
            else if(depth > 30)
                return "yellow";
            else if(depth > 10)
                return "#069C56";
            else
                return "#006B3D";
        }
        // make function that chooses size of circle markers
        function radiusSize(mag){
            if (mag == 0)
                return 1; // ensures a 0 magntitude radius shows up
            else 
                return mag * 4; // ensures circles are pronouned on map
        }
        // add style for each data point
        function dataStyle(feature){
            return {
                opacity: 1,
                fillOpacity: 0.7,
                fillColor: dataColor(feature.geometry.coordinates[2]),
                color: "000000", // black
                radius: radiusSize(feature.properties.mag),
                weight: 0.5,
            }
        }
        // add geoJson data to earthquake layer group
        L.geoJson(quakeData, {
            // make each feature / earthquake a market on map (circle)
            pointToLayer: function(feature, latLng){
                return L.circleMarker(latLng);
            },
            // set style for each market
            style: dataStyle, // calls dataStyle function and passes in quake data
            // add popups
            onEachFeature: function(feature, layer){
                // Convert the timestamp to a human-readable date
                const timestamp = feature.properties.time;
                const date = new Date(timestamp);
                const dateOptions = {  
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'};
                const timeOptions = {
                hour: '2-digit', 
                minute: '2-digit', 
                timeZoneName: 'short' 
                };
                const formattedDate = date.toLocaleString('en-US', dateOptions);
                const formattedTime = date.toLocaleString('en-US', timeOptions);

                // Bind the popup with the formatted date
                layer.bindPopup(`Magnitude: <b>${feature.properties.mag}</b><br>
                                Depth: <b>${feature.geometry.coordinates[2]}</b><br>
                                Location: <b>${feature.properties.place}</b><br>
                                Date: <b>${formattedDate}</b><br>
                                Time: <b>${formattedTime}</b>`);
            }
        }).addTo(earthquakes);
    }
);

// Add earthquakes layer to map
earthquakes.addTo(map);

// Create overlays object; add tectonic plates and earthquakes layers (to be passed to toggle control below)
let overlays = {
    "Tectonic Plates": tectonicplates,
    "Earthquakes": earthquakes
};

// Add basemap and overlay layers to toggle control
L.control.layers(basemaps, overlays).addTo(map);

// Add legend to map
let legend = L.control({
    position: "bottomright"
});

// Add properties for legend
legend.onAdd = function(){
    // div for legend to appear in page
    let div = L.DomUtil.create("div", "info legend");

    // Add legend title
    div.innerHTML =`
        <h3>All Earthquakes, Past 7 Days</h3>
        <hr style="margin: 5px 0; border: none; border-top: 1px solid black;">
        <h3>Earthquake Magnitudes</h3>`;

    // Set up intervals
    let intervals = [-10, 10, 30, 50, 70, 90];

    // Set colors for intervals
    let colors = [
        "#006B3D",
        "#069C56",
        "yellow",
        "#FF980E",
        "#FF681E",
        "#D3212C"
    ];

    // Loop through intervals and colors to generate labels w colored squares for each interval
    for(var i = 0; i < intervals.length; i++)
    {
        // Inner html that creates square for each interval and label
        div.innerHTML += "<i style='background: " 
            + colors[i] 
            + "'></i> " 
            + intervals[i]
            + (intervals[i + 1] 
                ? "km &ndash; " + intervals[i + 1] + "km <br>" 
                : "+ km");
    }

    return div;
};

// Add legend to map
legend.addTo(map);

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import * as turf from "@turf/turf";

mapboxgl.accessToken =
  "pk.eyJ1IjoibXJwcm9udG8iLCJhIjoiY2xiYXZvOHByMTlkZDNvcnZhNjhyZWdkdiJ9.mk29Rk9d7x9fntJADzcRxg";

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [-77.0369, 38.9072],
      zoom: 9,
    });

    map.current.on("load", function () {
      map.current.addSource("polygon", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: polygon,
          },
        },
      });

      map.current.addLayer({
        id: "polygon",
        type: "fill",
        source: "polygon",
        layout: {},
        paint: {
          "fill-color": "#088",
          "fill-opacity": 0.8,
        },
      });

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false,
      });

      geocoder.on("result", function (e) {
        const searchWithin = turf.polygon([[...polygon]]);
        const pt = turf.point([e.result.center[0], e.result.center[1]]);
        const inside = turf.booleanPointInPolygon(pt, searchWithin);

        if (inside) {
          new mapboxgl.Marker().setLngLat(e.result.center).addTo(map.current); // remember to use map.current here
          alert("Looks like we deliver to your area!");
        } else {
          alert("Sorry, we do not deliver to your area.");
        }
      });

      // Append geocoder to your map
      map.current.addControl(geocoder);
    });
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  var polygon = [
    [
      [-77.03631820910333, 38.94850779900477],
      [-77.03657959533808, 38.949404594379246],
      [-77.0360341732397, 38.948977694258446],
      [-77.04644551389447, 38.94236976799988],
      [-77.04471158212418, 38.93920216553468],
      [-77.03520464645598, 38.93956349839928],
      [-77.03381843255298, 38.93892112049724],
      [-77.03382569551407, 38.9368784574871],
      [-77.03702734022474, 38.935604764281294],
      [-77.04346897412074, 38.93432309049717],
      [-77.04639626937802, 38.933452203635056],
      [-77.04412210397342, 38.92855098560514],
      [-77.04261493746404, 38.924880519719096],
      [-77.04407477389572, 38.92435997927211],
      [-77.04601527747613, 38.92125225235367],
      [-77.04984042231754, 38.9179052882283],
      [-77.05465789888491, 38.91649277950353],
      [-77.05636757389665, 38.9153603614283],
      [-77.05156350873447, 38.912444561907336],
      [-77.05212327681326, 38.9101930655728],
      [-77.05253966880561, 38.91107676945674],
      [-77.05711632595977, 38.912517331451184],
      [-77.06258616061048, 38.91313676341184],
      [-77.06514127693508, 38.91558833893308],
      [-77.06728682354489, 38.91752460663537],
      [-77.06040473676399, 38.91690371202907],
      [-77.0550784296032, 38.92143081114767],
      [-77.0535379247752, 38.92519922027364],
      [-77.05566162988141, 38.92833925551227],
      [-77.05660029470843, 38.93183376461283],
      [-77.05482760494398, 38.935773643806556],
      [-77.05867144952077, 38.93872860197729],
      [-77.0605392618803, 38.940235430334155],
      [-77.05495412736198, 38.944080589707596],
      [-77.09381970653578, 38.943636673029374],
      [-77.091934031019, 38.939986104241285],
      [-77.09483457359629, 38.935580313453244],
      [-77.09176551832562, 38.93317787000865],
      [-77.09380177025596, 38.92784247924973],
      [-77.09392442371376, 38.926367188927514],
      [-77.08565493466654, 38.92688778271463],
      [-77.0804067765856, 38.92844611862418],
      [-77.08182214932468, 38.91961747906322],
      [-77.07355426113457, 38.9168526194789],
      [-77.07585253759478, 38.91682157727399],
      [-77.07971183898117, 38.916277411521065],
      [-77.07860128743496, 38.91280629820369],
      [-77.07842481006179, 38.90663530017349],
      [-77.05870149375924, 38.903081933667664],
      [-77.05747123607452, 38.900573233416594],
      [-77.05374936284333, 38.898615336105685],
      [-77.05596233142319, 38.89530439653193],
      [-77.05228888275941, 38.892107702253995],
      [-77.0400764198199, 38.893089027998656],
      [-77.03957840015819, 38.90042382980835],
      [-77.0337271809211, 38.90037287530302],
      [-77.03362476523066, 38.89350368349807],
      [-77.01353131158956, 38.89185383876608],
      [-77.01235529371733, 38.88573469629634],
      [-77.03349719114225, 38.887414593937535],
      [-77.03231743768823, 38.88267020205686],
      [-77.02023522620492, 38.874913232978656],
      [-77.01884022971305, 38.8716153910739],
      [-77.00373798821055, 38.87467823613457],
      [-76.99963421902675, 38.87557335956291],
      [-76.9953008396297, 38.877850028404936],
      [-76.99110072769075, 38.8785429323579],
      [-76.98231138231411, 38.87994656027186],
      [-76.98335035032001, 38.896638288784004],
      [-77.01059826721688, 38.909616889301844],
      [-77.02810579142086, 38.91472576998149],
      [-77.02561305249512, 38.92576040229514],
      [-77.01927210883464, 38.939205925424915],
      [-77.01285575753771, 38.94339319700225],
      [-77.02705635856294, 38.94681794258136],
      [-77.02834633549065, 38.94766436782308],
      [-77.03631820910333, 38.94850779900477],
    ],
  ];

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} style={{ height: "400px", width: "100%" }} />
    </div>
  );
}

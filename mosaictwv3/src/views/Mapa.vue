<template>
    <h1 class="mt-4 text-xl text-center ">!! Secció en construcció !!</h1>

    
  <div id="map" class="w-full  min-h-[80vh]" style="height:80vh"></div>

</template>

<script>
import L from 'leaflet'

export default {
  name: 'MapaColles',
  mounted() {
    const map = L.map('map').setView([41.3851, 2.1734], 7) // Center on Catalonia

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    const TileIcon = L.divIcon({
        html: '<div class="h-full w-full border border-2 border-white rounded-sm drop-shadow" style="background-color:#00ff00"></div>',
        iconSize: [40,40],
        iconAnchor: [20,20]
    })

    // Example marker (replace with your colla loop)
    L.marker([41.3851, 2.1734],{icon:TileIcon}).addTo(map).bindPopup('Colla Example')
  }
}
</script>

<style>
#map {
  height: 100%;
}

.leaflet-div-icon{
    border: none

}
</style>
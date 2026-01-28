<script lang="ts" setup>
import {nextTick, type Ref, ref, watch} from 'vue'
import {storeToRefs} from 'pinia'
import {useIncomingAlertStore} from '@/stores/incomingAlert.ts'
import {useSiteStyles} from '@/composables/useSiteStyles.ts'
import {useGenerals} from '@/composables/useGenerals.ts'
import type {Coordinates} from '@/utils/interfaces.ts'
import 'leaflet/dist/leaflet.css'
import type {Map as LeafletMap} from 'leaflet'
import L from 'leaflet'
import {devLog} from '@/utils/utils.ts'
// Fix fehlender Marker-Icons im Build
import markerIcon from 'leaflet/dist/images/marker-icon.png'
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Pinia Stores
const storeIncomingAlert = useIncomingAlertStore()
const {getLastIncomingAlertAddress} = storeToRefs(storeIncomingAlert)
// Generals
const {getValue, ready} = useGenerals()

const fireDepartmentAddress = getValue('fire_department_address')
const defaultMapZoom = getValue('default_map_zoom')

devLog('defaultMapZoom', defaultMapZoom.value)

// Styles
const {style} = useSiteStyles()

const section3 = style('section_3')

/**
 * Coordinates for the Map on the Dashboard
 * Default Value ist the Department from the Database
 */
const mapCoords: Ref<Coordinates> = ref({lat: 0, lon: 0})

// Patch für Leaflet Tooltip / Popup Animation
// @ts-ignore
L.Tooltip.prototype._animateZoom = function (e: any) {
  if (!this._map) {
    return
  }
  // @ts-ignore
  const pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center)
  // @ts-ignore
  this._setPosition(pos)
}

// Optional auch für Popups
// @ts-ignore
L.Popup.prototype._animateZoom = function (e: any) {
  if (!this._map) {
    return
  }
  // @ts-ignore
  const pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center)
  // @ts-ignore
  this._setPosition(pos)
}

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

// let map: LeafletMap | null = null
const map = ref<LeafletMap | null>(null)
const markerGroup = L.layerGroup() // Gruppe, um Marker gesammelt zu verwalten

/**
 * First Initial for the Map, with the Maker on the Location from the Fire department
 */
async function updateMap(addr: string | null) {
  let displayName: string = ''
  devLog('updateMap - addr: ', addr)

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addr ? addr : fireDepartmentAddress.value)}&format=json&limit=1`
    const resp = await fetch(url, {headers: {'Accept-Language': 'de'}})
    const data = await resp.json()
    devLog('Fetch Coordinates for incoming', data)
    if (data.length > 0 && data[0].lat && data[0].lon && data[0].display_name) {
      mapCoords.value.lat = parseFloat(data[0].lat)
      mapCoords.value.lon = parseFloat(data[0].lon)
      displayName = data[0].display_name
    }
  } catch (e) {
    console.warn('Geocoding fehlgeschlagen, benutze Default-Koordinaten', e)
  }

  // 2) Karte initialisieren (falls noch nicht)
  if (!map.value) {
    map.value = L.map('map').setView(
      [mapCoords.value.lat, mapCoords.value.lon],
      parseInt(defaultMapZoom.value),
    )
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      // @ts-ignore
    }).addTo(map.value)
    // @ts-ignore
    markerGroup.addTo(map.value)
  } else {
    map.value.setView([mapCoords.value.lat, mapCoords.value.lon], parseInt(defaultMapZoom.value))
  }

  // 3) Alte Marker entfernen
  markerGroup.clearLayers()

  // 4) Neuen Marker setzen
  L.marker([mapCoords.value.lat, mapCoords.value.lon])
    .addTo(markerGroup)
    .bindPopup(addr ? displayName : `Gerätehaus (${fireDepartmentAddress.value})`)
    .openPopup()
}

// Beispiel: wenn address sich ändert → Map updaten
watch(
  () => getLastIncomingAlertAddress.value, // <-- getter function (valid)
  (newAddr, oldAddr) => {
    devLog(
      `new Alert ===> ${newAddr.addressForCoordinates}    ===> before: ${oldAddr.addressForCoordinates}`,
    )
    updateMap(newAddr.addressForCoordinates)
  },
)

watch(
  () => [ready],
  async ([genRead]) => {
    if (genRead) {
      await nextTick()
      await updateMap(null)
    }
  },
  {immediate: true},
)
</script>

<template>
  <div
    id="map"
    :class="section3.htmlClass"
    :style="section3.htmlStyle"
  />
</template>

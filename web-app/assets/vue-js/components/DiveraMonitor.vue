<template>
  <!-- Text für den Divera Monitor -->
  <div :style="displayViewAlertMonitor.sectionOne" class="grid col-12 m-0 p-0 text-center">
    <!-- Komme -->
    <div class="col-4">
      <h2 :style="displayViewAlertMonitor.come" class="m-0 mt-1">
        {{ sites.diveraMonitor.come }}
      </h2>
    </div>
    <!-- komme nicht -->
    <div class="col-4">
      <h2 :style="displayViewAlertMonitor.doNotCome" class="m-0 mt-1">
        {{ sites.diveraMonitor.doNotCome }}
      </h2>
    </div>
    <!-- komme < 10min -->
    <div class="col-4">
      <h2 :style="displayViewAlertMonitor.comeTenMinutesLater" class="m-0 mt-1">
        {{ sites.diveraMonitor.comeTenMinutesLater }}
      </h2>
    </div>
  </div>
  <!-- Anzeige Divera Monitor -->
  <div :style="displayViewAlertMonitor.sectionTwo" class="col-12 m-0 p-0">
    <iframe :src="dataById.diveraUrl" class="m-0 p-0 min-w-full min-h-full border-none"/>
  </div>

  <!-- Horizontal Linie -->
  <div class="col-12 m-0 p-0 line-height-1">
    <hr class="m-0 p-0">
  </div>

  <!-- Einsatzmeldung -->
  <div :style="displayViewAlertMonitor.sectionThree" class="col-12 m-0 p-0 text-center">
    <!-- Überschrift -->
    <h2 :style="displayViewAlertMonitor.headlineAlertMessage" class="color m-0 mt-2 underline">
      {{ sites.displayView.alertMessage }}
    </h2>
    <!-- Einsatzmeldung -->
    <h1 :style="displayViewAlertMonitor.textAlertMessage">
      {{ splitLastAlert.messageComplete }}
    </h1>
  </div>

  <!-- Horizontal Linie -->
  <div class="col-12 m-0 p-0 line-height-1">
    <hr class="m-0 p-0">
  </div>

  <div class="grid col-12 m-0 p-0 text-center min-h-5rem">
    <!-- Einsatzort -->
    <div :style="displayViewAlertMonitor.sectionFourLeft" class="col-6 m-0 p-0 text-center border-right-1">
      <!-- Überschrift -->
      <h2 :style="displayViewAlertMonitor.headlinePlaceOfUse" class="color m-0 mt-2 underline">
        {{ sites.displayView.placeOfUse }}</h2>
      <!-- Ortsausgabe vom Alarm -->
      <h1 :style="displayViewAlertMonitor.textPlaceOfUse">
        {{ splitLastAlert.location }}
      </h1>
      <!-- Wenn die trennung nicht ordentlich funktionierte  -->
      <h2 v-if="splitLastAlert.otherAddressInformation">
        ({{ splitLastAlert.otherAddressInformation }})
      </h2>
    </div>

    <!-- Wichtige Mitteilungen -->
    <div :style="displayViewAlertMonitor.sectionFourRight" class="col-6 m-0 p-0 text-center">

      <router-link :to="{name: managementAreaNames.messages}" alt="go-to-message">
        <!-- Überschrift -->
        <h2 :style="displayViewAlertMonitor.headlineMessage" class="color m-0 mt-2 underline">{{
            sites.displayView.messages
          }}</h2>
      </router-link>
      <!-- Ausgabe von Meldungen -->
      <ul class="text-center mr-5">
        <li v-for="(data, index) in dataForTable" :key="data.id" class="list-none">
          <div class="animation-delay-1000">
            <!-- Überschrift -->
            <h4 :style="displayViewAlertMonitor.textMessageHeadline" class="m-0 mb-2 underline">
              {{ data.headline }}
            </h4>
            <!-- Text -->
            <h5 :style="displayViewAlertMonitor.textMessageMessage" class="m-0">
              {{ data.message }}
            </h5>
            <!-- Horizontal Linie -->
            <hr v-if="dataForTable.length-1 > index" class="line-height-1 border-red-900">
          </div>
        </li>
      </ul>
    </div>
  </div>

  <!-- Horizontal Linie -->
  <div class="col-12 m-0 p-0 line-height-1">
    <hr class="m-0 p-0">
  </div>

  <!--  Aktuelle Uhrzeit und Datum -->
  <div id="postion-fixed" :style="displayViewAlertMonitor.sectionFive" class="col-2 text-center">
    <h4 :style="displayViewAlertMonitor.time" class="m-0">{{ currentTime }}</h4>
    <h6 :style="displayViewAlertMonitor.date" class="m-0">{{ currentDate }}</h6>
  </div>
</template>

<script setup>
import {storeToRefs} from "pinia";
import {useTranslationStore} from "@/stores/translate";
// Moment JS
import moment from "moment";
import {onBeforeUnmount, ref} from "vue";
import {managementAreaNames} from "@/router/default";
import {useSiteStyleStore} from "@/stores/ManagementArea/siteStyle";
import {useIncomingAlertStore} from "@/stores/ManagementArea/incomingAlert";
import {useMessageStore} from "@/stores/ManagementArea/message";
import {useGroundSettingStore} from "@/stores/ManagementArea/groundSetting";

// Events die abgefeuert werden
const emit = defineEmits(['addToast'])

moment.locale('de');

// Store - Übersetzungen
const storeTranslation = useTranslationStore();
const {components, sites} = storeToRefs(storeTranslation)

// Site Style-Store
const storeSiteStyle = useSiteStyleStore();
const {displayViewAlertMonitor} = storeToRefs(storeSiteStyle)
storeSiteStyle.loadDataForTable();

// Incoming Alert-Store
const storeIncomingAlert = useIncomingAlertStore();
const {lastAlert, splitLastAlert} = storeToRefs(storeIncomingAlert)
storeIncomingAlert.loadDataForTable();

// Mitteilungen Alert-Store
const storeMessage = useMessageStore();
const {dataForTable} = storeToRefs(storeMessage)
storeMessage.loadDataForTable();

// Generals-Store
const storeGeneral = useGroundSettingStore();
const {dataById} = storeToRefs(storeGeneral)
storeGeneral.loadDataForTable();

// Aktuelles Datum bzw. Uhrzeit
const currentDate = ref(moment().format('dddd, DD. MMMM'))
const currentTime = ref(moment().format('LTS'))

// Aktualisieren der Uhrzeit
const setTime = () => {
  currentTime.value = moment().format('LTS');
  setDate()
}
// Aktualisieren des Datums
const setDate = () => {
  currentDate.value = moment().format('dddd, DD. MMMM')
}
// Jeder Sekunde, Uhrzeit und Datum aktualisieren
const updateTimeInterval = setInterval(setTime, 1000);

const fetchStyle = () => {
  storeSiteStyle.loadDataForTable();
  if (dataById.value.showReloadToast) {
    emit('addToast', {
      severity: 'success',
      summary: `${components.value.toastMessage.reload.title}`,
      detail: `${components.value.toastMessage.reload.message}`
    })
  }
};

const fetchGenerals = () => {
  storeGeneral.loadDataForTable();
  if (dataById.value.showReloadToast) {
    emit('addToast', {
      severity: 'success',
      summary: `${components.value.toastMessage.reload.title}`,
      detail: `${components.value.toastMessage.reload.message}`
    })
  }
};

const fetchIncomingAlerts = () => {
  storeIncomingAlert.loadDataForTable();
  if (dataById.value.showReloadToast) {
    emit('addToast', {
      severity: 'success',
      summary: `${components.value.toastMessage.reload.title}`,
      detail: `${components.value.toastMessage.reload.message}`
    })
  }
};

const fetchMessages = () => {
  storeMessage.loadDataForTable();
  if (dataById.value.showReloadToast) {
    emit('addToast', {
      severity: 'success',
      summary: `${components.value.toastMessage.reload.title}`,
      detail: `${components.value.toastMessage.reload.message}`
    })
  }
};

// aller 60 Sekunde, nach neuen Alarmen Schauen
const updateTimeIntervalStyle = setInterval(fetchStyle, parseInt(dataById.value.reloadTimeStyle));
const updateTimeIntervalGenerals = setInterval(fetchGenerals, parseInt(dataById.value.reloadTimeGeneral));
const updateTimeIntervalMessages = setInterval(fetchMessages, parseInt(dataById.value.reloadTimeMessage));
const updateTimeIntervalIncomingAlert = setInterval(fetchIncomingAlerts, parseInt(dataById.value.reloadTimeAlert));

onBeforeUnmount(() => {
  clearInterval(updateTimeInterval);
  clearInterval(updateTimeIntervalStyle);
  clearInterval(updateTimeIntervalGenerals);
  clearInterval(updateTimeIntervalMessages);
  clearInterval(updateTimeIntervalIncomingAlert);
});
</script>

<style>
#postion-fixed {
  position: absolute;
  bottom: 0;
  margin: 0 auto 1rem;
  width: 100%;
}

ul {
  text-align: center !important;
}
</style>
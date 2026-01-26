<template>
  <div class="grid m-2">
    <div class="col-12">
      <router-view @add-toast="addToast"/>
    </div>
  </div>

</template>
<script setup>
import {RouterView} from "vue-router";
</script>

<template>
  {{ token }}
  <router-view></router-view>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  token: String
})
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
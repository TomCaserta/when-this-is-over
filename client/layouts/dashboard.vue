<template>
  <div class="page">
    <div class="content">
        <nuxt />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
    background: $background;
    min-height: 100vh;
}
</style>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class DashboardLayout extends Vue {

}
</script>

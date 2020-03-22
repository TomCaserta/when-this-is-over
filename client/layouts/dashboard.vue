<template>
  <div class="page">
    <div class="content">
        <nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class DashboardLayout extends Vue {

}
</script>

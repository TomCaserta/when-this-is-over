<template>
    <div class="flag" :style="{ '--bg': `url(${background})`}" />
</template>

<style lang="scss" scoped>
    .flag {
        border: 4px solid #FFFFFF;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
        background: var(--bg);
        background-size: cover;
        background-position: 50% 50%;
        border-radius: 50%;
        width: 50px;
        height: 50px;
    }
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import countries from '../assets/data/countries';

@Component
export default class Country extends Vue {
    @Prop(String)
    code!: keyof typeof countries;

    get background() {
        return `/imgs/flags/${countries[this.code].flag}`;
    }
}
</script>

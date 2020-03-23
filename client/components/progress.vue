<template>
    <div class="progress" :style="{ '--percent': `${percent}%`}">
        <div class="progress__complete" />
    </div>
</template>

<style lang="scss" scoped>
.progress {
    height: 16px;
    background: $light-gray;
    border-radius: 8px;
    position: relative;

    &__complete {
        position: absolute;
        left: 0px;
        top: 0px;
        height: 16px;
        border-radius: 8px;
        background: $primary;
        width: var(--percent);
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Progress extends Vue {
    @Prop(Number)
    percent: number;
}
</script>

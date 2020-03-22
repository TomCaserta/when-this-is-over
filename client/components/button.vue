<template>
    <button
        class="button"
        :class="`button--${variant}`"
    >
        <slot />
    </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'button',
})
export default class Button extends Vue {
    @Prop({
        type: String,
        default: 'primary',
    })
    variant!: string;
}
</script>

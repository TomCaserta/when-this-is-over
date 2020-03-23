<template>
    <button
        class="button"
        :class="{
            [`button--${variant}`]: true,
            'button--inline': true,
        }"
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

    @Prop(Boolean)
    inline!: boolean;
}
</script>

<template>
    <button
        class="button"
        :class="{
            [`button--${variant}`]: true,
            'button--inline': inline,
            'button--disabled': disabled,
        }"
    >
        <span><slot /></span>
        <div
            v-if="isLoading"
            class="spinner"
        >
            <svg
                class="loading-ring"
                viewBox="0 0 24 24"
            >
                <circle
                    stroke-width="3"
                    stroke="white"
                    fill="transparent"
                    stroke-dasharray="56.548667764616276 56.548667764616276"
                    stroke-dashoffset="12"
                    r="9"
                    cx="12"
                    cy="12"
                />
            </svg>
        </div>
    </button>
</template>

<style lang="scss" scope>
.button {
    position: relative;
}

@keyframes spin {
    0% {
        animation-timing-function: cubic-bezier(0.5856,0.0703,0.4143,0.9297);
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}

.spinner {
    position: absolute;
    width: 24px;
    height: 24px;
    right: $space--large;
    top: 50%;
    transform: translateY(-50%);
}

.loading-ring {
    animation: spin 1s infinite linear;
    width: 24px;
    height: 24px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'ui-button',
})
export default class UiButton extends Vue {
    @Prop({
        type: String,
        default: 'primary',
    })
    variant!: string;

    @Prop(Boolean)
    inline!: boolean;

    @Prop(Boolean)
    disabled!: boolean;

    @Prop(Boolean)
    isLoading!: boolean;
}
</script>

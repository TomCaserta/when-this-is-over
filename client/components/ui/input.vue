<template>
    <input
        class="input"
        :class="{
            [`input--${variant}`]: true,
        }"
    />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'ui-input',
})
export default class UiInput extends Vue {
    @Prop({
        type: String,
        default: 'primary',
    })
    variant!: string;

    @Prop(Boolean)
    inline!: boolean;
}
</script>

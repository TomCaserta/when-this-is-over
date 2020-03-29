<template>
    <input
        class="input"
        :class="{
            [`input--${variant}`]: true,
        }"
        :value="value"
        @change="input($event.target.value)"
        @blur="blur()"
        @focus="focus()"
    />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit } from 'vue-property-decorator';

@Component({
    name: 'ui-input',
    model: {
        prop: 'value',
        event: 'input',
    },
})
export default class UiInput extends Vue {
    @Prop({
        type: String,
        default: 'primary',
    })
    variant!: string;

    @Prop(Boolean)
    inline!: boolean;

    @Prop(String)
    value!: string;

    @Emit('input')
    input(value: string) {
        return value;
    }

    @Emit('blur')
    blur() {
        return true;
    }

    @Emit('focus')
    focus() {
        return true;
    }
}
</script>

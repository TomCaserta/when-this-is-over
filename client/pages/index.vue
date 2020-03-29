<template>
    <div class="intro">
        <h1 class="intro__title">
            When This Is Over
        </h1>
        <p class="intro__desc">
            In quarantine and feel like you have lots of ideas and plans but no way to do them right now? Lets keep some promises together. Begin by adding a place you would like to visit or a thing you need to do and we’ll email you to remind you as soon as the lockdown is over in your city!
        </p>

        <ui-form-field class="intro__task">
            <to-do-field />
        </ui-form-field>

        <ui-button class="intro__button" variant="success">
            BEGIN PLANNING
        </ui-button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import UiButton from '@/components/ui/button.vue';
import UiFormField from '@/components/ui/form-field.vue';
import ToDoField from '@/components/todo-field.vue';

@Component({
    components: {
        UiButton,
        ToDoField,
        UiFormField,
    }
})
export default class IndexPage extends Vue {

}
</script>

<style lang="scss" scoped>
.intro {
    @include grid(12);

    &__title {
        margin-top: $space--x-large;
        color: $heading-text--contrast;
        text-align: center;

        grid-column: span 12;
        grid-row: 1;
    }

    &__desc {
        color: $body-text--contrast;
        text-align: center;

        grid-column: span 12;
        grid-row: 2;

        @include tablet() {
            grid-column: 3 / span 8;
        }

        @include desktop() {
            grid-column: 4 / span 6;
        }
    }

    &__task {
        display: block;

        grid-column: span 12;
        grid-row: 3;

        @include tablet() {
            grid-column: 3 / span 8;
        }

        @include desktop() {
            grid-column: 4 / span 6;
        }
    }

    &__button {
        display: block;

        grid-column: 3 / 8 span;
        grid-row: 4;

        @include tablet() {
            grid-column: 5 / span 4;
        }

        @include desktop() {
            grid-column: 6 / span 2;
        }
    }
}
</style>

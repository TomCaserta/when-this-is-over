<template>
  <div class="intro">
        <h1 class="intro__title">When This Is Over</h1>
        <p class="intro__desc">
          In quarantine and feel like you have lots of ideas and plans but no way to do them right now? Lets keep some promises together. Begin by adding a place you would like to visit or a thing you need to do and we’ll email you to remind you as soon as the lockdown is over in your city!
        </p>

        <input
          class="intro__task"
          autofocus
          placeholder="Enter a city, restaurant, thing you want to do, anything..."
        />

        <Button class="intro__button" variant="success">
            BEGIN PLANNING
        </Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import Button from '@/components/button.vue';

@Component({
    components: {
        Button
    }
})
export default class IndexPage extends Vue {

}
</script>

<style lang="scss" scoped>
.intro {
    @include grid(12);
    text-align: center;

    &__title {
        margin-top: $space--x-large;
        color: $heading-text--contrast;

        grid-column: span 12;
        grid-row: 1;
    }

    &__desc {
        color: $body-text--contrast;

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
        margin-top: $space--x-large;
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

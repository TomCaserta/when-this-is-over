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
    position: relative;
    left: 50%;
    width: calc((((100vw - (#{$space} * 12)) / 12) * 8));
    text-align: center;
    transform: translateX(-50%);

    &__title {
        margin-top: $space--x-large;
        color: $heading-text--contrast;
    }

    &__desc {
        margin-top: $space--x-large;
        color: $body-text--contrast;
    }

    &__task {
        margin-top: $space--x-large;
        width: calc((((100vw - (#{$space} * 12)) / 12) * 6));
    }

    &__button {
        margin-top: $space--large;
        // TODO Make this a mixin or use grid/flex?
        width: calc((((100vw - (#{$space} * 12)) / 12) * 2));
    }
}
</style>

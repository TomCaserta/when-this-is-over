<template>
    <div class="item">
        <div
            v-if="imageUrl"
            class="item__image"
            :style="{
                '--bg': `url(${imageUrl})`
            }"
        >
        </div>
        <div class="item__details">
            <h4>{{title}}</h4>
            <p class="item__description">
                {{description}}
            </p>
        </div>
    </div>
</template>

<style lang="scss">
.item {
    margin: $space 0px;
    background: #FFFFFF;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
    border-radius: 5px;

    &__details {
        padding: $space;
    }

    &__image {
        border-radius: $border-radius $border-radius 0px 0px;
        height: 160px;
        width: 100%;

        background:
            linear-gradient(
              rgba($primary, 0.3),
              rgba($primary, 0.3)
            ),
            var(--bg);
        background-size: cover;
        background-position: 50% 50%;
    }

    &__description {
        margin-top: $space--small;
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Item extends Vue {
    @Prop(String)
    imageUrl!: string;

    @Prop(String)
    title!: string;

    @Prop(String)
    description!: string;
}
</script>

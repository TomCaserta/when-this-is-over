<template>
    <div class="item">
        <div
            v-if="imageUrl"
            class="item__image"
            :style="{
                backgroundImage: `url(${imageUrl})`
            }"
        >
        </div>
        <h4>{{title}}</h4>
        <p>
            {{description}}
        </p>
    </div>
</template>

<style lang="scss">

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

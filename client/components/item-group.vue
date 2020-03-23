<template>
    <div class="group">
        <h3 class="group__title">{{title}}</h3>
        <div class="group__items">
            <Item
                v-for="item of items"
                class="group__item"
                :key="item.id"
                :title="item.title"
                :description="item.description"
                :imageUrl="item.image"
            />
        </div>
    </div>
</template>

<style lang="scss">
.group {
    &__title {
        color: $body-text;
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import Item from "@/components/item.vue";
import { ITodoItem } from '../store/item';

@Component({
    components: {
        Item,
    }
})
export default class ItemGroup extends Vue {
    @Prop(String)
    title!: string;

    @Prop(Array)
    items!: ITodoItem[];
}
</script>

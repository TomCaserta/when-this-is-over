<template>
  <div>
       <div class="nav">
           <div class="left">
               <input type="text" placeholder="Enter a city, restaurant, thing you want to do, anything..." />
               <Button class="add" variant="success">
                   + ADD ITEM
               </Button>
           </div>
       </div>

       <div class="lists">
           <ItemGroup
               v-for="group of groups"
               :title="group.title"
               :key="group.id"
               :items="group.items"
           />
       </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import Button from '@/components/button.vue';
import ItemGroup from '@/components/item-group.vue';
import { ITodoItem } from '../store/item';

export interface ITodoItemGroup {
    title: string;
    items: ITodoItem[];
    id: string;
}

@Component({
    layout: 'dashboard',
    components: {
        Button,
        ItemGroup,
    }
})
export default class DashboardPage extends Vue {
    groups: ITodoItemGroup[] = [
        {
            id: '1',
            title: 'Places to go',
            items: [
                {
                    id: 1,
                    title: 'London (UK)',
                    description: 'Go back home to lorum ipsum blah',
                },
                {
                    id: 2,
                    title: 'San francisco (USA)',
                    description: 'Some lovely bridge this is, could be cool right?',
                }
            ]
        },
    ];
}
</script>

<style lang="scss" scoped>
.nav {

}
</style>

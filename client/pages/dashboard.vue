<template>
  <div>
       <div class="nav">
           <div class="nav__add-item">
               <input class="nav__task" placeholder="Enter a city, restaurant, thing you want to do, anything..." />
               <Button class="nav__submit" variant="success" inline>
                   + ADD ITEM
               </Button>
           </div>
       </div>

       <div class="lists">
           <ItemGroup
               v-for="group of groups"
               class="lists__list"
               :title="group.title"
               :key="group.id"
               :items="group.items"
           />
       </div>
  </div>
</template>

<style lang="scss" scoped>
.nav {
    background: #fff;
    min-height: 50px;
    line-height: 50px;
    padding: 0px $space--large;

    &__task {
        @include mq-col(12, 3, 4, $space--large);
    }

    &__submit {
        width: 100%;

        @include tablet() {
            width: auto;
        }
    }
}


.lists {
    width: 100%;
    padding: $space--large;

    @include tablet() {
        display: flex;
    }

    &__list {
        @include mq-col(12, 4, 4, $space--large);


        @include tablet() {
            margin-right: $space;

            &:last-child {
                margin-right: 0px;
            }
        }
    }
}
</style>


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
            title: 'Places to visit',
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
            ],
        },
        {
            id: '2',
            title: 'Things to do',
            items: [
                {
                    id: 1,
                    title: 'Go for a walk',
                    description: 'Maybe this second line looks cool but would never be typed in.',
                },
                {
                    id: 2,
                    title: 'Purchase a new bike',
                    description: 'Totally should finally get that new XCR-1000 Electric bike!',
                },
                {
                    id: 3,
                    title: 'Party on the streets!',
                    description: 'Make sure we still keep our distance ;)',
                }
            ],
        },
        {
            id: '3',
            title: 'Restaurants to eat at',
            items: [
                {
                    id: 1,
                    title: 'Lima 26',
                    description: 'Best peruvian restaurant in Marbella! (Okay theres only like 2)',
                },
            ],
        }
    ];
}
</script>

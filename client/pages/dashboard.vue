<template>
    <div>
        <div class="nav">
            <ToDoField can-overflow class="nav__task" />
            <UiButton class="nav__submit" variant="success" inline>
                + ADD ITEM
            </UiButton>

            <Country class="nav__country" code="BR" />
            <Countdown class="nav__countdown" email="tom@caserta.co.uk" :end-date="1586563200000" :total-days="30" />
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
    min-height: 75px;
    padding: 0px $space--large;
    align-content: center;
    justify-content: center;

    @include grid(12);

    &__task {
        grid-column: span 12;

        @include tablet() {
            grid-column: span 4;
        }
    }

    &__submit {
        width: 100%;
        grid-column: span 12;

        @include tablet() {
            grid-column: span 1;
        }
    }

    &__country {
        display: none;

        @include tablet() {
            display: block;
            justify-self: end;
            grid-column: -5;
        }
    }

    &__countdown {
        display: none;

        @include tablet() {
            display: block;
            grid-column: -4 / -1;
            align-self: center;
        }
    }
}

.lists {
    width: 100%;
    padding: $space--large;
    @include grid(12);

    &__list {
        grid-column: span 12;

        @include tablet() {
            grid-column: span 4;
        }
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import UiButton from '@/components/ui/button.vue';
import ItemGroup from '@/components/item-group.vue';
import Country from '@/components/country.vue';
import Countdown from '@/components/countdown.vue';
import ToDoField from '@/components/todo-field.vue';
import { ITodoItemGroup, TodoGroupType } from '@/services/sdk.interface';

@Component({
    layout: 'dashboard',
    components: {
        UiButton,
        ItemGroup,
        Country,
        Countdown,
        ToDoField,
    }
})
export default class DashboardPage extends Vue {
    groups: ITodoItemGroup[] = [
        {
            id: '1',
            title: 'Places to visit',
            groupType: TodoGroupType.PLACE,
            items: [
                {
                    id: '1',
                    title: 'London (UK)',
                    image: '/imgs/london.jpg',
                    description: 'Go back home to lorum ipsum blah',
                    isComplete: false,
                },
                {
                    id: '2',
                    title: 'San francisco (USA)',
                    image: '/imgs/sanfran.jpg',
                    description: 'Some lovely bridge this is, could be cool right?',
                    isComplete: false,
                }
            ],
        },
        {
            id: '2',
            title: 'Things to do',
            groupType: TodoGroupType.ITEM,
            items: [
                {
                    id: '1',
                    title: 'Go for a walk',
                    description: 'Maybe this second line looks cool but would never be typed in.',
                    isComplete: false,
                },
                {
                    id: '2',
                    title: 'Purchase a new bike',
                    description: 'Totally should finally get that new XCR-1000 Electric bike!',
                    isComplete: false,
                },
                {
                    id: '3',
                    title: 'Party on the streets!',
                    description: 'Make sure we still keep our distance ;)',
                    isComplete: false,
                }
            ],
        },
        {
            id: '3',
            title: 'Restaurants to eat at',
            groupType: TodoGroupType.RESTAURANT,
            items: [
                {
                    id: '1',
                    title: 'Lima 26',
                    image: '/imgs/taquenos.jpg',
                    description: 'Best peruvian restaurant in Marbella! (Okay theres only like 2)',
                    isComplete: false,
                },
            ],
        }
    ];
}
</script>

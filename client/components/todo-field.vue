<template>
    <div class="todo-field">
        <div
            :class="{
                'todo-field__shadow-wrapper': isTyping && isInField,
            }"
        >
            <input
                class="task"
                :class="{ 'has-suggestions': isTyping && isInField }"
                ref="task"
                v-model="task"
                autofocus
                placeholder="Enter a city, restaurant, thing you want to do, anything.."
                @focus="isInField = true"
                @blur="isInField = false"
            />
            <div
                v-if="isTyping && isInField"
                class="autocomplete"
            >
                <div class="autocomplete__add">
                    <img class="autocomplete__plus" src="/imgs/plus.svg" width="12" height="12" />
                    <span>Add just ‘<b>{{ task }}</b>’ to your things to do list.</span>
                </div>
                <div class="autocomplete__suggestions">
                    <ul class="autocomplete__items">
                        <li class="autocomplete__item autocomplete__item--heading">
                            Places
                        </li>
                        <li class="autocomplete__item">Paris</li>
                        <li class="autocomplete__item">Paris</li>
                        <li class="autocomplete__item">Paris</li>
                        <li class="autocomplete__item">Paris</li>
                        <li class="autocomplete__item">Paris</li>
                    </ul>
                    <ul class="autocomplete__items">
                        <li class="autocomplete__item autocomplete__item--heading">
                            Restaurants
                        </li>
                        <li class="autocomplete__item">Lima 26</li>
                        <li class="autocomplete__item">Lima 26</li>
                        <li class="autocomplete__item">Lima 26</li>
                        <li class="autocomplete__item">Lima 26</li>
                    </ul>
                </div>
                <div class="autocomplete__powered-by" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$powered-by-width: 288px / 2;
$powered-by-height: 36px / 2;

.todo-field {
    width: 100%;
    position: relative;

    &__shadow-wrapper {
        width: 100%;
        position: absolute;
        box-shadow: 0px 5px 3px rgba(0, 0, 0, 0.25);
        border-radius: 5px 5px 5px 5px;
    }
}

.task {
    width: 100%;
    height: 50px;
    transition: all 0.2s;

    &.has-suggestions {
        border-radius: 5px 5px 0px 0px;
        border-bottom: $primary solid 5px;
    }
}

.autocomplete {
    @include paragraph();

    width: 100%;
    min-height: 200px;
    background: #fff;
    border-radius: 0px 0px 5px 5px;
    padding: 0px $space--small #{$space--small + $powered-by-height};

    &__powered-by {
        position: absolute;
        bottom: $space--small;
        right: $space--small;
        width: $powered-by-width;
        height: $powered-by-height;
        background: url('/imgs/google.png');
        background-size: contain;
    }

    &__add {
        @include style-guide-small-text();

        padding: #{$space * 0.75} $space--small;
        display: flex;
        align-items: center;
        border-bottom: 1px solid $light-gray;
        // Maybe make small text size larger?
        font-size: 10px;
    }

    &__suggestions {
        display: flex;
    }

    &__plus {
        margin-right: $space--small;
    }

    &__items {
        list-style: none;
        flex-grow: 1;
        margin: 0px;
        padding: 0px $space--small;
    }

    &__item {
        margin: $space--x-small 0px;

        &--heading {
            @include heading_four();

            margin: $space--small 0px;
        }
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { v4 as uuidv4 } from 'uuid';

import { IAddTodoParams } from '@/services/sdk.interface';
import { Debounce } from '@/utils/debounce';

type Place = google.maps.places.AutocompletePrediction;

@Component({
    model: {
        prop: 'value',
        event: 'change',
    }
})
export default class ToDoField extends Vue {
    @Prop(String)
    value!: IAddTodoParams;

    task: string = '';
    isInField: boolean = false;

    places: Place[] = [];
    restaurants: Place[] = [];

    /**
     * Google bills per auto complete session.
     */
    citiesSession: string = uuidv4();
    establishmentSession: string = uuidv4();
    reqCount: number = 0;

    get isTyping() {
        return this.task !== '';
    }

    @Emit('change')
    setValue(todo: IAddTodoParams) {
        return todo;
    }

    @Watch('task')
    onTaskChange() {
        if (this.task === '') {
            // Create a new autocomplete session.
            // this might get expensive :D hope not though.
            this.citiesSession = uuidv4();
            this.establishmentSession = uuidv4();
        }

        this.searchEstablishments();
    }

    getTaskInput() {
        return this.$refs.task as HTMLInputElement;
    }

    @Debounce(300, false)
    async searchEstablishments() {
        if (this.task.length < 3) {
            return;
        }

        const count = ++this.reqCount;

        const {
            establishments,
            cities,
         } = await this.autocomplete();

        if (count !== this.reqCount) {
            // Cancel, another req came in as they were typing
            return;
        }

        // TODO: Use this data.
        console.log(establishments, cities);
        this.places = cities;
        this.restaurants = establishments;
    }

    autocomplete(): Promise<{ cities: Place[], establishments: Place[] }> {
        return this.$axios.$get(
            process.env.API_URL + '/autocomplete',
            {
                params: {
                    key: process.env.PLACES_API_KEY!,
                    input: this.task,
                    tokens: [this.establishmentSession, this.citiesSession],
                    offset: this.getTaskInput().selectionEnd,
                }
            }
        );
    }
}
</script>

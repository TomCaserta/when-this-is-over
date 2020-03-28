<template>
    <div class="todo-field">
        <div
            :class="{
                'todo-field__shadow-wrapper': isTyping && showSuggestions,
            }"
            @keydown.up.capture="move(0, -1, $event)"
            @keydown.left.capture="move(-1, 0, $event)"
            @keydown.down.capture="move(0, 1, $event)"
            @keydown.right.capture="move(1, 0, $event)"
            @keyup.enter="chooseAutocompleteItem()"
            @mouseenter="setInElement(true)"
            @mouseleave="setInElement(false)"
        >
            <input
                class="task"
                :class="{ 'has-suggestions': isTyping && showSuggestions }"
                ref="task"
                v-model="task"
                autofocus
                placeholder="Enter a city, restaurant, thing you want to do, anything.."
                @focus.capture="setFocus(true)"
                @blur.capture="setFocus(false)"
            />
            <div
                v-if="isTyping && showSuggestions"
                class="autocomplete"
                :class="{
                    'can-overflow': canOverflow
                }"
            >
                <div
                    class="autocomplete__add"
                    :class="{ 'highlight': isSelected('add') }"
                    @click="chooseAutocompleteItem('add')"
                >
                    <img class="autocomplete__plus" src="/imgs/plus.svg" width="12" height="12" />
                    <span>Add just ‘<b>{{ task }}</b>’ to your things to do list.</span>
                </div>
                <div class="autocomplete__suggestions">
                    <ul class="autocomplete__items" v-if="cities.length">
                        <li class="autocomplete__item autocomplete__item--heading">
                            Cities
                        </li>
                        <place-highlighter
                            v-for="city of cities"
                            tag="li"
                            class="autocomplete__item"
                            secondary
                            :class="{ 'highlight': isSelected(city) }"
                            :key="city.id"
                            :place="city"
                            @click="chooseAutocompleteItem(city.place_id)"
                        />
                    </ul>
                    <ul class="autocomplete__items" v-if="establishments.length">
                        <li class="autocomplete__item autocomplete__item--heading">
                            Places/Restaurants
                        </li>

                        <place-highlighter
                            v-for="establishment of establishments"
                            tag="li"
                            class="autocomplete__item"
                            secondary
                            :class="{ 'highlight': isSelected(establishment) }"
                            :key="establishment.id"
                            :place="establishment"
                            @click="chooseAutocompleteItem(establishment.place_id)"
                        />
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
$hover-color: lighten($secondary, 55%);

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
    position: relative;
    @include paragraph();

    width: 100%;
    background: #fff;
    border-radius: 0px 0px 5px 5px;
    padding: 0px $space--small #{$space + $powered-by-height};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);

    &.can-overflow {
        min-width: 50vw;
        max-width: 100vw;
        border-radius: 0px 5px 5px 5px;
    }

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

        &.highlight, &:hover {
            background: $hover-color;
            cursor: pointer;
        }
    }

    &__suggestions {
        display: flex;
    }

    &__plus {
        margin-right: $space--small;
    }

    &__items {
        list-style: none;
        flex: 1 1;
        margin: 0px;
        padding: 0px;
    }

    &__item {
        margin: $space--x-small 0px;
        padding: $space--small;

        &.highlight, &:hover {
            background: $hover-color;
            cursor: pointer;
        }

        &--heading {
            @include heading_four();

            margin: $space--small 0px;

            &:hover {
                cursor: initial;
                background: none;
            }
        }
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { v4 as uuidv4 } from 'uuid';
import { sdk } from '../services/sdk.service';

import PlaceHighlighter from '@/components/place-highlighter.vue';

import {  Place, IAutoCompletePlaceResponse } from '@/services/sdk.interface';
import { Debounce } from '@/utils/debounce';

enum TodoSelection {
    ADD = 'add',
    NONE = 'none',
}

export interface ITodoValue {
    placeId?: string;
    title: string;
}

/**
 * Autocomplete cache to avoid re-requesting the same data for the
 * same task text.
 */
const autocompleteCache = new Map<string, Promise<IAutoCompletePlaceResponse>>();

@Component({
    model: {
        prop: 'value',
        event: 'change',
    },
    components: {
        PlaceHighlighter,
    },
})
export default class ToDoField extends Vue {
    @Prop(String)
    value!: ITodoValue;

    @Prop(Boolean)
    canOverflow!: boolean;

    task: string = '';
    showSuggestions: boolean = false;
    isFocussed = false;
    isInElement = false;

    cities: Place[] = [];
    establishments: Place[] = [];

    // Current item selected in the overlay
    selectedItemId: string | TodoSelection = TodoSelection.NONE;

    /**
     * Google bills per auto complete session.
     */
    citiesSession: string = uuidv4();
    establishmentSession: string = uuidv4();
    reqCount: number = 0;
    // TODO: See if we can get rid of this little monster
    // skips the next search if value is set outside
    skipNext: boolean = false;

    mounted() {
        if (document.activeElement === this.getTaskInput()) {
            this.showSuggestions = true;
        }
    }

    get isTyping() {
        return this.task !== '';
    }

    move(addX: number, addY: number, event?: KeyboardEvent) {
        const { x, y } = this.getSelected(this.selectedItemId);

        const newPosX = x + addX;
        const newPosY = y + addY;
        this.showSuggestions = true;

        if (newPosY > 0 && event) {
            event.preventDefault();
        }

        this.selectedItemId = this.getItemAtPosition(
            newPosX < 0 ? 0 : newPosX,
            newPosY < 0 ? 0 : newPosY,
        );
    }

    setFocus(isFocussed: boolean) {
        this.isFocussed = isFocussed;

        if (isFocussed) {
            this.showSuggestions = true;
        } else if (!this.isInElement) {
            this.showSuggestions = false;
        }
    }

    setInElement(isInElement: boolean) {
        this.isInElement = isInElement;

        if (!this.isFocussed && !isInElement) {
            this.showSuggestions = false;
        }
    }

    getItemAtPosition(x: number, y: number) {
        if (y === 1) {
            return TodoSelection.ADD;
        }

        if (y === 0) {
            return TodoSelection.NONE;
        }

        const placesWithData = [this.cities, this.establishments].filter((list) => list.length > 0);

        if (placesWithData.length === 0) {
            return TodoSelection.ADD;
        }

        // Account for items above
        y -= 2;
        const column = Math.min(x % 2, placesWithData.length - 1);
        const items = placesWithData[column];
        const row = y % items.length;

        return items[row].place_id;
    }

    getSelected(item: string | TodoSelection) {
        // We have to keep track by searching this as we don't want to lose
        // the cursor position while a user is typing.

        // TODO: Try and clean this spaghetti up.
        if (item === TodoSelection.NONE) {
            return { x: 0, y: 0, item: this.task };
        }

        if (item === TodoSelection.ADD) {
            return { x: 0, y: 1, item: this.task };
        }

        const city = this.cities.findIndex((place) => this.isSelected(place, item));

        if (city !== -1) {
            return { x: 0, y: city + 2, item: this.cities[city] };
        }

        const establishment = this.establishments.findIndex((place) => this.isSelected(place, item));

        if (establishment !== -1) {
            return { x: 1, y: establishment + 2, item: this.establishments[establishment] };
        }

        return { x: 0, y: 0, item: this.task };
    }

    isSelected(item: Place | TodoSelection, selected = this.selectedItemId) {
        if (typeof item !== 'string') {
            return item.place_id === selected;
        }

        return item === selected;
    }

    @Watch('value')
    setTask() {
        this.task = this.value.title;
        this.selectedItemId = this.value.placeId || TodoSelection.NONE;
        this.skipNext = true;
    }

    @Emit('change')
    setValue(todo: ITodoValue) {
        return todo;
    }

    chooseAutocompleteItem(item = this.selectedItemId) {
        this.showSuggestions = false;
        const selected = this.getSelected(item).item;

        // Guard for TS purposes. Probably rewrite this so it doesn't suck.
        if (typeof selected === 'string') {
            this.setValue({
                title: selected,
            });
        } else {
            this.setValue({
                title: selected.description,
                placeId: selected.place_id,
            });
            this.task = selected.description;
        }
    }

    @Watch('task')
    onTaskChange() {
        if (this.task === '') {
            // Create a new autocomplete session.
            // this might get expensive :D hope not though.
            this.citiesSession = uuidv4();
            this.establishmentSession = uuidv4();
            this.establishments = [];
            this.cities = [];
        }

        this.searchEstablishments();
    }

    getTaskInput() {
        return this.$refs.task as HTMLInputElement;
    }

    @Debounce(300, false)
    async searchEstablishments() {
        if (this.task.length < 3 || this.skipNext) {
            this.skipNext = false;
            return;
        }

        const count = ++this.reqCount;

        const {
            establishments,
            cities,
         } = await this.autocomplete(this.task.trim());

        if (count !== this.reqCount) {
            // Cancel, another req came in as they were typing
            return;
        }

        this.cities = cities;
        this.establishments = establishments;
    }

    autocomplete(task: string) {
        if (autocompleteCache.has(task)) {
            return autocompleteCache.get(task)!;
        }

        const resp = sdk.use(this.$axios).autocompletePlace({
            input: task,
            // TODO: Generate tokens server side. For now this is simple.
            tokens: [this.establishmentSession, this.citiesSession],
            offset: this.getTaskInput().selectionEnd || task.length,
        });

        autocompleteCache.set(task, resp);
        return resp;
    }
}
</script>

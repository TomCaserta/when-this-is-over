<template>
    <div>
        <input
            ref="task"
            v-model="task"
            placeholder="Enter a city, restaurant, thing you want to do, anything.."
        />
        <!-- TODO: Powered by Google Logo Required -->

        <p>
        </p>
    </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { v4 as uuidv4 } from 'uuid';

import { IAddTodoParams } from '@/services/sdk.interface';
import { Debounce } from '@/utils/debounce';

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

    /**
     * Google bills per auto complete session.
     */
    citiesSession: string = uuidv4();
    establishmentSession: string = uuidv4();
    reqCount: number = 0;

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

        const [
            establishments,
            cities,
        ] = await Promise.all([
            this.autocomplete('establishment'),
            this.autocomplete('(cities)'),
        ]);

        if (count !== this.reqCount) {
            // Cancel, another req came in as they were typing
            return;
        }

        // TODO: Use this data.
        console.log(establishments, cities);
    }

    autocomplete(type: 'establishment' | '(cities)'): Promise<google.maps.places.AutocompletePrediction[]> {
        return this.$axios.$get(
            'https://maps.googleapis.com/maps/api/place/autocomplete/output',
            {
                params: {
                    key: process.env.PLACES_API_KEY!,
                    input: this.task,
                    sessiontoken: type === 'establishment' ? this.establishmentSession : this.citiesSession,
                    offset: this.getTaskInput().selectionEnd,
                    // Yeah you can only specify one type at a time. The things is
                    // called 'type' though. Complete BS.
                    types: type,
                }
            }
        );
    }
}
</script>

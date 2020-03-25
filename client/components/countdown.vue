<template>
    <div class="countdown">
        <p class="countdown__info">
            {{ daysLeft }} days until we send an email to <b>{{ email }}</b>
        </p>
        <ProgressBar class="countdown__progress" :percent="percent" />
    </div>
</template>

<style lang="scss" scoped>
.countdown {
    display: flex;
    flex-direction: column;

    &__info {
        @include style_guide_small_text();
        margin-bottom: $space--x-small;
    }

    &__progress {
        width: 100%;
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import ProgressBar from '@/components/progress-bar.vue';

@Component({
    components: {
        ProgressBar,
    },
})
export default class Countdown extends Vue {
    @Prop(Number) endDate!: number;

    @Prop(Number) totalDays!: number;

    @Prop(String) email!: string;

    get daysLeft() {
        if (this.endDate <= Date.now()) {
            return 0;
        }

        return Math.ceil((this.endDate - Date.now()) / 86400000);
    }

    get percent() {
        return (100 / this.totalDays) * this.daysLeft;
    }
}
</script>

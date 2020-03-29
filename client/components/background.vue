<template>
    <div class="background">
        <div
            v-for="circle of circles"
            class="background__circle"
            :key="circle.id"
            :style="{
                '--size': `${circle.size}vmin`,
                '--duration': `${circle.duration}s`,
                '--delay': `-${circle.delay}s`,
                '--origin-x': `${circle.originX}vw`,
                '--origin-y': `${circle.originY}vw`,
                '--top': `${circle.top}%`,
                '--left': `${circle.left}%`,
            }"
        />
    </div>
</template>

<style lang="scss" scoped>
.background {
    background: linear-gradient(157.61deg, #CA054D 23.14%, #C706B4 85.46%);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    overflow: hidden;

    &__circle {
        backface-visibility: hidden;
        position: absolute;
        animation: rotate;
        animation-timing-function: linear;
        animation-iteration-count: infinite;

        width: var(--size);
        height: var(--size);
        border-radius: var(--size);
        animation-duration: var(--duration);
        animation-delay: var(--delay);
        transform-origin: var(--origin-x) var(--origin-y);
        top: var(--top);
        left: var(--left);

        background: rgba(196, 196, 196, 0.1);
        // backdrop-filter: blur(4px);
    }
}

@keyframes rotate {
    100% {
        transform: translate3d(0, 0, 1px) rotate(360deg);
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

interface ICircle {
    id: number;
    size: number;
    top: number;
    left: number;
    delay: number;
    originX: number;
    originY: number;
    duration: number;
}

@Component({
    name: 'background',
})
export default class Background extends Vue {
    circles: ICircle[] = [];

    created() {
        for (let x = 0; x < 20; x++) {
            this.circles.push({
                id: x,
                size: this.getRandom(5, 50),
                top: this.getRandom(0, 100),
                left: this.getRandom(0, 100),
                delay: this.getRandom(0, 300),
                originX: this.getRandom(0, 20),
                originY: this.getRandom(10, 40),
                duration: this.getRandom(300, 400),
            })
        }
    }

    getRandom(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
</script>

<template>
    <nav class="nav">
        <ul class="nav__links">
            <li class="nav__link">
                <a href="/login" @click.prevent="login()">Login</a>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
.nav {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);

    min-height: 75px;
    padding: 0px $space--large;
    align-content: center;
    justify-content: center;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    &__links {
        list-style: none;
        margin: 0px;
    }

    &__link {
        @include heading_four();

        text-transform: uppercase;
        padding: $space;

        a {
            display: block;
            color: #fff;
            text-decoration: none;
            width: 100%;
            height: 100%;
        }
    }
}

</style>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
    name: 'top-navigation',
})
export default class TopNavigation extends Vue {
    login() {
        // @ts-ignore
        this.$modal.show('login');
    }
}
</script>

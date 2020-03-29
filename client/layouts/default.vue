<template>
    <div class="page">
        <div class="content">
            <Background />
            <top-navigation />
            <nuxt />
        </div>
        <login-modal />
        <sign-up-modal />
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

import SignUpModal from '@/components/modals/signup.vue';
import LoginModal from '@/components/modals/login.vue';
import Background from '@/components/background.vue';
import TopNavigation from '@/components/top-navigation.vue';

@Component({
    components: {
        Background,
        LoginModal,
        SignUpModal,
        TopNavigation,
    }
})
export default class DefaultLayout extends Vue {

}
</script>

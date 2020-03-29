<template>
    <modal name="login">
        <h3 class="heading">Login</h3>
        <p class="intro">Enter your email and password to login.</p>
        <form class="form">
            <ui-form-field
                message="Please enter a valid email."
                :has-error="$v.email.$error"
            >
                <ui-input
                    v-model="$v.email.$model"
                    placeholder="Email"
                    type="email"
                    @blur="$v.email.$touch()"
                />
            </ui-form-field>

            <ui-form-field
                message="Please enter your password."
                :has-error="$v.password.$error"
            >
                <ui-input
                    v-model="$v.password.$model"
                    placeholder="Password"
                    type="password"
                    @blur="$v.password.$touch()"
                />
            </ui-form-field>

            <ui-form-field>
                <ui-button>
                    Login
                </ui-button>
            </ui-form-field>
        </form>
    </modal>
</template>

<style lang="scss" scoped>
.heading {
    margin-bottom: $space;
}

.intro {
    padding: $space--small;
}

.form {
    width: 100%;
    max-width: 350px;
}
</style>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

import UiFormField from '@/components/ui/form-field.vue';
import UiButton from '@/components/ui/button.vue';
import UiInput from '@/components/ui/input.vue';

@Component({
    name: 'login-modal',
    components: {
        UiFormField,
        UiButton,
        UiInput,
    },
    validations: {
        email: {
            required,
            email,
        },
        password: {
            required,
        }
    }
})
export default class LoginModal extends Mixins(
    validationMixin
) {
    email: string = '';
    password: string = '';

}
</script>

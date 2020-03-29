<template>
    <modal name="login">
        <h3 class="heading">Login</h3>
        <p class="intro">Enter your email and password to login.</p>
        <form
            class="form"
            @submit.prevent="onSubmit()"
        >
            <ui-form-field
                message="Please enter a valid email."
                :has-error="$v.email.$error"
            >
                <ui-input
                    v-model="$v.email.$model"
                    required
                    placeholder="Email"
                    type="email"
			        @input="$v.email.$reset()"
                    @blur="$v.email.$touch()"
                />
            </ui-form-field>

            <ui-form-field
                message="Please enter your password."
                :has-error="$v.password.$error"
            >
                <ui-input
                    v-model="$v.password.$model"
                    required
                    placeholder="Password"
                    type="password"
			        @input="$v.password.$reset()"
                    @blur="$v.password.$touch()"
                />
            </ui-form-field>

            <ui-form-field>
                <ui-button
                    type="submit"
                    :is-loading="isSubmitting"
                    :disabled="$v.$invalid"
                >
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

import { sdk } from '~/services/sdk.service';

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

    isSubmitting: boolean = false;

    async onSubmit() {
        if (this.$v.$invalid) {
            return;
        }

        this.isSubmitting = true;
        await sdk.use(this.$axios).login(this.email);
        this.isSubmitting = false;
    }

}
</script>

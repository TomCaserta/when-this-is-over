<template>
    <modal name="sign-up">
        <h3 class="heading">
            Sign Up
        </h3>
        <p class="intro">
            Enter your email and password to sign up.
        </p>
        <form
            class="form"
            @submit.prevent="onSubmit()"
        >
            <ui-form-field
                message="Please enter a valid email."
                :has-error="$v.email.$error"
                :has-success="!$v.email.$invalid"
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
                :has-success="!$v.password.$invalid"
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

            <ui-form-field
                :has-error="$v.acceptEmail.$error"
            >
                <label>
                    <ui-input
                        v-model="$v.acceptEmail.$model"
                        type="checkbox"
                    /> I agree to receive the end-of-quarantine email.
                </label>
            </ui-form-field>

            <ui-form-field
                :has-error="$v.acceptPrivacy.$error"
            >
                <label>
                    <ui-input
                        v-model="$v.acceptPrivacy.$model"
                        type="checkbox"
                    /> I accept the Terms & Conditions and Privacy Policy
                </label>
            </ui-form-field>

            <ui-form-field>
                <ui-button
                    type="submit"
                    :is-loading="isSubmitting"
                    :disabled="$v.$invalid"
                >
                    Sign Up
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
    name: 'sign-up-modal',
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
        },
        acceptPrivacy: {
            required,
            requiredTrue: (val) => !!val,
        },
        acceptEmail: {
            required,
            requiredTrue: (val) => !!val,
        },
    },
})
export default class SignUpModal extends Mixins(
    validationMixin
) {
    email: string = '';
    password: string = '';

    isSubmitting: boolean = false;
    errorMessage: string | null = '';

    async onSubmit() {
        if (this.$v.$invalid) {
            return;
        }

        this.isSubmitting = true;

        try {
            await sdk.use(this.$axios).signUp(this.email, 'DE');
        } catch (error) {
            if (typeof error === 'string') {
                this.errorMessage = error;
            }
        }

        this.isSubmitting = false;
    }

}
</script>

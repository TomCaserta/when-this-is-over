<template>
    <div
        class="form-field"
        :class="{
            'form-field--error': hasError,
            'form-field--success': hasSuccess,
            'form-field--alert': hasWarning,
            'has-message': !!message,
        }"
    >
        <slot />
        <div
            v-if="(hasError || hasWarning) && message"
            class="form-field__message"
            :class="{
                'form-field__message--error': hasError,
                'form-field__message--alert': hasWarning,
            }"
        >
            <img v-if="hasError" class="form-field__message_icon" width="24" height="24" src="/imgs/icons/error.svg" />
            <img v-else-if="hasWarning" class="form-field__message_icon" width="24" height="24" src="/imgs/icons/error.svg" />
            {{ message }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.form-field {
    width: 100%;

    --input-border-color: #{$light_gray};
    --input-border-radius: #{$border-radius};

    &--error {
        --input-border-color: #{$error};
    }

    &--success {
        --input-border-color: #{$success};
    }

    &--alert {
        --input-border-color: #{$alert};
    }

    &__message {
        @include paragraph();

        display: flex;
        align-items: center;
        margin-top: #{-$border-radius};
        width: 100%;
        min-height: $space--large;
        padding: #{$border-radius + $space--small} $space--small $space--small;
        border-radius: 0px 0px #{$border-radius} #{$border-radius};
        color: #fff;

        &--error {
            background: $error;
        }

        &--success {
            background: $success;
        }

        &--alert {
            background: $alert;
        }
    }

    &__message_icon {
        margin-right: $space--small;
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'ui-form-field',
})
export default class UiFormField extends Vue {
    @Prop(String)
    message!: string;

    @Prop(Boolean)
    inline!: boolean;

    @Prop(Boolean)
    hasSuccess!: boolean;

    @Prop(Boolean)
    hasError!: boolean;

    @Prop(Boolean)
    hasWarning!: boolean;

}
</script>

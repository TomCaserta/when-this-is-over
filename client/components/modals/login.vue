<template>
    <modal name="login" class="modal">
        <form>
            <input />
        </form>
    </modal>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

@Component({
    name: 'login-modal',
    validations: {
        email: {
            required,
            email,
        }
    }
})
export default class LoginModal extends Mixins(
    validationMixin
) {
    email: string = '';

}
</script>

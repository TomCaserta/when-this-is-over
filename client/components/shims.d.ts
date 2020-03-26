import { NuxtAxiosInstance } from '@nuxtjs/axios';

declare module "*.vue" {
    import Vue from 'vue';
    export default Vue;
}

declare namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/interface-name-prefix
    interface Process {
        client: boolean
        server: boolean
    }
}

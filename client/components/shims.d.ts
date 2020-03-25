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

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Store<S> {
    $axios: NuxtAxiosInstance,
  }
}

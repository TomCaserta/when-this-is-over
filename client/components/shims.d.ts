declare module "*.vue" {
    import Vue from 'vue';
    export default Vue;
}

declare namespace NodeJS {
    interface Process {
        client: boolean
        server: boolean
    }
}

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

declare module "vue-js-modal/dist/ssr.index.js" {
    const x: any;
	export default x;
}

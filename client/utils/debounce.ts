import { createDecorator } from 'vue-class-component';

/** https://davidwalsh.name/javascript-debounce-function  */
export function debounce<Func extends (...args: any[]) => any>(
    func: Func,
    wait: number = 100,
    immediate: boolean = false,
): Func {
    let timeoutId: number | undefined;

    return function(this: any, ...args: Parameters<Func>) {
        const context = this;

        const later = () => {
            timeoutId = undefined;
            if (!immediate) {
                func.apply(context, args);
            }
        };

        const shouldCallNow = immediate && timeoutId === undefined;

        if (timeoutId !== undefined) {
            window.clearTimeout(timeoutId);
        }

        timeoutId = window.setTimeout(later, wait);

        if (shouldCallNow) {
            func.apply(context, args);
        }
    } as any;
}

export const Debounce = (wait: number, immediate: boolean = false) => createDecorator((options, key) => {
    const func = options.methods![key];

    if (func && wait > 0) {
        options.methods![key] = debounce(func, wait, immediate);
    }
});

import { reactive, readonly } from 'vue';

// eslint-disable-next-line @typescript-eslint/ban-types
export abstract class Store<T extends Object> {
    protected $state: T;

    constructor() {
        const data = this.$setup();
        this.$state = reactive(data) as T;
    }

    $reset(): void {
        const data = this.$setup();
        this.$state = reactive(data) as T;
    }

    protected abstract $setup(): T

    get state(): T {
        return readonly(this.$state) as T;
    }
}
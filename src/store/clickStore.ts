import { Store } from './main';

interface State extends Object {
    clicks: number;
}

class ClickStore extends Store<State> {
    protected $setup(): State {
        return {
            clicks: 0,
        };
    }

    inc() {
        this.$state.clicks += 1;
    }
}

const clickStore: ClickStore = new ClickStore();

export default clickStore;
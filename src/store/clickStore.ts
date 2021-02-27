import { Store } from './main';
import axios from 'axios';
import _ from 'lodash';

interface State extends Object {
    clicks: number;
}

class ClickStore extends Store<State> {
    protected $setup(): State {
        return {
            clicks: 0,
        };
    }

    get clicks(): number {
        return this.$state.clicks;
    }

    inc(): void {
        this.$state.clicks += 1;
    }

    setClicks(clicks: number) {
        this.$state.clicks = clicks;
    }

    async fetchClicks(): Promise<number> {
        const { data } = await axios.post('https://reqres.in/api/random', {
            random: _.random(42, 69),
        });
        const clicks = Number(data.random);
        this.setClicks(clicks);

        return this.clicks;
    }
}

const clickStore: ClickStore = new ClickStore();

export default clickStore;
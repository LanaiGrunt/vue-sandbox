import { defineStore } from 'pinia';
import axios from 'axios';
import _ from 'lodash';

export const useClickStore = defineStore({
    id: 'click',
    state: () => ({
        clicks: 0,
    }),
    actions: {
        $reset() {
            this.clicks = 0;
        },
        inc() {
            this.clicks += 1;
        },
        setClicks(clicks: number) {
            this.clicks = clicks;
        },
        async fetchClicks(): Promise<number> {
            const { data } = await axios.post('https://reqres.in/api/random', {
                random: _.random(42, 69),
            });
            const clicks = Number(data.random);
            this.setClicks(clicks);

            return this.clicks;
        },
    },
});
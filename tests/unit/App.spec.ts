import { mount, VueWrapper } from '@vue/test-utils';
import { waitFor } from '@testing-library/vue';
import { ComponentPublicInstance } from 'vue';
import { createPinia } from 'pinia';
import { server, rest } from './msw';
import router from '@/router';
import _ from 'lodash';
import App from '@/App.vue';
import { useClickStore } from '@/store/clickStore';

describe('App.vue', () => {
    let wrapper: VueWrapper<ComponentPublicInstance>;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    let clickStore: any;

    beforeAll(() => {
        server.listen();
    });

    beforeEach(async (cb) => {
        wrapper = mount(App, {
            global: {
                plugins: [
                    router,
                    createPinia(),
                ],
            },
        });
        clickStore = useClickStore();
        clickStore.$reset();
        await router.push('/');
        await router.isReady();
        cb();
    });

    afterEach(() => {
        server.resetHandlers();
    });

    afterAll(() => {
        server.close();
    });

    it('has a nav', async () => {
        // Arrange
        const nav = wrapper.find('#nav');
        // Assert
        expect(nav.text()).toContain('Home');
        expect(nav.text()).toContain('About');
    });

    it('can navigate', async () => {
        // Act
        await wrapper.find('#nav a[href="/about"]').trigger('click');
        // Assert
        await waitFor(() => {
            expect(wrapper.find('.about h1').text()).toEqual('This is an about page');
        });
    });

    it('reacts on clicks', async () => {
        // Act
        await _.times(10, () => wrapper.find('.home').trigger('click'));
        // Assert
        expect(clickStore.clicks).toEqual(10);
    });

    it('can reset the click counter', async () => {
        // Arrange
        await _.times(10, () => wrapper.find('.home').trigger('click'));
        expect(clickStore.clicks).toEqual(10);
        // Act
        await wrapper.find('#reset').trigger('click');
        // Assert
        expect(clickStore.clicks).toEqual(0);
    });

    it('can fetch the click counter', async () => {
        // Arrange
        server.use(
            rest.post('https://reqres.in/api/random', (req, res, ctx) => {
                return res(
                    ctx.json({
                        random: _.random(42, 69),
                    }),
                );
            }),
        );
        // Act
        await wrapper.find('#fetch').trigger('click');
        // Assert
        await waitFor(() => {
            expect(clickStore.clicks).toBeGreaterThanOrEqual(42);
            expect(clickStore.clicks).toBeLessThanOrEqual(69);
            expect(wrapper.find('#clicks').text()).toMatch(String(clickStore.clicks));
        });
    });
});

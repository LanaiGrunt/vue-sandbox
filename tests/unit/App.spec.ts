import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import App from '@/App.vue';
import router from '@/router';
import clickStore from '@/store/clickStore';
import { server, rest } from './msw';
import _ from 'lodash';
import { ComponentPublicInstance } from 'vue';

describe('App.vue', () => {
    let wrapper: VueWrapper<ComponentPublicInstance>;

    beforeAll(() => {
        server.listen();
    });

    beforeEach(async () => {
        wrapper = mount(App, {
            global: {
                plugins: [
                    router,
                ],
            },
        });
        await router.push('/');
    });

    afterEach(() => {
        clickStore.$reset();
        server.resetHandlers();
    });

    afterAll(() => {
        server.close();
    });

    it('has nav', async () => {
        // Assert
        expect(wrapper.find('#nav')).toBeDefined();
    });

    it('can navigate', async () => {
        // Act
        await wrapper.find('#nav a:nth-of-type(2)').trigger('click');
        await flushPromises();
        // Assert
        expect(wrapper.find('.about h1').text()).toEqual('This is an about page');
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
        await wrapper.find('#fetch').trigger('click');
        await new Promise(r => setTimeout(r, 25)); // workaround
        await flushPromises();
        // Assert
        expect(clickStore.clicks).toBeGreaterThanOrEqual(42);
        expect(clickStore.clicks).toBeLessThanOrEqual(69);
        expect(wrapper.find('#clicks').text()).toMatch(String(clickStore.clicks));
    });
});

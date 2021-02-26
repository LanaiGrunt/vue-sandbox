import { flushPromises, mount } from '@vue/test-utils';
import App from '@/App.vue';
import router from '@/router';
import clickStore from '@/store/clickStore';
import axios from 'axios';
import _ from 'lodash';

describe('App.vue', () => {
    // Arrange
    const wrapper = mount(App, {
        global: {
            plugins: [
                router,
            ],
        },
    });

    beforeEach(async () => {
        clickStore.$reset();
        await router.push('/');
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
        const mockedPost = jest.spyOn(axios, 'post');
        mockedPost.mockImplementationOnce(() => new Promise(resolve => {
            resolve({ data: { random: _.random(42, 69) } });
        }));
        // Act
        await wrapper.find('#fetch').trigger('click');
        await flushPromises();
        // Assert
        expect(clickStore.clicks).toBeGreaterThanOrEqual(42);
        expect(clickStore.clicks).toBeLessThanOrEqual(69);
        expect(mockedPost).toBeCalled();
        expect(mockedPost.mock.results[0].value).toBeInstanceOf(Promise);
    });
});

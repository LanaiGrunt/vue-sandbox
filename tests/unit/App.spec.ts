import { flushPromises, mount } from '@vue/test-utils';
import App from '@/App.vue';
import router from '@/router';
import clickStore from '@/store/clickStore';
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
        expect(clickStore.state.clicks).toEqual(10);
    });
});

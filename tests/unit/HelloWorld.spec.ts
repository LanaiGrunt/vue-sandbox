import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';
import clickStore from '@/store/clickStore';
import _ from 'lodash';

describe('HelloWorld.vue', () => {
    beforeEach(() => {
        clickStore.$reset();
    });

    it('can add two numbers', async () => {
        // Arrange
        const wrapper = shallowMount(HelloWorld);
        // Act
        clickStore.inc();
        await wrapper.find('#first-number').setValue(123);
        await wrapper.find('#second-number').setValue(456);
        // Assert
        expect(wrapper.find('#result').text()).toMatch('579');
    });

    it('can count clicks', async () => {
        // Arrange
        const wrapper = shallowMount(HelloWorld);
        // Act
        await _.times(10, () => clickStore.inc());
        // Assert
        expect(wrapper.find('#clicks').text()).toEqual('10');
    });
});

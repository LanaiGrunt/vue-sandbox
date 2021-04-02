import { shallowMount, VueWrapper } from '@vue/test-utils';
import { ComponentPublicInstance } from 'vue';
import { createPinia } from 'pinia';
import _ from 'lodash';
import HelloWorld from '@/components/HelloWorld.vue';
import { useClickStore } from '@/store/clickStore';

describe('HelloWorld.vue', () => {
    let wrapper: VueWrapper<ComponentPublicInstance>;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    let clickStore: any;

    beforeEach(() => {
        wrapper = shallowMount(HelloWorld, {
            global: {
                plugins: [
                    createPinia(),
                ],
            },
        });
        clickStore = useClickStore();
        clickStore.$reset();
    });

    it('can add two numbers', async () => {
        // Act
        clickStore.inc();
        await wrapper.find('#first-number').setValue(123);
        await wrapper.find('#second-number').setValue(456);
        // Assert
        expect(wrapper.find('#result').text()).toMatch('579');
    });

    it('can count clicks', async () => {
        // Act
        await _.times(10, () => clickStore.inc());
        // Assert
        expect(wrapper.find('#clicks').text()).toEqual('10');
    });
});

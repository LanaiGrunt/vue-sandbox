<template>
    <div>
        <div id="result">
            {{ result }}
        </div>
        <div id="clicks">
            {{ clicks }}
        </div>
        <input id="first-number" v-model.number="firstNumber">
        <input id="second-number" v-model.number="secondNumber">
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, computed } from 'vue';
    import { useClickStore } from '@/store/clickStore';

    export default defineComponent({
        setup() {
            const clickStore = useClickStore();
            const firstNumber = ref(0);
            const secondNumber = ref(0);
            const result = computed(() => firstNumber.value + secondNumber.value);
            const clicks = computed(() => clickStore.clicks);

            return {
                firstNumber,
                secondNumber,
                result,
                clicks,
            };
        },
    });
</script>

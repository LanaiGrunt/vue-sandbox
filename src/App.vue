<template>
    <div id="nav">
        <router-link to="/">
            Home
        </router-link> |
        <router-link to="/about" class="123">
            About
        </router-link>
    </div>
    <router-view @click="click" />
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import clickStore from '@/store/clickStore';
    
    export default defineComponent({
        setup() {
            return {
                click: () => clickStore.inc(),
            };
        }, 
    });
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>

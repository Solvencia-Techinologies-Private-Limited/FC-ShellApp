<template>
    <div class="mfe-container">
        <div v-if="loading" class="spinner">Loading MFE...</div>
        <div v-if="error" class="error-msg">{{error}}</div>

        <!--angular app will mount inside this DOM node-->
        <div ref="angularHost" :id="hostId" class="angular-host"></div>
    </div>
</template>
<script setup lang="ts">
    import {ref,onMounted,onUnmounted} from 'vue';
    import { loadRemoteComponent } from '@/utils/mfeLoader';

    const props = defineProps<{
        remoteUrl: string;
        scopeName: string;
        moduleName: string;
        hostId: string;
    }>();

    const angularHost = ref<HTMLElement | null>(null);
    const loading = ref(true);
    const error = ref<string | null>(null);
    let unmountFn:(() => void) | null = null;

    onMounted(async () => {
        try{
            //load exposed module from remoteEntry.js
            const exposedModule = await loadRemoteComponent(
                props.remoteUrl,
                props.scopeName,
                props.moduleName
            );

            //call the mount function provided by the angular MFE
            if(angularHost.value && typeof exposedModule.mount === 'function'){
                unmountFn = await exposedModule.mount(angularHost.value);
            } else {
                throw new Error(`Exposed module '${props.moduleName}' does not export a mount() function`);
            }
        } catch(err:any) {
            console.error(`Failed to mount MFE [{props.scopeName}]:`,err);
            error.value = `Error loading ${props.scopeName} MicroFrontend: ${err.message}`;
        } finally {
            loading.value = false;
        }
    });

    //clean up angular instance when switching routes in Vue
    onUnmounted(() => {
        if(typeof unmountFn === 'function'){
            unmountFn();
        }
    })
</script>

<style scoped>
    .mfe-container {
        min-height: 300px;
        width: 100%;
        box-sizing: border-box;
    }
    .angular-host {
        width: 100%;
    }
    .angular-host :deep(app-root){
        display: block;
        width: 100%;
    }
    .spinner {
        font-weight: bold;
        color: #42b883;
    }
    .error-msg {
        color: #e74c3c;
    }
</style>
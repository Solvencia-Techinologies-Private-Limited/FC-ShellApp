<script setup lang="ts">
import AngularMfeWrapper from '@/components/AngularMfeWrapper.vue';

</script>

<template>
    <div class="page">
        <h1>Vue Shell - Resources Hub</h1>
        <AngularMfeWrapper 
        remoteUrl = "http://localhost:4203"
        scopeName = "resources"
        moduleName = "./Component"
        hostId = "resources-mfe-root"
        />
    </div>
</template>
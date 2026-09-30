<template>
    <div class="page">
        <h1>Vue Shell - Orders Management</h1>
        <AngularMfeWrapper 
        remoteUrl = "http://localhost:4201"
        scopeName = "Orders"
        moduleName = "./Component"
        hostId = "orders-mfe-root" />
    </div>
</template>

<script setup lang="ts">
    import AngularMfeWrapper from '../components/AngularMfeWrapper.vue';
</script>

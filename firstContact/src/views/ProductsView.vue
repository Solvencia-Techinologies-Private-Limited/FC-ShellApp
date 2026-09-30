<script setup lang="ts">
import AngularMfeWrapper from '@/components/AngularMfeWrapper.vue';

</script>

<template>
    <div class="page">
        <h1>Vue Shell - Products Catalog</h1>
        <AngularMfeWrapper 
        remoteUrl = "http://localhost:4202"
        scopeName = "products"
        moduleName = "./Component"
        hostId = "products-mfe-root"
        />
    </div>
</template>
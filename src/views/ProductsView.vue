<template>
    <div class="layout-wrapper">
        <div style="padding: 5px;">
            <ProductList></ProductList>
        </div>
        <div style="padding: 5px;">
            <CategoryList></CategoryList>
        </div>
    </div>
</template>
<script setup lang="ts">
import ProductList from "@/components/ProductList.vue"
import CategoryList from "@/components/CategoryList.vue";
</script>
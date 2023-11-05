<template>
    <div class="layout-wrapper">
        <NavHead></NavHead>
        <div class="layout-main-container">
            <div class="layout-main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import NavHead from './NavHead.vue';
</script>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import InputText from 'primevue/inputtext';

defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

</script>
<template>
    <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText :value="modelValue" @input="emit('update:modelValue', $event.target.value)"
            placeholder="Buscar Producto" />
    </span>
</template>
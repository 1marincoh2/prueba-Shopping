<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { productService } from '@/service/products.service'
import { useStore } from 'vuex'
import { useToast } from "@/hook/useToast";
import { formatCurrency} from '@/utils'

import SearchBar from '@/components/SearchBar.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Image from 'primevue/image';
import Rating from 'primevue/rating';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import { FilterMatchMode } from 'primevue/api';

const { show } = useToast()
const store = useStore()
const loading = ref(false);
const products = ref([])
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },

});

const getProducts = async () => {
  try {
    loading.value = false;
    const serviceProducts = new productService()
    const response = await serviceProducts.productsGet()
    products.value = response
    loading.value = true;
  } catch (e) {
    console.error(e)
  }
}

const addToCart = (product: any) => {
  store.dispatch('cart/addProductToCart', product)  
  show('success', 'Producto Agregado al Carrito', product.title)
}

onMounted(() => {
  getProducts()
})
</script>

<template>
  <div class="grid">
    <h5>Productos</h5>
    <div class="col-12 xl:col-12">
      <div class="card flex justify-content-center" v-if="!loading">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="2" fill="var(--surface-ground)"
          animationDuration=".8s" />
      </div>
      <div class="card" v-else>
        
        <div class="flex justify-content-end m-5">         
          <SearchBar  v-model="filters['global'].value" placeholder="Buscar Producto"/>
        </div>
    

        <DataTable v-model:filters="filters" :value="products" :rows="5" :paginator="true" responsiveLayout="scroll">
          <Column style="width: 5%">
            <template #header> Image </template>
            <template #body="slotProps">
              <div class="flex justify-content-center">
                <Image :src="slotProps.data.image" :alt="slotProps.data.image" width="100" preview />
              </div>

            </template>
          </Column>
          <Column field="title" header="Name" :sortable="true" style="width: 6%"></Column>
          <Column field="price" header="Precio" :sortable="true" style="width: 5%">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column style="width: 15%" field="description" header="Descripción">
          </Column>
          <Column style="width: 5%">
            <template #header> Calificacion </template>
            <template #body="slotProps">
              {{ slotProps.data.rating.rate }}
              <Rating :modelValue="slotProps.data.rating.rate" readonly :cancel="false" />
            </template>
          </Column>
          <Column style="width: 5%">
            <template #header> Accion </template>
            <template #body="slotProps">
              <Button v-tooltip.bottom="'Agregar Pruducto al carrito'" icon="pi pi-shopping-cart" severity="success" text raised rounded aria-label="Search"
                @click="addToCart(slotProps.data)" />
            </template>
          </Column>

        </DataTable>
      </div>

    </div>
  </div>
</template>

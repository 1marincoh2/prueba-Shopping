<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { productService } from '@/service/products.service'
import { useStore } from 'vuex'
import { cropText, formatCurrency, getSeverity,getIcon } from '@/utils'
import { useToast } from "@/hook/useToast";

import Rating from 'primevue/rating';
import ProgressSpinner from 'primevue/progressspinner';
import Skeleton from 'primevue/skeleton';
import Button from 'primevue/button';
import Tag from 'primevue/tag';

const store = useStore()
const { show } = useToast()

const loading = ref(false);
const loadingCatAll = ref(false)
const categoryAll = ref([])
const category = ref<any>([])

const getAllCategory = async () => {
  try {
    loadingCatAll.value = false;
    const serviceProducts = new productService()
    const response = await serviceProducts.categoryAllGet()
    categoryAll.value = response
    loadingCatAll.value = true;
  } catch (e) {
    console.error(e)
  }
}
const getCategory = async (cat: string = 'electronics') => {
  try {
    loading.value = false;
    const serviceProducts = new productService()
    const response = await serviceProducts.categoryGet(cat)
    category.value = response
    loading.value = true;
  } catch (e) {
    console.error(e)
  }
}

const addToCart = (product: any) => {
  store.dispatch('cart/addProductToCart', product)
  show('success', 'Producto Agregado al Carrito', product.title)
}

onMounted(async () => {
  await getAllCategory()
  await getCategory()

})
</script>

<template>
  <div class="grid">
    <div class="col-12 xl:col-12">
      <h5>Categorias</h5>
      <div class="chip  flex justify-content-center">
        <ProgressSpinner v-if="!loadingCatAll" style="width: 50px; height: 50px" strokeWidth="2"
          fill="var(--surface-ground)" animationDuration=".8s" />

        <Button v-else v-for="(item, index) in categoryAll" class="m-2" :key="index" :label="item"
          :severity="getSeverity(item)" @click="getCategory(item)"  :icon="getIcon(item)" />
      </div>

      <div class="grid" v-if="loading">
        <div class="col-12 lg:col-6 xl:col-3" v-for="(item, index) in category" :key="index">
          <div class="p-4 border-1 surface-border surface-card border-round custom-card">
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
              <div class="flex align-items-center gap-2">
                <i class="pi pi-tag"></i>
                <Tag :value="item.category" :severity="getSeverity(item.category)"></Tag>
              </div>

            </div>
            <div class="flex flex-column align-items-center gap-3 py-5">
              <img class="border-round fixed-image" :src="item.image" preview />
              <div class="text-2xl font-bold">{{ cropText(item.title, 3) }}</div>
              <Rating :modelValue="item.rating.rate" readonly :cancel="false"></Rating>
            </div>

            <div class="flex align-items-center justify-content-between">
              <span class="text-2xl font-semibold">{{ formatCurrency(item.price) }}</span>
              <Button icon="pi pi-shopping-cart" rounded :severity="getSeverity(item.category)"
                @click="addToCart(item)"></Button>
            </div>
          </div>
        </div>
      </div>


      <div class="grid" v-else>
        <div class="col-12 lg:col-6 xl:col-3" v-for="index in 4" :key="index">
          <div class="p-4 border-1 surface-border surface-card border-round">
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
              <Skeleton class="w-6rem border-round h-2rem" />
              <Skeleton class="w-3rem border-round h-1rem" />
            </div>
            <div class="flex flex-column align-items-center gap-3 py-5">
              <Skeleton class="w-9 shadow-2 border-round h-10rem" />
              <Skeleton class="w-8rem border-round h-2rem" />
              <Skeleton class="w-6rem border-round h-1rem" />
            </div>
            <div class="flex align-items-center justify-content-between">
              <Skeleton class="w-4rem border-round h-2rem" />
              <Skeleton shape="circle" class="w-3rem h-3rem" />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<style scoped>
.custom-card {
  min-height: 400px;
}
.fixed-image {
  width: 50%; 
  height: 8em;
  object-fit: fill; 
}

</style>
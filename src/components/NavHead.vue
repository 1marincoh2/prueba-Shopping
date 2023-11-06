<template>
  <div class="layout-topbar justify-content-between">
    <TabMenu v-model:activeIndex="active" :model="items">
      <template #item="{ label, item, props }">
        <router-link v-if="item.route" v-slot="routerProps" :to="item.route" custom>
          <a :href="routerProps.href" v-bind="props.action" @click="($event) => routerProps.navigate($event)">
            <span v-bind="props.icon" />
            <span v-bind="props.label">{{ label }}</span>
          </a>
        </router-link>
      </template>
    </TabMenu>
    <div >
      <i v-badge.danger="cart === 0 ? 0: cart" class="pi pi-shopping-cart p-overlay-badge  "
        @click="PageCart()" style="font-size: 1.8rem; margin-top: 10px; cursor: pointer;" />
      <button class="p-link layout-topbar-button">
        <i class="pi pi-user"></i>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch,computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

import TabMenu from 'primevue/tabmenu'

const router = useRouter()
const route = useRoute()
const store = useStore()


const cart = computed(() => store.getters['cart/cartItemsCount'])
const active = ref(0)
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
    route: '/'
  },
  
])

const PageCart = () => {
  router.push('/ShoppingCart')
}

onMounted(() => {
  active.value = items.value.findIndex((item) => route.path === router.resolve(item.route).path)
})

watch(
  route,
  () => {
    active.value = items.value.findIndex((item) => route.path === router.resolve(item.route).path)
  },
  { immediate: true }
)
</script>

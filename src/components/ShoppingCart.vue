
<script setup lang="ts">
import { ref, computed, onBeforeUnmount, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useToast } from "@/hook/useToast";
import { useRouter } from 'vue-router'
import { cropText, formatCurrency, getSeverity } from '@/utils'

import Dialog from 'primevue/dialog';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Rating from 'primevue/rating';
import ProgressBar from 'primevue/progressbar';



const store = useStore()
const { show } = useToast()
const router = useRouter()

const visible = ref(false);
const showProgressBar = ref(false);
const value1 = ref(0);
const interval = ref();

const cart = store.state.cart.cart
const cartlength = computed(() => store.getters['cart/cartItemsCount'])
const totalPrice = computed(() => store.getters['cart/totalPrice'])

const increaseProduct = (product: any) => {
    store.dispatch('cart/increaseProductQuantity', product)
}

const decreaseProduct = (product: any) => {
    store.dispatch('cart/decreaseProductQuantity', product)
}

const removeProduct = (product: any) => {
    store.dispatch('cart/removeProductFromCart', product.id),
        show('error', 'Producto eliminado', product.title)
}



const closeDialog = () => {
    visible.value = false;
};
const goPay = async () => {
    router.push('/')
}



const payFinal = async() => {
    showProgressBar.value = true;
    interval.value = setInterval(async() => {
        let newValue = value1.value + Math.floor(Math.random() * 10);
        if (newValue >= 100) {
            newValue = 100;
            await store.dispatch('cart/clearCart');
            await endProgress();
            await show('info', 'Pagos', 'Su pago se a realizado con Exito')    
        }
        value1.value = newValue;
    }, 500);

};
const endProgress = () => {
    clearInterval(interval.value);
    interval.value = null;
    closeDialog();
};
</script>

<template >
    <div class="grid">
        <div class="col-8">
            <div class="scrollable-cart" v-if="cartlength > 0">
                <div class="col-12 card" v-for="(item, index) in cart" :key="index">
                    <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                        <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                            :src="item.image" :alt="item.name" />
                        <div
                            class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div class="text-2xl font-bold text-900">{{ cropText(item.title, 4) }}</div>
                                <Rating :modelValue="item.rating.rate" readonly :cancel="false"></Rating>
                                <div class="flex align-items-center gap-3">
                                    <span class="flex align-items-center gap-2">
                                        <i class="pi pi-tag"></i>
                                    </span>
                                    <Tag :value="item.category" :severity="getSeverity(item.category)"></Tag>
                                </div>
                                <span class="text-2xl font-semibold"> {{ formatCurrency(item.price) }}</span>
                            </div>
                            <div class="flex sm:flex-column align-items-center sm:align-items-end gap-1 sm:gap-2">
                                <div class=" align-items-center">
                                    Total <span class="text-2xl font-semibold"> ${{ item.priceTotal }}</span>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                                    <Button class="p-button-sm btn-color mr-2" @click="decreaseProduct(item.id)"
                                        :disabled="item.amount === 1">
                                        <span style="display: flex; align-items: center; justify-content: center;">-</span>
                                    </Button>

                                    <Badge size="large" severity="success" style="border-radius: 4px; margin-top: 2px;; "
                                        :value="item.amount"></Badge>
                                    <Button aria-label="Sumar" class="p-button-sm btn-color ml-2"
                                        @click="increaseProduct(item.id)">
                                        <span style="display: flex; align-items: center; justify-content: center;">+</span>
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="flex align-items-center justify-content-between">
                        <span class="text-2xl font-semibold"></span>
                        <Button v-tooltip.bottom="'Eliminar producto del carrito'"
                            class="p-button p-button-danger p-button-sm mr-2 mb-2" @click="removeProduct(item)">
                            <i class="pi pi-trash"></i>
                        </Button>
                    </div>
                </div>
            </div>

            <div v-else class="contenedor">
                <p class="centrado">Sin Producto en el Carrito <br />

                    <Button label="Ir a comprar" @click="goPay()" class="mt-2" icon="pi pi-shopping-bag" />
                </p>

            </div>
        </div>
        <div class="col-4">
            <div class="card">
                <div class="p-4">
                    <h3>Resumen del Carrito</h3>
                    <div>
                        <div class="d-flex justify-content-between">

                            <span>
                                <Table></Table>total:
                            </span>
                            <span class="font-semibold">${{ formatCurrency(totalPrice) }}</span>
                        </div>

                        <hr>

                        <Button label="Pagar" @click="visible = true" icon="pi pi-money-bill" iconPos="right" />

                    </div>
                </div>
            </div>
        </div>
    </div>
    <Dialog v-model:visible="visible" modal :header="showProgressBar ?'Procesando su pago...':'Pagar Producto'" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <ProgressBar :value="value1" v-if="showProgressBar" />
        <div v-else>
            <h1>
                Total a pagar: ${{ totalPrice }}
            </h1>
            <div class="flex align-items-center justify-content-between">
                <span class="text-2xl font-semibold"></span>
                <Button class="p-button p-button-success p-button-sm mr-2 mb-2" @click="payFinal">
                    Finalizar pago
                </Button>
            </div>
        </div>
    </Dialog>
</template>
<style scoped>
.scrollable-cart {
    max-height: 400px;
    /* Ajusta la altura máxima según tus necesidades */
    overflow-y: auto;
}

.btn-color {
    background: #22C55E;
    color: white;
    border-radius: 30%;
    border: #22C55E;


}


.contenedor {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: lightgray;
    /* Puedes cambiar el color de fondo según tus preferencias */
}

.centrado {
    text-align: center;
}
</style>
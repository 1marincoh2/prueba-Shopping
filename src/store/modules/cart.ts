
const state = {
  cart: [],
}

const mutations = {
  addToCart(state: any, product: any) {
    const newProduct={
      ...product,
      amount:1,
      priceTotal:product.price
    } 
    const cartProduct = state.cart.find((item: any) => item.id === newProduct.id)
    if (cartProduct) {
          cartProduct.amount++
          cartProduct.priceTotal =parseFloat(cartProduct.price * cartProduct.amount).toFixed(2)
    } else {
      state.cart.push(newProduct)
    }
  },
  removeProduct(state: any, productId: number) {
    const productIndex = state.cart.findIndex((item:any) => item.id === productId);
    if (productIndex !== -1) {
      state.cart.splice(productIndex, 1);
    }
  },
  increaseQuantity(state: any, productId: number) {
    const cartProduct = state.cart.find((item:any) => item.id === productId)
    if (cartProduct) {
      cartProduct.amount++
      cartProduct.priceTotal = parseFloat(cartProduct.price * cartProduct.amount).toFixed(2)
    }
  },

  decreaseQuantity(state: any, productId: number) {
    const cartProduct = state.cart.find((item:any) => item.id === productId)
    if (cartProduct && cartProduct.amount > 1) {
      cartProduct.amount--
      cartProduct.priceTotal = parseFloat(cartProduct.price * cartProduct.amount).toFixed(2)
    }
  },
  clearCart(state:any) {
    state.cart = [];
  },
}

const actions = {
  addProductToCart({ commit }: any, product: any) {
    commit('addToCart', product)
  },
  removeProductFromCart({ commit }: any, productId: number) {
    commit('removeProduct', productId);
  },
  increaseProductQuantity({ commit }: any, productId: number) {
    commit('increaseQuantity', productId)
  },

  decreaseProductQuantity({ commit }: any, productId: number) {
    commit('decreaseQuantity', productId)
  },
  clearCart({ commit }: any) {
    commit('clearCart');
  },
}

const getters = {
  cartItemsCount: (state: any) => state.cart.length,

  totalPrice: (state:any) => {
    let total = 0;
    state.cart.forEach((item:any) => {
      total += parseFloat(item.priceTotal);
    });
    return total.toFixed(2)  },
   
}
export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
}
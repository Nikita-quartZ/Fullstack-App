<template>
  <div class="container mx-auto pt-10">
    <div class="flex justify-center text-5xl mb-8">
      <h2>Change Product</h2>
    </div>
    <div class="product__block">
      <p class="product__title">
        Title
      </p>
      <input type="text" v-model="data.title" class="product__input">
    </div>
    <div class="product__block">
      <p class="product__title">
        Description
      </p>
      <input type="text" v-model="data.description" class="product__input">
    </div>
    <div class="product__block">
      <p class="product__title">
        Price
      </p>
      <input type="number" v-model.number="data.price" class="product__input">
    </div>
    <div class="product__block">
      <p class="product__title">
        Discount Percentag
      </p>
      <input type="number" v-model.number="data.discountPercentage" class="product__input">
    </div>
    <div class="product__block">
      <p class="product__title">
        Rating
      </p>
      <input type="number" v-model.number="data.rating" class="product__input">
    </div>
    <div class="product__block">
      <p class="product__title">
        Stock
      </p>
      <input type="number" v-model.number="data.stock" class="product__input">
    </div>
    <div class="product__block">
      <p class="product__title">
        Brand
      </p>
      <input type="text" v-model="data.brand" class="product__input">
    </div>
    <div class="product__block">
      <p class="product__title">
        Category
      </p>
      <input type="text" v-model="data.category" class="product__input">
    </div>
    <div class="product__block">
      <p class="product__title">
        Thumbnail
      </p>
      <input type="text" v-model="data.thumbnail" class="product__input">
    </div>
    <div class="product__block">
      <p class="product__title">
        Images
      </p>
      <div v-for="(image, index) in images" :key="image" class="flex pb-2">
        <input type="text" v-model="image.value" class="product__input mr-2 ">
        <button 
          class="p-0 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 border border-blue-500 hover:border-transparent rounded"
          @click="addImage"
          v-if="index + 1 === images.length"
        > 
          <svg  width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" width="10" height="40" fill="#D9D9D9"/>
            <rect y="25" width="10" height="40" transform="rotate(-90 0 25)" fill="#D9D9D9"/>
          </svg>
        </button>
        <button 
          class="p-0 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 border border-blue-500 hover:border-transparent rounded"
          @click="deleteImage(index)"
          v-else
        > 
          <svg width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="25" width="10" height="40" transform="rotate(-90 0 25)" fill="#D9D9D9"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="flex justify-end" v-if="validateFields">
      <p class="error">Fill in all the fields</p>
    </div>
    <div class="flex justify-end mb-10">
      <NuxtLink to="/" class="btn-close">
        Close
      </NuxtLink>
      <button class="btn-close" @click="DeleteProduct">
        Delete
      </button>
      <button :disabled="validateFields" class="btn-save" @click="saveProduct">
        Save
      </button>
    </div>
    {{ data.images }}
  </div>
</template>

<script setup>
import { useStore } from '@/store/index'
const store = useStore()
const router = useRouter()
const route = useRoute()

store.getProductList().then(() => {
  data.value = store.products.find(product => product.id == route.query.id)
  images.value = store.products.find(product => product.id == route.query.id).images
    .map(item => {
      return {
        value: item
      }
    })
})

const images = ref([
  {
    value: ''
  }
])

const data = ref(
  {
    id: 99,
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    thumbnail: "",
    images: ['']
  },
)

async function DeleteProduct() {
  await store.deleteProduct(data.value.id)
  setTimeout(() => {
    router.push({ path: "/" })
  }, 1500)
}

function addImage() {
  images.value.push({value: ''})
}

function deleteImage(indexImage) {
  images.value = images.value.filter((_item, index) => index !== indexImage)
}

const validateFields = computed(() => {
  allInfo()
  return !(data.value.title && data.value.description && data.value.price && data.value.discountPercentage && data.value.rating && data.value.stock && data.value.brand && data.value.category && data.value.thumbnail && data.value.images[0])
})

function allInfo() {
  return data.value.images = images.value.map((item) => {
    return item.value
  })
}

async function saveProduct() {
  allInfo()
  await store.putProduct(data.value)
  router.push({ path: "/" })
}

</script>

<style lang="scss" scoped>
.product__input {
  width: 100%;
  max-width: 500px;
  border: 1px solid black;
  border-radius: 5px;
  height: 34px;
}

.btn-close {
  padding: 8px 15px;
  border: 1px solid red;
  margin-right: 10px;
  color: red;
}

.btn-save {
  padding: 8px 15px;
  border: 1px solid green;
  color: green;
}

.error {
  color: red;
}
</style>
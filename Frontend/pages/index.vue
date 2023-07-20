<template>
  <div class="container mx-auto">
    <div class="filter grid grid-cols-7 gap-1">
      <div v-for="filter in filters" :key="filter">
        <div v-if="filter.number !== true">
          <p class="filter__titles">{{ filter.title }}</p>
          <input type="text" class="filter__input" v-model="filter.value">
        </div>
        <div v-else>
          <p class="filter__titles">{{ filter.title }}</p>
          <input type="number" class="filter__input" v-model.number="filter.value">
        </div>
      </div>
    </div>

    <div class="flex justify-between mb-5">
      <vue-awesome-paginate
        :total-items="store.total"
        :items-per-page="perPage"
        v-model="page"
      />

      <NuxtLink to="/create-product" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Create Product
      </NuxtLink>
    </div>

    <div v-if="store.products" class="grid grid-cols-5 gap-4">
      
        <Card
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />

    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/store/index'
const store = useStore()
store.getProductList()
const page = ref(1)
const perPage = ref(10)
const filters = ref([
  {
    title: "title",
    value: ''
  },
  {
    title: "description",
    value: ''
  },
  {
    title: "price",
    value: 0,
    number: true
  },
  {
    title: "rating",
    value: 0,
    number: true
  },
  {
    title: "stock",
    value: 0,
    number: true
  },
  {
    title: "brand",
    value: ''
  },
  {
    title: "category",
    value: ''
  }
])

const filteredProducts = computed(() => {
  let newProducts = store.products
    .filter((item) => item.title.includes(filters.value[0].value))
    .filter((item) => item.description.includes(filters.value[1].value))
    .filter((item) => item.brand.includes(filters.value[5].value))
    .filter((item) => item.category.includes(filters.value[6].value))

  if (filters.value[2].value !== 0 ) {
    if (filters.value[2].value !== '') {
      newProducts = newProducts.filter((item) => item.price === filters.value[2].value)
    }
  }
  if (filters.value[3].value !== 0 ) {
    if (filters.value[3].value !== '') {
      newProducts = newProducts.filter((item) => item.rating === filters.value[3].value)
    }
  }
  if (filters.value[4].value !== 0 ) {
    if (filters.value[4].value !== '') {
      newProducts = newProducts.filter((item) => item.stock === filters.value[4].value)
    }
  }
  

  return newProducts.filter((item, index) => (page.value - 1) * perPage.value < index + 1&& index + 1 <= page.value * perPage.value)
})
</script>

<style>

.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
.filter {
  margin-bottom: 20px;
}

.filter__input {
  border: 1px solid #333;
  border-radius: 3px;
  padding-left: 1px;
}

.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}

.pagination a.active {
  background-color: #1D4ED8;
  color: white;
  border-radius: 5px;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
  border-radius: 5px;
}
</style>
<template>
  <div class="card">
    <img
      @mouseover="show = false"
      :src="product.thumbnail"
      alt="product"
      class="card__img"
      v-show="show"
    />
    <Swiper
      v-show="!show"
      :slides-per-view="1"
    >
      <Swiper-slide v-for="image in product.images" :key="image">
        <img
          :src="image"
          alt="product"
          class="card__img"
        />
      </Swiper-slide>
    </Swiper>
    <div class="card__paragraph">
      <h2 class="card__title">
        {{ product.title }}
      </h2>
      <p class="card__price">
        {{ product.price }} $
      </p>
      <p class="flex card__rating">
        <svg width="18" height="18" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.0489 0.927048C13.3483 0.00573688 14.6517 0.00573985 14.9511 0.92705L17.3677 8.36475C17.5016 8.77677 17.8855 9.05573 18.3188 9.05573H26.1392C27.1079 9.05573 27.5107 10.2953 26.727 10.8647L20.4001 15.4615C20.0496 15.7161 19.903 16.1675 20.0369 16.5795L22.4535 24.0172C22.7529 24.9385 21.6984 25.7047 20.9147 25.1353L14.5878 20.5385C14.2373 20.2839 13.7627 20.2839 13.4122 20.5385L7.08533 25.1353C6.30162 25.7047 5.24714 24.9385 5.54649 24.0172L7.96315 16.5795C8.09702 16.1675 7.95036 15.7161 7.59987 15.4615L1.27299 10.8647C0.489277 10.2953 0.892056 9.05573 1.86078 9.05573H9.68123C10.1145 9.05573 10.4984 8.77677 10.6323 8.36474L13.0489 0.927048Z" fill="#FAFF00"/>
        </svg>
        <span>{{ product.rating }} </span>
      </p>
    </div>
  </div>
</template>

<script setup >
import { Swiper, SwiperSlide } from 'swiper/vue';
const show = ref(true)

const props = defineProps({
  product: Object,
})
</script>

<style lang="scss" scoped>
.card {
  background-color: rgb(132, 132, 132);
  border-radius: 10px;
}

.card__img {
  max-height: 120px;
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.card__rating {
  color: #FAFF00;
  position: absolute;
  top: 10px;
  right: 20px;

  & svg {
    position: relative;
    top: 2px;
    margin-right: 2px;
  }
}

.card__paragraph {
  position: relative;
  padding: 0 20px;
  padding-right: 80px;
  padding-top: 10px;
}

.card__title {
  margin-bottom: 10px;
  color: white;
  font-size: 20px;
  line-height: 100%;
}

.card__price {
  margin-bottom: 20px;
  color: white;
  font-size: 17px;
  line-height: 100%;
}
</style>
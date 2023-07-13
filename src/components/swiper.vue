<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

// import required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      //   modules: [Navigation, Pagination, Autoplay],
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    };
  },
};
</script>

<template>
  <!-- <swiper
    :slidesPerView="'auto'"
    :centeredSlides="true"
    :spaceBetween="30"
    :modules="modules"
    :class="['list', 'style__list', 'gap','mySwiper']"
    loop
    :autoplay="{
      delay: 5000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    }"
    v-if="isLoad"
  >
    <swiper-slide
      :class="['list__item', 'style__list__item']"
      v-for="item in RealArr.data"
      :key="item.id"
    >
      <router-link :to="`/img/${item._ragicId}`">
        <div class="icon__gallery__container">
          <img
            :class="['item__picture']"
            :src="[item.smallurl]"
            :alt="[item.name]"
            loading="lazy"
          />
          <p :class="['item__name']">{{ item.name }}</p>
          <div
            class="like__number grid grid__c-auto"
            v-for="number in item._subtable_1000050"
            :key="number"
          >
            <svg>
              <use
                class="fi icon__gallery icon__gallery-heart opacity"
                href="./spriteicon.svg#heart"
              ></use>
            </svg>

            <p
              class="number__heart number opacity"
              v-formatNumber="number['heart']"
            ></p>

            <svg>
              <use
                class="fi icon__gallery fi-sr-grin-squint-tears icon__gallery-laugh opacity"
                href="./spriteicon.svg#laugh"
              ></use>
            </svg>

            <p
              class="number__laugh number opacity"
              v-formatNumber="number['laugh']"
            ></p>

            <svg>
              <use
                class="fi icon__gallery fi-sr-angry icon__gallery-angry opacity"
                href="./spriteicon.svg#angry"
              ></use>
            </svg>

            <p
              class="number__angry number opacity"
              v-formatNumber="number['angry']"
            ></p>

            <svg>
              <use
                class="fi icon__gallery fi-ss-surprise icon__gallery-wow opacity"
                href="./spriteicon.svg#surprise"
              ></use>
            </svg>

            <p
              class="number__wow number opacity"
              v-formatNumber="number['wow']"
            ></p>

            <svg>
              <use
                class="fi icon__gallery fi-ss-sad-tear icon__gallery-sad opacity"
                href="./spriteicon.svg#sad"
              ></use>
            </svg>

            <p
              class="number__sad number opacity"
              v-formatNumber="number['sad']"
            ></p>
          </div>
        </div>
        <div :class="['back']"></div>
      </router-link>
    </swiper-slide> -->
  <!-- <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <swiper-slide>Slide 6</swiper-slide>
    <swiper-slide>Slide 7</swiper-slide>
    <swiper-slide>Slide 8</swiper-slide>
    <swiper-slide>Slide 9</swiper-slide> -->
  <!-- </swiper> -->
</template>

<style lang="scss">
.swiper {
  /* width: 100%; */
  height: auto;
  overflow: overlay;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-slide {
  /* swiper內的圖片 */
  width: 300px;
  height: 300px;
}

// div.swiper-scrollbar-drag {
// //   swiper scrollbar底下的可以拉的那個
//   background: #fff;
// }
// .swiper-scrollbar.swiper-scrollbar-horizontal {
// //   swiper scrollbar底下的不包含拉的那個
//   background: #fff;
// }

/* .swiper-slide:nth-child(2n) {
  width: 40%;
}

.swiper-slide:nth-child(3n) {
  width: 20%;
} */
</style>

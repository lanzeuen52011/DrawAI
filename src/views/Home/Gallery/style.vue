<script>
import axios from "axios";
import { onMounted, onUnmounted, reactive, ref } from "vue";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
// import "swiper/css";

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

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const Arr = reactive({ data: [] });
    const AniArr = reactive({ data: [] });
    const RealArr = reactive({ data: [] });
    const maleArr = reactive({ data: [] });
    const femaleArr = reactive({ data: [] });
    const isLoad = ref(false);
    const Token = process.env.VUE_APP_TOKEN;
    const slidesPerView = ref("");
    const handleResize = () => {
      if (window.screen.availWidth < 580) {
        slidesPerView.value = 1;
        return slidesPerView.value;
      } else if (window.screen.availWidth < 768) {
        slidesPerView.value = 2;
        return slidesPerView.value;
      } else if (window.screen.availWidth < 1200) {
        slidesPerView.value = 3;
        return slidesPerView.value;
      } else {
        slidesPerView.value = 4;
        return slidesPerView.value;
      }
    };

    onMounted(() => {
      handleResize();
      window.addEventListener("resize", handleResize); // Swipertest

      if (window.location.hash) {
        console.log(window.location.hash);
        const element = document.querySelector(window.location.hash);
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }

      axios
        .get(`https://ap9.ragic.com/lanziyun/convert2/1?api&APIKey=${Token}`)
        .then((res) => {
          Arr.data = res.data;
          Arr.data = Object.keys(Arr.data).map((key) => Arr.data[key]);
          Arr.data.reverse();
          // console.log(Arr.data["0"]._ragicId); //拿到伺服器的id，準備拿來說router的
          //篩選出動漫畫風的圖片
          AniArr.data = Arr.data
            .filter((item) => item.style === "anime")
            .sort((a, b) => b.popular - a.popular);
          // console.log("AniArr", AniArr.data);
          //篩選出動現實風的圖片
          RealArr.data = Arr.data
            .filter((item) => item.style === "realistic")
            .sort((a, b) => b.popular - a.popular);
          // console.log("RealArr", RealArr.data);
          maleArr.data = Arr.data
            .filter((item) => item.sex === "male")
            .sort((a, b) => b.popular - a.popular);
          // console.log("male", maleArr.data);
          femaleArr.data = Arr.data
            .filter((item) => item.sex === "female")
            .sort((a, b) => b.popular - a.popular);
          // console.log("female", femaleArr.data);
          isLoad.value = true;
        });
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    return {
      Arr,
      AniArr,
      RealArr,
      maleArr,
      femaleArr,
      isLoad,
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
      slidesPerView,
      handleResize,
    };
  },
};
</script>
<template>
  <section class="container body content" id="app">
    <h1>風格導覽</h1>
    <section id="realistic">
      <h2 class="style__h2">現實風</h2>
      <div v-if="!isLoad" class="style__loading-container">
        <img class="style__loading-img" src="./Spinner-0.6s-200px.gif" alt="" />
      </div>
      <swiper
        :slidesPerView="handleResize()"
        :centeredSlides="true"
        :spaceBetween="30"
        :modules="modules"
        :class="['list', 'style__list', 'gap']"
        :loop="true"
        :autoplay="{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }"
        v-if="isLoad"
        :scrollbar="{
          hide: true,
        }"
        :watchSlidesProgress="true"
      >
        <!-- :watchSlidesProgress="true" 是表示在用滑鼠滑動時，swiper-slide-active等class也會跟著變動
        要找到能夠用甚麼屬性的話，可以到"import { Swiper, SwiperSlide } from "swiper/vue";"，Ctrl+左鍵
        點選"swiper"，會到(node_modules/swiper/swiper-vue.d.ts)，即可找到所有可用屬性 -->
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
        </swiper-slide>
      </swiper>
    </section>
    <section id="anime">
      <h2 class="style__h2">動漫風</h2>
      <div v-if="!isLoad" class="style__loading-container">
        <img class="style__loading-img" src="./Spinner-0.6s-200px.gif" alt="" />
      </div>
      <swiper
        :slidesPerView="handleResize()"
        :centeredSlides="true"
        :spaceBetween="30"
        :modules="modules"
        :class="['list', 'style__list', 'gap']"
        :loop="true"
        :autoplay="{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }"
        v-if="isLoad"
        :scrollbar="{
          hide: true,
        }"
        :watchSlidesProgress="true"
      >
        <swiper-slide
          :class="['list__item', 'style__list__item']"
          v-for="item in AniArr.data"
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
        </swiper-slide>
      </swiper>
    </section>
    <section id="male">
      <h2 class="style__h2">男性</h2>
      <div v-if="!isLoad" class="style__loading-container">
        <img class="style__loading-img" src="./Spinner-0.6s-200px.gif" alt="" />
      </div>
      <swiper
        :slidesPerView="handleResize()"
        :centeredSlides="true"
        :spaceBetween="30"
        :modules="modules"
        :class="['list', 'style__list', 'gap']"
        :loop="true"
        :autoplay="{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }"
        v-if="isLoad"
        :scrollbar="{
          hide: true,
        }"
        :watchSlidesProgress="true"
      >
        <swiper-slide
          :class="['list__item', 'style__list__item']"
          v-for="item in maleArr.data"
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
        </swiper-slide>
      </swiper>
    </section>
    <section id="female">
      <h2 class="style__h2">女性</h2>
      <div v-if="!isLoad" class="style__loading-container">
        <img class="style__loading-img" src="./Spinner-0.6s-200px.gif" alt="" />
      </div>
      <swiper
        :slidesPerView="handleResize()"
        :centeredSlides="true"
        :spaceBetween="30"
        :modules="modules"
        :class="['list', 'style__list', 'gap']"
        :loop="true"
        :autoplay="{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }"
        v-if="isLoad"
        :scrollbar="{
          hide: true,
        }"
        :watchSlidesProgress="true"
      >
        <swiper-slide
          :class="['list__item', 'style__list__item']"
          v-for="item in femaleArr.data"
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
        </swiper-slide>
      </swiper>
    </section>
  </section>
</template>
<style lang="scss">
.style__loading-img {
  width: 75px;
  height: 75px;
  @media screen and (min-width: 1600px) {
    width: 5.20833vw;
    height: 5.20833vw;
  }
}
.style__loading-container {
  margin-top: 50px;
  @media screen and (min-width: 1600px) {
    margin-top: 3.4722vw;
  }
}
#realistic,
#anime,
#male,
#female {
  @media screen and (max-width: 1024px) {
    padding: 0 6rem;
  }
  @media screen and (max-width: 376px) {
    padding: 0 4rem;
  }
  @media screen and (max-width: 360px) {
    padding: 0 2rem;
  }
}

.style__h2 {
  margin: 3rem 0 0rem 0;
  padding: 0;
  @media screen and (min-width: 1600px) {
    margin: 2.0833vw 0 0rem 0;
  }
}
.style__list {
  &.list {
    list-style: none;
    padding: 0;
    justify-content: start;
    align-items: center;
    // height: 45vh; // 原本是這個
    height: 400px; // 原本不需要，但換成Swiper後，必須要有這個
    // overflow-x: auto; // 要SWIPER這個就不要打開，打開scrollbar
    white-space: nowrap;
    flex-wrap: nowrap;
    margin: 0 auto;
    width: 85vw;
    @media screen and (min-width: 1600px) {
      // height: 30vh;
      height: 27.77vw;
    }
  }
}

.style__list__item {
  width: 300px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  transition: scale 0.15s;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  margin-right: 20px;
  @media screen and (min-width: 1600px) {
    width: 20.833vw;
    height: 20.833vw;
    border-radius: 0.7vw;
    box-shadow: 0.34722vw 0.34722vw 0.7vw rgba(0, 0, 0, 0.2);
    margin-right: 1.388vw;
  }
  &:hover
    > a
    > .icon__gallery__container
    > .like__number.grid.grid__c-auto
    > svg {
    width: 20px;
    height: 20px;
    margin-left: 0.5rem;
    @media screen and (min-width: 1600px) {
      width: 1.388vw;
      height: 1.388vw;
      margin-left: 0.34722vw;
    }
    > .opacity {
      opacity: 0.8;
    }
  }
  > a > .icon__gallery__container > .like__number.grid.grid__c-auto > svg {
    width: 20px;
    height: 20px;
    margin-left: 0.5rem;
    @media screen and (min-width: 1600px) {
      width: 1.388vw;
      height: 1.388vw;
      margin-left: 0.34722vw;
    }
    > .opacity {
      @media screen and (max-width: 1300px) {
        opacity: 0.8;
      }
    }
  }
  &:hover .item__name {
    position: absolute;
    top: 75%;
    width: 100%; //置中
    color: white;
    z-index: 1000;
    letter-spacing: 0.3rem;
  }
  &:hover .opacity {
    opacity: 0.8;
  }
  &:hover {
    scale: 1.15;
    @media screen and (max-width: 1300px) {
      scale: 1;
    }
  }
  &:hover .back {
    background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.2) 0,
      rgba(0, 0, 0, 0.19) 3.5%,
      rgba(0, 0, 0, 0.18) 7%,
      rgba(0, 0, 0, 0.17) 10.35%,
      rgba(0, 0, 0, 0.16) 13.85%,
      rgba(0, 0, 0, 0.15) 17.35%,
      rgba(0, 0, 0, 0.14) 20.85%,
      rgba(0, 0, 0, 0.13) 24.35%,
      rgba(0, 0, 0, 0.12) 27.85%,
      rgba(0, 0, 0, 0.11) 31.35%,
      rgba(0, 0, 0, 0.1) 34.85%,
      rgba(0, 0, 0, 0.126) 38.35%,
      rgba(0, 0, 0, 0.112) 41.85%,
      rgba(0, 0, 0, 0.103) 45.35%,
      #0000001a 48.85%,
      rgba(0, 0, 0, 0.103) 52.35%,
      rgba(0, 0, 0, 0.112) 55.85%,
      rgba(0, 0, 0, 0.126) 59.35%,
      rgba(0, 0, 0, 0.144) 62.85%,
      rgba(0, 0, 0, 0.165) 66.35%,
      rgba(0, 0, 0, 0.188) 69.85%,
      rgba(0, 0, 0, 0.4) 73.35%,
      rgba(0, 0, 0, 0.45) 76.85%,
      rgba(0, 0, 0, 0.5) 80.35%,
      rgba(0, 0, 0, 0.55) 83.85%,
      rgba(0, 0, 0, 0.6) 87.35%,
      rgba(0, 0, 0, 0.65) 90.85%,
      rgba(0, 0, 0, 0.7) 94.35%,
      rgba(0, 0, 0, 0.75) 97.85%,
      rgba(0, 0, 0, 0.8)
    );
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
}

//icon 不放進.item__list的SCSS內是因為，當list__item:hover時，.back跟.opacity會有效果，
//如果把這個引入進去，會失效，因為權重不一
.icon__gallery {
  justify-self: center;
  &.icon__gallery-heart {
    fill: rgb(255, 170, 184);
  }
  &.icon__gallery-laugh {
    fill: rgb(255, 255, 179);
  }
  &.icon__gallery-angry {
    fill: rgb(255, 103, 103);
  }
  &.icon__gallery-wow {
    fill: rgb(237, 251, 255);
  }
  &.icon__gallery-sad {
    fill: rgb(202, 202, 202);
  }
  &.opacity {
    opacity: 0;
  }
}
//number 不放進.item__list的SCSS內是因為，當list__item:hover時，.back跟.opacity會有效果，
//如果把這個引入進去，會失效，因為權重不一
.number {
  margin: 0;
  color: #fff;
  justify-self: center;
  &.opacity {
    opacity: 0;
  }
  &.number__heart {
    right: 80%;
  }
  &.number__laugh {
    right: 60%;
  }
  &.number__angry {
    right: 40%;
  }
  &.number__wow {
    right: 20%;
  }
  &.number__sad {
    right: 0%;
  }
}

.swiper {
  display: flex; //正式站需要
  overflow: clip;
  position: relative;
  > div.swiper-wrapper {
    align-items: center;
    display: flex; //正式站需要
  }
}

.swiper-slide.style__list__item {
  scale: 0.9;
  transition: scale 0.15s;
}
.swiper-slide.swiper-slide-prev,
.swiper-slide.swiper-slide-next {
  position: relative;
  z-index: 1;
  scale: 1;
  @media screen and (max-width: 580px) {
    scale: 1;
  }
}
.swiper-slide.swiper-slide-active {
  position: relative;
  z-index: 2;
  scale: 1.15;
  @media screen and (max-width: 580px) {
    scale: 1;
  }
  .item__name {
    // 此處不加>是因為只要在.swiper-slide.swiper-slide-active底下，不用是下一階層，只要是下階都能觸發
    position: absolute;
    top: 75%;
    width: 100%; //置中
    color: white;
    z-index: 1000;
    letter-spacing: 0.3rem;
  }
  .back {
    // 此處不加>是因為只要在.swiper-slide.swiper-slide-active底下，不用是下一階層，只要是下階都能觸發
    background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.2) 0,
      rgba(0, 0, 0, 0.19) 3.5%,
      rgba(0, 0, 0, 0.18) 7%,
      rgba(0, 0, 0, 0.17) 10.35%,
      rgba(0, 0, 0, 0.16) 13.85%,
      rgba(0, 0, 0, 0.15) 17.35%,
      rgba(0, 0, 0, 0.14) 20.85%,
      rgba(0, 0, 0, 0.13) 24.35%,
      rgba(0, 0, 0, 0.12) 27.85%,
      rgba(0, 0, 0, 0.11) 31.35%,
      rgba(0, 0, 0, 0.1) 34.85%,
      rgba(0, 0, 0, 0.126) 38.35%,
      rgba(0, 0, 0, 0.112) 41.85%,
      rgba(0, 0, 0, 0.103) 45.35%,
      #0000001a 48.85%,
      rgba(0, 0, 0, 0.103) 52.35%,
      rgba(0, 0, 0, 0.112) 55.85%,
      rgba(0, 0, 0, 0.126) 59.35%,
      rgba(0, 0, 0, 0.144) 62.85%,
      rgba(0, 0, 0, 0.165) 66.35%,
      rgba(0, 0, 0, 0.188) 69.85%,
      rgba(0, 0, 0, 0.4) 73.35%,
      rgba(0, 0, 0, 0.45) 76.85%,
      rgba(0, 0, 0, 0.5) 80.35%,
      rgba(0, 0, 0, 0.55) 83.85%,
      rgba(0, 0, 0, 0.6) 87.35%,
      rgba(0, 0, 0, 0.65) 90.85%,
      rgba(0, 0, 0, 0.7) 94.35%,
      rgba(0, 0, 0, 0.75) 97.85%,
      rgba(0, 0, 0, 0.8) 100%
    );
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
  > a > .icon__gallery__container > .like__number.grid.grid__c-auto > svg {
    > .opacity {
      opacity: 0.8;
    }
  }
  > a > .icon__gallery__container > .like__number.grid.grid__c-auto > svg {
    > .opacity {
      @media screen and (max-width: 1300px) {
        opacity: 0.8;
      }
    }
  }
  > a > .icon__gallery__container > .like__number.grid.grid__c-auto > .opacity {
    opacity: 0.8;
  }
}

.swiper-horizontal > .swiper-scrollbar,
.swiper-scrollbar.swiper-scrollbar-horizontal {
  position: absolute;
  left: var(--swiper-scrollbar-sides-offset, 1%);
  bottom: var(--swiper-scrollbar-bottom, 4px);
  top: var(--swiper-scrollbar-top, auto);
  z-index: 50;
  height: var(--swiper-scrollbar-size, 4px);
  width: calc(100% - 2 * var(--swiper-scrollbar-sides-offset, 1%));
}

.swiper-vertical > .swiper-scrollbar,
.swiper-scrollbar.swiper-scrollbar-vertical {
  position: absolute;
  left: var(--swiper-scrollbar-left, auto);
  right: var(--swiper-scrollbar-right, 4px);
  top: var(--swiper-scrollbar-sides-offset, 1%);
  z-index: 50;
  width: var(--swiper-scrollbar-size, 4px);
  height: calc(100% - 2 * var(--swiper-scrollbar-sides-offset, 1%));
}
</style>

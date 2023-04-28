<script>
import { onMounted, reactive, ref, toRefs } from "vue";
export default {
  setup() {
    const Arr = reactive({ data: [] });
    const AniArr = reactive({ data: [] });
    const RealArr = reactive({ data: [] });
    const maleArr = reactive({ data: [] });
    const femaleArr = reactive({ data: [] });

    onMounted(() => {
      if (window.location.hash) {
        console.log(window.location.hash);
        const element = document.querySelector(window.location.hash);
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
      axios
        .get(
          "https://ap9.ragic.com/lanziyun/convert2/1?api&APIKey=MFd4YlZuOEZ0eWNTa2Z6ek1GUVdLYS9rVTFWMUt1S01BdHNlVW1XZWNJK2ZpRFdVN1RyKzlUSDlwdzdJUzlSd2hEVlJvLzlMZy9rPQ=="
        )
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
        });
    });

    return {
      Arr,
      AniArr,
      RealArr,
      maleArr,
      femaleArr,
    };
  },
};
</script>
<template>
  <div class="container body" id="app">
    <div id="realistic">
      <h2 class="style__h2">現實風</h2>
      <ul :class="['list', 'style__list', 'gap']">
        <li
          :class="['list__item', 'style__list__item']"
          v-for="item in RealArr.data"
          :key="item.id"
        >
          <router-link :to="`/${item._ragicId}`">
            <div class="icon__gallery__container">
              <img
                :class="['item__picture']"
                :src="[item.smallurl]"
                :alt="[item.name]"
              />
              <p :class="['item__name']">{{ item.name }}</p>
              <div
                class="like__number grid grid__c-auto"
                v-for="number in item._subtable_1000050"
                :key="number"
              >
                <i
                  class="fi icon__gallery fi-ss-heart icon__gallery-heart opacity"
                ></i>
                <p
                  class="number__heart number opacity"
                  v-formatNumber="number['heart']"
                ></p>
                <i
                  class="fi icon__gallery fi-sr-grin-squint-tears icon__gallery-laugh opacity"
                ></i>
                <p
                  class="number__laugh number opacity"
                  v-formatNumber="number['laugh']"
                ></p>
                <i
                  class="fi icon__gallery fi-sr-angry icon__gallery-angry opacity"
                ></i>
                <p
                  class="number__angry number opacity"
                  v-formatNumber="number['angry']"
                ></p>
                <i
                  class="fi icon__gallery fi-ss-surprise icon__gallery-wow opacity"
                ></i>
                <p
                  class="number__wow number opacity"
                  v-formatNumber="number['wow']"
                ></p>
                <i
                  class="fi icon__gallery fi-ss-sad-tear icon__gallery-sad opacity"
                ></i>
                <p
                  class="number__sad number opacity"
                  v-formatNumber="number['sad']"
                ></p>
              </div>
            </div>
            <div :class="['back']"></div>
          </router-link>
        </li>
      </ul>
    </div>
    <div id="anime">
      <h2 class="style__h2">動漫風</h2>
      <ul :class="['list', 'style__list', 'gap']" id="anime2">
        <li
          :class="['list__item', 'style__list__item']"
          v-for="item in AniArr.data"
          :key="item.id"
        >
          <router-link :to="`/${item._ragicId}`">
            <div class="icon__gallery__container">
              <img
                :class="['item__picture']"
                :src="[item.smallurl]"
                :alt="[item.name]"
              />
              <p :class="['item__name']">{{ item.name }}</p>
              <div
                class="like__number grid grid__c-auto"
                v-for="number in item._subtable_1000050"
                :key="number"
              >
                <i
                  class="fi icon__gallery fi-ss-heart icon__gallery-heart opacity"
                ></i>
                <p
                  class="number__heart number opacity"
                  v-formatNumber="number['heart']"
                ></p>
                <i
                  class="fi icon__gallery fi-sr-grin-squint-tears icon__gallery-laugh opacity"
                ></i>
                <p
                  class="number__laugh number opacity"
                  v-formatNumber="number['laugh']"
                ></p>
                <i
                  class="fi icon__gallery fi-sr-angry icon__gallery-angry opacity"
                ></i>
                <p
                  class="number__angry number opacity"
                  v-formatNumber="number['angry']"
                ></p>
                <i
                  class="fi icon__gallery fi-ss-surprise icon__gallery-wow opacity"
                ></i>
                <p
                  class="number__wow number opacity"
                  v-formatNumber="number['wow']"
                ></p>
                <i
                  class="fi icon__gallery fi-ss-sad-tear icon__gallery-sad opacity"
                ></i>
                <p
                  class="number__sad number opacity"
                  v-formatNumber="number['sad']"
                ></p>
              </div>
            </div>
            <div :class="['back']"></div>
          </router-link>
        </li>
      </ul>
    </div>
    <div id="male">
      <h2 class="style__h2">男性</h2>
      <ul :class="['list', 'style__list', 'gap']">
        <li
          :class="['list__item', 'style__list__item']"
          v-for="item in maleArr.data"
          :key="item.id"
        >
          <router-link :to="`/${item._ragicId}`">
            <div class="icon__gallery__container">
              <img
                :class="['item__picture']"
                :src="[item.smallurl]"
                :alt="[item.name]"
              />
              <p :class="['item__name']">{{ item.name }}</p>
              <div
                class="like__number grid grid__c-auto"
                v-for="number in item._subtable_1000050"
                :key="number"
              >
                <i
                  class="fi icon__gallery fi-ss-heart icon__gallery-heart opacity"
                ></i>
                <p
                  class="number__heart number opacity"
                  v-formatNumber="number['heart']"
                ></p>
                <i
                  class="fi icon__gallery fi-sr-grin-squint-tears icon__gallery-laugh opacity"
                ></i>
                <p
                  class="number__laugh number opacity"
                  v-formatNumber="number['laugh']"
                ></p>
                <i
                  class="fi icon__gallery fi-sr-angry icon__gallery-angry opacity"
                ></i>
                <p
                  class="number__angry number opacity"
                  v-formatNumber="number['angry']"
                ></p>
                <i
                  class="fi icon__gallery fi-ss-surprise icon__gallery-wow opacity"
                ></i>
                <p
                  class="number__wow number opacity"
                  v-formatNumber="number['wow']"
                ></p>
                <i
                  class="fi icon__gallery fi-ss-sad-tear icon__gallery-sad opacity"
                ></i>
                <p
                  class="number__sad number opacity"
                  v-formatNumber="number['sad']"
                ></p>
              </div>
            </div>
            <div :class="['back']"></div>
          </router-link>
        </li>
      </ul>
    </div>
    <div id="female">
      <h2 class="style__h2">女性</h2>
      <ul :class="['list', 'style__list', 'gap']">
        <li
          :class="['list__item', 'style__list__item']"
          v-for="item in femaleArr.data"
          :key="item.id"
        >
          <router-link :to="`/${item._ragicId}`">
            <div class="icon__gallery__container">
              <img
                :class="['item__picture']"
                :src="[item.smallurl]"
                :alt="[item.name]"
              />
              <p :class="['item__name']">{{ item.name }}</p>
              <div
                class="like__number grid grid__c-auto"
                v-for="number in item._subtable_1000050"
                :key="number"
              >
                <i
                  class="fi icon__gallery fi-ss-heart icon__gallery-heart opacity"
                ></i>
                <p
                  class="number__heart number opacity"
                  v-formatNumber="number['heart']"
                ></p>
                <i
                  class="fi icon__gallery fi-sr-grin-squint-tears icon__gallery-laugh opacity"
                ></i>
                <p
                  class="number__laugh number opacity"
                  v-formatNumber="number['laugh']"
                ></p>
                <i
                  class="fi icon__gallery fi-sr-angry icon__gallery-angry opacity"
                ></i>
                <p
                  class="number__angry number opacity"
                  v-formatNumber="number['angry']"
                ></p>
                <i
                  class="fi icon__gallery fi-ss-surprise icon__gallery-wow opacity"
                ></i>
                <p
                  class="number__wow number opacity"
                  v-formatNumber="number['wow']"
                ></p>
                <i
                  class="fi icon__gallery fi-ss-sad-tear icon__gallery-sad opacity"
                ></i>
                <p
                  class="number__sad number opacity"
                  v-formatNumber="number['sad']"
                ></p>
              </div>
            </div>
            <div :class="['back']"></div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
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
    margin: 3rem 0 0rem 5vw;
  }
}
.style__list {
  &.list {
    list-style: none;
    padding: 0;
    justify-content: start;
    align-items: center;
    height: 45vh;
    overflow-x: auto;
    white-space: nowrap;
    flex-wrap: nowrap;
    margin: 0 auto;
    width: 85vw;
    @media screen and (min-height: 1100px) {
      height: 30vh;
    }
    @media screen and (max-width: 1300px) {
      height: auto;
    }
  }
  > .list__item {
    width: 300px;
    height: 300px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    transition: scale 0.15s;
    cursor: pointer;
    position: relative;
    &.style__list__item {
      flex-shrink: 0;
      margin-right: 20px;
      > a {
        > .icon__gallery__container {
          width: 100%;
          > .item__picture {
            width: 300px;
            height: 300px;
            object-fit: contain;
            backdrop-filter: blur(10px);
          }
          > .like__number {
            position: absolute;
            top: 90%;
            z-index: 1000;
            width: inherit;
            scale: 0.6;
          }
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
      // text-shadow: -1px -1px 0 #dddddd, 1px -1px 0 #dddddd, -1px 1px 0 #dddddd,
      //   1px 1px 0 #dddddd;
    }
    &:hover .opacity {
      opacity: 0.8;
    }
    &:hover {
      scale: 1.05;
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
}
//icon 不放進.item__list的SCSS內是因為，當list__item:hover時，.back跟.opacity會有效果，
//如果把這個引入進去，會失效，因為權重不一
.icon__gallery {
  justify-self: center;
  &.icon__gallery-heart {
    color: rgb(255, 170, 184);
  }
  &.icon__gallery-laugh {
    color: rgb(255, 255, 179);
  }
  &.icon__gallery-angry {
    color: rgb(255, 103, 103);
  }
  &.icon__gallery-wow {
    color: rgb(237, 251, 255);
  }
  &.icon__gallery-sad {
    color: rgb(202, 202, 202);
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
</style>

<script>
import { onMounted, reactive, computed } from "vue";
export default {
  setup() {
    const Arr = reactive({ data: [] });
    const AniArr = reactive({ data: [] });
    const RealArr = reactive({ data: [] });
    const abc = () => {};
    onMounted(() => {
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
          AniArr.data = Arr.data.filter((item) => item.style === "anime");
          // console.log("AniArr", AniArr.data);
          //篩選出動現實風的圖片
          RealArr.data = Arr.data.filter((item) => item.style === "realistic");
          console.log("RealArr", RealArr.data);
        });
    });

    return { Arr, AniArr, RealArr, abc };
  },
};
</script>
<template>
  <div class="container body" id="app">
    <div>
      <h2>現實風</h2>
      <ul :class="['list', 'gap']">
        <li :class="['list__item']" v-for="item in RealArr.data" :key="item.id">
          <router-link :to="`/${item._ragicId}`">
            <div class="icon__gallery__container">
              <img :class="['item__picture']" :src="[item.url]" />
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
    <div>
      <h2>動漫風</h2>
      <ul :class="['list', 'gap']">
        <li :class="['list__item']" v-for="item in AniArr.data" :key="item.id">
          <router-link :to="`/${item._ragicId}`">
            <div class="icon__gallery__container">
              <img :class="['item__picture']" :src="[item.url]" />
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
.search__container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5rem 0 3rem;
}
.search__input {
  width: 33vw;
  height: 6vh;
  border-radius: 10px;
  padding-left: 1rem;
  font-size: 1.5rem;
}
.search__button {
  width: 3.5rem;
  height: 5.5rem;
  padding: 4px;
  background: none;
  outline: 0;
  border: 0;
  opacity: 0.5;
  margin: 0 1rem;
}
.search__icon {
  width: 100%;
  height: 100%;
  fill: #fff;
}
.search__button:hover {
  opacity: 1;
}
.list__item {
  width: 300px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  //grid用法
  //   justify-self: center;
  //   align-self: center;
  background: url("./drawailogo.png");
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  transition: scale 0.15s;
  cursor: pointer;
  position: relative;
}

.list__item:hover .item__name {
  position: absolute;
  top: 75%;
  width: 100%; //置中
  color: white;
  z-index: 1000;
  letter-spacing: 0.3rem;
  // text-shadow: -1px -1px 0 #dddddd, 1px -1px 0 #dddddd, -1px 1px 0 #dddddd,
  //   1px 1px 0 #dddddd;
}
.icon__gallery__container {
  width: 100%;
}

.like__number {
  position: absolute;
  top: 90%;
  z-index: 1000;
  width: inherit;
  scale: 0.6;
}
.icon__gallery-heart {
  color: rgb(255, 170, 184);
}
.icon__gallery-laugh {
  color: rgb(255, 255, 179);
}
.icon__gallery-angry {
  color: rgb(255, 103, 103);
}
.icon__gallery-wow {
  color: rgb(237, 251, 255);
}
.icon__gallery-sad {
  color: rgb(202, 202, 202);
}
.icon__gallery {
  justify-self: center;
}
.number {
  margin: 0;
  color: #fff;
  justify-self: center;
}

.number__heart {
  right: 80%;
}
.number__laugh {
  right: 60%;
}
.number__angry {
  right: 40%;
}
.number__wow {
  right: 20%;
}
.number__sad {
  right: 0%;
}
.opacity {
  opacity: 0;
}
.list__item:hover .opacity {
  opacity: 0.8;
}
.list__item:hover {
  scale: 1.05;
}
.item__picture {
  width: 300px;
  height: 300px;
  object-fit: contain;
  backdrop-filter: blur(10px);
  /* background: #e6ebee; */
}
.list__item:hover .back {
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
  // rgba(0, 0, 0, 0.213) 73.35%,
  // rgba(0, 0, 0, 0.237) 76.85%,
  // rgba(0, 0, 0, 0.262) 80.35%,
  // rgba(0, 0, 0, 0.285) 83.85%,
  // rgba(0, 0, 0, 0.306) 87.35%,
  // rgba(0, 0, 0, 0.324) 90.85%,
  // rgba(0, 0, 0, 0.338) 94.35%,
  // rgba(0, 0, 0, 0.347) 97.85%,
  // #00000059
  //rgba(0, 0, 0, 0.4) 73.35%, rgba(0, 0, 0, 0.45) 76.85%, rgba(0, 0, 0, 0.50) 80.35%, rgba(0, 0, 0, 0.55) 83.85%, rgba(0, 0, 0, 0.6) 87.35%, rgba(0, 0, 0, 0.65) 90.85%, rgba(0, 0, 0, 0.7) 94.35%, rgba(0, 0, 0, 0.75) 97.85%, rgba(0, 0, 0, 0.8))
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
// icon
</style>

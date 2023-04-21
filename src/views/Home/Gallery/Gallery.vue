<script>
import { onMounted, reactive, ref, watch } from "vue";
export default {
  setup() {
    const Arr = reactive({ data: [] });
    const storeArr = reactive({ data: [] });
    const AniArr = reactive({ data: [] });
    const RealArr = reactive({ data: [] });
    const search = reactive({ text: [] });
    const isSearch = ref(false);
    const searchSpilt = reactive({ text: [] });
    const test = reactive({ data: [] });
    const selected = ref("人氣最高");
    const quantity = ref("");

    function includes(array, searchElement) {
      for (let element of array) if (element === searchElement) return true;
      return false;
    }
    //有打字就搜尋
    watch(
      () => search.text,
      (newVal) => {
        //篩選出與搜尋的字較有關聯度的
        if (newVal.length === 0) {
          types.selects.最新畫作 = false;
          types.selects.依關聯性 = false;
          types.selects.人氣最高 = true;
          selected.value = "人氣最高";
        }
        if (newVal.length > 0) {
          Arr.data.filter((arr) => {
            //篩選
            arr.relative = 0; //新增關聯度欄位
            test.data = arr.name.split(""); //把陣列內的名子的所有字拆分
            searchSpilt.text = search.text.split(""); //把Search__input內的值的所有字拆分
            for (let i of searchSpilt.text) {
              //把已經拆分過的Search__input的值變成i一個一個放進去比對
              if (includes(test.data, i) === true) {
                //拆芬過的Search__input的值變成i一個一個放進test.data中比對，有相同的就會返為true
                //true的話arr.relative就+1。就是Arr.data[輪流的數字].relative+1。
                arr.relative++;
              }
            }
          });
          //將Arr.data依照關聯值的大小還續，關聯值越大順位越高，越上面
          Arr.data = Arr.data.sort((a, b) => b.relative - a.relative);
          quantity.value = Arr.data.length;
          types.selects.依關聯性 = true;
          selected.value = "依關聯性";
        }
      }
    );
    //按了才搜尋
    const handleSearch = () => {
      if (search.value !== "") {
        Arr.data.filter((arr) => {
          //篩選
          arr.relative = 0; //新增關聯度欄位
          test.data = arr.name.split(""); //把陣列內的名子的所有字拆分
          searchSpilt.text = search.text.split(""); //把Search__input內的值的所有字拆分
          for (let i of searchSpilt.text) {
            //把已經拆分過的Search__input的值變成i一個一個放進去比對
            if (includes(test.data, i) === true) {
              //拆芬過的Search__input的值變成i一個一個放進test.data中比對，有相同的就會返為true
              //true的話arr.relative就+1。就是Arr.data[輪流的數字].relative+1。
              arr.relative++;
            }
          }
        });
        //將Arr.data依照關聯值的大小還續，關聯值越大順位越高，越上面
        Arr.data = Arr.data.sort((a, b) => b.relative - a.relative);
      }
      quantity.value = Arr.data.length;
      types.selects.依關聯性 = true;
      selected.value = "依關聯性";
    };

    //篩選區域
    const types = reactive({
      selects: {
        人氣最高: true,
        最新畫作: false,
        依關聯性: false,
      },
      style: {
        全部: { Boolean: true },
        現實風: { name: "realistic", Boolean: false },
        動漫風: { name: "anime", Boolean: false },
      },
      dress: {
        全部: { Boolean: true },
        衣服: { name: "clothes", Boolean: false },
        比基尼: { name: "bikini", Boolean: false },
        洋裝: { name: "dress", Boolean: false },
        赤膊: { name: "nude", Boolean: false },
        太空衣: { name: "spacesuit", Boolean: false },
        "襯衫、西裝": { name: "suit", Boolean: false },
      },
      ethnicity: {
        全部: { Boolean: true },
        人類: { name: "human", Boolean: false },
        動物: { name: "animal", Boolean: false },
        亞人: { name: "demihuman", Boolean: false },
      },
      people: {
        全部: { Boolean: true },
        "1人": { name: "1", Boolean: false },
        "2人": { name: "2", Boolean: false },
      },
      sex: {
        全部: { Boolean: true },
        男生: { name: "male", Boolean: false },
        女生: { name: "female", Boolean: false },
      },
      age: {
        全部: { Boolean: true },
        少女: { name: "girl", Boolean: false },
        女人: { name: "woman", Boolean: false },
        男人: { name: "man", Boolean: false },
      },
    });
    const handleChange = () => {
      types.selects.人氣最高 = false;
      types.selects.最新畫作 = false;
      types.selects.依關聯性 = false;

      if (selected.value === "人氣最高") {
        types.selects.人氣最高 = true;
      }
      if (selected.value === "最新畫作") {
        types.selects.最新畫作 = true;
      }
      if (selected.value === "依關聯性") {
        types.selects.依關聯性 = true;
      }
    };
    const toggleType = (category, attribute) => {
      // if (Object.keys(types[category][attribute]).length <= 1) {
      //   Object.keys(types[category]).forEach((element) => {
      //     if (Object.keys(types[category][element]).length > 1) {
      //       types[category][element]["Boolean"] = false;
      //       console.log(Object.keys(types[category][element]));
      //     }
      //   });
      // } else {
      //當點選一個category的attribute時，同一個category的其他attribute會等於false。
      Object.keys(types[category]).forEach((element) => {
        if (Object.keys(types[category][element]).length > 1) {
          types[category][element]["Boolean"] = false;
        }
      });
      Object.keys(types[category]).forEach((element) => {
        types[category][element]["Boolean"] = false;
      });
      // Object.keys(types[category]).forEach((element) => {
      //   if (types[category][element]["Boolean"] === true)
      //     types[category][element]["Boolean"] = false;
      // });
      //被點選的那個將會產生一次布林值的轉換
      types[category][attribute]["Boolean"] =
        !types[category][attribute]["Boolean"];
      // }

      //每點選一次重製一次資料
      Arr.data = storeArr.data;
    };
    //每更新一次就重新篩選一次
    watch(
      () => types,
      (newVal) => {
        //風格
        if (newVal.style.全部.Boolean === true) {
          Object.keys(types.style).forEach((element) => {
            if (Object.keys(types.style[element]).length > 1) {
              types.style[element]["Boolean"] = false;
            }
          });
        }
        if (newVal.style.動漫風.Boolean === true) {
          Arr.data = Arr.data.filter((styles) => styles.style === "anime");
        }
        if (newVal.style.現實風.Boolean === true) {
          Arr.data = Arr.data.filter((styles) => styles.style === "realistic");
        }
        //服裝
        if (newVal.dress.全部.Boolean === true) {
          Object.keys(types.dress).forEach((element) => {
            if (Object.keys(types.dress[element]).length > 1) {
              types.dress[element]["Boolean"] = false;
            }
          });
        }
        if (newVal.dress.衣服.Boolean === true) {
          Arr.data = Arr.data.filter((styles) => styles.dress === "clothes");
        }
        if (newVal.dress.比基尼.Boolean === true) {
          Arr.data = Arr.data.filter((styles) => styles.dress === "bikini");
        }
        if (newVal.dress.洋裝.Boolean === true) {
          Arr.data = Arr.data.filter((styles) => styles.dress === "dress");
        }
        if (newVal.dress.赤膊.Boolean === true) {
          Arr.data = Arr.data.filter((styles) => styles.dress === "nude");
        }
        if (newVal.dress.太空衣.Boolean === true) {
          Arr.data = Arr.data.filter((styles) => styles.dress === "spacesuit");
        }
        if (newVal.dress["襯衫、西裝"].Boolean === true) {
          Arr.data = Arr.data.filter((styles) => styles.dress === "suit");
        }
        //種族
        if (newVal.ethnicity.全部.Boolean === true) {
          Object.keys(types.ethnicity).forEach((element) => {
            if (Object.keys(types.ethnicity[element]).length > 1) {
              types.ethnicity[element]["Boolean"] = false;
            }
          });
        }
        if (newVal.ethnicity.人類.Boolean === true) {
          Arr.data = Arr.data.filter((styles) => styles.ethnicity === "human");
        }
        if (newVal.ethnicity.動物.Boolean === true) {
          Arr.data = Arr.data.filter((styles) => styles.ethnicity === "animal");
        }
        if (newVal.ethnicity.亞人.Boolean === true) {
          Arr.data = Arr.data.filter(
            (styles) => styles.ethnicity === "demihuman"
          );
        }
        //人數
        if (newVal.people.全部.Boolean === true) {
          Object.keys(types.people).forEach((element) => {
            if (Object.keys(types.people[element]).length > 1) {
              types.people[element]["Boolean"] = false;
            }
          });
        }
        if (newVal.people["1人"].Boolean === true) {
          Arr.data = Arr.data.filter((styles) => styles.people === "1");
        }
        if (newVal.people["2人"].Boolean === true) {
          Arr.data = Arr.data.filter((styles) => styles.people === "2");
        }
        //性別
        if (newVal.sex.全部.Boolean === true) {
          Object.keys(types.sex).forEach((element) => {
            if (Object.keys(types.sex[element]).length > 1) {
              types.sex[element]["Boolean"] = false;
            }
          });
        }
        if (newVal.sex.女生.Boolean === true) {
          Arr.data = Arr.data.filter((styles) => styles.sex === "female");
        }
        if (newVal.sex.男生.Boolean === true) {
          Arr.data = Arr.data.filter((styles) => styles.sex === "male");
        }
        //年齡
        if (newVal.age.全部.Boolean === true) {
          Object.keys(types.age).forEach((element) => {
            if (Object.keys(types.age[element]).length > 1) {
              types.age[element]["Boolean"] = false;
            }
          });
        }
        if (newVal.age.女人.Boolean === true) {
          Arr.data = Arr.data.filter((styles) => styles.age === "woman");
        }
        if (newVal.age.少女.Boolean === true) {
          Arr.data = Arr.data.filter((styles) => styles.age === "girl");
        }
        if (newVal.age.男人.Boolean === true) {
          Arr.data = Arr.data.filter((styles) => styles.age === "man");
        }
        //順序
        if (newVal.selects.人氣最高 === true) {
          Arr.data = Arr.data.sort((a, b) => b.popular - a.popular);
        }
        if (newVal.selects.最新畫作 === true) {
          Arr.data = Arr.data.sort((a, b) => b._ragicId - a._ragicId);
        }

        if (newVal.selects.依關聯性 === true) {
          if (search.text.length !== 0) {
            //篩選出與搜尋的字較有關聯度的
            Arr.data.filter((arr) => {
              //篩選
              arr.relative = 0; //新增關聯度欄位
              test.data = arr.name.split(""); //把陣列內的名子的所有字拆分
              searchSpilt.text = search.text.split(""); //把Search__input內的值的所有字拆分
              for (let i of searchSpilt.text) {
                //把已經拆分過的Search__input的值變成i一個一個放進去比對
                if (includes(test.data, i) === true) {
                  //拆芬過的Search__input的值變成i一個一個放進test.data中比對，有相同的就會返為true
                  //true的話arr.relative就+1。就是Arr.data[輪流的數字].relative+1。
                  arr.relative++;
                }
              }
            });
            //將Arr.data依照關聯值的大小還續，關聯值越大順位越高，越上面
            Arr.data = Arr.data.sort((a, b) => b.relative - a.relative);
          }
        }

        quantity.value = Arr.data.length;
      },
      //deep一定要有不然會監聽不到
      { deep: true }
    );
    const resetAll = () => {
      search.text = "";
      types.style.全部 = { Boolean: true };
      types.dress.全部 = { Boolean: true };
      types.ethnicity.全部 = { Boolean: true };
      types.people.全部 = { Boolean: true };
      types.sex.全部 = { Boolean: true };
      types.age.全部 = { Boolean: true };
      types.selects.人氣最高 = { Boolean: true };
      types.selects.人氣最高 = true;
      types.selects.依關聯性 = false;
      Arr.data = storeArr.data;
      Arr.data = Arr.data.sort((a, b) => b.popular - a.popular);
      selected.value = "人氣最高";
      quantity.value = Arr.data.length;
    };
    const resetFilter = () => {
      if (search.text.length === 0) {
        types.style.全部 = { Boolean: true };
        types.dress.全部 = { Boolean: true };
        types.ethnicity.全部 = { Boolean: true };
        types.people.全部 = { Boolean: true };
        types.sex.全部 = { Boolean: true };
        types.age.全部 = { Boolean: true };
        types.selects.人氣最高 = { Boolean: true };
        types.selects.依關聯性 = false;
        Arr.data = storeArr.data;
        Arr.data = Arr.data.sort((a, b) => b.popular - a.popular);
        // selected.value = "人氣最高";
        quantity.value = Arr.data.length;
      } else {
        types.style.全部 = { Boolean: true };
        types.dress.全部 = { Boolean: true };
        types.ethnicity.全部 = { Boolean: true };
        types.people.全部 = { Boolean: true };
        types.sex.全部 = { Boolean: true };
        types.age.全部 = { Boolean: true };
        types.selects.依關聯性 = true;
        selected.value = "依關聯性";
        Arr.data = storeArr.data;
        Arr.data = Arr.data.sort((a, b) => b.popular - a.popular);
        handleSearch;
        quantity.value = Arr.data.length;
      }
    };
    const resetSearch = () => {
      search.text = "";
    };

    onMounted(() => {
      axios
        .get(
          "https://ap9.ragic.com/lanziyun/convert2/1?api&APIKey=MFd4YlZuOEZ0eWNTa2Z6ek1GUVdLYS9rVTFWMUt1S01BdHNlVW1XZWNJK2ZpRFdVN1RyKzlUSDlwdzdJUzlSd2hEVlJvLzlMZy9rPQ=="
        )
        .then((res) => {
          Arr.data = res.data;
          storeArr.data = res.data;
          Arr.data = Object.keys(Arr.data).map((key) => Arr.data[key]);
          storeArr.data = Object.keys(storeArr.data).map(
            (key) => storeArr.data[key]
          );
          //人氣由小到大
          Arr.data = Arr.data.sort((a, b) => b.popular - a.popular);
          quantity.value = Arr.data.length;
        });
    });

    return {
      Arr,
      AniArr,
      RealArr,
      search,
      handleSearch,
      types,
      toggleType,
      resetAll,
      resetSearch,
      resetFilter,
      handleChange,
      selected,
      quantity,
    };
  },
};
</script>
<template>
  <div class="container body" id="app">
    <div class="search__container container">
      <input
        aria-label="Domain"
        type="text"
        class="search__input"
        placeholder="搜尋你想找的大師之作"
        v-model="search.text"
      />
      <button class="search__button" @click="handleSearch">
        <svg class="search__icon">
          <use xlink:href="@/image/sprite.svg#search"></use>
        </svg>
      </button>
    </div>
    <div>
      <!-- 篩選器 -->
      <div>
        <button @click="resetAll">一鍵清除篩選與搜尋</button>
        <button @click="resetFilter">清除篩選</button>
        <button @click="resetSearch">清除搜尋</button>
      </div>
      <div>
        <!-- 風格 -->
        <button
          v-for="type in Object.keys(types.style)"
          :key="type"
          @click="() => toggleType('style', `${type}`)"
        >
          {{ type }}
        </button>
      </div>
      <div>
        <!-- 服裝 -->
        <button
          v-for="type in Object.keys(types.dress)"
          :key="type"
          @click="() => toggleType('dress', `${type}`)"
        >
          {{ type }}
        </button>
      </div>
      <div>
        <!-- 種族 -->
        <button
          v-for="type in Object.keys(types.ethnicity)"
          :key="type"
          @click="() => toggleType('ethnicity', `${type}`)"
        >
          {{ type }}
        </button>
      </div>
      <div>
        <!-- 數量 -->
        <button
          v-for="type in Object.keys(types.people)"
          :key="type"
          @click="() => toggleType('people', `${type}`)"
        >
          {{ type }}
        </button>
      </div>
      <div>
        <!-- 性別 -->
        <button
          v-for="type in Object.keys(types.sex)"
          :key="type"
          @click="() => toggleType('sex', `${type}`)"
        >
          {{ type }}
        </button>
      </div>
      <div>
        <!-- 年齡 -->
        <button
          v-for="type in Object.keys(types.age)"
          :key="type"
          @click="() => toggleType('age', `${type}`)"
        >
          {{ type }}
        </button>
      </div>
    </div>
    <div>
      <h1>總畫廊</h1>
      <div class="select__container">
        <select class="select__sort" v-model="selected" @change="handleChange">
          {{
            selected
          }}
          <option
            v-for="select in Object.keys(types.selects)"
            :key="select"
            :value="select"
          >
            {{ select }}
          </option>
        </select>
        <p>幫您搜尋到的張數{{ quantity }}</p>
      </div>
      <ul :class="['list', 'gap']">
        <li :class="['list__item']" v-for="item in Arr.data" :key="item.id">
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
//select
.select__container {
  display: flex;
  align-items: center;
}
.select__container > p {
  color: #fff;
}
.select__sort {
  text-align: start;
  padding: 0;
  color: #e9ecef;
  background: #25262b;
  outline: 0;
  border: 0;
  font-size: 3rem;
  cursor: pointer;
  margin: 4rem 0;
  display: block;
  font-weight: 600;
}
</style>

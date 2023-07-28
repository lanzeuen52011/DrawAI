<script>
import axios from "axios";
import { onBeforeUnmount, onMounted, reactive, ref, Static, watch } from "vue";
export default {
  setup() {
    const Arr = reactive({ data: [] });
    const storeArr = reactive({ data: [] });
    const AniArr = reactive({ data: [] });
    const RealArr = reactive({ data: [] });
    const ImageArr = reactive({ data: [] });
    const search = reactive({ text: [] });
    const searchSpilt = reactive({ text: [] });
    const test = reactive({ data: [] });
    const selected = ref("人氣最高");
    const quantity = ref("");
    const isFocus = ref(false);
    const isKeep = ref(false);
    const isLoad = ref(false);
    const Token = process.env.VUE_APP_TOKEN;
    const handleFocus = () => {
      isFocus.value = !isFocus.value;
    };
    const keepShow = () => {
      isKeep.value = !isKeep.value;
    };

    function includes(array, searchElement) {
      for (let element of array) if (element === searchElement) return true;
      return false;
    }

    const scrollingdown = ref(false);
    let prevScrollPos = window.pageYOffset;
    window.addEventListener("scroll", () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollPos < currentScrollPos) {
        // 向下滾動
        scrollingdown.value = true;
      }
      if (prevScrollPos > currentScrollPos) {
        // 向下滾動
        scrollingdown.value = false;
      }
      prevScrollPos = currentScrollPos;
    });

    //有打字就搜尋
    watch(
      () => search.text,
      (newVal) => {
        //篩選出與搜尋的字較有關聯度的
        if (newVal.length === 0) {
          types.selects.最新畫作 = false;
          types.selects.依關聯性 = false;
          types.selects.人氣最高 = true;
          quantity.value = Arr.data.length;
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
          //將ImageArr.data依照關聯值的大小還續，關聯值越大順位越高，越上面
          ImageArr.data = Arr.data
            .sort((a, b) => b.relative - a.relative)
            .filter((e, index) => {
              // 將資料全數下載下來後，先載入前十個圖片
              if (index <= 11) {
                return e;
              }
            });
          types.selects.依關聯性 = true;
          selected.value = "依關聯性";
        }
      }
    );
    //按了才搜尋
    const handleSearch = () => {
      //篩選出與搜尋的字較有關聯度的
      if (search.text.length === 0) {
        types.selects.最新畫作 = false;
        types.selects.依關聯性 = false;
        types.selects.人氣最高 = true;
        quantity.value = Arr.data.length;
        selected.value = "人氣最高";
      }
      if (search.text.length > 0) {
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
        //將ImageArr.data依照關聯值的大小還續，關聯值越大順位越高，越上面
        ImageArr.data = Arr.data
          .sort((a, b) => b.relative - a.relative)
          .filter((e, index) => {
            // 將資料全數下載下來後，先載入前十個圖片
            if (index <= 11) {
              return e;
            }
          });
        types.selects.依關聯性 = true;
        selected.value = "依關聯性";
      }
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
        襯衫: { name: "suit", Boolean: false },
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
      //當點選一個category的attribute時，同一個category的其他attribute會等於false。
      Object.keys(types[category]).forEach((element) => {
        if (Object.keys(types[category][element]).length > 1) {
          types[category][element]["Boolean"] = false;
        }
      });
      Object.keys(types[category]).forEach((element) => {
        types[category][element]["Boolean"] = false;
      });

      //被點選的那個將會產生一次布林值的轉換
      types[category][attribute]["Boolean"] =
        !types[category][attribute]["Boolean"];

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
        if (newVal.dress.襯衫.Boolean === true) {
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
        quantity.value = Arr.data.length;
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
            if (Arr.data[0].relative === 0) {
              quantity.value = "沒有關聯的作品";
            } else {
              quantity.value = Arr.data.length;
            }
          }
        }
        ImageArr.data = Arr.data.filter((e, index) => {
          // 將資料全數下載下來後，先載入前十個圖片
          if (index <= 11) {
            return e;
          }
        });
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
      types.selects.人氣最高 = true; // 此處需存在是因為，如果此行不在，僅大標題改，資料不會跟著改
      types.selects.依關聯性 = false; // 此處需存在是因為，如果此行不在，僅大標題改，資料不會跟著改
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
      window.addEventListener("scroll", handleScroll);
      const cachedData = localStorage.getItem("Arr");
      if (cachedData) {
        //有快取讀快取，沒快取讀fetch
        // 從 localStorage 中讀取快取資料
        Arr.data = JSON.parse(cachedData).Arr;
        storeArr.data = Arr.data;
        //人氣由小到大
        Arr.data = Arr.data.sort((a, b) => b.popular - a.popular);
        ImageArr.data = Arr.data.filter((e, index) => {
          // 將資料全數下載下來後，先載入前十個圖片
          if (index <= 11) {
            return e;
          }
        });
        quantity.value = Arr.data.length;
        isLoad.value = true;
      } else {
        // 使用匿名的自動執行 async 函式
        // (async () => {
        //   try {
        //     const response = await axios.get("https://api.example.com/data");
        //     const data = response.data;
        //     console.log(data);
        //   } catch (error) {
        //     console.error("Error fetching data:", error);
        //   }
        // })();

        axios
          .get(`https://ap9.ragic.com/lanziyun/convert2/1?api&APIKey=${Token}`)
          .then((res) => {
            Arr.data = res.data;
            storeArr.data = res.data;
            Arr.data = Object.keys(Arr.data).map((key) => Arr.data[key]);
            storeArr.data = Object.keys(storeArr.data).map(
              (key) => storeArr.data[key]
            );
            //人氣由小到大
            Arr.data = Arr.data.sort((a, b) => b.popular - a.popular);
            ImageArr.data = Arr.data.filter((e, index) => {
              // 將資料全數下載下來後，先載入前十個圖片
              if (index <= 11) {
                return e;
              }
            });
            quantity.value = Arr.data.length;
            isLoad.value = true;

            // 將資料新增到 localStorage 中
            const ArrToCache = { Arr: Arr.data };
            localStorage.setItem("Arr", JSON.stringify(ArrToCache));
          });
      }
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    let loadTimes = 0;
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollBottom = window.pageYOffset + window.innerHeight;
      // 以下註解為測試用
      // console.log("總長度：", scrollHeight, "現在位置：", scrollBottom);
      if (scrollBottom / scrollHeight >= 0.6) {
        // 螢幕底部超過整個DOM長度的60%時，載入新圖片
        loadTimes = loadImages(loadTimes);
        const loadTimesToCache = { hasLoad: loadTimes };
        sessionStorage.setItem("loadTimes", JSON.stringify(loadTimesToCache));
        console.log(loadTimes);
        //以下註解為測試用
        // console.log(
        //   "觸發後的總長度：",
        //   scrollHeight,
        //   "觸發後的現在位置：",
        //   scrollBottom
        // );
      }
    };
    const loadImages = (loadTimes) => {
      const batchSize = 10; // 每次載入的圖片數量
      const remainingImages = Arr.data.slice(ImageArr.data.length); // 從剩餘的圖片中獲取要載入的圖片

      // 檢查是否還有要載入的圖片
      if (remainingImages.length > 0) {
        const imagesToLoad = remainingImages.slice(0, batchSize); // 取前 batchSize 張圖片

        // 將要載入的圖片添加到已載入的圖片數組中
        ImageArr.data = ImageArr.data.concat(imagesToLoad);
        loadTimes++;
      }
      return loadTimes;
    };

    return {
      Arr, //將網路上的資料下載下來的陣列
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
      isFocus,
      handleFocus,
      keepShow,
      isKeep,
      scrollingdown,
      isLoad,
      ImageArr,
    };
  },
};
</script>
<template>
  <section :class="['filterandsearch', 'div', { up: scrollingdown }]">
    <div class="search__container container">
      <input
        aria-label="Domain"
        type="text"
        class="search__input"
        placeholder="搜尋你想找的大師之作，打字即搜尋"
        v-model="search.text"
        @focus="handleFocus"
        @blur="handleFocus"
      />
      <button
        class="search__button"
        @click="handleSearch"
        @keyup.enter="handleSearch"
        aria-label="搜尋，直接打字在「搜尋你想找的大師之作」也可以"
      >
        <svg class="search__icon">
          <use xlink:href="@/image/sprite.svg#search"></use>
        </svg>
      </button>
    </div>
    <div :class="['filter__container', { show: isFocus }, { show: isKeep }]">
      <!-- 篩選器 -->
      <div class="flex filter__item-1">
        <div class="filter__item-1_itembox">
          <button class="filter__btn active filter__btn-fn" @click="resetAll">
            一鍵清除
          </button>
          <button
            class="filter__btn active filter__btn-fn"
            @click="resetFilter"
          >
            清除篩選
          </button>
          <button
            class="filter__btn active filter__btn-fn"
            @click="resetSearch"
          >
            清除搜尋
          </button>
        </div>
        <button
          :class="[
            'filter__btn',
            'filter__btn-fixed',
            { active: isKeep },
            'filter__btn-fn',
          ]"
          @click="keepShow"
        >
          固定選單
        </button>
      </div>
      <div>
        <!-- 風格 -->
        <button
          v-for="type in Object.keys(types.style)"
          :key="type"
          @click="() => toggleType('style', `${type}`)"
          :class="['filter__btn', { active: types.style[type].Boolean }]"
        >
          {{ type }}
        </button>
      </div>
      <div class="dress">
        <!-- 服裝 -->
        <button
          v-for="type in Object.keys(types.dress)"
          :key="type"
          @click="() => toggleType('dress', `${type}`)"
          :class="['filter__btn', { active: types.dress[type].Boolean }]"
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
          :class="['filter__btn', { active: types.ethnicity[type].Boolean }]"
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
          :class="['filter__btn', { active: types.people[type].Boolean }]"
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
          :class="['filter__btn', { active: types.sex[type].Boolean }]"
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
          :class="['filter__btn', { active: types.age[type].Boolean }]"
        >
          {{ type }}
        </button>
      </div>
    </div>
  </section>
  <section class="container body content">
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
      <p>幫您搜尋到的張數：{{ quantity }}</p>
    </div>
    <div v-if="!isLoad" class="gallery__loading-container">
      <img class="gallery__loading-img" src="./Spinner-0.6s-200px.gif" alt="" />
    </div>
    <ul :class="['list', 'gap']" v-if="isLoad">
      <li
        :class="['list__item']"
        v-for="(item, index) in ImageArr.data"
        :key="item.id"
      >
        <router-link :to="`/img/${item._ragicId}`">
          <div class="icon__gallery__container">
            <img
              :class="['item__picture']"
              :src="[item.smallurl]"
              :alt="[item.name]"
              :loading="[index <= 3 ? '' : 'lazy']"
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
      </li>
    </ul>
  </section>
</template>
<style lang="scss">
.gallery__loading-img {
  width: 75px;
  height: 75px;
  @media screen and (min-width: 1600px) {
    width: 5.20833vw;
    height: 5.20833vw;
  }
}
.gallery__loading-container {
  margin-top: 50px;
  @media screen and (min-width: 1600px) {
    margin-top: 3.4722vw;
  }
}
.filterandsearch {
  position: fixed;
  top: 15px;
  z-index: 3000;
  right: 33vw;
  transition: top 0.15s;
  //search
  @media screen and (min-width: 1600px) {
    top: 1.04166vw;
  }
  &.up {
    @media screen and (max-width: 650px) {
      top: 35px;
    }
  }
  @media screen and (max-width: 1500px) {
    right: 30vw;
  }
  @media screen and (max-width: 1050px) {
    position: fixed;
    top: 100px;
    right: 0vw;
    z-index: 1500;
  }

  @media screen and (max-width: 650px) {
    right: 40vw;
    left: 3vw;
  }
  @media screen and (max-width: 426px) {
    left: 9vw;
  }
  @media screen and (max-width: 372px) {
    right: -12vw;
  }
}

//filter
.filter__container {
  position: relative;
  top: 0;
  right: 0;
  display: none;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 33vw;
  z-index: 3000;
  background: #3e3e3e;
  padding: 0.3rem 0rem 1rem 1rem;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  @media screen and (min-width: 1600px) {
    padding: 0.20833vw 0rem 0.7vw 0.7vw;
    border-radius: 0.7vw;
    box-shadow: 0.34722vw 0.34722vw 0.7vw rgba(0, 0, 0, 0.2);
  }
  @media screen and (max-width: 1024px) {
    width: 29vw;
  }
  @media screen and (max-width: 960px) {
    width: 34.5vw;
  }
  @media screen and (max-width: 650px) {
    width: 50.5vw;
  }
  @media screen and (max-width: 426px) {
    width: 82.5vw;
  }
  @media screen and (max-width: 373px) {
    width: 78vw;
  }

  &:hover {
    display: flex;
  }
  &.show {
    display: flex;
  }
}

//篩選器的按鈕
div {
  // @media screen and (max-width: 1024px) {
  //   position: relative;
  // }
  &.dress {
    display: flex;
    flex-wrap: wrap;
  }

  > .filter__btn {
    background: none;
    border: 0;
    color: #bdbdbd;
    @media screen and (min-width: 1600px) {
      padding: 0.07vw 0.4166vw;
      font-size: 0.9259027vw;
    }
    &.active {
      background: #000;
      transition: background 0.15s;
      color: #fff;
    }
  }
  &.filter__item-1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 2rem;
    width: 100%;
    @media screen and (min-width: 1600px) {
      padding-right: 1.3888vw;
    }
    @media screen and (max-width: 768px) {
      padding-right: 0;
    }
    .filter__item-1_itembox {
      display: flex;
      width: 75%;
    }
  }
}

//篩選器第一排特殊功能的按鈕
div {
  > .filter__btn-fn {
    margin: 0 0.5rem;
    @media screen and (min-width: 1600px) {
      margin: 0 0.34722vw;
    }
    &.filter__btn {
      background: none;
      border: 0;
      color: #bdbdbd;
      @media screen and (min-width: 1600px) {
        padding: 0.07vw 0.4166vw;
        font-size: 0.9259027vw;
      }
    }
    &.active {
      background: #000;
      transition: background 0.15s;
      color: #fff;
    }
  }
}

.filter__btn-fn {
  margin: 0 0.5rem;
  @media screen and (min-width: 1600px) {
    margin: 0 0.34722vw;
  }
  @media screen and (max-width: 1024px) {
    width: 80px;
  }
  &.filter__btn {
    border: 0;
    color: #bdbdbd;
    background: #000;
    opacity: 0.5;
    @media screen and (min-width: 1600px) {
      padding: 0.07vw 0.4166vw;
      font-size: 0.9259027vw;
    }
    &.filter__btn-fixed {
      border: 0;
      color: #bdbdbd;
      background: #000;
      &.active {
        background: #000;
        transition: background 0.15s;
        color: #fff;
      }
    }
  }
  &.active {
    transition: background 0.15s;
    color: #fff;
    opacity: 1;
  }
  &:hover {
    transition: background 0.15s;
    color: #fff;
    opacity: 1;
  }
}

//搜尋功能
.search__container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  z-index: 3000;
  @media screen and (max-width: 426px) {
    width: 95vw;
  }
}

//搜尋功能-輸入區塊
.search__input {
  width: 33vw;
  height: 50px;
  border-radius: 10px;
  padding-left: 1rem;
  font-size: 1.5rem;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  @media screen and (min-width: 1600px) {
    height: 3.47vw;
    border-radius: 0.7vw;
    font-size: 1.04166vw;
  }
  @media screen and (max-width: 1024px) {
    width: 29vw;
  }
  @media screen and (max-width: 960px) {
    width: 35vw;
  }
  @media screen and (max-width: 650px) {
    width: 53.5vw;
  }
  @media screen and (max-width: 426px) {
    width: 83vw;
  }
}

//搜尋功能-按鈕
.search__button {
  width: 3.5rem;
  height: 5.5rem;
  padding: 4px;
  background: none;
  outline: 0;
  border: 0;
  opacity: 0.5;
  margin: 0 1rem;
  @media screen and (min-width: 1600px) {
    width: 2.43055vw;
    height: 3.81944vw;
    padding: 0.2777vw;
    margin: 0 0.7vw;
  }
  @media screen and (max-width: 1050px) {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 10px;
    background: #303030;
    margin: 0;
    margin-right: 1rem;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
  @media screen and (max-width: 426px) {
    background: none;
    box-shadow: 0;
  }
  &:hover {
    opacity: 1;
  }
}

//搜尋功能-icon
.search__icon {
  width: 100%;
  height: 100%;
  fill: #fff;
  @media screen and (max-width: 426px) {
    display: none;
  }
}

//select
.select__container {
  display: flex;
  align-items: center;
  padding-left: 1rem;
  @media screen and (max-width: 1024px) {
    margin-left: 3rem;
  }
  @media screen and (max-width: 960px) {
    padding-top: 4rem;
  }
  @media screen and (max-width: 372px) {
    padding-top: 4rem;
    margin: 0;
  }
  > p {
    color: #fff;
    @media screen and (max-width: 620px) {
      font-size: 1.7rem;
    }
  }
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
  @media screen and (min-width: 1600px) {
    font-size: 2.08vw;
    margin: 2.77vw 0;
  }
  @media screen and (max-width: 1024px) {
    margin: 2rem 0;
  }
  @media screen and (max-width: 620px) {
    font-size: 2rem;
  }
}

//list，也就是照片那些的content啦

.list__item {
  width: 300px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  transition: scale 0.15s;
  cursor: pointer;
  position: relative;
  @media screen and (min-width: 1600px) {
    width: 20.833vw;
    height: 20.833vw;
    border-radius: 0.7vw;
    box-shadow: 0.34722vw 0.34722vw 0.7vw rgba(0, 0, 0, 0.2);
  }
  &:hover > a > .icon__gallery__container > .item__name {
    position: absolute;
    top: 75%;
    width: 100%; //置中
    color: white;
    z-index: 1000;
    letter-spacing: 0.3rem;
    @media screen and (min-width: 1600px) {
      letter-spacing: 0.20833vw;
    }
    @media screen and (max-width: 900px) {
      top: 72%;
    }
  }
  > a > .icon__gallery__container > .item__name {
    @media screen and (max-width: 1300px) {
      position: absolute;
      top: 75%;
      width: 100%; //置中
      color: white;
      z-index: 1000;
      letter-spacing: 0.3rem;
    }
    @media screen and (max-width: 900px) {
      top: 72%;
    }
  }
  &:hover
    > a
    > .icon__gallery__container
    > .like__number.grid.grid__c-auto
    > .opacity {
    opacity: 0.8;
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
  > a > .icon__gallery__container > .like__number.grid.grid__c-auto > .opacity {
    @media screen and (max-width: 1300px) {
      opacity: 0.8;
    }
  }
  &:hover {
    scale: 1.05;
    @media screen and (max-width: 1300px) {
      scale: 1;
    }
  }
  &:hover > a > .back {
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
  > a > .back {
    @media screen and (max-width: 1300px) {
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

.icon__gallery__container {
  width: 100%;
  > .item__picture {
    width: 300px;
    height: 300px;
    object-fit: contain;
    backdrop-filter: blur(10px);
    @media screen and (min-width: 1600px) {
      width: 20.833vw;
      height: 20.833vw;
      // backdrop-filter: blur(10px);
    }
    /* background: #e6ebee; */
  }
  > .like__number {
    position: absolute;
    top: 90%;
    z-index: 1000;
    width: inherit;
    scale: 0.6;
    > .icon__gallery {
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
    > .number {
      margin: 0;
      color: #fff;
      justify-self: center;
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
      &.opacity {
        opacity: 0;
      }
    }
  }
}
</style>

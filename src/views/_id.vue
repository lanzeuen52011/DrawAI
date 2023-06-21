<script>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router"; //這個是從網址上找出id的參數。
import axios from "axios";
export default {
  setup() {
    const route = useRoute();
    const id = route.params.id;
    const router = useRouter();
    const isError = ref(false);
    const gallery = reactive({ data: {} });
    const emojidata = reactive({ data: {} });
    const dataprocess = reactive({ data: {} });
    const dataCollect = reactive({ data: {} });
    const dataprocess1 = reactive({ data: {} });
    const dataCollect1 = reactive({ data: {} });
    const isComment = ref(false);
    const commentAuthor = ref("");
    const commentContent = ref("");
    const isLoad = ref(false);
    const commentArr = reactive({ data: {} });
    const Token = process.env.VUE_APP_TOKEN;
    const corsURL = "https://lzu-cors.onrender.com/"; // use cors-anywhere to fetch api data 曾經是用這個https://cors-anywhere.herokuapp.com/，現在是用render.com架站，是自己的。

    const handleComment = () => {
      isComment.value = !isComment.value;
    };
    const handleCommentLeave = () => {
      isComment.value = !isComment.value;
      let data = JSON.stringify({
        _subtable_1000079: {
          "-1": {
            1000072: `${commentAuthor.value}`,
            1000078: `${commentContent.value}`,
          },
        },
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${corsURL}https://ap9.ragic.com/lanziyun/convert2/1/${id}?api&APIKey=${Token}`,
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          // console.log(response, JSON.stringify(response.data));
        })
        .catch((error) => {
          // console.log(error);
        });
      let timer = null;
      setTimeout(() => {
        axios
          .get(`https://ap9.ragic.com/lanziyun/convert2/1/${id}?api`)
          .then((res) => {
            gallery.data = res.data[id];
            // console.log(gallery.data);
          })
          .catch((error) => {
            // console.log(error);
          });
        commentAuthor.value = "";
        commentContent.value = "";
      }, 1000);
    };

    const icon = reactive({
      0: {
        class: "fi-ss-heart",
        data: "",
        isClicked: false,
        href: "heart",
        color: "pink",
      },
      1: {
        class: "fi-sr-grin-squint-tears",
        data: "",
        isClicked: false,
        href: "laugh",
        color: "yellow",
      },
      2: {
        class: "fi-sr-angry",
        data: "",
        isClicked: false,
        href: "angry",
        color: "red",
      },
      3: {
        class: "fi-ss-surprise",
        data: "",
        isClicked: false,
        href: "surprise",
        color: "lightblue",
      },
      4: {
        class: "fi-ss-sad-tear",
        data: "",
        isClicked: false,
        href: "sad",
        color: "gray",
      },
    });
    const toggleEmotion = (clickedClass) => {
      Object.values(icon).forEach((icons) => {
        if (icons.class === clickedClass) {
          if (icons.isClicked === true) {
            //如果點讚此表情，此表情曾被點讚，則讚數-1
            icons.isClicked = !icons.isClicked;
            icons.data--;
          } else {
            //按讚時，讚數+1
            icons.isClicked = true;
            icons.data++;
          }
        } else {
          //管理其他沒被按讚的表情
          if (icons.isClicked === true) {
            //如果此表情曾被按讚過，但這次沒被按，則取消按讚，且讚數-1
            icons.isClicked = !icons.isClicked;
            icons.data--;
          } else {
            //此表情沒被按過，且此次也沒有被按到，則無動作。
            icons.isClicked = false;
          }
        }
        localStorage.setItem(id + icons.class, JSON.stringify(icons.isClicked));
        //localstorage,當表情被點擊時，將哪個表情被點選記入localstorage中。
      });
      dataprocess.data = emojidata.data;
      Object.values(dataprocess.data).forEach((emoji) => {
        emoji["1000048"] = String(icon["0"].data);
        emoji["1000049"] = String(icon["1"].data);
        emoji["1000051"] = String(icon["2"].data);
        emoji["1000052"] = String(icon["3"].data);
        emoji["1000053"] = String(icon["4"].data);
        delete emoji.heart;
        delete emoji.laugh;
        delete emoji.angry;
        delete emoji.wow;
        delete emoji.sad;
      });
      //將要回傳的資料於這裡蒐集
      dataCollect.data = {
        _subtable_1000050: dataprocess.data,
        _index_: gallery.data._index_,
        _seq: gallery.data._seq,
      };

      delete (
        //將回傳的資料post回去給資料庫
        axios
          .post(
            `${corsURL}https://ap9.ragic.com/lanziyun/convert2/1/${id}?api&APIKey=${Token}`,
            dataCollect.data
          )
          .then((res) => {
            //此可以確認是否回傳成功，但此處為按讚，因此不需要特別動作。
            // console.log(res, dataCollect.data);
          })
          .catch((error) => {
            console.error(error.response.data.error_message);
          })
      );
    };
    //localstorage,於網頁載入時，先從localstorage載入哪個表情先前按過了，如果想要無限洗讚，把這個去除掉就行。
    const store1 = JSON.parse(localStorage.getItem(`${id}fi-ss-heart`));
    const store2 = JSON.parse(
      localStorage.getItem(`${id}fi-sr-grin-squint-tears`)
    );
    const store3 = JSON.parse(localStorage.getItem(`${id}fi-sr-angry`));
    const store4 = JSON.parse(localStorage.getItem(`${id}fi-ss-surprise`));
    const store5 = JSON.parse(localStorage.getItem(`${id}fi-ss-sad-tear`));
    icon["0"].isClicked = store1;
    icon["1"].isClicked = store2;
    icon["2"].isClicked = store3;
    icon["3"].isClicked = store4;
    icon["4"].isClicked = store5;
    let timer = null;
    onMounted(() => {
      axios
        .get(`https://ap9.ragic.com/lanziyun/convert2/1/${id}?api`)
        .then((res) => {
          gallery.data = res.data[id];
          emojidata.data = res.data[id]._subtable_1000050;
          Object.values(emojidata.data).forEach((emoji) => {
            icon["0"].data = emoji.heart;
            icon["1"].data = emoji.laugh;
            icon["2"].data = emoji.angry;
            icon["3"].data = emoji.wow;
            icon["4"].data = emoji.sad;
          });
          //因為計算讚數的收集(icon)與連結下來的資料gallery、emojidata放置方式不一樣，
          //是因為要使用Foreach的方式渲染，因此需額外多一個動作將值放為gallery再回傳，才有辦法修改。
          isLoad.value = true;
        })
        .catch((error) => {
          isError.value = true;
          gallery.data["error_message"] = error.response.data.error_message;
          timer = setTimeout(() => {
            //此處的意思為，錯誤網址，然後經過三小後將客戶轉導回上一頁或者推向某個path，以下TODO:三選一即可。
            router.go(-1); //直接回上一頁
            // router.push({ path: "/gallery" }); //精確寫法，不影響事情的成敗，但會較為推薦此，因可以物件形式帶多項參數。把客戶推向"/gallery"
            // router.push("/gallery"); //簡短寫法，不影響事情的成敗，把客戶推向"/gallery"
          }, 3000);
          // console.log(error.response.data);
        }); //只要訊息不是200，全都會被catch接住。
    });

    onUnmounted(() => {
      //倒數計時結束前進行手動跳轉，而手動跳轉後，停止計時。
      router.push({ path: "" });
    });

    const back = () => {
      if (history.state.back === null) {
        window.location = window.location.origin + "/";
      } else {
        router.go(-1);
      }
    };
    return {
      gallery,
      isError,
      back,
      icon,
      toggleEmotion,
      handleComment,
      isComment,
      handleCommentLeave,
      commentAuthor,
      commentContent,
      isLoad,
    };
  },
};
</script>
<template>
  <div class="id__container">
    <div v-if="!isError" class="grid grid__2c container container-center">
      <button class="button__back" @click="back">
        <span>
          <svg>
            <use href="./spriteicon.svg#X"></use>
          </svg>
        </span>
      </button>
      <div v-if="!isLoad" class="id__loading">
        <img
          style="width: 60px; height: 60px"
          src="./Home/Gallery/Spinner-0.6s-200px.gif"
          alt=""
        />
      </div>
      <img v-if="isLoad" :src="gallery.data.url" alt="" />
      <div class="picture__info">
        <h1 class="picture__name">{{ gallery["data"].name }}</h1>
        <div class="picture__discri">
          <h2>描述</h2>
          <p>
            {{ gallery["data"].description }}
          </p>
          <h2>參數</h2>
          <p>
            {{ gallery["data"].modeldescrip }}
          </p>
        </div>
        <div class="icon__container">
          <div
            v-for="item in icon"
            :key="item['class']"
            class="icon__container__box"
          >
            <span @click="toggleEmotion(item.class)">
              <svg>
                <use
                  :class="[
                    'fi',
                    item['class'],
                    item['isClicked'] ? item.color : '',
                  ]"
                  :href="[`/img/spriteicon.c567c937.svg#${item.href}`]"
                ></use>
              </svg>
            </span>
            <p>{{ item["data"] }}</p>
          </div>
        </div>
        <div class="comment">
          <div class="comment__name__container">
            <h2 class="comment__name">留言板</h2>
            <div class="comment__leave__container">
              <button :class="[{ active: isComment }]" @click="handleComment">
                我要留言
              </button>
              <div :class="['comment__leave', { show: isComment }]">
                <input
                  type="text"
                  class="leave__author"
                  placeholder="留言作者名子"
                  v-model="commentAuthor"
                />
                <input
                  type="text"
                  class="leave__content"
                  placeholder="留言內容"
                  v-model="commentContent"
                />
                <button class="comment__submit" @click="handleCommentLeave">
                  送出
                </button>
              </div>
            </div>
          </div>
          <div class="comment__scroll">
            <article
              class="comment__each"
              v-for="item in gallery.data._subtable_1000079"
              :key="item"
            >
              <p class="comment__author">{{ item["author"] }}</p>
              <p class="comment__paragraph">
                {{ item["comment"] }}
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
    <!-- error_message -->
    <h1 v-if="isError">{{ gallery.data["error_message"] }}</h1>
  </div>
</template>
<style lang="scss" scoped>
.id__loading {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1300px) {
    justify-content: center;
  }
}

//body contanier
.id__container {
  background: #25262b;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  @media screen and (max-width: 1300px) {
    display: block;
  }

  > .container {
    background: #25262b;
    max-width: 4000px;
    margin: auto;
    &.grid__2c {
      grid-template-columns: 50% 40%;
      justify-content: center;
      @media screen and (max-width: 1300px) {
        grid-template-rows: 60% 40%;
        grid-template-columns: 1fr;
      }
      @media screen and (max-width: 1100px) {
        grid-template-rows: 50% 50%;
      }
      @media screen and (max-width: 870px) {
        grid-template-rows: 45% 55%;
      }
      @media screen and (max-width: 600px) {
        grid-template-rows: 40% 60%;
      }
    }
    > img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
}

//照片資訊
.picture__info {
  //picture
  background: #25262b;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1500px) {
    display: grid;
    grid-template-columns: auto;
  }
  @media screen and (max-width: 1300px) {
    width: 100vw;
  }
}

//照片標題
.picture__name {
  color: #f7f7f7;
  letter-spacing: 0.3rem;
  padding: 20px;
  display: block;
  @media screen and (max-width: 700px) {
    padding: 0 20px 20px;
  }
  @media screen and (max-width: 500px) {
    font-size: 3rem;
  }
}

//照片描述
.picture__discri {
  color: #f7f7f7;
  text-align: left;
  letter-spacing: 0.2rem;
  margin: 5% 10%;
  height: 310px;
  overflow-y: overlay;
  font-size: 1.6rem;
  width: 80%;
  word-wrap: break-word;
  > h2 {
    padding: 0;
  }
  > p {
    padding-left: 2rem;
    text-indent: 2rem;
  }
}

//右上角的"X"，回到上一頁
.button__back {
  //backward button
  position: fixed;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  fill: white;
  cursor: pointer;
  border: 0;
  width: 50px;
  height: 50px;
  outline: 0;
  > span {
    > svg {
      position: fixed;
      right: 0;
      top: 0;
      background: none;
      fill: white;
      cursor: pointer;
      border: 0;
      width: 50px;
      height: 50px;
    }
  }
}

//全部的讚與讚數
.icon__container {
  //icon
  display: flex;
  margin: 1rem 4rem;
  border: 1px solid #fff;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 1700px) {
    align-items: center;
    font-size: 3rem;
    height: 100px;
  }
  @media screen and (min-width: 600px) {
    min-width: 500px;
  }
  @media screen and (max-width: 1300px) and (min-height: 800px) {
    font-size: 3rem;
  }
  @media screen and (max-width: 800px) and (min-height: 800px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 600px) {
    height: auto;
    flex-direction: column;
    font-size: 1.5rem;
  }
  @media screen and (max-width: 374px) {
    font-size: 0.5rem;
  }
}
//各個讚與讚數
.icon__container__box {
  display: flex;
  width: 100%;
  align-items: center;
  .pink,
  .yellow,
  .red,
  .gray,
  .lightblue {
    animation-name: isClicked;
    animation-duration: 0.3s;
  }
  > span {
    padding: 1.3rem 2rem 1rem;
    align-items: center;
    display: flex;
    > svg {
      cursor: pointer;
      width: 2rem;
      height: 3rem;
      fill: #fff;
      @media screen and (min-width: 1700px) {
        width: 3rem;
      }
      @media screen and (max-width: 1300px) and (min-height: 800px) {
        width: 3rem;
        height: 3rem;
      }
      @media screen and (max-width: 800px) and (min-height: 800px) {
        width: 1.5rem;
        height: 1.5rem;
      }
      @media screen and (max-width: 600px) {
        flex-direction: column;
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
  > p {
    margin: 1rem;
    color: #fff;
    margin-left: 0;
  }
}

.fi {
  // color: #fff;
  // padding: 1.3rem 2rem 1rem;
  // cursor: pointer;
  @media screen and (min-width: 1600px) {
    align-items: center;
    font-size: 3rem;
  }

  &.pink {
    fill: pink;
  }
  &.yellow {
    fill: yellow;
  }
  &.red {
    fill: red;
  }
  &.gray {
    fill: gray;
  }
  &.lightblue {
    fill: lightblue;
  }
}

@keyframes isClicked {
  0% {
    scale: 0.6;
  }

  50% {
    scale: 1.1;
  }

  100% {
    scale: 1;
  }
}

//整塊留言區域
.comment {
  // height: 100%;
  max-width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  @media screen and (max-width: 850px) and (min-height: 400px) {
    height: 50%;
  }
}

//"留言版"
.comment__name__container {
  display: flex;
  margin: 2rem 0 0 3rem;
  width: 100%;
  padding: 0;
  padding-left: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.9);
  position: relative;
  > .comment__name {
    margin: 0;
  }
}

//"我要留言"按鈕與其功能
.comment__leave__container {
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    border-radius: 25%;
    border: 0;
    outline: 0;
    cursor: pointer;
    opacity: 0.8;
    margin: 0 2rem;
    color: #e9ecef;
    background: #000;
    padding: 0.5rem 1rem;
    &.active {
      color: #fff;
      opacity: 1;
    }
    &:hover {
      color: #fff;
      opacity: 1;
    }
  }
}

//"我要留言"按鈕與其功能
.comment__leave {
  display: none;
  &.show {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 100%;
    left: 20%;
    @media screen and (max-width: 500px) {
      left: 10%;
    }
  }
  > input,
  button {
    padding-left: 1rem;
    outline: 0;
    border: 0;
    border-radius: 10px;
    &.leave__author {
      width: 10rem;
    }
    &.comment__submit {
      &:hover {
        background: #ccc;
      }
    }
  }
}

//查看各則留言的面積
.comment__scroll {
  overflow-y: overlay;
  height: 34vh;
  width: 100%;
  @media screen and (max-width: 1700px) {
    height: 200px;
  }
  @media screen and (max-width: 1300px) {
    height: 50vh;
  }
  // max-width: 36vw;
}

//每則留言
.comment__each {
  border: 1px solid #fff;
  border-radius: 30px;
  margin: 5% 5% 5% 10%;
  > .comment__author {
    color: #f7f7f7;
    letter-spacing: 0.3rem;
    margin: 3% 7% 1%;
    text-align: left;
    font-size: 1.6rem;
    border-bottom: 1px solid;
    width: fit-content;
  }
  > .comment__paragraph {
    color: #f7f7f7;
    text-align: left;
    letter-spacing: 0.2rem;
    margin: 1% 8% 3% 9%;
    font-size: 1rem;
  }
}
</style>

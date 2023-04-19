<script>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router"; //這個是從網址上找出id的參數。
export default {
  setup() {
    const route = useRoute();
    const id = route.params.id;
    const router = useRouter();
    const isError = ref(false);
    const gallery = reactive({ data: {} });
    const emojidata = reactive({ data: {} });
    const emoji = reactive({ _subtable_1000050: emojidata.data });
    const icon = reactive({
      0: {
        class: "fi-ss-heart",
        data: "",
        isClicked: false,
        color: "pink",
      },
      1: {
        class: "fi-tr-grin-squint-tears",
        data: "",
        isclicked: false,
        color: "yellow",
      },
      2: { class: "fi-tr-angry", data: 23, isClicked: false, color: "red" },
      3: {
        class: "fi-tr-surprise",
        data: "",
        isClicked: false,
        color: "gray",
      },
      4: {
        class: "fi-ts-face-sad-sweat",
        data: "",
        isClicked: false,
        color: "lightblue",
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
      });
      axios
        .post(
          `https://ap9.ragic.com/lanziyun/convert2/1/${id}?api&APIKey=MFd4YlZuOEZ0eWNTa2Z6ek1GUVdLYS9rVTFWMUt1S01BdHNlVW1XZWNJK2ZpRFdVN1RyKzlUSDlwdzdJUzlSd2hEVlJvLzlMZy9rPQ==`,
          emoji
        )
        .then((response) => {
          isReg.value = true;
          console.log(response);
        })
        .catch((error) => {
          HandError(error.response.data.error_message);
        });
    };
    let timer = null;
    console.log(icon);
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
          console.log(error.response.data);
        }); //只要訊息不是200，全都會被catch接住。
    });

    onUnmounted(() => {
      //倒數計時結束前進行手動跳轉，而手動跳轉後，停止計時。
      router.push({ path: "" });
    });

    const back = () => {
      router.go(-1);
    };
    return { gallery, isError, back, icon, toggleEmotion };
  },
};
</script>
<template>
  <div class="id__container">
    <div v-if="!isError" class="grid grid__2c container container-center">
      <button class="button__back" @click="back">
        <i class="bx bx-x"></i>
      </button>
      <img :src="gallery.data.url" alt="" />
      <div class="picture__info">
        <h1 class="picture__name">{{ gallery["data"].name }}</h1>
        <p class="picture__discri">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          quaerat fugit laudantium beatae, dignissimos sunt modi qui enim
          consequatur sequi est quibusdam praesentium nobis deleniti.
          Praesentium qui eius minus!
          Quisquamaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </p>
        <div class="icon__container">
          <div
            v-for="item in icon"
            :key="item['class']"
            class="icon__container__box"
          >
            <i
              :class="[
                'fi',
                item['class'],
                item['isClicked'] ? item.color : '',
              ]"
              @click="toggleEmotion(item.class)"
            ></i>
            <p>{{ item["data"] }}</p>
          </div>
        </div>
        <div class="comment">
          <h2 class="comment__name">Comment</h2>
          <div class="comment__scroll">
            <article class="comment__each">
              <p class="comment__author">Matt Lan</p>
              <p class="comment__paragraph">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Obcaecati quisquam dicta repellendus eum illo! Dicta et aperiam
              </p>
            </article>
            <article class="comment__each">
              <p class="comment__author">Matt Lan</p>
              <p class="comment__paragraph">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Obcaecati quisquam dicta repellendus eum illo! Dicta et aperiam
              </p>
            </article>
            <article class="comment__each">
              <p class="comment__author">Matt Lan</p>
              <p class="comment__paragraph">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Obcaecati quisquam dicta repellendus eum illo! Dicta et aperiam
              </p>
            </article>
            <article class="comment__each">
              <p class="comment__author">Matt Lan</p>
              <p class="comment__paragraph">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Obcaecati quisquam dicta repellendus eum illo! Dicta et aperiam
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
//body contanier
body .id__container {
  background: #000;
  height: 100vh;
  display: flex;
  align-items: center;
}
.id__container .container {
  background: #000;
}

.grid__2c {
  grid-template-columns: repeat(2, 1fr);
}

img {
  height: 90vh;
  width: 90vh;
  object-fit: contain;
}

//backward button
.button__back {
  position: absolute;
  right: 0;
  top: 0;
  background: none;
  color: white;
  cursor: pointer;
  border: 0;
  width: 50px;
  height: 50px;
}

.bx-x {
  content: "\ec8d";
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e9ecef;
  transform: scale(5);
  width: 10px;
  height: 10px;
  margin: 0;
}

//picture
.picture__info {
  background: #25262b;
  display: flex;
  grid-template-rows: 100px 360px;
  flex-direction: column;
}
.picture__name {
  color: #f7f7f7;
  letter-spacing: 0.3rem;
  padding: 20px;
}
.picture__discri {
  color: #f7f7f7;
  text-align: left;
  letter-spacing: 0.2rem;
  margin: 5% 10%;
  height: 22.7vh;
  overflow-y: overlay;
  font-size: 1.6rem;
  width: 30vw;
  word-wrap: break-word;
}

//icon

.icon__container {
  display: flex;
  margin: 1rem 4rem;
  border: 1px solid #fff;
  border-radius: 10px;
}
.icon__container__box {
  display: flex;
}
.fi {
  color: #fff;
  padding: 1.3rem 2rem 1rem;
  cursor: pointer;
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
.pink,
.yellow,
.red,
.gray,
.lightblue {
  animation-name: isClicked;
  animation-duration: 0.3s;
}
.pink {
  color: pink;
}
.yellow {
  color: yellow;
}
.red {
  color: red;
}
.gray {
  color: gray;
}
.lightblue {
  color: lightblue;
}
// .fi-ss-heart:hover {
//   color: pink;
// }

// .fi-tr-grin-squint-tears:hover {
//   color: yellow;
// }

// .fi-tr-angry:hover {
//   color: red;
// }

// .fi-tr-surprise:hover {
//   color: gray;
// }
// .fi-ts-face-sad-sweat:hover {
//   color: lightblue;
// }
.icon__container p {
  margin: 1rem;
  color: #fff;
  margin-left: 0;
}

//comment
.comment {
  height: 38vh;
  max-width: 36vw;
  overflow: hidden;
}
.comment__name {
  margin: 2rem 0 0 3rem;
  width: 100%;
  padding: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.9);
}
.comment__scroll {
  overflow-y: overlay;
  height: 28vh;
  max-width: 36vw;
}
.comment__author {
  color: #f7f7f7;
  letter-spacing: 0.3rem;
  margin: 3% 7% 1%;
  text-align: left;
  font-size: 1.6rem;
  border-bottom: 1px solid;
  width: fit-content;
}
.comment__paragraph {
  color: #f7f7f7;
  text-align: left;
  letter-spacing: 0.2rem;
  margin: 1% 8% 3% 9%;
  font-size: 1rem;
}
.comment__each {
  border: 1px solid #fff;
  border-radius: 30px;
  margin: 5% 5% 5% 10%;
}

.active {
  color: red;
  fill: red;
}
</style>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<template>
  <section class="about container body" id="app">
    <h1>關於</h1>
    <div id="aboutProfile">
      <h2>關於我</h2>
      <div class="about__profile">
        <img class="profile__avatar" src="@/assets/avatar.webp" alt="avatar" />
        <div class="profile__content">
          <p>
            嗨！我叫藍子耘，過去兩年曾在物流業、傳產業和服務業工作，但在這些領域我無法找到樂趣以及工作中最重要的成就感，因此萌生轉職念頭。
          </p>
          <p>
            後來發現朋友正在業界當全端工程師，看到他遠端工作以及自經營多項大型平台，勾起了我對程式的興趣，堂哥也提供許多資源讓我學習，讓我可以儘早踏入網頁開發的行業。於是，我近兩個月非常積極在學習前端領域的技能，除了堂哥提供的資源，我也會主動Google
            找尋更多的線上教學，也自主實作了幾個RWD網頁，從這幾次的實作中，我得到不少成就感，發現前端開發是我熱衷且想不斷精進學習的領域。
          </p>
          <div class="profile__link">
            <p>履歷連結參考：</p>
            <a href="https://pda.104.com.tw/profile/preview?vno=765py47ci"
              >104人力銀行</a
            >、
            <a href="https://www.cakeresume.com/ziyunlan">ResumeCake</a>
          </div>
        </div>
      </div>
    </div>
    <div id="aboutWeb">
      <h2>網站構成工具</h2>
      <ul class="about__web">
        <li class="web__list__item-content">
          <img class="web__img" src="@/assets/logo.png" alt="vue3_logo" />&nbsp;
          Vue3、
          <img class="web__img" src="@/assets/scss.png" alt="scss_logo" />&nbsp;
          SCSS
        </li>
        <li class="web__list__item-content">
          <img
            class="web__img"
            src="@/assets/GitHub.png"
            alt="github_logo"
          />&nbsp; GitHub
        </li>
        <li class="web__list__item-content">
          <img class="web__img" src="@/assets/axios.png" alt="axios_logo" />
          &nbsp;axios 、 &nbsp;cors anywhere
        </li>
        <li class="web__list__item-content">
          <img
            class="web__img"
            src="@/assets/PS.png"
            alt="photoshop_logo"
          />&nbsp; PhotoShop、
          <img
            class="web__img"
            src="@/assets/Canvas.png"
            alt="canvas_logo"
          />&nbsp; Canvas、
          <img class="web__img" src="@/assets/sprite.png" alt="svgsprte_logo" />
          &nbsp; SVGSPRITE.ES
          <img class="web__img" src="@/assets/swiper.png" alt="svgsprte_logo" />
          &nbsp; Swiper-vue
        </li>
        <li class="web__list__item-content">
          <img class="web__img" src="@/assets/Ragic.png" alt="ragic_logo" />
          &nbsp; Ragic
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss">
.about__profile {
  display: flex;
  flex-direction: row;
  color: #fff;
  align-items: flex-start;
  background: #54555a;
  border-radius: 20px;
  padding-top: 3rem;
  padding-bottom: 3rem;
  margin: 0px 10rem;
  @media screen and (min-width: 1600px) {
    border-radius: 1.388vw;
    padding-top: 2.0833vw;
    padding-bottom: 2.0833vw;
    margin: 0 7vw;
  }
  @media screen and (max-width: 730px) {
    flex-direction: column;
    margin: 0px 2rem;
    justify-content: center;
    align-items: center;
    padding-bottom: 0rem;
  }
  > .profile__avatar {
    width: 130px;
    border-radius: 50%;
    align-items: flex-start;
    display: flex;
    margin: 0px 5rem;
    border: 5px solid #cacaca;
    @media screen and (min-width: 1600px) {
      width: 9.0277vw;
      border-radius: 50%;
      margin: 0px 3.4722vw;
      border: 0.34722vw solid #cacaca;
    }
  }
  > .profile__content {
    display: grid;
    flex-direction: column;
    grid-template-columns: 1fr;
    grid-template-rows: 0.7fr 1fr 50px;
    margin-top: 3rem;
    @media screen and (min-width: 1600px) {
      grid-template-rows: 0.7fr 1fr 3.4722vw;
      margin-top: 2.0833vw;
    }
    @media screen and (max-width: 730px) {
      display: flex;
    }
    > p {
      font-size: 1.6rem;
      text-align: left;
      margin: 0 5rem 0 0;
      text-indent: 2rem;
      @media screen and (min-width: 1600px) {
        font-size: 1.111vw;
        margin: 0 3.4722vw 0 0;
        text-indent: 1.388vw;
      }
      @media screen and (max-width: 1000px) {
        margin: 0 3rem 0 0;
      }
      @media screen and (max-width: 730px) {
        margin: 1rem 2rem;
      }
    }
    > .profile__link {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      font-size: 1.6rem;
      padding-top: 5rem;
      @media screen and (min-width: 1600px) {
        font-size: 1.11vw;
        padding-top: 3.4722vw;
      }
      @media screen and (max-width: 730px) {
        margin-left: 2rem;
      }
      > a {
        color: #cacaca;
        &:hover {
          color: #fff;
        }
      }
    }
  }
}

.about__web {
  display: flex;
  flex-direction: column;
  color: #fff;
  align-items: flex-start;
  background: #54555a;
  border-radius: 20px;
  padding-top: 1.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  margin: 0px 10rem 5rem;
  @media screen and (min-width: 1600px) {
    border-radius: 1.388vw;
    padding-top: 1.04166vw;
    padding-top: 2.0833vw;
    padding-bottom: 2.0833vw;
    margin: 0px 7vw 3.4722vw;
  }
  @media screen and (max-width: 730px) {
    flex-direction: column;
    margin: 0px 2rem;
    padding-left: 2rem;
  }
  > li {
    color: #f7f7f7;
    &.web__list__item-content {
      padding: 1rem 0 0.5rem 4rem;
      @media screen and (min-width: 1600px) {
        padding: 0.7vw 0 0.34722vw 2.77vw;
      }
      @media screen and (max-width: 730px) {
        padding: 1rem 0 0.5rem 1rem;
      }
    }
    > .web__img {
      height: 2rem;
      @media screen and (min-width: 1600px) {
        height: 1.388vw;
      }
    }
  }
}
</style>

<script>
import { onMounted } from "vue";
export default {
  setup() {
    onMounted(() => {});
    return {};
  },
};
</script>

<template>
  <nav>
    <router-link class="Home" to="/"
      ><img src="./Gallery/drawailogo.png" alt=""
    /></router-link>
    <div class="flex flex-row">
      <router-link class="About" to="/">總畫廊</router-link>
      <router-link class="About" to="/style">風格導覽</router-link>
      <router-link class="About" to="/about">關於我</router-link>
    </div>
  </nav>
  <router-view />
  <footer class="footer grid grid__c-auto">
    <div class="footer__item list">
      <router-link class="About" to="/">
        <img class="footer__logo" src="./Gallery/drawailogo.png" alt="" />
        <p>Copyright 2023 LanZiYun</p>
      </router-link>
    </div>
    <div class="footer__item"></div>
    <div class="footer__item">
      <h3>
        <router-link class="About" to="/style">風格導覽</router-link>
      </h3>
      <ul class="list footer__list">
        <li>
          <router-link
            class="About"
            :to="{ path: '/style', hash: '#realistic' }"
            >現實風</router-link
          >
        </li>
        <li>
          <router-link class="About" :to="{ path: '/style', hash: '#anime' }"
            >動漫風</router-link
          >
        </li>
        <li>
          <router-link class="About" :to="{ path: '/style', hash: '#male' }"
            >男性</router-link
          >
        </li>
        <li>
          <router-link class="About" :to="{ path: '/style', hash: '#female' }"
            >女性</router-link
          >
        </li>
      </ul>
    </div>
    <div class="footer__item">
      <h3>
        <router-link class="About" to="/about">關於我</router-link>
      </h3>
      <ul class="list footer__list">
        <li>
          <a href="https://pda.104.com.tw/profile/preview?vno=765py47ci"
            >我的簡歷</a
          >
        </li>
      </ul>
    </div>
    <div class="footer__item">
      <h3>
        <a class="no__a">其他網站</a>
      </h3>
      <ul class="list footer__list">
        <li>
          <a href="https://let-him-cook.netlify.app/">
            <img class="other__logo" src="./LetHimCook1.png" alt="" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style lang="scss">
html {
  font-size: 62.5%;
}

body {
  font-family: 微軟正黑體, Inter, Arial, Arial, Helvetica, sans-serif;
  font-size: 2rem;
  line-height: 1.5;
  margin: 0;
  background: #25262b;
  color: #e9ecef;
}
*,
*::after,
*::before {
  box-sizing: border-box;
}
.container {
  max-width: 1300px;
  margin: 0 auto;
}
h1 {
  margin: 0;
}
h2 {
  text-align: start;
  padding-left: 20px;
  color: #e9ecef;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 20px;
  background: #1a1b1e;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0;
  height: 12vh;
  z-index: 2000;
  align-items: center;
  a {
    font-weight: bold;
    color: #c1c2c5;
    display: flex;
    img {
      width: 200px;
      object-fit: contain;
    }

    &.router-link-exact-active {
      color: #fff;
    }
  }
}

//list
li {
  list-style: none;
}
.list {
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  //   flex用法
  display: flex;
  justify-content: center;
  align-items: center;
}
//grid
.grid {
  //grid用法
  display: grid;
}

.grid__c-auto {
  grid-template-columns: repeat(auto-fit, minmax(0px, 1fr));
}

//gap
.gap {
  gap: 30px;
}

//a
a {
  text-decoration: none;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 5rem;
  @media screen and (max-width: 1024px) {
    padding-right: 0;
  }
}
.flex a {
  padding: 0 2rem;
}
.Home {
  padding: 0 2rem;
}
.body {
  margin-top: 15vh;
  position: relative;
}
.footer {
  background: #1a1b1e;
  padding: 10vh 10vw 10vh 5vw;
  > .footer__item {
    flex-direction: column;
    justify-content: start;
    > p {
      margin: 0;
      font-size: 1.6rem;
      color: #fff;
      opacity: 0.7;
    }
    > img {
      width: 70%;
      object-fit: contain;
      height: 40%;
    }
    > h3 {
      margin: 0;
      text-align: left;
      font-size: 2rem;
      margin-top: 0;
      color: #fff;

      > a {
        color: #fff;
        font-size: 2rem;
        opacity: 0.9;
        &.no__a {
          opacity: 1;
        }
        &:hover {
          opacity: 1;
        }
      }
    }
    > a {
      opacity: 0.9;
      &:hover {
        opacity: 1;
      }
      > p {
        margin: 0;
        font-size: 1.6rem;
        color: #fff;
        opacity: 0.7;
      }
      > img {
        object-fit: contain;
        width: 80%;
      }
    }
    > ul {
      flex-direction: column;
      justify-content: start;
      align-items: start;
      margin: 0.5rem 2.5rem 0;
      > li {
        > a {
          color: #fff;
          justify-content: start;
          font-size: 1.6rem;
          opacity: 0.7;
          &:hover {
            opacity: 1;
          }
          > .other__logo {
            width: 12vw;
          }
        }
      }
    }
  }
}
</style>

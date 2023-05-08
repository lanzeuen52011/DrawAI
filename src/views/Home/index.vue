<script>
import { onMounted, ref } from "vue";
export default {
  setup() {
    onMounted(() => {});
    const style = ref(false);
    const about = ref(false);
    const other = ref(false);
    const nav = ref(false);
    const scrollingdown = ref(false);
    const chevronToggle = (element) => {
      if (element === "style") {
        style.value = !style.value;
      }
      if (element === "about") {
        about.value = !about.value;
      }
      if (element === "other") {
        other.value = !other.value;
      }
      if (element === "nav") {
        nav.value = !nav.value;
      }
    };
    let prevScrollPos = window.pageYOffset;
    window.addEventListener("scroll", () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollPos < currentScrollPos) {
        // 向下滾動
        scrollingdown.value = true;
        nav.value = false;
      }
      if (prevScrollPos > currentScrollPos) {
        // 向下滾動
        scrollingdown.value = false;
      }
      prevScrollPos = currentScrollPos;
    });
    return { chevronToggle, style, about, other, nav, scrollingdown };
  },
};
</script>

<template>
  <header>
    <nav :class="[{ hide: scrollingdown }]">
      <a class="Home Home__logo" href="/" @click="nav = false"
        ><img
          class="logo__normal"
          src="./Gallery/drawailogo.png"
          alt="Draw.AI LOGO" />
        <img
          class="logo__mini"
          src="./Gallery/drawailogomini.png"
          alt="Draw.AI LOGO"
      /></a>
      <button
        @click="chevronToggle('nav')"
        :class="['collapse__btn', { active: nav }]"
      >
        <img src="./Gallery/menu.png" alt="Draw.AI MENU" />
      </button>
      <ul :class="['flex', 'flex-row', { active: nav }]">
        <li>
          <router-link class="About" to="/" @click="chevronToggle('nav')"
            >總畫廊</router-link
          >
        </li>
        <li>
          <router-link class="About" to="/style" @click="chevronToggle('nav')"
            >風格導覽</router-link
          >
        </li>
        <li>
          <router-link class="About" to="/about" @click="chevronToggle('nav')"
            >關於我</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
  <router-view />
  <footer class="footer">
    <div class="footer__item"></div>
    <div class="footer__item" @click="chevronToggle('style')">
      <h3>
        <router-link class="About" to="/style">風格導覽</router-link>
      </h3>
      <svg :class="[{ active: style }]">
        <use :class="['bx', 'bxs-chevron-right']" href="./chev.svg#chev"></use>
      </svg>
      <ul :class="['list', 'footer__list', { chevronon: style }]">
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
    <div class="footer__item" @click="chevronToggle('about')">
      <h3>
        <router-link class="About" to="/about">關於我</router-link>
      </h3>
      <svg :class="[{ active: about }]">
        <use :class="['bx', 'bxs-chevron-right']" href="./chev.svg#chev"></use>
      </svg>
      <ul :class="['list', 'footer__list', { chevronon: about }]">
        <li>
          <router-link
            class="About"
            :to="{ path: '/about', hash: '#aboutProfile' }"
            >關於我</router-link
          >
        </li>
        <li>
          <router-link class="About" :to="{ path: '/about', hash: '#aboutWeb' }"
            >關於網站</router-link
          >
        </li>
      </ul>
    </div>
    <div class="footer__item" @click="chevronToggle('other')">
      <h3>
        <p class="no__a">其他網站</p>
      </h3>
      <svg :class="[{ active: other }]">
        <use :class="['bx', 'bxs-chevron-right']" href="./chev.svg#chev"></use>
      </svg>
      <ul :class="['list', 'footer__list', { chevronon: other }]">
        <li>
          <a href="https://let-him-cook.netlify.app/">
            <img
              class="other__logo"
              src="./LetHimCook1.png"
              alt="other_websit-1"
            />
          </a>
        </li>
      </ul>
    </div>
    <div class="footer__item list">
      <router-link class="About" to="/">
        <img
          class="footer__logo"
          src="./Gallery/drawailogo.png"
          alt="Draw.AI LOGO"
        />
        <p>Copyright 2023 LanZiYun</p>
      </router-link>
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
  @media screen and (min-width: 1600px) {
    max-width: 100%;
  }
}
.content {
  min-height: 1000px;
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
header {
  nav {
    padding: 20px;
    background: #1a1b1e;
    display: flex;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    top: 0;
    height: 85px;
    z-index: 2000;
    align-items: center;
    transition: height 0.15s;
    @media screen and (max-width: 650px) {
      z-index: 4000;
    }
    &.hide {
      @media screen and (max-width: 650px) {
        height: 0;
        overflow: hidden;
        padding: 0 20px;
      }
    }
    .collapse__btn {
      display: none;
      @media screen and (max-width: 650px) {
        display: inline-block;
        background: none;
        width: 65px;
        border: 0;
        opacity: 0.8;
      }
      &.active {
        @media screen and (max-width: 650px) {
          opacity: 1;
        }
      }
      img {
        width: 80%;
        height: 43px;
      }
    }
    .flex.flex-row {
      margin: 0;
      padding: 0;
      @media screen and (max-width: 650px) {
        flex-direction: column;
        height: 0;
        overflow: hidden;
        display: none;
      }
      &.active {
        @media screen and (max-width: 650px) {
          position: absolute;
          display: flex;
          height: auto;
          top: 85px;
          right: 0vw;
          background: #000;
        }
      }
      li {
        a {
          @media screen and (max-width: 650px) {
            border-bottom: 1px solid;
            font-size: 2.5rem;
          }
          @media screen and (min-width: 1500px) {
            font-size: calc(-7.5% + 1.4vw);
          }
        }
      }
    }
    a {
      font-weight: bold;
      color: #c1c2c5;
      display: flex;

      img {
        height: 63px;
        width: 100%;
        object-fit: contain;
        // width: 30vw;
        &.logo__normal {
          @media screen and (max-width: 426px) {
            display: none;
          }
        }
        &.logo__mini {
          display: none;
          @media screen and (max-width: 426px) {
            display: block;
          }
        }
      }

      &.router-link-exact-active {
        color: #fff;
      }
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
  @media screen and (max-width: 1200px) {
    padding-right: 0;
  }
}
.flex a {
  padding: 0 2rem;
}
.Home {
  padding: 0;
}
.body {
  margin-top: 120px;
  position: relative;
}
.footer {
  height: auto;
  background: #1a1b1e;
  padding: 7rem 2rem;
  width: 100%;
  @media screen and (max-width: 600px) {
    justify-items: center;
  }
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    position: relative;
    padding: 10vh 10vw;
  }
  > .footer__item {
    flex-direction: column;
    justify-content: start;
    position: relative;
    left: 30px;
    @media screen and (max-width: 321px) {
      left: 25px;
    }
    @media screen and (min-width: 425px) {
      padding-left: 5rem;
    }
    @media screen and (min-width: 630px) {
      padding-left: 10rem;
    }
    @media screen and (min-width: 768px) {
      left: 0;
      padding-left: 0;
    }
    &.list {
      order: 10;
      left: 0;
      padding-top: 35px;
      margin-top: 20px;
      @media screen and (min-width: 768px) {
        order: -1;
        justify-content: start;
      }
    }
    > svg {
      display: inline-block;
      position: relative;
      scale: 2;
      top: -4.5vh;
      right: -20vw;
      transition: all 0.15s;
      width: 30px;
      height: 30px;
      @media screen and (min-width: 768px) {
        display: none;
      }
      &.active {
        rotate: 90deg;
      }
    }
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
      font-size: 3rem;

      margin-top: 0;
      color: #fff;
      @media screen and (min-width: 768px) {
        font-size: 2rem;
      }

      > a {
        color: #fff;
        font-size: 3rem;

        opacity: 0.9;
        @media screen and (min-width: 768px) {
          font-size: 2rem;
        }
        &:hover {
          @media screen and (min-width: 768px) {
            opacity: 1;
          }
        }
      }
      > .no__a {
        opacity: 0.9;
        font-size: 3rem;
        color: #fff;
        margin: 0;

        @media screen and (min-width: 768px) {
          font-size: 2rem;
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
        width: 80%;
        height: 80px;
        object-fit: contain;
      }
    }
    > ul {
      position: relative;
      overflow: hidden;
      flex-direction: column;
      justify-content: start;
      align-items: start;
      opacity: 0.7;
      height: 0;
      opacity: 0;
      margin: 0rem 2.5rem 0;
      top: -30px;
      transition: all 0.5s;
      border-bottom: 1px solid #7a7a7a;
      width: 300px;
      @media screen and (max-width: 450px) {
        width: 200px;
      }
      @media screen and (max-width: 320px) {
        width: 60vw;
      }
      @media screen and (min-width: 768px) {
        margin-top: 0.5rem;

        top: 0;
        border: 0;
        width: auto;
        height: auto;
        opacity: 1;
      }
      &.chevronon {
        height: auto;
        opacity: 1;
      }
      > li {
        > a {
          color: #fff;
          justify-content: start;
          font-size: 2rem;
          opacity: 0.7;
          @media screen and (min-width: 768px) {
            font-size: 1.6rem;
          }
          &:hover {
            opacity: 1;
          }
          > .other__logo {
            width: 100%;
            min-width: 100px;
            height: 60px;
            object-fit: contain;
          }
        }
      }
    }
  }
}
// .flex {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding-right: 5rem;
//   @media screen and (max-width: 1200px) {
//     padding-right: 0;
//   }
// }
// .flex a {
//   padding: 0 2rem;
// }
// .Home {
//   padding: 0;
// }
// .body {
//   margin-top: 120px;
//   position: relative;
// }
// .footer {
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
//   background: #1a1b1e;
//   padding: 10vh 10vw;
//   width: 100%;
//   @media screen and (max-width: 768px) {
//     height: auto;
//     grid-template-columns: 1fr;
//     position: relative;
//     padding-left: 5vw;
//     padding-right: 5vw;
//   }
//   > .footer__item {
//     flex-direction: column;
//     justify-content: start;
//     @media screen and (max-width: 768px) {
//       position: relative;
//       left: 6vw;
//     }
//     &.list {
//       margin-top: 3vh;
//       justify-content: start;
//       @media screen and (max-width: 768px) {
//         order: 10;
//         left: 0;
//         padding-top: 5vh;
//       }
//     }
//     > svg {
//       display: none;
//       @media screen and (max-width: 768px) {
//         display: inline-block;
//         position: relative;
//         scale: 2;
//         top: -4.5vh;
//         right: -20vw;
//         transition: all 0.15s;
//         width: 30px;
//         height: 30px;
//       }
//       &.active {
//         @media screen and (max-width: 768px) {
//           rotate: 90deg;
//         }
//       }
//     }
//     > p {
//       margin: 0;
//       font-size: 1.6rem;
//       color: #fff;
//       opacity: 0.7;
//     }
//     > img {
//       width: 70%;
//       object-fit: contain;
//       height: 40%;
//     }
//     > h3 {
//       margin: 0;
//       text-align: left;
//       font-size: 2rem;
//       margin-top: 0;
//       color: #fff;
//       @media screen and (max-width: 768px) {
//         font-size: 3rem;
//       }

//       > a {
//         color: #fff;
//         font-size: 2rem;
//         opacity: 0.9;
//         @media screen and (max-width: 768px) {
//           font-size: 3rem;
//         }
//         &:hover {
//           opacity: 1;
//         }
//       }
//       > .no__a {
//         opacity: 1;
//         color: #fff;
//         font-size: 2rem;
//         opacity: 0.9;
//         margin: 0;
//         @media screen and (max-width: 768px) {
//           opacity: 0.9;
//           font-size: 3rem;
//         }
//       }
//     }
//     > a {
//       opacity: 0.9;
//       &:hover {
//         opacity: 1;
//       }
//       > p {
//         margin: 0;
//         font-size: 1.6rem;
//         color: #fff;
//         opacity: 0.7;
//       }
//       > img {
//         width: 80%;
//         height: 80px;
//         object-fit: contain;
//       }
//     }
//     > ul {
//       flex-direction: column;
//       justify-content: start;
//       align-items: start;
//       margin: 0.5rem 2.5rem 0;
//       @media screen and (max-width: 768px) {
//         display: flex;
//         flex-direction: column;
//         height: 0;
//         opacity: 0;
//         margin-top: 0;
//         position: relative;
//         overflow: hidden;
//         top: -3vh;
//         transition: all 0.5s;
//         border-bottom: 1px solid #7a7a7a;
//         width: 50vw;
//       }
//       &.chevronon {
//         height: auto;
//         opacity: 1;
//       }
//       > li {
//         > a {
//           color: #fff;
//           justify-content: start;
//           font-size: 1.6rem;
//           opacity: 0.7;
//           @media screen and (max-width: 768px) {
//             font-size: 2rem;
//           }
//           &:hover {
//             opacity: 1;
//           }
//           > .other__logo {
//             width: 100%;
//             height: 60px;
//           }
//         }
//       }
//     }
//   }
// }

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
</style>

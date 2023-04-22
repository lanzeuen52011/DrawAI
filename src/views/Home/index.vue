<template>
  <nav>
    <router-link class="Home" to="/"
      ><img src="./Gallery/drawailogo.png" alt=""
    /></router-link>
    <div class="flex flex-row">
      <router-link class="About" to="/">總畫廊</router-link>
      <router-link class="About" to="/style">風格導覽</router-link>
      <router-link class="About" to="/about">About</router-link>
    </div>
  </nav>
  <router-view />
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
}
.flex a {
  padding: 0 2rem;
}
.Home {
  padding: 0 2rem;
}
.body {
  margin-top: 20vh;
  position: relative;
}
</style>

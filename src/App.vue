<template>
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
.container__center {
  align-items: center;
}
h1 {
  display: none;
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
  padding: 30px;
  background: #1a1b1e;
  a {
    font-weight: bold;
    color: #c1c2c5;

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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

//gap
.gap {
  gap: 30px;
}

//a
a {
  text-decoration: none;
}

//scrollbar
::-webkit-scrollbar {
  width: 7px;
}
::-webkit-scrollbar-button {
  background: transparent;
  border-radius: 4px;
}
::-webkit-scrollbar-track-piece {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.4);
  border: 1px solid slategrey;
}
::-webkit-scrollbar-track {
  box-shadow: transparent;
}
</style>

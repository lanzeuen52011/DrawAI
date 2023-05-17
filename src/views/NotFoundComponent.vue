
<script>
export default {

}
</script>
<template>
  <section id="notPage">
    <h1>404</h1>
    <div>
    <img src="@/image/404.png" alt="">
    <p>404 好像沒有這個頁面唷...|</p>
    <router-link class="About" to="/">點此回首頁</router-link>
    </div>
    </section>
</template>

<style lang="scss" scoped>
section{
    margin-top: 3rem;
}
// h1{
//     display: block;
// }
div{
    display: flex;
    justify-content: center;
    align-items: center;
}
img{
    width: 100px;
    height: 100px;
    object-fit: contain;
    background-color: #e4e5e6;
    border-radius: 50%;
    margin-right: 1.5rem;
    }
h1,p,.About{
    color: #e4e5e6;
}
.About:hover{
    color: #fff;
}
</style>
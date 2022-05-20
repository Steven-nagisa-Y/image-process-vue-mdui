<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Banner from "@/components/Banner/Banner.vue";
import Menu from "@/components/Menu/Menu.vue";
import { FuncName } from "@/config/config";
const isShowMenu = ref(0);
const router = useRouter();

onMounted(() => {
  //
});

function handleMenu(e) {
  isShowMenu.value = e;
}

function handleMenuClick(e) {
  localStorage.removeItem("passwd");
  if (e === "home") router.replace("/");
  else router.replace({ path: "/func/" + e });
}
</script>

<template>
  <Banner @onMenuClick="handleMenu" title="后台管理" />
  <Menu
    :isShow="isShowMenu"
    :list="FuncName"
    @menuClick="handleMenuClick"
  ></Menu>
  <div class="container" :class="isShowMenu ? 'container-padding' : ''">
    <h1>Some content</h1>
  </div>
</template>

<style scoped>
.container {
  width: calc(100% - 2rem);
  padding: 1rem;
}

@media (min-width: 800px) {
  .container-padding {
    padding-left: 250px;
  }
}
</style>

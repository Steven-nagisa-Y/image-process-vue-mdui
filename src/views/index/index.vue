<script setup>
import { watch, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { FuncName, description } from "@/config/config";
const style = {
  "animation-delay": "0.2",
};

const router = useRouter();
const route = useRoute();
watch(route, () => {
  router.go(0);
});

const hover = ref("");
const hoverDesc = ref("Sense Earth 遥感图像智能解译平台");
function handleHover(id, action) {
  if (action === 1) {
    hover.value = id;
    hoverDesc.value = description[id];
  } else {
    hover.value = "";
    hoverDesc.value = "Sense Earth 遥感图像智能解译平台";
  }
}

function handleTap(ID) {
  console.log("tap:", ID);
  if (ID === "admin") {
    localStorage.setItem("passwd", "ryzenx");
    router.push("/admin");
    return;
  } else if (ID === "home") {
    router.go(0);
  } else {
    router.push("/func/" + ID);
  }
}
</script>

<template>
  <div class="menu-container">
    <div class="menu">
      <div
        class="box mdui-ripple anime"
        v-for="(v, k, i) in FuncName"
        :key="k"
        :style="{ 'animation-delay': style['animation-delay'] * i + 's' }"
        :data-id="k"
        @click="handleTap(k)"
        @mouseover="handleHover(k, 1)"
        @mouseleave="handleHover(k, 0)"
      >
        <img
          style="width: 4rem; height: 4rem; margin: 1rem"
          :src="
            hover === k ? '/static/' + k + '1.svg' : '/static/' + k + '.svg'
          "
        />
        {{ v }}
      </div>
    </div>
    <div class="img-hover">
      <img src="/static/bg1.jpg" />
      <div class="desc">
        <span>{{ hoverDesc }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
}

.menu-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
  background-size: cover;
  background-image: url("/static/bg.png");
  background-position: left;
  background-repeat: no-repeat;
  filter: blur(2px);
}

@media screen and (width < 600) {
  .menu {
    overflow-x: scroll;
  }
}

.menu {
  /* width: 10%;
  height: auto;
  border-radius: 16px;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(100, 100, 100, 0.6);
  backdrop-filter: blur(1px); */
  width: 80%;
  min-width: 30rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

@keyframes animated-border {
  0% {
    box-shadow: 0 0 0 0 rgba(240, 240, 255, 0.4);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
  }
}

.menu .anime {
  animation: animated-border 2s infinite;
}

.menu .box {
  min-height: 5rem;
  width: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  font-size: 1.2rem;
  line-height: 3rem;
  font-weight: bold;
  text-align: center;
  color: var(--theme-white);
  border-radius: 16px;
  /* background-color: rgba(0, 0, 0, 0.8); */
  backdrop-filter: blur(10px);
}

.menu .box:hover {
  color: var(--theme-blue);
}

.title {
  height: auto;
  overflow: hidden;
  color: var(--theme-white);
  max-lines: 3;
}

.img-hover {
  position: relative;
  width: 70%;
  max-height: 60%;
  margin: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 2px 5px grey;
  padding: 0.1rem;
  z-index: 1000;
}

.img-hover img {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
}

.img-hover .desc {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  color: white;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
</style>

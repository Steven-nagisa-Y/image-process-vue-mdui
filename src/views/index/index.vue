<script setup>
import { useRouter } from "vue-router";
import { FuncName } from "@/config/config";
const style = {
  "animation-delay": "0.2",
};

const router = useRouter();

function handleTap({ target }) {
  const ID = target.dataset.id;
  console.log("tap:", ID);
  if (ID === "admin") {
    localStorage.setItem("passwd", "ryzenx");
    router.push("/admin");
    return;
  } else if (ID === "home") {
    router.go(0);
  } else {
    router.push("/func?name=" + ID);
  }
}
</script>

<template>
  <div class="menu-container">
    <div class="menu" style="margin: 2rem auto">
      <div
        class="box title mdui-ripple"
        data-id="admin"
        @click.stop="handleTap"
      >
        Sense Earth <br />
        遥感图像智能解译平台
      </div>
    </div>
    <div class="menu">
      <div
        class="box anime mdui-ripple"
        v-for="(v, k, i) in FuncName"
        :key="k"
        :style="{ 'animation-delay': style['animation-delay'] * i + 's' }"
        :data-id="k"
        @click="handleTap"
      >
        {{ v }}
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

@media screen and (width < 375) {
  .menu-container {
    overflow-y: scroll;
  }
}

.menu {
  width: 60%;
  height: auto;
  border-radius: 16px;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(100, 100, 100, 0.6);
  backdrop-filter: blur(1px);
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

.box {
  height: auto;
  width: 80%;
  max-width: 40rem;
  margin: 1rem auto;
  font-size: 1.2rem;
  line-height: 3rem;
  font-weight: bold;
  text-align: center;
  color: var(--theme-blue);
  border: 2px solid;
  border-radius: 16px;
  background-color: rgba(240, 240, 240, 0.2);
  backdrop-filter: blur(6px);
}

.title {
  height: auto;
  overflow: hidden;
  color: var(--theme-white);
  max-lines: 3;
}
</style>

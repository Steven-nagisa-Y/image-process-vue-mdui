<script setup>
import { onMounted, ref, defineProps, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { FuncName } from "@/config/config";
import Banner from "@/components/Banner/Banner.vue";
import Menu from "@/components/Menu/Menu.vue";
const props = defineProps(["query"]);
const funcName = props.query.name;
const router = useRouter();
const timer = ref(5);
const isValid = ref(true);
const isShowMenu = ref(0);
function validateName() {
  const validNames = Object.keys(FuncName);
  if (validNames.indexOf(funcName) === -1) {
    console.log("Invalid function name!", funcName);
    isValid.value = false;
    const int = setInterval(() => {
      timer.value = timer.value - 1;
      if (timer.value < 0) {
        clearInterval(int);
        router.push("/");
      }
    }, 1000);
  } else return;
}

onMounted(() => {
  validateName();
});

function handleMenu(e) {
  isShowMenu.value = e;
}

function handleMenuClick(e) {
  if (e === "home") router.replace("/");
  else router.replace({ path: "/func", query: { name: e } });
}
const route = useRoute();
watch(route, () => {
  router.go(0);
});
</script>

<template>
  <Banner @onMenuClick="handleMenu" :title="FuncName[funcName]" />
  <Menu
    :isShow="isShowMenu"
    :list="FuncName"
    @menuClick="handleMenuClick"
  ></Menu>
  <div class="warning mdui-hoverable .mdui-shadow-10" v-if="!isValid">
    <div class="title">{{ funcName }} 不是正确的函数名称。请检查</div>
    <div>将在 {{ timer }} 后返回主页</div>
    <div class="mdui-progress">
      <div
        class="mdui-progress-determinate"
        :style="{ width: timer * 2 + '0%' }"
      ></div>
    </div>
  </div>

  <div class="container" :class="isShowMenu ? 'container-padding' : ''" v-else>
    <span class="title">请点击上传图片：</span>
    <div class="input-container">
      <div class="input-image">
        <div class="mdui-card">
          <div class="mdui-card-media">
            <img
              src="https://sdfsdf.dev/300x300.png"
              style="width: 300px; height: 300px"
            />
            <div class="mdui-card-media-covered">
              <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">原始图片</div>
              </div>
            </div>
          </div>
          <div class="mdui-card-actions">
            <button
              class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
            >
              <i class="mdui-icon material-icons">cloud_upload</i> 上传
            </button>
          </div>
        </div>
        <div class="mdui-card" v-if="funcName == 'transDetect'">
          <div class="mdui-card-media">
            <img
              src="https://sdfsdf.dev/300x300.png"
              style="width: 300px; height: 300px"
            />
            <div class="mdui-card-media-covered">
              <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">变化图片</div>
              </div>
            </div>
          </div>
          <div class="mdui-card-actions">
            <button
              class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
            >
              <i class="mdui-icon material-icons">cloud_upload</i> 上传
            </button>
          </div>
        </div>
      </div>
      <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-purple">
        开始处理
      </button>
      <div class="input-image">
        <div class="mdui-card">
          <div class="mdui-card-media">
            <img
              src="https://sdfsdf.dev/300x300.png"
              style="width: 300px; height: 300px"
            />
          </div>
          <div class="mdui-card-actions">
            <button
              class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
            >
              <i class="mdui-icon material-icons">cloud_download</i> 下载
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.warning {
  width: 75%;
  height: 10rem;
  margin: 20% auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--theme-blue);
  border-radius: 2rem;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem auto;
}

.container {
  width: calc(100% - 2rem);
  padding: 1rem;
}

@media (min-width: 800px) {
  .container-padding {
    margin-left: 250px;
    width: calc(100% - 2rem - 250px);
  }
}

.container .input-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.container .input-image {
  display: flex;
  justify-content: space-around;
  margin: 2rem auto;
  flex-wrap: wrap;
}

.mdui-card {
  margin: 0.5rem;
}
</style>

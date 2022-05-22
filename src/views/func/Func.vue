<script setup>
import { onMounted, ref, defineProps, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { FuncName, Config } from "@/config/config";
import Banner from "@/components/Banner/Banner.vue";
import Menu from "@/components/Menu/Menu.vue";
import { Upload } from "@/utils/util";
// 使用路由能力
const router = useRouter();
// 处理页面刷新
const route = useRoute();
watch(route, () => {
  router.go(0);
});

// 验证func name
// const props = defineProps(["query"]);
const funcName = route.params.name;
const timer = ref(5);
const isValid = ref(true);
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

const Host = ref("");
onMounted(() => {
  validateName();
  Config().then(({ data }) => (Host.value = data.Host));
});

// 处理菜单栏点击
const isShowMenu = ref(0);
function handleMenu(e) {
  isShowMenu.value = e;
}

function handleMenuClick(e) {
  if (e === "home") router.replace("/");
  else router.replace({ path: "/func/" + e });
}

// 处理图片选择
const sourceImg = ref("https://sdfsdf.dev/300x300.png");
const sourceImg1 = ref("https://sdfsdf.dev/300x300.png");
const outputImg = ref("https://sdfsdf.dev/300x300.png");
const fileInput = ref(null); // 输入框ref
let fileObj = null;
const fileSrc = ref(-1); // 用于两个输入图片时的判定
const isSelect = ref(0); // 选择了几个图片
let fileID = ""; // 后端返回的第一个文件id
let DistFile = "";
function getFile(e) {
  fileObj = e.target.files[0];
  if (!e.target.files) return;
  const allTypes = "image/png,image/jpeg,image/jpg";
  const allExt = ["png", "jpeg", "jpg"];
  if (
    allTypes.indexOf(fileObj.type) === -1 ||
    fileObj.name.split(".").length < 2 ||
    allExt.indexOf(fileObj.name.split(".").slice(-1)[0].toLowerCase()) === -1
  ) {
    alert("请重新选择图片");
    return false;
  }
  const sourceMap = [sourceImg, sourceImg1];
  console.log(fileObj);
  const fileReader = new FileReader();
  fileReader.readAsDataURL(fileObj);
  fileReader.onload = (e) => {
    sourceMap[fileSrc.value].value = e.target.result;
    const nameArr = [funcName, "transDetectNew"];
    Upload(nameArr[fileSrc.value], fileObj, fileID).then((resp) => {
      if (resp.status !== 200) {
        alert("上传失败");
        return;
      }
      let data = resp.data;
      console.log("Response", data);
      if (data.status !== 0) {
        alert("上传失败");
        return;
      }
      // 上传成功
      data = data.data;
      isSelect.value = isSelect.value + 1;
      if (isSelect.value === 1) {
        fileID = data.id;
        DistFile = data.download;
      } else fileID = undefined;
      sourceMap[fileSrc.value].value = data.upload.replace(
        "http://localhost",
        Host.value
      );
      alert("上传成功！");
    });
  };
}

// 处理点击逻辑
const progress = ref({
  width: 0,
  show: false,
});

function setProgress() {
  const prog = progress.value;
  prog.show = true;
  progress.value = prog;
  const intr = setInterval(() => {
    prog.width = prog.width <= 100 ? prog.width + 1 : 100;
    progress.value = prog;
  }, 50);
  setTimeout(() => {
    outputImg.value = DistFile.replace("http://localhost", Host.value);
    clearInterval(intr);
    progress.value = { show: false, width: 0 };
    isSelect.value = 0;
  }, 5000);
}

function handleClickBtn(id) {
  const reg = new RegExp(`${Host.value}`, "gi");
  switch (id) {
    case 0:
      fileInput.value.click();
      fileSrc.value = 0;
      isSelect.value = 0;
      break;
    case 1:
      if (!reg.test(sourceImg.value) || isSelect.value !== 1) {
        alert("请先上传原始图片");
        return;
      }
      fileInput.value.click();
      fileSrc.value = 1;
      break;
    case 2:
      if (!reg.test(outputImg.value)) return;
      window.location.href = outputImg.value;
      break;
    case -1:
      if (funcName === "transDetect" && isSelect.value !== 2) {
        alert("未选择图片");
        return;
      } else if (funcName !== "transDetect" && isSelect.value !== 1) {
        alert("未选择图片");
        return;
      }
      isSelect.value = 0;
      setProgress();
      break;
    default:
      break;
  }
}
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
    <input
      type="file"
      ref="fileInput"
      accept="image/*"
      @change="getFile"
      style="display: none"
    />
    <div class="input-container">
      <div class="input-image">
        <div class="mdui-card">
          <div class="mdui-card-media">
            <img :src="sourceImg" style="width: 300px; height: 300px" />
            <div class="mdui-card-media-covered">
              <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">原始图片</div>
              </div>
            </div>
          </div>
          <div class="mdui-card-actions">
            <button
              class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
              @click.stop="handleClickBtn(0)"
            >
              <i class="mdui-icon material-icons">cloud_upload</i> 上传
            </button>
          </div>
        </div>
        <div class="mdui-card" v-if="funcName == 'transDetect'">
          <div class="mdui-card-media">
            <img :src="sourceImg1" style="width: 300px; height: 300px" />
            <div class="mdui-card-media-covered">
              <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">变化图片</div>
              </div>
            </div>
          </div>
          <div class="mdui-card-actions">
            <button
              class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
              @click.stop="handleClickBtn(1)"
            >
              <i class="mdui-icon material-icons">cloud_upload</i> 上传
            </button>
          </div>
        </div>
      </div>
      <button
        class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-purple"
        @click.stop="handleClickBtn(-1)"
        mdui-dialog="{target: '#dialog'}"
      >
        <span>开始处理</span>
      </button>
      <div class="input-image">
        <div class="mdui-card">
          <div class="mdui-card-media">
            <img :src="outputImg" style="width: 300px; height: 300px" />
          </div>
          <div class="mdui-card-actions">
            <button
              class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
              @click.stop="handleClickBtn(2)"
            >
              <i class="mdui-icon material-icons">cloud_download</i> 下载
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mdui-progress" v-if="progress.show">
      <div
        class="mdui-progress-determinate"
        :style="{ width: progress.width + '%' }"
      ></div>
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

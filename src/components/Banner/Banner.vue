<script setup>
import { ref, defineProps } from "vue";
const props = defineProps(["title"]);
const emits = defineEmits(["onMenuClick"]);
const iconClass = ["menu", "close"];
const iconChoice = ref(0);
function handleClick(e) {
  iconChoice.value = 1 - iconChoice.value;
  emits("onMenuClick", iconChoice.value);
}
</script>

<template>
  <div class="mdui-toolbar banner mdui-ripple">
    <div @click.stop="handleClick" class="mdui-btn mdui-btn-icon">
      <i class="mdui-icon material-icons">{{ iconClass[iconChoice] }}</i>
    </div>
    <span class="mdui-typo-title">{{ title }}</span>
  </div>
</template>

<style scoped>
.banner {
  box-shadow: 0 2px 5px grey;
  background-color: var(--theme-blue);
  z-index: 9999;
}
</style>

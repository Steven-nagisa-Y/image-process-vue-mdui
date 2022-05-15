<script setup>
import { defineProps, computed } from "vue";
const props = defineProps(["isShow", "list"]);

const menuShowClass = computed(() => ({
  "mdui-drawer-open": props.isShow,
  "mdui-drawer-close": !props.isShow,
}));
</script>

<template>
  <div class="mdui-drawer menu" :class="menuShowClass" id="drawer">
    <ul class="mdui-list">
      <li class="mdui-list-item mdui-ripple">
        <i class="mdui-list-item-icon mdui-icon material-icons">star</i>
        <div class="mdui-list-item-content">PlaceHolder</div>
      </li>
      <li
        class="mdui-list-item mdui-ripple"
        v-for="(val, key) of list"
        :data-id="key"
        @click="$emit('menuClick', key)"
      >
        <i class="mdui-list-item-icon mdui-icon material-icons" :data-id="key"
          >send</i
        >
        <div class="mdui-list-item-content" :data-id="key">{{ val }}</div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.menu {
  background-color: var(--theme-white);
  box-shadow: 0 2px 10px grey;
}
</style>

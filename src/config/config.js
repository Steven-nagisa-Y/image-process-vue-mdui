export const FuncName = {
  targetExtra: "目标提取",
  targetDetect: "目标检测",
  transDetect: "变换检测",
  terrainClassify: "地物分类",
  home: "主页",
};

import axios from "axios";

export function Config() {
  return axios.get("./config.json");
}

export const FuncName = {
  targetExtra: "目标提取",
  targetDetect: "目标检测",
  transDetect: "变换检测",
  terrainClassify: "地物分类",
  home: "主页",
};

export const description = {
  targetExtra:
    "通过图像分割对所给卫星图像中指定对象与背景完成分割，识别并解译实际的地物实体",
  targetDetect:
    "使用目标检测技术对所给卫星图像中指定对象完成检测，返回图像中单个或多个目标的类别与矩形包围框坐标",
  transDetect:
    "使用图像分割技术对所给同一区域不同时期的卫星图像中的变化情况进行快速自动化检测，提取两幅图像前后变化区域的矢量结果",
  terrainClassify:
    "通过对遥感图像中各类地物的光谱信息和空间信息进行分析，选择特征，将图像中各个像元（按照某种规则或算法）划分不同的类别，然后获得遥感图像中与实际地物的对应信息，从而实现图像的分类",
  home: "回到主页",
};

import axios from "axios";

export function Config() {
  return axios.get("/config.json");
}

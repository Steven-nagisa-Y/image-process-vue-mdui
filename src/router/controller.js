import router from "./router.js";

router.beforeEach((to) => {
  console.debug("Page route to", to);
  if (/^\/admin/.test(to.path)) {
    const passwd = localStorage.getItem("passwd");
    if (passwd !== "ryzenx") return "/";
    else return true;
  }
  return true;
});

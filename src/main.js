import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import fb from './components/firebaseConfig'
import "element-ui/lib/theme-chalk/index.css";
import { Button, Icon } from "element-ui";

Vue.component(Button.name, Button);
// Vue.component(Select.name, Select);
Vue.component(Icon.name, Icon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

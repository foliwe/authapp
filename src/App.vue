<template>
  <div id="app">
    <Navbar/>

    <router-view/>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import Index from "@/components/Index";
import fb from "@/components/firebaseConfig";
export default {
  name: "App",
  data() {
    return {
      dialogVisible: false
    };
  },
  components: { Navbar, Index },
  created() {
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        this.$router.push("/dashboard");
      } else {
        this.$router.push("/");
      }
    });
  }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
body {
  font-family: "Montserrat", sans-serif;
  font-size: 15px;
  color: #2c3e50;
  background-color: #dddcdc;
  font-weight: 300;
}
h1,
h2,
h3,
h4 {
  font-weight: 200;
  text-transform: uppercase;
}
h1 {
  font-size: 190%;
}
h2 {
  font-size: 170%;
}
h3 {
  font-size: 150%;
}
h4 {
  font-size: 130%;
}
</style>

<template>
  <div class="main_nav">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <img alt="Vue logo" class="logo" src="../assets/logo.png">
        </router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link to="/" class="nav-item nav-link">Home</router-link>
            <router-link to="/about" class="nav-item nav-link">About</router-link>
            <router-link to="/notes" class="nav-item nav-link">Notes</router-link>
            <router-link to="/todos" class="nav-item nav-link">Todos</router-link>
            <router-link to="#" class="nav-item nav-link">Dashboard</router-link>
          </div>
          <div class="nav navbar-nav ml-auto">
            <router-link to="/login" class="nav-item nav-link">Login</router-link>
            <router-link to="/signup" class="nav-item nav-link">Register</router-link>
            <span @click="logOut" class="nav-item nav-link logout">Logout</span>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import fb from "../components/firebaseConfig";
export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    logOut() {
      fb.auth.signOut().then(() => {
        this.$router.push("/login");
        console.log("User Log OuT");
      });
    }
  }
};
</script>
<style scoped>
.logo {
  width: 40px;
}
.logo img {
  width: 100%;
}
.logout {
  cursor: pointer;
}
nav {
  border-bottom: 1px solid rgb(65, 184, 131);
}
</style>

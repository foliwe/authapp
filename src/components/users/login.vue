<template>
  <div class="login__wrapper">
    <div class="login-card shadow mb-5 bg-white rounded">
      <div class="card">
        <div class="card-header login text-center">LOGIN</div>
        <div class="card-body">
          <div class="logo">
            <img alt="Vue logo" class="rounded-circle" src="@/assets/logo.png">
          </div>
          <form @submit.prevent="login">
            <p v-if="errors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
              </ul>
            </p>
            <div class="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input
                type="email"
                class="form-control simplebox"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                v-model="email"
              >
              <span v-if="msg.email" class="error">{{msg.email}}</span>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control simplebox"
                id="exampleInputPassword1"
                placeholder="Password"
                v-model="password"
              >
              <span v-if="msg.password" class="error">{{msg.password}}</span>
            </div>
            <button type="submit" class="btn btn-primary login" :disabled="disablebtn">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import fb from "@/components/firebaseConfig";
export default {
  name: "Login",
  data() {
    return {
      errors: [],
      disablebtn: true,
      email: "",
      password: "",
      msg: []
    };
  },
  watch: {
    email(value) {
      this.email = value;

      this.check_email(value);
    },
    password(value) {
      this.password = value;

      this.checkPassword(value);
    }
    
  
    
  },
  methods: {
    check_email(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg["email"] = "";
      } else {
        this.msg["email"] = "enter correct email.....";
      }
    },

    checkPassword(value) {
      this.passwordverify(value);
    },
    passwordverify(value) {
      if (value.length < 6) {
        this.msg["password"] =
          "Password must contain 6 character ." +
          (6 - value.length) +
          " more  to go";
      } else {
        this.msg["password"] = "";
        this.disablebtn = false
        
      }
    },

    login() {
      fb.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(cred => {
          console.log(cred.user);

          this.$router.push("/dashboard");
        })
        .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        });
    }
  }
};
</script>
<style scoped>
.login__wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: center;
}
.login-card {
  width: 40%;
  background-color: lightgrey;

  align-self: center;
}
.logo {
  text-align: center;
}
.logo img {
  width: 70px;
}
input,
input:focus {
  font-size: 90%;
  outline: 0;
  background-color: #ecf0f1;
  border: 1px solid #ecf0f1;
}

.simplebox {
  outline: 0;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  box-shadow: none !important;
}
.login {
  background-color: #16a085;
}
.card {
  border: 0;
}
label {
  font-size: 13px;
}
span.error {
  color: crimson;
  font-size: 90%;
}
</style>

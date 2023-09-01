<template>
  <div class="section">
    <div class="container">
      <div class="row full-height justify-content-center">
        <div class="col-12 text-center align-self-center py-5">
          <div class="section pb-5 pt-5 pt-sm-2 text-center">
            <!-- kartica -->
            <form @submit.prevent="signup">
              <div class="card-wrap mx-auto">
                <div class="card-wrapper">
                  <!-- sign up dio -->
                  <div class="card">
                    <div class="center-wrap">
                      <div class="section text-center">
                        <h4 class="mb-4 pb-3">Sign Up</h4>

                        <div class="form-group mt-2">
                          <input type="email" v-model="username" name="signupmail" class="form-style" placeholder="Your Email" autocomplete="off" required />
                          <i class="input-icon fas fa-at"></i>
                        </div>
                        <div class="form-group mt-2">
                          <input type="password" v-model="password" name="signpass" class="form-style" placeholder="Your Password" autocomplete="off" required />
                          <i class="input-icon fas fa-lock"></i>
                        </div>
                        <button type="submit" class="btn mt-4">SUBMIT</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <!-- /kartica -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from "@/services";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async signup() {
      try {
        let result = await Auth.signup(this.username, this.password);

        if (result) {
          // odmah autentificiraj korisnika
          let loginSuccess = await Auth.login(this.username, this.password);
          if (loginSuccess) {
            this.$router.push({ name: "home" });
            window.location.reload();
          }
        } else {
          window.alert("Signup failed. Please try again.");
        }
      } catch (err) {
        return;
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800,900");

body {
  font-weight: 300;
  font-size: 15px;
  line-height: 1.7;
  background-color: #1f2029;
  overflow-x: hidden;
}
a {
  cursor: pointer;
  transition: all 200ms linear;
}
a:hover {
  text-decoration: none;
}
.link {
  color: #c4c3ca;
}
.link:hover {
  color: #ffeba7;
}
p {
  font-weight: 500;
  font-size: 14px;
  line-height: 1.7;
}
h4 {
  font-weight: 600;
  color: #c4c3ca;
}
h6 span {
  padding: 0 20px;
  font-weight: 700;
  color: #c4c3ca;
}
.section {
  position: relative;
  width: 100%;
  display: block;
}
.full-height {
  min-height: 100vh;
}
.card-wrap {
  position: relative;
  width: 440px;
  max-width: 100%;
  height: 400px;
  perspective: 800px;
  margin-bottom: 60px;
}
.card-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
}
.card {
  width: 100%;
  height: 100%;
  background-color: #2a2b38;
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg");
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 300%;
  position: absolute;
  border-radius: 6px;
  left: 0;
  top: 0;
}
.center-wrap {
  position: absolute;
  width: 100%;
  padding: 0 35px;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 35px) perspective(100px);
  z-index: 20;
  display: block;
}
.form-group {
  position: relative;
  display: block;
  margin: 0;
  padding: 0;
}
.form-style {
  padding: 13px 20px;
  padding-left: 55px;
  height: 48px;
  width: 100%;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.5px;
  outline: none;
  color: #c4c3ca;
  background-color: #1f2029;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);
}
.form-style:focus,
.form-style:active {
  border: none;
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);
}
.input-icon {
  position: absolute;
  top: 0;
  left: 17px;
  font-size: 24px;
  line-height: 48px;
  text-align: left;
  color: #ffeba7;
}
.btn {
  border-radius: 4px;
  height: 44px;
  font-size: 13px;
  font-weight: 600;
  padding: 0 30px;
  letter-spacing: 1px;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #ffeba7;
  color: #102770;
  box-shadow: 0 8px 24px 0 rgba(255, 235, 167, 0.2);
}
.btn:active,
.btn:focus {
  background-color: #102770;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16, 39, 112, 0.2);
}
.btn:hover {
  background-color: #102770;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16, 39, 112, 0.2);
}
</style>

<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg shadow-sm navbar-dark shadow-sm">
      <div class="container-fluid mt-1">
        <!-- logo, jedan za login, jedan za home kad je korisnik logiran -->
        <router-link v-if="!auth.authenticated" class="navbar-brand ms-3" to="/login">
          <img src="@/assets/logo.png" alt="" height="40" class="d-inline-block align-text-top" />
        </router-link>

        <router-link v-if="auth.authenticated" class="navbar-brand ms-3" to="/">
          <img src="@/assets/logo.png" alt="" height="40" class="d-inline-block align-text-top" />
        </router-link>

        <!-- hamburger button -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-md-auto me-5">
            <li class="nav-item">
              <router-link v-if="!auth.authenticated" class="nav-link" to="/login"><i class="fas fa-sign-in-alt"></i><span>Log In </span> </router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="!auth.authenticated" class="nav-link" to="/signup"><i class="fas fa-user-plus"></i><span>Sign Up</span></router-link>
            </li>

            <li class="nav-item">
              <router-link v-if="auth.authenticated" class="nav-link" to="/add-event"><i class="fas fa-file-alt"></i><span>Add event</span></router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="auth.authenticated" class="nav-link" to="/login"><i class="fas fa-user"></i><span>Profile</span></router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="auth.authenticated" @click="logout" class="nav-link" to="/login"><i class="fas fa-sign-out-alt"></i><span>Logout</span></router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
import store from "@/store.js";
import { Auth } from "@/services";

export default {
  data() {
    return {
      auth: Auth.state,
    };
  },
  methods: {
    logout() {
      Auth.logout();
      this.$router.go();
    },
  },

  mounted() {},
};
</script>

<style>
#app {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

span {
  padding: 0 20px;
  font-weight: 600;
  font-size: 17px;
  color: #c4c3ca;
}

i {
  margin-right: -6px;
}
</style>

<template>
  <!-- Just an image -->
  <nav class="navbar navbar-expand-lg shadow-sm navbar-dark shadow-sm">
    <div class="container-fluid mt-1">
      <router-link class="navbar-brand ms-3" to="/">
        <img src="@/assets/logo.png" alt="" height="40" class="d-inline-block align-text-top" />
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-md-auto me-5">
          <li class="nav-item">
            <router-link class="nav-link" to="/"><i class="fas fa-sign-in-alt"></i><span>Log In </span> </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/signup"><i class="fas fa-user-plus"></i><span>Sign Up</span></router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container">
    <router-view />
  </div>
</template>

<script></script>

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

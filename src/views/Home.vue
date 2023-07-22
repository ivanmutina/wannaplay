<template>
  <div class="container mt-5">
    <!-- prvi dio -->
    <div class="row align-items-end mb-4 pb-2">
      <div class="col-md-8">
        <div class="section-title text-center text-md-start">
          <h4 class="title mb-4">Find the perfect jobs</h4>
          <!-- search -->

          <!-- /search -->
          <p class="mb-0 para-desc">Do you want to play football, basketball, or any other sport but don't have anyone to play with? Or do you just need a few more players? Find a team and start playing TODAY!</p>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- kartica -->
      <div class="col-lg-4 col-md-6 col-12 mt-4 pt-2" v-for="post in posts" :key="post._id">
        <div class="card border-0 bg-light rounded">
          <div class="card-body p-4">
            <span class="badge rounded-pill bg-primary float-md-end mb-3 mb-sm-0 text-start">{{ post.gender }}</span>
            <h5 class="text-start">{{ post.title }}</h5>
            <div class="mt-3">
              <span class="text-muted d-block text-start">
                <a href="#" target="_blank" class="text-muted">{{ post.content.substring(0, 30) + "..." }}</a>
              </span>
              <span class="d-block text-start">
                <i class="fas fa-clock"></i> <a href="#" target="_blank" class="text-muted">{{ post.time }}</a>
              </span>
              <span class="d-block text-start">
                <i class="fas fa-map-marker"></i> <a href="#" target="_blank" class="text-muted">{{ post.place }}</a>
              </span>
            </div>

            <div class="mt-3 text-start">
              <a href="#" class="btn btn-primary">View Details</a>
            </div>
          </div>
        </div>
      </div>
      <!-- /kartica -->
    </div>
  </div>
</template>

<script>
import API from "../api";

export default {
  name: "Home",
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    this.posts = await API.getAllPost();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800,900");

body {
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  font-size: 15px;
  line-height: 1.7;
  background-color: #1f2029;
  overflow-x: hidden;
}

p {
  color: white;
}

i {
  padding-right: 9px;
}

.rounded {
  border-radius: 20px !important;
}

.card-body span a {
  font-weight: 400;
}

.badge {
  padding: 5px 8px;
  border-radius: 3px;
  letter-spacing: 0.5px;
  font-size: 12px;
  background-color: #6dc77a !important;
}

.btn-primary {
  box-shadow: 0 8px 7px rgb(109 199 122 / 50%) !important;
  background-color: #6dc77a !important;
  border: 1px solid #6dc77a !important;
  color: #fff !important;
  border-color: #6dc77a !important;
}
a {
  text-decoration: none;
}
</style>

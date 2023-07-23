<template>
  <div class="container mt-5">
    <!-- prvi dio -->
    <div class="row align-items-end mb-4 pb-2">
      <div class="col-md-8">
        <div class="section-title text-center text-md-start">
          <h4 class="title mb-4">Find the perfect jobs</h4>
          <!-- search -->

          <!-- /search -->
          <p class="mb-0 desc">Do you want to play football, basketball, or any other sport but don't have anyone to play with? Or do you just need a few more players? Find a team and start playing TODAY!</p>
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
                <a class="text-muted">{{ post.content.substring(0, 68) + "..." }}</a>
              </span>
              <span class="d-block text-start mi">
                <i class="fas fa-calendar"></i> <a class="text-muted">{{ post.date }}</a>
              </span>
              <span class="d-block text-start mi">
                <i class="fas fa-clock"></i> <a class="text-muted">{{ post.time }}</a>
              </span>
              <span class="d-block text-start mi">
                <i class="fas fa-map-marker"></i> <a class="text-muted">{{ post.place }}</a>
              </span>
            </div>
            <!-- gumb  -->
            <div class="mt-3 text-start">
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="modal(post._id)">View details</button>
            </div>
            <!-- /gumb  -->
          </div>
        </div>
      </div>
      <!-- /kartica -->
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ selectedPost.title }}</h5>
            <span class="badge rounded-pill bg-primary float-md-start me-3 ms-3 mb-3 mb-sm-0 text-start">{{ selectedPost.gender }}</span>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Post details -->
            <p class="text-muted text-start">{{ selectedPost.content }}</p>

            <div class="mt-3">
              <span class="d-block text-start"> <i class="fas fa-phone mi"></i> <a class="text-muted">+385 958128238</a> </span>
              <span class="d-block text-start">
                <i class="fas fa-calendar mi"></i> <a class="text-muted">{{ selectedPost.date }}</a>
              </span>
              <span class="d-block text-start">
                <i class="fas fa-clock mi"></i> <a class="text-muted">{{ selectedPost.time }}</a>
              </span>
              <span class="d-block text-start">
                <i class="fas fa-map-marker mi"></i> <a class="text-muted">{{ selectedPost.place }}</a>
              </span>
            </div>
          </div>
          <div class="modal-footer">
            <button class="edit-btn"><i class="fas fa-pencil-alt"></i> Edit</button>
            <button class="close-btn"><i class="fas fa-trash"></i> Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- -->
  </div>
</template>

<script>
import API from "../api";

export default {
  name: "Home",
  data() {
    return {
      posts: [],
      selectedPost: {},
    };
  },
  // dohvati sve postove
  async created() {
    this.posts = await API.getAllPost();
  },
  methods: {
    async modal(postId) {
      try {
        // dohvati post detalje preko API
        const post = await API.getPostByID(postId);
        // postavim 'selectedPost' na dobivene detalje posta
        this.selectedPost = post;
        // pokaž modal, jQuery
        $("#exampleModal").modal("show");
      } catch (error) {
        console.error(error);
      }
    },
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

.mi {
  color: #6dc77a !important;
}

.close-btn {
  background-color: transparent;
  border: none;
  color: red;
  font-size: 16px;
  cursor: pointer;
  border-radius: 9px;
}

.edit-btn {
  background-color: transparent;
  border: none;
  color: #6dc77a !important;
  font-size: 16px;
  cursor: pointer;
  border-radius: 9px;
}

.edit-btn:hover,
.close-btn:hover {
  background-color: rgb(249, 244, 244);
}

.desc {
  color: rgb(255, 254, 254);
}

i {
  padding-right: 15px;
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

<template>
  <div class="pb-5 main">
    <div class="container mt-5">
      <!-- prvi dio -->
      <div class="row mb-4 pb-2">
        <div class="col-md-8">
          <div class="text-md-start">
            <h3 class="title mb-3 desc">Find the perfect match</h3>
            <!-- search -->
            <div class="col-3">
              <form class="form-inline mt-4">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="searchQuery" @input="onSearch" />
              </form>
            </div>
            <!-- /search -->
            <p class="mb-0 mt-4 desc">Do you want to play football, basketball, or any other sport but don't have anyone to play with?</p>
            <p class="desc">Or do you just need a few more players? Find a team and start playing TODAY!</p>
          </div>
        </div>
      </div>
      <!-- /prvi dio -->

      <!-- kartica -->
      <div class="row">
        <div class="col-lg-4 col-md-6 col-12 mt-1 pt-2" v-for="post in posts" :key="post._id">
          <div class="card border-0 bg-light rounded shadow">
            <div class="card-body p-4">
              <span class="badge rounded-pill float-md-end mb-3 mb-sm-0">{{ post.gender }}</span>
              <h5>{{ post.title }}</h5>
              <div class="mt-3">
                <span> {{ post.description.substring(0, 40) + "..." }}</span>
                <span class="d-block mt-1"><i class="far fa-calendar-alt" aria-hidden="true"></i> {{ post.date }}</span>
                <span class="d-block"><i class="fas fa-map-marker-alt" aria-hidden="true"></i> {{ post.place }}</span>
              </div>
              <!-- gumb -->
              <div class="d-flex justify-content-between align-items-center mt-3">
                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="modal(post._id)">View details</button>
                <small class="created-text pt-4">Created {{ formatDate(post.created) }}</small>
              </div>

              <!-- /gumb -->
            </div>
          </div>
        </div>
        <!-- /kartica -->
      </div>
    </div>

    <!-- modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- modal header -->
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ selectedPost.title }}</h5>
            <span class="badge rounded-pill float-md-start me-3 ms-3 mb-3 mb-sm-0 text-start">{{ selectedPost.gender }}</span>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <!-- modal body -->
          <div class="modal-body">
            <p class="text-start"><i class="fas fa-info-circle"></i> {{ selectedPost.description }}</p>
            <p class="text-start">
              <i class="far fa-calendar-alt"></i> The event will take place on <span class="post-span">{{ selectedPost.date }} </span> at <span class="post-span">{{ selectedPost.time }}</span> in
              <span class="post-span">{{ selectedPost.place }}.</span> Places left: <span class="post-span">{{ selectedPost.players }}</span>
            </p>

            <p class="text-start"><i class="fas fa-phone"></i> +385 958128238</p>
            <small> For more detailed instructions, please contact the organizer.</small>
          </div>

          <!-- modal footer -->
          <div class="modal-footer">
            <button v-if="isAuthor" class="red-btn" @click="removePost(selectedPost._id)">Delete</button>
            <button v-if="isAuthor" class="blue-btn" @click="editPost(selectedPost._id)">Edit</button>

            <button v-if="!isAuthor" class="red-btn" @click="cancelButton">Cancel</button>
            <button v-if="!isAuthor" class="blue-btn" @click="joinButton">Join</button>
          </div>
        </div>
      </div>
    </div>
    <!-- /modal -->
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
      searchQuery: "",
      joinClicked: false,
      cancelClicked: false,
      userData: {},
      isAuthor: "",
    };
  },
  mounted() {
    // podaci iz localStorage
    const userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage) {
      // pretvori string u JSON objekt
      this.userData = JSON.parse(userFromLocalStorage);
    }
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

        // je li trenutni user i author
        this.isAuthor = this.selectedPost.author === this.userData.username;

        // pokaž modal, jQuery
        $("#exampleModal").modal("show");
      } catch (error) {
        console.error(error);
      }
    },
    formatDate(created) {
      // formatiram created u dd.mm.yyyy
      return new Date(created).toLocaleDateString("hr-HR");
    },
    editPost(postId) {
      // preusmjeri na stranicu edit-event s odgovarajućim ID
      this.$router.push({ name: "edit-event", params: { id: postId } });
    },
    async removePost(postId) {
      const response = await API.deletePost(postId);
      this.$router.push({ name: "home" });
      window.location.reload();
    },
    // search
    async refreshPosts() {
      const search = this.searchQuery.trim();

      if (search === "") {
        // ako je unos prazan, dohvati sve postove
        this.posts = await API.getAllPost();
      } else {
        // ako postoji unos, dohvatite postove (veliko malo slovo nebitno)
        const filteredPosts = this.posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));
        this.posts = filteredPosts;
      }
    },
    onSearch() {
      // osvjezi prikaz postova cim upisem nesto
      this.refreshPosts();
    },
    // funckije gumbova za mjesta
    async joinButton() {
      // ako >0 i niti jedan gumb nije pritisnut
      if (this.selectedPost.players > 0 && !this.joinClicked && !this.cancelClicked) {
        this.selectedPost.players--;
        this.joinClicked = true;

        try {
          // i na backend
          await API.updatePlaces(this.selectedPost._id, this.selectedPost.players);
        } catch (err) {
          console.log("Error: ", err);
        }
      }
    },

    async cancelButton() {
      if (this.selectedPost.players > 0 && this.joinClicked && !this.cancelClicked) {
        this.selectedPost.players++;
        this.cancelClicked = true;

        try {
          // i na backend
          await API.updatePlaces(this.selectedPost._id, this.selectedPost.players);
        } catch (err) {
          console.log("Error: ", err);
        }
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
  overflow: hidden;
}

p {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.7;
}

.modal-body p {
  color: rgb(20, 19, 19);
}

/* da je moguce scrollat */
.main {
  overflow-y: auto;
  max-height: 80vh;
}

/* prvi dio - opis */
.desc {
  color: rgb(255, 254, 254);
}

/* na kartici */
.rounded-pill {
  background-color: #102770;
}

.created-text {
  display: inline-block;
  margin-left: auto;
  font-size: 12px;
  color: #c4c3ca;
}

/* gumb na kartici*/
.card .btn {
  position: relative;
  font-weight: 550;
  font-size: 15px;
  line-height: 2;
  height: 50px;
  width: 150px;
  white-space: nowrap;
  transition: all 200ms linear;
  border-radius: 5px;
  letter-spacing: 1px;
  cursor: pointer;
  border: none;
  background-color: #102770;
  color: #ffeba7;
  box-shadow: 0 12px 35px 0 rgba(16, 39, 112, 0.25);
}
.card .btn:active,
.card .btn:focus {
  background-color: #ffeba7;
  color: #102770;
  box-shadow: 0 8px 24px 0 rgba(16, 39, 112, 0.2);
}
.card .btn:hover {
  background-color: #ffeba7;
  color: #102770;
  box-shadow: 0 8px 24px 0 rgba(16, 39, 112, 0.2);
}

/* modal */
.red-btn {
  font-weight: 420;
  letter-spacing: 1px;
  border: none;
  font-size: 16px;
  width: 80px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 200ms linear;
  color: #ffeba7;
  background-color: #832a45;
  box-shadow: 0 8px 24px 0 rgba(16, 39, 112, 0.2);
}

.blue-btn {
  font-weight: 500;
  width: 80px;
  letter-spacing: 1px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 200ms linear;
  background-color: #102770;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16, 39, 112, 0.2);
}

.blue-btn:hover,
.red-btn:hover {
  color: #102770;
  background-color: rgb(249, 244, 244);
}

.post-span {
  color: #102770;
  font-weight: 500;
}
</style>

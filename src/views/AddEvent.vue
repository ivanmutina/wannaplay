<template>
  <div class="main">
    <div class="container mt-5">
      <!-- First part -->
      <div class="row mb-4 pb-2">
        <div class="col-md-8">
          <div class="text-md-start">
            <h3 class="title mb-3 desc">Add event</h3>

            <p class="mb-0 mt-4 desc">Please fill in all the necessary information to make the post more effective.</p>
            <p class="desc">Good luck with finding players!</p>
          </div>
        </div>
      </div>
      <!-- /First part -->

      <!-- Form -->
      <div>
        <div class="row justify-content-center">
          <div class="col-12 text-center align-self-center">
            <div class="section pb-5 text-center mb-5">
              <!--  -->
              <form @submit.prevent="submitForm" ref="form" enctype="multipart/form-data">
                <div class="card-wrap mx-auto mb-5">
                  <div class="card-wrapper mb-5">
                    <!-- inputs -->
                    <div class="card">
                      <div class="center-wrap">
                        <div class="section text-center">
                          <div class="form-group">
                            <input type="text" v-model="post.title" class="form-style" placeholder="Title" autocomplete="off" required />
                            <i class="input-icon fas fa-pencil-alt"></i>
                          </div>
                          <div class="form-group mt-2">
                            <input type="text" v-model="post.date" class="form-style" placeholder="Date" autocomplete="off" required />
                            <i class="input-icon fas fa-calendar-alt"></i>
                          </div>
                          <div class="form-group mt-2">
                            <input type="text" v-model="post.time" class="form-style" placeholder="Time" autocomplete="off" required />
                            <i class="input-icon fas fa-clock"></i>
                          </div>
                          <div class="form-group mt-2">
                            <input type="text" name="place" label="place" v-model="post.place" class="form-style" placeholder="Place" autocomplete="off" required />
                            <i class="input-icon fas fa-map-marker-alt"></i>
                          </div>
                          <div class="form-group mt-2">
                            <input type="number" name="players" label="players" v-model="post.players" class="form-style" placeholder="Players needed" autocomplete="off" required />
                            <i class="input-icon fas fa-question"></i>
                          </div>
                          <div class="form-group mt-2">
                            <input type="text" v-model="post.gender" class="form-style" placeholder="Gender" autocomplete="off" required />
                            <i class="input-icon fas fa-venus-mars"></i>
                          </div>
                          <div class="form-group mt-2">
                            <input type="text" v-model="post.contact" class="form-style" placeholder="Contact (number)" autocomplete="off" required />
                            <i class="input-icon fas fa-phone"></i>
                          </div>
                          <div class="form-group mt-2">
                            <textarea v-model="post.description" name="description" label="description" class="form-style" placeholder="Description" autocomplete="off" rows="4"></textarea>
                            <i class="input-icon fas fa-info-circle"></i>
                            <small>All information will be publicly disclosed.</small>
                          </div>

                          <button type="submit" class="btn mt-4">Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- /Form -->
    </div>
  </div>
</template>

<script>
import API from "../api";

export default {
  data() {
    return {
      post: {
        title: "",
        date: "",
        time: "",
        place: "",
        players: "",
        gender: "",
        contact: "",
        description: "",
        userData: {},
        author: "",
      },
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
  methods: {
    async submitForm() {
      try {
        // dodaj authora u post
        this.post.author = this.userData.username;
        const response = await API.addPost(this.post);
        // prebaci odma na home
        this.$router.push({ name: "home" });
      } catch (error) {
        console.error("Error occurred while sending the request:", error);
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

/* prvi tekst */
.desc {
  color: rgb(255, 254, 254);
}

/* forma */
a {
  cursor: pointer;
  transition: all 200ms linear;
}
a:hover {
  text-decoration: none;
}
.card-wrap {
  width: 700px;
  max-width: 100%;
  height: 700px;
  perspective: 800px;
  margin-bottom: 60px;
}
.card-wrapper {
  width: 100%;
  height: 100%;
}
.card {
  width: 100%;
  height: 100%;
  background-color: #2a2b38;
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
.input-icon {
  position: absolute;
  top: 0;
  left: 17px;
  font-size: 24px;
  line-height: 48px;
  text-align: left;
  color: #ffeba7;
}
textarea.form-style {
  height: 100px;
  max-height: 140px;
}
small {
  font-size: 13px;
  color: #888;
}
</style>

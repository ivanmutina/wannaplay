<template>
  <div class="main">
    <div class="container mt-5">
      <!-- First part -->
      <div class="row mb-4 pb-2">
        <div class="col-md-8">
          <div class="text-md-start">
            <h3 class="title mb-3 desc">Account</h3>
            <p class="mb-0 mt-4 desc">You can change the password or delete your account.</p>
            <p class="desc">Be aware that deleting the account will also delete all the posted events.</p>
          </div>
        </div>
      </div>
      <!-- /First part -->

      <!-- kartica -->
      <div class="row">
        <div class="col-md-6 col-12">
          <!-- change pass form -->
          <form @submit.prevent="changePassword">
            <div class="card-wrap mx-auto">
              <div class="card-wrapper">
                <div class="card">
                  <div class="center-wrap">
                    <div class="section text-center">
                      <small>To change your password, first enter the old password and then the new password.</small>
                      <div class="form-group mt-4">
                        <input v-model="old_password" type="password" name="oldpass" class="form-style" placeholder="Old password" autocomplete="off" required />
                        <i class="input-icon fas fa-unlock"></i>
                      </div>
                      <div class="form-group mt-2">
                        <input v-model="new_password" type="password" name="newpass" class="form-style" placeholder="New password" autocomplete="off" required />
                        <i class="input-icon fas fa-lock"></i>
                      </div>
                      <button type="submit" class="btn mt-4">Change</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <!-- /change pass form -->
        </div>

        <div class="col-md-6 col-12">
          <!-- delete acc. form -->
          <form @submit.prevent="deleteAcc">
            <div class="card-wrap mx-auto">
              <div class="card-wrapper">
                <div class="card">
                  <div class="center-wrap">
                    <div class="section text-center">
                      <small>To confirm account deletion, please type this random keyword '<span v-text="keyword"></span>' down bellow.</small>
                      <div class="form-group mt-4">
                        <input v-model="keywordInput" type="text" class="form-style" placeholder="Keyword" autocomplete="off" required />
                        <i class="input-icon fas fa-trash-alt"></i>
                      </div>
                      <button type="submit" class="btn mt-4">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <!-- /delete acc form  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Auth } from "@/services";
import { v4 as uuidv4 } from "uuid";
import API from "../api";

export default {
  data() {
    return {
      old_password: "",
      new_password: "",
      keyword: "",
      keywordInput: "",
      posts: [],
    };
  },
  async created() {
    this.generateKeyword();
    this.posts = await API.getAllPost();
  },
  methods: {
    async changePassword() {
      // dohvati trenutnog korisnika
      const user = Auth.getUser();

      // stara ne smije bit ista novoj
      if (this.old_password === this.new_password) {
        window.alert("New password must be different from the old password.");
        return;
      }

      // provjera stare sifre i autentifikacija
      try {
        await axios.post("/auth", {
          username: user.username,
          password: this.old_password,
        });

        // ako valja, promijeni šifru (salje i header zbog middleware)
        await axios.patch(
          "/user",
          {
            old_password: this.old_password,
            new_password: this.new_password,
          },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        window.alert("Password successfully changed!");
        this.$router.push({ name: "home" });
      } catch (err) {
        // ako ne valja
        window.alert("Incorrect old password.");
      }
    },
    async generateKeyword() {
      const generatedKeyword = uuidv4().substring(0, 6); // Generirajte uuid i uzmite prvih 6 znakova
      this.keyword = generatedKeyword; // Postavite generirani ključ u deleteKeyword
    },
    async deleteAcc() {
      if (this.keyword !== this.keywordInput) {
        window.alert("Incorrect keyword. Account is not deleted.");
        return;
      }

      const user = Auth.getUser();
      try {
        // izbriši sve postove koji pripadaju korisniku
        for (const post of this.posts) {
          if (post.author === user.username) {
            await API.deletePost(post._id);
          }
        }

        // kodiram ime da mi posebni znakovi ne stvaraju problem
        const encodedUsername = encodeURIComponent(user.username);

        const headers = {
          Authorization: `Bearer ${user.token}`,
        };

        // posalji zahtjeva za brisanje profila na backend
        const response = await axios.delete(`/user/${encodedUsername}`, { headers });

        if (response.data.success) {
          window.alert("Account successfully deleted.");
          Auth.logout();
          this.$router.go();
        } else {
          window.alert("Failed to delete account.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        window.alert("Failed to delete account.");
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800,900");

body {
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  line-height: 1.7;
  background-color: #1f2029;
  overflow: hidden;
}
small {
  color: white;
}

p {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.7;
  color: white;
}

h4 {
  color: white;
}

a {
  cursor: pointer;
  transition: all 200ms linear;
}
a:hover {
  text-decoration: none;
}

.section {
  width: 100%;
  display: block;
}
.full-height {
  min-height: 100vh;
}
.card-wrap {
  width: 440px;
  max-width: 100%;
  height: 400px;
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
</style>

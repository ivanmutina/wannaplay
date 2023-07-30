<template>
  <div class="main">
    <div class="container mt-5">
      <!-- First part -->
      <div class="row mb-4 pb-2">
        <div class="col-md-8">
          <div class="text-md-start">
            <h3 class="title mb-3 desc">Profile</h3>
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
          <form @submit.prevent="changePass">
            <div class="card-wrap mx-auto">
              <div class="card-wrapper">
                <div class="card">
                  <div class="center-wrap">
                    <div class="section text-center">
                      <small>To change your password, first enter the old password and then the new password.</small>
                      <div class="form-group mt-4">
                        <input v-model="old_password" type="email" name="oldpass" class="form-style" placeholder="Old password" id="logemail" autocomplete="off" />
                        <i class="input-icon fas fa-unlock"></i>
                      </div>
                      <div class="form-group mt-2">
                        <input v-model="new_password" type="password" name="newpass" class="form-style" placeholder="New password" id="logpass" autocomplete="off" />
                        <i class="input-icon fas fa-lock"></i>
                      </div>
                      <button type="submit" class="btn mt-4">Submit</button>
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
          <form @submit.prevent="changePass">
            <div class="card-wrap mx-auto">
              <div class="card-wrapper">
                <div class="card">
                  <div class="center-wrap">
                    <div class="section text-center">
                      <small>To confirm account deletion, please type this random keyword "jihdfa" down bellow.</small>
                      <div class="form-group mt-4">
                        <input v-model="new_password" type="password" name="newpass" class="form-style" placeholder="Keyword" id="logpass" autocomplete="off" />
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

<style>
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

.btn {
  border-radius: 5px;
  height: 44px;
  font-size: 15px;
  font-weight: 600;
  padding: 0 30px;
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
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

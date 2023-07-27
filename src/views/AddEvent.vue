<template>
  <div style="height: 100vh; overflow-y: auto">
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
              <!-- Card -->
              <div class="card-wrap mx-auto mb-5">
                <div class="card-wrapper mb-5">
                  <!-- Log in part -->
                  <div class="card">
                    <div class="center-wrap">
                      <div class="section text-center">
                        <div class="form-group">
                          <input type="text" name="" class="form-style" placeholder="Title" id="" autocomplete="off" />
                          <i class="input-icon fas fa-pencil-alt"></i>
                        </div>
                        <div class="form-group mt-2">
                          <input type="text" name="" class="form-style" placeholder="Date" id="" autocomplete="off" />
                          <i class="input-icon fas fa-calendar-alt"></i>
                        </div>
                        <div class="form-group mt-2">
                          <input type="text" name="" class="form-style" placeholder="Time" id="" autocomplete="off" />
                          <i class="input-icon fas fa-clock"></i>
                        </div>
                        <div class="form-group mt-2">
                          <input type="text" name="" class="form-style" placeholder="Gender" id="" autocomplete="off" />
                          <i class="input-icon fas fa-venus-mars"></i>
                        </div>
                        <div class="form-group mt-2">
                          <input type="text" name="" class="form-style" placeholder="Contact" id="" autocomplete="off" />
                          <i class="input-icon fas fa-phone"></i>
                        </div>
                        <div class="form-group mt-2">
                          <textarea name="" class="form-style" placeholder="Description" id="" autocomplete="off" rows="4"></textarea>
                          <i class="input-icon fas fa-info-circle"></i>
                          <small>All information will be publicly disclosed.</small>
                        </div>

                        <a href="#" class="btn mt-4">Submit</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Form -->
    </div>
  </div>
</template>

<script></script>

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
.link {
  color: #c4c3ca;
}
.link:hover {
  color: #ffeba7;
}

.card-wrap {
  width: 700px;
  max-width: 100%;
  height: 600px;
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

.btn {
  border-radius: 4px;
  height: 44px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0 30px;
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  -ms-flex-pack: center;
  text-align: center;
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

textarea.form-style {
  height: 100px;
  max-height: 140px;
}
small {
  font-size: 13px;
  color: #888;
}
</style>

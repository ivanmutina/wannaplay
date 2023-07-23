<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10 mx-auto py-4">
        <div class="card p-2">
          <img :src="`/${post.image}`" class="card-img-top" alt="Post Image" />

          <div class="card-body">
            <div class="row mt-1 mx-1">
              <div class="col-sm-2">
                <button class="btn btn-outline-primary btn-sm">test</button>
              </div>
              <div class="col-sm-10 d-flex justify-content-end">
                <button class="btn btn-success">Edit</button>
                <button class="btn btn-danger">Delete</button>
              </div>
            </div>
            <h3 class="card-title mt-2">{{ post.title }}</h3>
            <div class="card-text text-secondary">
              <p>{{ post.content }}</p>
              <p>Created: {{ post.created }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../api";

export default {
  data() {
    return {
      post: [],
    };
  },
  async created() {
    const response = await API.getPostByID(this.$route.params.id);
    this.post = response;
  },
};
</script>

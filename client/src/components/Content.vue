<template>
  <div class="flex justify-center">
    <div class="w-8/12 bg-white p-6 rounded-lg">
      <div class="flex justify-between">
        <h1 class="font-bold text-4xl mb-4">Dashboard</h1>
        <button
          class="bg-blue-500 text-white px-4 py-3 rounded font-bold font-medium"
          @click="$emit('Open')"
        >
          New Book
        </button>
      </div>

      <p class="text-lg p-3">Welcome , {{ user.name }}</p>
      <div class="card" v-if="content != []">
        <div v-for="upload in content" v-bind:key="upload.id"></div>
        <div v-if="content == []">
          <p class="text-center">No Uploads available</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Content",
  data() {
    return {
      content: "",
      user: "",
    };
  },
  async created() {
    const url = "http://localhost:3000";
    if (!localStorage.getItem("token")) {
      this.$router.push("/");
    } else {
      const users = await axios.get(`${url}/me`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      const response = await axios.get(`${url}/dashboard`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      this.user = users.data;
      this.content = response;

      // console.log(this.content);
    }
  },
};
</script>

<template>
  <div>
    <nav class="p-6 bg-white flex justify-between mb-10">
      <ul class="flex items-center">
        <li><a href="" class="p-3">Books</a></li>

        <li v-if="user.role == 'Writter'">
          <a href="/dashboard" class="p-3">Dashboard</a>
        </li>
        <li><a href="" class="p-3">Writters</a></li>
        <li><a href="" class="p-3"></a></li>
      </ul>

      <ul class="flex items-center">
        <li>
          <router-link to="/profile">{{ user.name }}</router-link>
        </li>
        <li><button @click="_logout" class="p-3">Logout</button></li>
      </ul>
    </nav>
    <Content v-on:Open="Open" />
    <div
      v-if="isOpen"
      class="bg-gray-400 w-full h-full absolute top-0.5 bg-opacity-40"
    >
      <Upload class="mt-28" />
      <button
        class="rounded-xl top-4 right-10 absolute p-4 text-white bg-blue-500"
        @click="close"
      >
        X
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Content from "./Content";
import Upload from "./Upload";

export default {
  name: "DashboardComponent",
  data() {
    return {
      user: {},
      isOpen: false,
    };
  },
  async created() {
    const url = "http://localhost:3000";
    if (!localStorage.getItem("token")) {
      this.$router.push("/");
    }
    const response = await axios.get(`${url}/me`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    this.user = response.data;
    // console.log(response.data);
  },

  methods: {
    async _logout() {
      const url = "http://localhost:3000";
      localStorage.removeItem("token");
      await axios.get(`${url}/logout`);
      this.$toasted.show("LoggedOut", {
        position: "top-right",
        type: "success",
        duration: 3000,
      });
      this.$router.push("/");
    },
    Open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
  },
  components: {
    Content,
    Upload,
  },
};
</script>

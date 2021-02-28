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
          <a href="/profile" class="p-3">{{ user.name }}</a>
        </li>
        <li><button @click="_logout" class="p-3">Logout</button></li>
      </ul>
    </nav>
    <Content />
    <h1>HEllO</h1>
  </div>
</template>

<script>
import axios from "axios";
import Content from "./Content";

export default {
  name: "DashboardComponent",
  data() {
    return {
      user: {},
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
  },
  components: {
    Content,
  },
};
</script>

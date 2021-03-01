<template>
  <div>
    <nav class="p-6 bg-white flex justify-between mb-10">
      <ul class="flex items-center">
        <li><a href="" class="p-3">Books</a></li>

        <li v-if="user.role == 'Writter'">
          <router-link to="/dashboard" class="p-3">Dashboard</router-link>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ProfileComponent",
  data() {
    return {
      user: "",
    };
  },
  async created() {
    const url = "http://localhost:3000/dashboard";
    const response = await axios.get(`${url}/profile`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });

    this.user = response.data;

    // console.log(response);
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
};
</script>

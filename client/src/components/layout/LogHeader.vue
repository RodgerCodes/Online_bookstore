<template>
  <div>
    <nav class="p-6 bg-white flex justify-between mb-10" v-on:user="getUser">
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
          <a href="/profile" class="p-3"></a>
        </li>
        <li><button @click="_logout" class="p-3">Logout</button></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LogHeader",
  data() {
    return {
      user: "",
    };
  },
  methods: {
    getUser(user) {
      console.log(user);
    },
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

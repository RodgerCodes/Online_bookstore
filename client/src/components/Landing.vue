<template>
  <div class="flex justify-center">
    <div class="w-4/12 bg-white p-6 rounded-lg">
      <form @submit.prevent="_login" method="post">
        <div class="mb-4">
          <label for="name" class="sr-only">Email</label>
          <input
            type="email"
            name="email"
            v-model="email"
            class="bg-gray-100 border-2 w-full p-4 rounded-lg "
            placeholder="Email"
          />
        </div>
        <div class="mb-4">
          <label for="Password" class="sr-only">Password</label>
          <input
            type="password"
            name="password"
            v-model="password"
            class="bg-gray-100 border-2 w-full p-4 rounded-lg"
            placeholder=" password"
          />
        </div>
        <div>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-3 rounded font-medium w-full"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Landing",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    async _login() {
      const url = "http://localhost:3000";
      if (!this.email || !this.password) {
        this.$toasted.show("Fill in all forms", {
          duration: 3000,
          type: "error",
          position: "top-center",
        });
      }

      let response = await axios.post(`${url}/login`, {
        email: this.email,
        password: this.password,
      });

      this.$toasted.show("Logged In", {
        duration: 3000,
        type: "success",
        position: "top-center",
      });

      localStorage.setItem("token", response.data.token);

      this.$router.push("/dashboard");

      // console.log(response);
    },
  },
};
</script>

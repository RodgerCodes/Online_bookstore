<template>
  <div class="flex justify-center">
    <div class="w-5/12 bg-white p-6 rounded-lg">
      <form action="" @submit.prevent="_createUser" method="POST">
        <div class="mb-4">
          <label for="name" class="sr-only">Name</label>
          <input
            type="text"
            name="name"
            v-model="username"
            class="bg-gray-100 border-2 w-full p-4 rounded-lg "
            placeholder="Your name"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="sr-only">Email</label>
          <input
            type="email"
            name="email"
            value=""
            v-model="email"
            class="bg-gray-100 border-2 w-full p-4 rounded-lg "
            placeholder="Email"
          />
        </div>
        <div class="mb-4">
          <label for="" class="sr-only">Account type</label>
          <select
            class="w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            v-model="selected"
            id=""
          >
            <option
              v-for="option in options"
              v-bind:key="option.id"
              v-bind:value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
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
        <div class="mb-4">
          <label for="password" class="sr-only">Repeat Password</label>
          <input
            type="password"
            name="password_confirmation"
            v-model="password_confirm"
            class="bg-gray-100 border-2 w-full p-4 rounded-lg"
            placeholder="Repeat your password"
          />
        </div>
        <div>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-3 rounded font-medium w-full"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterComponent",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password_confirm: "",
      selected: "Regular",
      options: [
        { id: 1, text: "Regular", value: "Regular" },
        { id: 2, text: "Writter", value: "Writter" },
      ],
    };
  },
  methods: {
    async _createUser() {
      const url = "http://localhost:3000";
      if (
        !this.username ||
        !this.email ||
        !this.password ||
        !this.password_confirm
      ) {
        this.$toasted.show("Make sure to fill in all forms", {
          duration: 3000,
          position: "top-center",
          type: "error",
        });
      }

      if (this.password != this.password_confirm) {
        this.$toasted.show("Make sure the password match", {
          duration: 3000,
          position: "top-center",
          type: "error",
        });
      }
      await axios.post(`${url}/register`, {
        name: this.username,
        email: this.email,
        role: this.selected,
        password: this.password,
        password_confirm: this.password_confirm,
      });
      this.$toasted.show("successfully created account", {
        duration: 3000,
        position: "top-center",
        type: "success",
      });
      this.$router.push("/");
    },
  },
};
</script>

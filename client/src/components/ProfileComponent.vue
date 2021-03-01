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
    <div class="flex justify-center">
      <div class="w-8/12 bg-white p-6 rounded-lg">
        <h4 class="font-bold text-xl">Name:</h4>
        <p class="mb-4">{{ user.name }}</p>
        <h4 class="font-bold text-xl">Email:</h4>
        <p class="mb-4">{{ user.email }}</p>
        <h4 class="font-bold  text-xl">Account-Type:</h4>
        <p class="mb-6">{{ user.role }}</p>
        <div class="flex justify-between">
          <router-link
            to="/edit"
            class="bg-blue-500 rounded-lg p-3 text-white px-4 py-3 "
            >Edit</router-link
          >
          <button
            @click="ModalOpen"
            class="bg-red-500 text-white p-3 px-4 py-3 rounded-lg"
          >
            Delete Account
          </button>
          <div
            v-if="isOpen"
            class="bg-gray-400 w-full h-full absolute left-0.5 top-0.5 bg-opacity-40"
          >
            <div class="flex justify-center mt-48">
              <div class="w-4/12 bg-white rounded-lg p-6">
                <div>
                  <h1 class="font-bold mb-4 text-xl text-red">
                    Are you sure you want to Delete your account
                  </h1>
                  <p class="mb-4">This action is unreversible</p>
                  <div class="flex justify-between">
                    <button
                      class="bg-red-500 text-white p-3 rounded-lg"
                      @click="delAccount"
                    >
                      Yes
                    </button>
                    <button
                      class="bg-blue-500 text-white p-3 rounded-lg"
                      @click="close"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ProfileComponent",
  data() {
    return {
      user: "",
      isOpen: false,
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
    ModalOpen() {
      this.isOpen = true;
    },
    async delAccount() {
      const url = "http://localhost:3000/dashboard";
      let response = await axios.delete(`${url}/profile/del`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      this.$toasted.show(response.data.msg, {
        duration: 3000,
        type: "success",
        position: "top-center",
      });

      localStorage.removeItem("token");

      this.$router.push("/");
    },
    close() {
      this.isOpen = false;
    },
  },
};
</script>

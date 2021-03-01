<template>
  <div class="flex justify-center">
    <div class="w-8/12 bg-white p-6 rounded-lg">
      <h1 class="text-center text-xl font-bold">Upload a new Book</h1>
      <form class="" @submit.prevent="UploadFile" method="POST">
        <div class="mb-4">
          <label for="Cover" class="sr-only">Book cover</label>
          <input
            type="file"
            @change="processfile($event)"
            class="bg-gray-100 border-2 rounder-lg"
            placeholder="Book cover"
          />
        </div>
        <div class="mb-4">
          <label for="Title" class="sr-only">Book Title</label>
          <input
            type="text"
            v-model="title"
            class="bg-gray-100 border-2 w-full p-4 rounded-lg "
            placeholder="book title"
          />
        </div>
        <div class="mb-4">
          <p>Pdf file</p>
          <label for="file" class="sr-only">Pdf file</label>
          <input
            type="file"
            placeholder="PDF file"
            @change="processfile_2($event)"
          />
        </div>

        <div class="mb-4">
          <label for="body" class="sr-only">Book description</label>
          <textarea
            name="body"
            id="body"
            cols="30"
            rows="4"
            v-model="description"
            class="bg-gray-100 border-2 w-full p-4 rounded-lg"
            placeholder="Book description"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-3 rounded font-medium w-full"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadComponent",
  data() {
    return {
      title: "",
      description: "",
      cover: "",
      File: "",
    };
  },
  methods: {
    processfile(event) {
      this.cover = event.target.files[0];
    },

    processfile_2(event) {
      this.File = event.target.files[0];
    },

    async UploadFile() {
      console.log(this.title, this.description, this.cover, this.File);
    },
  },
};
</script>

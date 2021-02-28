<template>
  <div class="flex justify-center">
    <div class="w-8/12 bg-white p-6 rounded-lg">
      <h1 class="text-center text-xl font-bold">Upload a new Book</h1>
      <form class="" method="POST">
        <div class="mb-4">
          <label for="Title" class="sr-only">Book Title</label>
          <input
            type="text"
            v-model="title"
            class="bg-gray-100 border-2 w-full p-4 rounded-lg "
          />
        </div>
        <div class="mb-4">
          <label for="Cover" class="sr-only">Book cover</label>
          <input type="file" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadComponent",
};
</script>

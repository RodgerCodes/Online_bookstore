<template>
  <div>
    <Header />
    <Landing />
  </div>
</template>

<script>
import Landing from "../components/Landing";
import Header from "../components/layout/Header";
export default {
  name: "Home",
  components: {
    Landing,
    Header,
  },
};
</script>

<template>
  <div>
    <Header />
    <RegisterComponent />
  </div>
</template>

<script>
import RegisterComponent from "../components/Registercomponent";
import Header from "../components/layout/Header";
export default {
  name: "Register",
  components: {
    RegisterComponent,
    Header,
  },
};
</script>

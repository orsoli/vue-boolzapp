// Destructuring createApp from vue
const { createApp } = Vue;
// Create an instance app of vue app
createApp({
  // Create variables
  data() {
    return {
      message: "Hello Vue!",
    };
  },
}).mount("#app");

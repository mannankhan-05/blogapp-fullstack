// import Vue from "vue";
// import Vuex from "vuex";
// import axios from "axios";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
//     loggedIn: false,
//   },
//   mutations: {
//     set_loggedIn(state, value) {
//       state.loggedIn = value;
//     },
//   },
//   actions: {
//     async login({ commit }, { email, password, router }) {
//       try {
//         let response = await axios.post("http://localhost:3000/loginUser", {
//           email: this.email,
//           password: this.password,
//         });
//         const userId = response.data.id;
//         console.log(userId);

//         router.push({ name: "users", params: { id: userId } });

//         commit("set_loggedIn", true);
//       } catch (error) {
//         this.errorMessage = "Email or Password is not found! Try again.";

//         setTimeout(() => {
//           this.errorMessage = null;
//         }, 2000);
//         this.email = "";
//         this.password = "";
//       }
//     },
//   },
// });

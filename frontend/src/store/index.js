import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    email: "",
    password: "",
    errorMessage: null,
    isLoggedIn: false,
  },
  mutations: {
    setEmail(state, email) {
      state.email = email;
    },
    setPassword(state, password) {
      state.password = password;
    },
    setErrorMessage(state, message) {
      state.errorMessage = message;
    },
  },
  actions: {
    async login({ state, commit }, { email, password, router }) {
      try {
        let response = await axios.post("http://localhost:3000/loginUser", {
          email,
          password,
        });
        state.isLoggedIn = true;
        const userId = response.data.id;
        console.log(userId);
        commit("setErrorMessage", null);
        router.push({ name: "users", params: { id: userId } });
      } catch (error) {
        commit("setErrorMessage", "Email or Password is not found! Try again.");
        commit("setEmail", "");
        commit("setPassword", "");
        setTimeout(() => {
          commit("setErrorMessage", null);
        }, 2000);
      }
    },
  },
});

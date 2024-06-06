import { createStore } from "vuex"; // Importing the `createStore` function from Vuex, which is used to create a Vuex store.
import axios from "axios"; // Importing Axios library for making HTTP requests.

export default createStore({
  state: {
    email: "",
    password: "",

    errorMessage: null,

    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",

    f1: localStorage.getItem("f1"),
    f2: localStorage.getItem("f2"),

    myfirstname: localStorage.getItem("firstname"),
    mylastname: localStorage.getItem("lastname"),
    myage: localStorage.getItem("age"),
    myemail: localStorage.getItem("email"),
    mypassword: localStorage.getItem("password"),

    loggedInUserId: localStorage.getItem("id"),
  },
  mutations: {
    setEmail(state, email) {
      state.email = email; // Mutation to set the value of the email state variable.
    },
    setPassword(state, password) {
      state.password = password; // Mutation to set the value of the password state variable.
    },
    setErrorMessage(state, message) {
      state.errorMessage = message; // Mutation to set the value of the errorMessage state variable.
    },
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
      localStorage.setItem("isLoggedIn", isLoggedIn);
    },
    setF1(state, f1) {
      state.f1 = f1;
      localStorage.setItem("f1", f1);
    },
    setF2(state, f2) {
      state.f2 = f2;
      localStorage.setItem("f2", f2);
    },
    setUserFirstname(state, UserFirstname) {
      state.myfirstname = UserFirstname;
      localStorage.setItem("firstname", UserFirstname);
    },
    setUserLastname(state, UserLastname) {
      state.mylastname = UserLastname;
      localStorage.setItem("lastname", UserLastname);
    },
    setUserAge(state, UserAge) {
      state.myage = UserAge;
      localStorage.setItem("age", UserAge);
    },
    setUserEmail(state, UserEmail) {
      state.myemail = UserEmail;
      localStorage.setItem("email", UserEmail);
    },
    setUserPassword(state, UserPassword) {
      state.mypassword = UserPassword;
      localStorage.setItem("password", UserPassword);
    },
    setUserId(state, id) {
      state.loggedInUserId = id;
      localStorage.setItem("id", id);
    },
  },
  actions: {
    async login({ state, commit }, { email, password, router }) {
      try {
        let response = await axios.post("http://localhost:3000/loginUser", {
          email, // The email entered by the user.
          password, // The password entered by the user.
        });
        state.isLoggedIn = true; // Set the isLoggedIn state variable to true, indicating the user is logged in.

        const userId = response.data.id; // Extracting the user ID from the response data.
        commit("setUserId", userId);

        const f1 = response.data.f1;
        const f2 = response.data.f2;

        const user_firstname = response.data.firstname;
        const user_lastname = response.data.lastname;
        const user_age = response.data.age;
        const user_email = response.data.email;
        const user_password = response.data.password;

        // Extract f1 and f2 from response data and store in the state.
        commit("setF1", f1);
        commit("setF2", f2);

        commit("setErrorMessage", null); // Committing a mutation to set the errorMessage state variable to null.
        commit("setIsLoggedIn", true);

        commit("setUserFirstname", user_firstname);
        commit("setUserLastname", user_lastname);
        commit("setUserAge", user_age);
        commit("setUserEmail", user_email);
        commit("setUserPassword", user_password);

        router.push({ name: "users", params: { id: userId } }); // Redirecting the user to the "users" route with the user ID as a parameter.
      } catch (error) {
        commit("setErrorMessage", "Email or Password is not found! Try again."); // Committing a mutation to set an error message if login fails.
        commit("setEmail", ""); // Resetting the email state variable to an empty string.
        commit("setPassword", ""); // Resetting the password state variable to an empty string.
        setTimeout(() => {
          commit("setErrorMessage", null); // Setting the errorMessage state variable to null after a timeout of 2000 milliseconds.
        }, 2000);
      }
    },
    logout({ commit }) {
      commit("setIsLoggedIn", false);
      localStorage.removeItem("isLoggedIn");

      localStorage.removeItem("f1");
      localStorage.removeItem("f2");

      localStorage.removeItem("firstname");
      localStorage.removeItem("lastname");
      localStorage.removeItem("age");
      localStorage.removeItem("email");
      localStorage.removeItem("password");

      localStorage.removeItem("id");
    },
  },
});

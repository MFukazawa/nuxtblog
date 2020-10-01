import Vuex from "vuex";
import axios from "axios";
import Cookie from "js-cookie";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPosts[postIndex] = editedPost;
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      nuxtServerInit({ commit }, context) {
        return axios
          .get("https://nuxt-blog-86397.firebaseio.com/posts.json")
          .then(res => {
            const postsArray = [];
            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key });
            }
            commit("setPosts", postsArray);
          })
          .catch(e => context.error(e));
        // If running on server
        // if (!process.client) {
        //   console.log(context.req)
        // }
        // return new Promise((resolve, reject) => {
        //   setTimeout(() => {
        //     commit('setPosts', [
        //       {
        //         id: '1',
        //         title: 'First Post',
        //         previewText: 'This is our first post',
        //         thumbnail: 'https://www.morganstanley.com/pub/content/dam/msdotcom/ideas/rise-of-the-tech-super-platforms/tw-rise-of-tech.jpg'
        //       },
        //       {
        //         id: '2',
        //         title: 'Second Post',
        //         previewText: 'This is our second post',
        //         thumbnail: 'https://www.morganstanley.com/pub/content/dam/msdotcom/ideas/rise-of-the-tech-super-platforms/tw-rise-of-tech.jpg'
        //       }
        //     ])
        //     resolve()
        //   }, 2000)
        // })
      },
      addPost({ state, commit }, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        };
        return axios
          .post(
            "https://nuxt-blog-86397.firebaseio.com/posts.json?auth=" +
              state.token,
            createdPost
          )
          .then(result => {
            commit("addPost", { ...createdPost, id: result.data.name });
          })
          .catch(e => console.log(e));
      },
      editPost({ state, commit }, editedPost) {
        return axios
          .put(
            "https://nuxt-blog-86397.firebaseio.com/posts/" +
              editedPost.id +
              ".json?auth=" +
              state.token,
            editedPost
          )
          .then(res => {
            commit("editPost", editedPost);
          })
          .catch(e => console.log(e));
      },
      setPosts({ commit }, posts) {
        commit("setPosts", posts);
      },
      authenticateUser({ commit, dispatch }, authData) {
        // sign in
        let authUrl =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          process.env.apiKey;

        // sign up
        if (!authData.isLogin) {
          authUrl =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
            process.env.apiKey;
        }

        return axios
          .post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(res => {
            let expirationSeconds = res.data.expiresIn * 1000;

            commit("setToken", res.data.idToken);
            localStorage.setItem("token", res.data.idToken);
            localStorage.setItem(
              "tokenExpiration",
              new Date().getTime() + Number.parseInt(expirationSeconds)
            );
            Cookie.set("jwt", res.data.idToken);
            Cookie.set(
              "expirationDate",
              new Date().getTime() + Number.parseInt(expirationSeconds)
            );
            // return axios.post('http://localhost:3000/api/track-data', {
            //   data: 'Authenticated!'
            // })
          })
          .catch(e => console.log(e));
      },
      // setLogoutTimer({ commit }, duration) {
      //   setTimeout(() => {
      //     commit("clearToken");
      //   }, duration);
      // },
      initAuth({ commit, dispatch }, req) {
        let token;
        let expirationDate;

        if (req) {
          if (!req.headers.cookie) {
            return;
          }

          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));

          if (!jwtCookie) {
            return;
          }

          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("expirationDate="))
            .split("=")[1];
        } else {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }

        if (new Date().getTime() > +expirationDate || !token) {
          dispatch('logout')
          return;
        }

        commit("setToken", token);
      },
      logout({ commit }) {
        commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");

        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return state.token != null;
      }
    }
  });
};

export default createStore;

// store.js
import { createApp } from 'vue';
import App from '../App.vue';
import Vuex from 'vuex';

const app = createApp(App);
app.use(Vuex); // Используйте хранилище с помощью метода use

export default new Vuex.Store({
  state: {
    foldersWitPath: [],
    path: '',
    pathToDownload:'',
  },
  mutations: {

    updateFoldersWitPath(state, newFoldersWitPath){
      state.foldersWitPath = newFoldersWitPath;
    },
    updatePath(state, newPath){
      state.path = newPath;
    },
    updatePathToDownload(state, newPathToDownload){
      state.pathToDownload = newPathToDownload;
    }
  },
  actions: {
    saveFoldersPath({ commit }, updateFoldersWitPath) {
      commit('updateFoldersWitPath', updateFoldersWitPath);
    },
    savePath({ commit }, updatePath) {
      commit('updatePath', updatePath);
    },
    savePathToDownload({ commit }, updatePathToDownload){
      commit('updatePathToDownload', updatePathToDownload);
    }
  },
  getters: {
    foldersWitPath: state => state.foldersWitPath,
    path: state => state.path,                      // this.$store.getters.path
    pathToDownload: state => state.pathToDownload
  },
});

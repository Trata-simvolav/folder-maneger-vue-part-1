<template>
    <div>
      <div>
        <ul class="list-group">

          <li v-for="(item, type) in folders" :key="type" class="list-group-item">

            <div v-if="message && item.type === 'folder'">
              <button class="btn btn-primary" @click="postRequest(item.path)">
                <div class="item-name">{{ item.name }}</div>
                <div class="tv-type">{{ item.type }}</div>
              </button>
            </div>
            <div v-else-if="message">
              <p>{{ item.name }}</p>
            </div>

            <button v-if="!message"
            v-bind:class="{ 'btn btn-primary': item.type == 'folder', 'btn btn-success': item.type !== 'folder' }"
            class="btn btn-primary"
            @click="getClickHandler(item)">
              <div class="item-name">{{ item.name }}</div>
              <div class="tv-type">{{ item.type }}</div>
            </button>
          </li>

        </ul>
      </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      condition: this.message,
    };
  },
  // mounted(){
  //   this.postRequest(this.path);
  // },
  computed:{
    folders(){
      return this.$store.getters.foldersWitPath;
    },
    path(){
      return this.$store.getters.path;
    },
    pathToDownload(){
      return this.$store.getters.pathToDownload;
    }
  },
  methods: {
    postRequest(path) {
      axios.post(`http://127.0.0.1:8000/api/getFolders`, { pathToFile: path})
        .then(response => {
          this.$store.dispatch('saveFoldersPath', response.data)
          if(this.condition){
            this.$store.dispatch('savePath', path)
          } else {
            this.$store.dispatch('savePathToDownload', path)
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    chooseFileForDownload(filename){ ///createFile
      var pathEdit
      if(this.path.length == 2){
        pathEdit = this.path + '/'
      } else {
        pathEdit = this.path
      }
      axios.post(`http://127.0.0.1:8000/api/createFile`, { sourcePath: this.pathToDownload, destinationPath: pathEdit, filename: filename })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    getClickHandler(item){
      if(item.type === "folder"){
        return this.postRequest(item.path)
      } else {
        return this.chooseFileForDownload(item.name)
      }
    }
  },
  props: ['message'],
};
</script>
  
<style scoped>
.btn{
  width: 80%;
}
button{
  display: inline-block;
}
.list-group-item{
  text-align: center;
}
</style>







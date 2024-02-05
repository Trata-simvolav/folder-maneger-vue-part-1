<template>
    <div class="tableView_main">
      <div>
        <div> <!-- folders -->
          <p>Количество папок и файлов: {{ arrayLength }}</p>
        </div>
        <ul class="list-group">
          <li v-for="(item, type) in folders" :key="type" class="list-group-item">
            <div class="item-name">{{ item.nickname ? item.nickname : item.name }}</div>
            <div class="tv-type">Тип: {{ item.type }}</div>
            <div class="tv-type">Путь: {{ item.path }}</div>
            <div class="btn-group">
              <router-link :to="{ name: 'option', params: { name: item.name, type: item.type, path: item.path, nickname: item.nickname ? item.nickname : null} }" class="btn btn-primary tableButton"> <!-- v-slot="{ navigate }" -->
                <i class="fas fa-cog" title="Изменить"></i> <!-- @click="navigate" -->
              </router-link>
              <button @click="this.deleteName = item.name, this.deleteType = item.type" class="btn btn-danger funct" data-bs-toggle="modal" data-bs-target="#confirmationModal"><i class="fas fa-trash" title="Удалить"></i></button><br>
              <button @click="downloadRequest(item.path)" :disabled="item.type === 'folder'" class="btn funct" :class="{ 'btn-primary': item.type !== 'folder', 'btn-secondary': item.type === 'folder' }"><i class="fas fa-download" title="Скачать оригинал"></i></button>
            </div>    
          </li>
        </ul>
      </div>
    </div>

    <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Подтверждение</h5><br>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
          </div>
          <div class="modal-body">
            <p>Вы уверены, что хотите продолжить?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="this.confirmActionInput=''">Отмена</button>
            <button type="button" class="btn btn-primary" data-bs-target="#confirmationModal" data-bs-dismiss="modal" @click="deleteRequest()">Да</button>
          </div>
        </div>
      </div>
    </div>
</template>
  
  <script>
 import axios from 'axios';

  export default {
    name: 'TableViewFiles',
    data() {
      return {
        deleteName: '',
        deleteType: '',

      };
    },
    methods: {
      deleteRequest() {
        axios.post(`http://127.0.0.1:8000/api/deleteFile`, { pathToTarget: this.pathToFolders, nameTarget: this.deleteName, typeTarget: this.deleteType})
          .then(response => {
            console.log(response.data);
            })
          .catch(error => {
            console.error(error);
          });
          this.downloadFolders()
          setTimeout(() => {
            this.$router.push('/');
          }, 2000);
          
      },
      downloadFolders(){
        axios.post(`http://127.0.0.1:8000/api/getFolders`, { pathToFile: this.pathToFolders })
          .then(response => {
            this.$store.dispatch('saveFoldersPath', response.data)
          })
  
          .catch(error => {
            console.error('Ошибка при запросе данных:', error);
          });
      },
      downloadRequest(pathDownload){
        axios.get(`http://127.0.0.1:8000/api/download/${pathDownload}`)
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.error('Ошибка при запросе данных:', error);
          });
      },
    },
    computed: {
      folders(){
        return this.$store.getters.foldersWitPath;
      },
      pathToFolders(){
        return this.$store.getters.path;
      },
      arrayLength() {
      return this.folders.length;
      },
  }
  }
  </script>
  
<style>
  .tableView_main{
    border: 2px solid rgb(40, 76, 124);
  }
  .tv-type{
    text-align: right;
    margin: 0 10% 0 0;
    padding: 0;
    color: rgb(134, 134, 134);
  }
  .funct{
    margin: 0 2% 0 2%;
  }
</style>
  
<template>
  <div class="headBar_main">
    <div class="headBar_logo">
      <router-link to="/home" class="btn btn-primary" v-slot="{ navigate }">
        <button @click="navigate">
          Домой    
        </button>
      </router-link>
    </div>
  </div>
  <div class="flexbox">
    <div class="button-group option">
      
      <button class="btn btn-info funct" data-bs-toggle="modal" data-bs-target="#modalForRename"><i class="fas fa-list" title="Переименовать"></i></button><br>
      <p>Переименовать</p>
      <div class="modal fade" id="modalForRename" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Введите новое название</h5><br>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="folderInput" class="form-label">Введите новое название:</label>
                <input type="text" class="form-control" id="folderInput" v-model="newNameInput">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary">Отмена</button>
              <button type="button" class="btn btn-primary" @click="this.confirmActionInput='rename'">Принять</button>
            </div>
          </div>
        </div>
      </div>  
<!-- ---------------------------------------------------------------------------------------------------------------------------------------------- -->
      <button v-if="$route.params.type !== 'folder' && !nickname"  class="btn btn-warning funct" data-bs-toggle="modal" data-bs-target="#modalForNickname"><i class="fas fa-th-list" title="Закрепить никнейм"></i></button>
      <button v-else-if="$route.params.type !== 'folder'" class="btn btn-warning funct" data-bs-toggle="modal" data-bs-target="#modalForNickname"><i class="fas fa-th-list" title="Изменить никнейм"></i></button>
      <p v-if="$route.params.type !== 'folder' && !nickname">Задать никнейм</p>
      <p v-else-if="$route.params.type !== 'folder'">Изменить никнейм</p>
      <div class="modal fade" id="modalForNickname" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Введите никнейм</h5><br>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="folderInput" class="form-label">Введите никнейм:</label>
                <input type="text" class="form-control" id="folderInput" v-model="nickameInput">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
              <button v-if="!nickname" type="button" class="btn btn-primary" @click="this.confirmActionInput='nickname'">Принять</button>
              <button v-else-if="nickname" type="button" class="btn btn-primary" @click="this.confirmActionInput='nicknameUpdate'">Принять</button>
            </div>
          </div>
        </div>
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
            <button type="button" class="btn btn-primary" data-bs-target="#confirmationModal" data-bs-dismiss="modal" @click="confirmAction">Да</button>
          </div>
        </div>
      </div>
    </div>
<!-- ---------------------------------------------------------------------------------------------------------------------------------------------- -->
    <div class="div-in-flexbox">
      <h3>Названия: {{ $route.params.name }}</h3>
      <h3>Тип: {{ $route.params.type }}</h3>
      <h3>Путь: {{ pathToFolders }}</h3>
      <h3 v-if="nickname">Nickname: {{ nickname }}</h3>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'OptionPage',
//-------------------------------------------------------------------
    data() {
      return {
        nickameInput: "",
        newNameInput: "",
      };
    },
//-------------------------------------------------------------------
    computed:{
      pathToFolders(){
        return this.$store.getters.path;
      },
    },
//-------------------------------------------------------------------
    methods: {
      downloadFolders(){
        axios.post(`http://127.0.0.1:8000/api/getFolders`, { pathToFile: this.pathToFolders })
          .then(response => {
            this.$store.dispatch('saveFoldersPath', response.data)
          })
  
          .catch(error => {
            console.error('Ошибка при запросе данных:', error);
          });
      },
      giveNickname(filename, typeFile){
        const nickname = this.nickameInput;
        axios.post(`http://127.0.0.1:8000/api/addNickname`, { pathToFile: this.pathToFolders, nickname: nickname, filename: filename, type: typeFile })
          .then(response => {
            console.log(response.data)
            
          })
          .catch(error => {
            console.error('Ошибка при запросе данных:', error);
          });
      },

      confirmAction(){
        switch (this.confirmActionInput) {
          case 'delete':
          this.deleteRequest(this.$route.params.path, this.$route.params.name, this.$route.params.type);
          console.log('Удалено');
          break;
  
        case 'rename':
          this.renameForFileAndFolders(this.$route.params.name, this.$route.params.type);
          console.log('Переименовано');
          break;
    
        case 'nickname':
          this.giveNickname(this.$route.params.name, this.$route.params.type);
          console.log('Заникнеймено');
          break;
    
        default:
          console.log('Не удалось ничего найти');
          break;
        }
      },

      renameForFileAndFolders(filenameForRename, typeFileForRename){
        let newNameInput = this.newNameInput;
        let oldName = this.pathToFolders + filenameForRename;
        let newName = this.pathToFolders + newNameInput + '.' + typeFileForRename;

        axios.post(`http://127.0.0.1:8000/api/rename`, { oldFileOrFolder: oldName, newFileOrFolder: newName })
          .then(response => {
            console.log(response.data)
            document.getElementById('modalForNickname').style.display = 'none';
          })
          .catch(error => {
            console.error('Ошибка при запросе данных:', error);
          });
      },
    },
    //-------------------------------------------------------------------
    props:{
      name:{
        type: String,
        required: true
      },
      type:{
        type: String,
        required: true
      },
      path:{
        type: String,
        required: true
      },
      nickname:{
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style>
  .option .btn{
    margin: 2%;
  }
  .button-group{
    margin: 5% 0 0 5%;
  }
  .flexbox{
    display: flex;
  }
  .div-in-flexbox{
    margin: 5% 0 0 10%;
  }
  </style>
  
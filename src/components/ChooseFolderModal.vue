<template>
    <div>
        <!-- Кнопка-триггер модального окна -->
        <div class="btn-group">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalForFolder" @click="postRequest(path, true)">
                Выбрать папку
            </button>
            <button type="button" class="btn btn-success funckt" data-bs-toggle="modal" data-bs-target="#modalForCreate" @click="postRequest(path, false)">
                <i class="fas fa-plus" title="Добавить файл"></i>
            </button>
        </div>

        <!-- Модальное окно для выбора папки -->
        <div class="modal fade" id="modalForFolder" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Выберите папку для просмотра</h5><br>
                        <p>(текущая папка - {{ path }})</p>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                    </div>
                    <div class="modal-body">
                        <ChooseFolder :message="dataTr"/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                        <button type="button" class="btn btn-primary" @click="removeLastPart(path)">Назад</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Модальное окно для создания -->
        <div class="modal fade" id="modalForCreate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Выберите файл который нужно тут создать</h5><br>
                        <p>(выбранная папка - {{ path }})</p><br>
                        <p>(текущая папка - {{ pathToDownload }})</p>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                    </div>
                    <div class="modal-body">
                        <ChooseFolder :message="dataFl"/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                        <button type="button" class="btn btn-primary" @click="removeLastPart(path)">Назад</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
  
<script>
    import ChooseFolder from './ChooseFolder.vue'
    import axios from 'axios';

    export default {
        data() {
            return {
                selectedFile: null,
                dataFl: 0,
                dataTr: 1,
            };
        },
        methods: {
            /*savedFolderPath(path){
                this.$store.dispatch('savePath', path)
            },*/

            removeLastPart(path) {
                const lastSlashIndex = path.lastIndexOf('/');
                if(path.length == 3){
                    console.log('пропуск')
                } else if (lastSlashIndex !== -1) {
                    path = path.substring(0, lastSlashIndex);
                }
                this.postRequest(path)
            },
            postRequest(path, conditions) {
                axios.post(`http://127.0.0.1:8000/api/getFolders`, { pathToFile: path})
                .then(response => {
                    this.$store.dispatch('saveFoldersPath', response.data)
                    if(conditions){
                        this.$store.dispatch('savePath', path)
                    }

                    // console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
            },
        },
        components: {
            ChooseFolder
        },
        computed:{
            path(){
                return this.$store.getters.path;
            },
            pathToDownload(){
                if(this.$store.getters.pathToDownload){
                    return this.$store.getters.pathToDownload
                } else {
                    return this.path
                }
            }
        }
    };
  </script>
  
  <style scoped>
  .btn-need{
    margin: 2%
  }
  </style>
  
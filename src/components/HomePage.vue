<template>
    <HeadMenuBar/>
    <TableViewFiles/>
    <PaginationBar/>
    <FooterMenu/>
  </template>
  
  <script>
  import axios from 'axios';
  
  import HeadMenuBar from './HeadMenuBar.vue'
  import TableViewFiles from './TableViewFiles.vue'
  import PaginationBar from './PaginationBar.vue'
  import FooterMenu from './FooterMenu.vue'
  
  export default {
    name: 'HomePage',
    components: {
      HeadMenuBar,
      TableViewFiles,
      PaginationBar,
      FooterMenu
    },
    mounted(){
      setTimeout(() => {
        this.downloadFolders();
      }, 2000);
    },
    computed:{
      folders(){
        return this.$store.getters.foldersWitPath;
      },
      path(){
        return this.$store.getters.path;
      }
    },
    methods: {
      downloadFolders(){
        axios.post(`http://127.0.0.1:8000/api/getFolders`, { pathToFile: this.path })
          .then(response => {
            this.$store.dispatch('saveFoldersPath', response.data)
          })
  
          .catch(error => {
            console.error('Ошибка при запросе данных:', error);
          });
      },
    }
  }
  </script>
  
  <style>
  
  </style>
  
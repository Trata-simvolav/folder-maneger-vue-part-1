<template>
    <div class="headBar_main">
        <div class="headBar_logo">
            LOGO
        </div>
        <div class="headBar_buttons">
            
        </div>
    </div>
    <div>
        <button class="btn btn-primary choosedisk">
            <router-link to="/home">
                <p class="choosedisk">Выбрать для использования: {{pathToTarget}}</p>
            </router-link>
        </button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ChooseDisk',
    mounted(){
      this.getStartPath()
    },
    computed:{
        pathToTarget(){
            return this.$store.getters.path
        }        
    },
    methods:{
      getStartPath(){
        axios.get(`http://127.0.0.1:8000/api/getDisks`)
            .then(response => {
              this.$store.dispatch('savePath', response.data)
              console.log('1111111111111111111111111111')
            })
            .catch(error => {
              console.error('Ошибка при запросе данных:', error);
              console.log('22222222222222222222222222222222')
            });
        },
      }
  }
  </script>
  
  <style>
  .choosedisk .btn-primary{
    margin: 2%;
  }
  .choosedisk{
    margin: 2%;
    color:aliceblue;
  }
  </style>
  
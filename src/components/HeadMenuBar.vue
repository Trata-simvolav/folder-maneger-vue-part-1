<template>
    <div class="headBar_main">
        <div class="headBar_logo">
            LOGO
        </div>
        <div class="headBar_buttons">
            <ChooseFolderModal/>
        </div>
    </div>
</template>
  
<script>
    import ChooseFolderModal from './ChooseFolderModal.vue'

    export default {
        name: 'HaedMenuBar',
        data() {
            return {

            };
        },
        methods: {

        },
        components:{
            ChooseFolderModal
        }
    }
</script>
  
<style>
    .headBar_main{
        background-color:rgb(40, 76, 124);

        padding:1dvh;

        display: flex;
        justify-content: space-between;
    }

    .headBar_logo{
        margin: 2%;
        font-size: large;
        color:aliceblue;
    }

    .headBar_buttons{
        color: rgb(28, 59, 100);

        padding: 2%;
    }
</style>
  
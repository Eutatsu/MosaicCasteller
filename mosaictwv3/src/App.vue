<template>
  <div id="app" class="flex flex-col w-full">
    <nav class="bg-red-600 w-full drop-shadow fixed">
      <div class="flex md:flex-row flex-col  md:items-center justify-between p-2 mx-auto max-w-screen-xl">
      <div class="flex items-center justify-between"><router-link to="/" alt="Pagina d'inici"><div class="flex items-center hover:bg-red-500 rounded-sm">
      <img src="./assets/Mosaic-Logo-SF.png" class="md:w-16 w-12" >
      <h1 class="text-white font-bold text-xl m-3 mr-5 text-nowrap">Mosaic Casteller</h1>
      
      </div></router-link>
      <button @click="ObrirNav()" class="md:hidden text-3xl text-white justify-end px-4 py-2 hover:bg-red-500">
        <font-awesome-icon :icon="['fas', 'bars']" /> 
      </button></div>
      <div  :class="open?'inline':'hidden'" class="md:inline transition-all">
        <ul class="flex md:flex-row flex-col md:items-center text-base gap-1 font-bold text-white mt-3 md:mt-0">
        <router-link v-for="(page,index) in pages.slice(0, 4)" :key="index"  @click="ObrirNav()" :to="page.link" class="group hover:bg-red-500 py-2 px-3 text-nowrap rounded-sm transition-all ">
          <li >
            <span class="group-hover:underline ">{{page.name}}</span></li>
          </router-link>

          <button @click="desplegaJocs=!desplegaJocs" @mouseenter="desplegaJocs=true" @mouseleave="desplegaJocs=false" class="relative group">
            <div 
            class="hover:bg-red-500 py-2 px-3 text-nowrap rounded-sm bg-white hover:text-white text-red-600 drop-shadow ">
          <li class="flex w-full">
            <span class="group-hover:underline ">Jocs </span><span class="text-xs self.start"> NOU</span>
          
          </li>
          
          </div>
          <div class="h-fit md:h-0" :class="desplegaJocs==false?'hidden':'block'">
            <ul class="md:absolute bg-white drop-shadow-lg text-red-600 rounded-sm flex flex-col p-1 h-fit w-full md:w-fit">
              <router-link @click="ObrirNav()" :to="jocs[0].link" class="bg-white py-1 px-3 hover:bg-red-500 rounded-sm hover:text-white hover:underline text-left"><li class="">{{jocs[0].name}}</li></router-link>
              <router-link @click="ObrirNav()" :to="jocs[1].link" class=" py-1 px-3 bg-gray-200 rounded-sm text-left text-gray-400"><li class="">{{jocs[1].name}}</li></router-link>
            </ul>
          </div>
          </button>
          
          <router-link @click="ObrirNav()" :to="pages[4].link" 
          class="group hover:bg-red-500 py-2 px-3 text-nowrap rounded-sm transition-all ">
          <li >
            <span class="group-hover:underline ">{{pages[4].name}}</span></li>
          </router-link>
      </ul>
    </div>
  </div>
    </nav>
    <div class="md:h-20 h-16"></div>
    <main class="grow ">
    <router-view/>
  </main>
    <footer class="bg-red-600 w-full">
      <div class="grid md:grid-cols-3 grid-cols-1  justify-between p-5 mx-auto max-w-screen-xl text-white text-center gap-4">
        <div class="col-span-1"><h3 class="text-lg">Creat per:</h3>
          <p>Eudald Cardozo Vallhonrat</p>
          <a href="https://instagram.com/eutatsu">@eutatsu</a>
          <div class="text-2xl opacity-70 flex gap-2 justify-center mt-2">
            <a href="https://eudald.ca.va@gmail.com" target="blank"><font-awesome-icon :icon="['fas','envelope']"/></a>
            <a href="https://instagram.com/eutatsu" target="blank"><font-awesome-icon :icon="['fab','instagram']"/></a>
            <a href="https://x.com/eutatsu" target="blank"><font-awesome-icon :icon="['fab','twitter']"/></a>
          </div>
        </div>
        <div class="col-span-1 flex flex-col"><h3 class="text-base">Informació extreta de:</h3>
          <ul class="text-sm flex flex-col">
          <a class="hover:underline hover:bg-red-500" href="https://ca.wikipedia.org/wiki/Llista_de_colles_castelleres" target="blank">ca.wikipedia.org</a>
          <a class="hover:underline hover:bg-red-500" href="https://castellscat.cat/ca/les-colles-llistat" target="blank">castellscat.cat</a>
          <a class="hover:underline hover:bg-red-500" href="http://www.portalcasteller.cat/v2/colles/" target="blank">portalcasteller.cat</a>
          <a class="hover:underline hover:bg-red-500" href="https://sigac.cat/colles" target="blank">sigac.cat</a>
        </ul>
        </div>
       <!-- <div class="col-span-1"><h3 class="text-base">Pàgines:</h3> <ul class="flex flex-col md:items-center text-sm text-white mt-3 md:mt-0">
          <router-link v-for="(page,index) in pages" :key="index"  @click="ObrirNav()" :to="page.link" class="group hover:bg-red-500" ><li class="py-1 px-3 "><button class="group-hover:underline ">{{page.name}}</button></li></router-link>
          
      </ul></div>-->
      </div>
    </footer>
  </div>
</template>

<script>
import {ref} from '@vue/reactivity'

export default{
  setup(){
    let open=ref(false)
    let pages=[
      { name:'Mosaic',link:'/'},
      { name:'Colles',link:'/colles'},
      { name:'Linia Temporal',link:'/liniatemporal'},
      { name:'Mapa',link:'/mapa'},
      { name:'Sobre el Mosaic',link:'/about'}]
    let desplegaJocs=ref(false)
    let jocs=[
      { name:'Trobacolla',link:'/jocs/trobacolla'},
      { name:'PicaCamises',link:'#'}]

    function ObrirNav(){
      open.value=!open.value
    }

    return{open,
      ObrirNav,
      pages,
      desplegaJocs,
      jocs
    }
  }
}
</script>

<style>
#app {
  font-family: Aileron , Helvetica, Arial, sans-serif;

  min-height: 100vh;
  display:flex;
  grid-template-rows: auto 1fr auto;
}

nav{
  z-index: 9999;
}

input[type="range"]::-webkit-slider-thumb{
  background-color:#dd1725;
  border-style:none;
}

input[type="range"]::-moz-range-thumb{
  background-color:#dd1725;
  border-style:none;
}

.custom-control-input:checked ~ .custom-control-label::before{
    background-color:#dd1725;
    border-color:#dd1725
}

.tippy-box{
    background-color:rgba(0, 0, 0, 0.5);
    border-radius: 0px;
    
}
.tippy-content{
    padding: 0px;
}

</style>

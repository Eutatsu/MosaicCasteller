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
       <router-link @click="ObrirNav()" to="/" ><li class="hover:bg-red-500 py-2 px-3 text-nowrap rounded-sm"><button >Mosaic</button></li></router-link>
       <router-link @click="ObrirNav()" to="/liniatemporal"> <li class="hover:bg-red-500 py-2 px-3 text-nowrap rounded-sm"><button >Linia Temporal</button></li></router-link>
       <router-link @click="ObrirNav()" to="/mapa"> <li class="hover:bg-red-500 py-2 px-3 text-nowrap rounded-sm"><button >Mapa</button></li></router-link>
       <router-link @click="ObrirNav()" to="/colles"><li  class="hover:bg-red-500 py-2 px-3 text-nowrap rounded-sm"><button >Taula</button></li></router-link>
       <router-link @click="ObrirNav()" to="/about"> <li class="hover:bg-red-500 py-2 px-3 text-nowrap rounded-sm"><button>Sobre el Mosaic</button></li></router-link>
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
        <div class="col-span-1"><h3 class="text-lg">Creat per:</h3>Eudald Cardozo Vallhonrat</div>
        <div class="col-span-1 flex flex-col"><h3 class="text-lg">Informació extreta de:</h3>
          <a class="font-bold hover:underline" href="https://ca.wikipedia.org/wiki/Llista_de_colles_castelleres" target="blank">ca.wikipedia.org</a>
          <a class="font-bold hover:underline" href="https://castellscat.cat/ca/les-colles-llistat" target="blank">castellscat.cat</a>
          <a class="font-bold hover:underline" href="http://www.portalcasteller.cat/v2/colles/" target="blank">portalcasteller.cat</a>
          <a class="font-bold hover:underline" href="https://sigac.cat/colles" target="blank">sigac.cat</a>
          
        </div>
        <div class="col-span-1"><h3 class="text-lg">Pàgines:</h3> <ul class="flex flex-col  md:items-center text-base gap-1 text-white mt-3 md:mt-0">
       <router-link to="/"><li class="py-1 px-3 "><button class="hover:underline">Mosaic</button></li></router-link>
       <router-link to="/liniatemporal"> <li class="py-1 px-3 "><button class="hover:underline">Linia Temporal</button></li></router-link>
       <router-link to="/mapa"> <li class="py-1 px-3"><button class="hover:underline">Mapa</button></li></router-link>
       <router-link to="/taula"><li class="py-1 px-3 "><button class="hover:underline">Taula</button></li></router-link>
       <router-link to="/about"> <li class="py-1 px-3 "><button class="hover:underline">Sobre el Mosaic</button></li></router-link>
      </ul></div>
      </div>
    </footer>
  </div>
</template>

<script>
import {ref} from '@vue/reactivity'

export default{
  setup(){
    let open=ref(false)

    function ObrirNav(){
      open.value=!open.value
    }

    return{open,ObrirNav}
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;

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

<template>
  <div id="app">
    <nav class="bg-red-600 w-full">
      <div class="flex items-center justify-between p-3 p-3 mx-auto max-w-screen-xl">
      <div class="flex items-center">
      <img src="./assets/Mosaic-Logo-SF.png" width="60rem" class="">
      <h1 class="text-white font-bold text-xl m-3 mr-5">Mosaic Casteller</h1>
      
      </div>
      <div><ul class="flex items-center text-base gap-1 font-bold text-white">
        <li to="./" class="hover:bg-red-500 py-1 px-2 rounded"><button >Mosaic</button></li>
        <li to="./" class="hover:bg-red-500 py-1 px-2 rounded"><button >Linia Temporal</button></li>
        <li to="./" class="hover:bg-red-500 py-1 px-2 rounded"><button >Mapa</button></li>
        <li to="./" class="hover:bg-red-500 py-1 px-2 rounded"><button >Llista</button></li>
        <li to="/about" class="hover:bg-red-500 py-1 px-2 rounded"><button>Sobre el Mosaic</button></li>
      </ul></div>
  </div>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

nav button.router-link-exact-active {
  color: #42b983;
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

</style>

<template>
  <div id="app" class="flex flex-col w-full text-center items-center h-full">
    <img src="Mosaic-Logo.svg" width="200rem" class="m-12">
    <h1 class="text-3xl">El Mosaic Casteller s'ha traslladat!</h1>
    <h2 class="text-2xl">Pots trobar la nova versió a <a class="text-red-600 underline font-bold hover:text-red-500" href="https://mosaiccasteller.netlify.app">mosaiccasteller.netlify.app</a></h2>
  </div>
</template>




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

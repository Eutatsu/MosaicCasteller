<template>
    <div class="my-2 mx-auto max-w-screen-lg flex flex-col justify-center h-full">
        <div class="flex justify-center gap-2 my-2">
            <div class="size-24 rounded-sm flex items-center justify-center " :style="{backgroundColor:dades[solucio].codi_color}">
                <span class="text-white font-bold">{{ dades[solucio].color_camisa }}</span>
            </div>
            <div class="size-24 rounded-sm flex items-center justify-center bg-gray-200">
                <span class="text-black font-bold">{{ dades[solucio].fundacio }}</span>
            </div>
            <div class="size-24 rounded-sm flex items-center justify-center bg-gray-200">
                <span class="text-black font-bold text-3xl"><IcoTipEst :colla="dades[solucio]" dada="tipus" class=""/></span>
            </div>
            <div class="size-24 rounded-sm flex items-center justify-center bg-gray-200">
                <span class="text-black font-bold text-3xl"><IcoTipEst :colla="dades[solucio]" dada="estat" class=""/></span>
            </div>
            <div class="size-24 rounded-sm flex items-center justify-center bg-gray-200">
                <span class="text-black font-bold">{{ dades[solucio].localitat }}</span>
            </div>
        </div>
        <div class="flex justify-center gap-2 my-2">
            <div class="size-24 bg-gray-200 rounded-sm"></div>
            <div class="size-24 bg-gray-200 rounded-sm"></div>
            <div class="size-24 bg-gray-200 rounded-sm"></div>
            <div class="size-24 bg-gray-200 rounded-sm"></div>
            <div class="size-24 bg-gray-200 rounded-sm"></div>
        </div>
        
        <div>{{ solucio }}</div>
        <div class="inline-flex  m-2"><input  class="grow rounded-sm border-red-600 border-2 bg-white p-2">
                      
        <button @click="guess()" class="bg-red-600 rounded-sm text-white px-3 mx-2 py-2 font-bold hover:bg-red-500">
                        Endevina 
                     </button></div>
    </div>
</template>

<script>
import {inject} from 'vue'
import IcoTipEst from '@/components/IcoTipEst.vue';

export default{
    components:{
        IcoTipEst
    },
    setup(){
        const dades = inject('dades')
        const solucio = Math.floor(Math.random()*dades.length)
        return{dades,
            solucio
        }
    }
}
</script>
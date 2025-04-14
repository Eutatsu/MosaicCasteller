<template>
    <div class=" mx-auto max-w-screen-lg flex flex-col justify-center h-full min-h-[80vh] px-2 md:px-0 items-center">
        <div class="w-full justify-self-start mt-10"><img :src=TrobaCollaLogo width="100%" class="mx-auto w-4/5 md:w-1/2" alt="Trobacolla">
            <div class="text-center mt-8"><p>L'enigma casteller inspirat en el clàssic modern <a class="text-red-600 hover:text-red-400 underline" 
                href="https://www.nytimes.com/games/wordle/index.html"
                target="blank">Wordle!</a> (o <a class="text-red-600 hover:text-red-400 underline" 
                href="https://jocs.ara.cat/trobamot"
                target="blank">Trobamot</a>)</p>
            <p>Selecciona una colla de la llista per començar a endevinar!</p></div>
        </div>
       
        <div class=" flex flex-col justify-center h-full w-full md:max-w-screen-sm">
            <div class="flex justify-center gap-2 px-2 mb-1 text-center font-bold text-white">
                <div class="hidden md:flex flex-1  bg-red-600 rounded-sm flex items-center justify-center drop-shadow hover:drop-shadow-lg">
                    Colla
                </div>
                <div class="flex-1 text-sm md:text-base bg-red-600 rounded-sm flex items-center justify-center drop-shadow hover:drop-shadow-lg">
                    Camisa
                </div>
                <div class="flex-1  bg-red-600 text-sm md:text-base rounded-sm flex items-center justify-center drop-shadow hover:drop-shadow-lg">
                    Fundació
                </div>
                <div class="flex-1  bg-red-600 text-sm md:text-base rounded-sm flex items-center justify-center drop-shadow hover:drop-shadow-lg">
                    Tipus
                </div>
                <div class="flex-1  bg-red-600 text-sm md:text-base rounded-sm flex items-center justify-center drop-shadow hover:drop-shadow-lg">
                    Estat
                </div>
                <div class="flex-1  bg-red-600 text-sm md:text-base rounded-sm flex items-center justify-center drop-shadow hover:drop-shadow-lg">
                    Població
                </div>
        </div>
        <FilaEnigma v-if="intents.length==0"/>
        <FilaEnigma  v-for="(colla,index) in intents" :key="index" :colla="colla" :solucio="solucio"/>

        <div v-if="correcte()==true" class="justify-center flex flex-col">
        <div class="text-lg text-red-600 text-center">Correcte!</div>
        <button @click="reinicia()" class="bg-red-600 rounded-sm text-white px-3 mx-auto py-2 font-bold hover:bg-red-500 w-fit">
                        Torna a jugar 
                     </button></div>
        <div v-if="error==true" class="text-lg text-red-600 text-center">Selecciona una colla vàlida</div>
        <div class="inline-flex  m-2">
            <div class="grow group flex flex-col"
           
            
            >
                <input v-model="cerca" @change="filtrarDades(cerca)" placeholder="Quina colla es...?" tabindex="0" 
                class=" w-full rounded-sm border-red-600 border-2 bg-white p-2"
                @focus="obreLlista=true"
                @blur="obreLlista=false"
                >
                
                
                <div class="relative h-0 w-full">
            <ul class="absolute w-full bg-white drop-shadow rounded-sm max-h-96 overflow-y-auto p-1 z-[999]"
            :class="obreLlista==true?'inline':'hidden'"
            >
                <li class="inline-flex items-center p-2 hover:bg-red-600 font-bold text-black hover:text-white rounded-sm w-full text-left cursor-pointer"
                :class="intents.includes(colla)?'hidden':{}"
                 v-for="(colla,index) in filtrarDades(cerca)" :key="index"
                @mousedown.prevent="selecciona(colla)"
               > <div :style="{backgroundColor:colla.codi_color}" class="aspect-square h-5 border-solid border border-1 mr-1"></div>
               <div class="flex flex-col md:flex-row md:items-center ">
               <span>{{ colla.nom }}</span>
               <span class="font-normal text-sm mr-2 md:ml-2">{{colla.localitat}} / {{ colla.fundacio }} / 
                <IcoTipEst :tippy=false :key="'estat'+colla.id" :colla="colla" dada="tipus" class=""/> / <IcoTipEst :tippy=false :key="'estat'+colla.id" :colla="colla" dada="estat" class=""/></span>
            </div></li>
            </ul>
        </div>
        </div>
        <button @click="endevina(seleccio)" class="bg-red-600 rounded-sm text-white px-3 mx-2 py-2 font-bold hover:bg-red-500">
                        Endevina! 
                     </button></div>
                    </div>
       
    </div>
</template>

<script>
import {ref, inject} from 'vue'
import FilaEnigma from '@/components/FilaEnigma.vue'
import IcoTipEst from '@/components/IcoTipEst.vue';
import TrobaCollaLogo from '@/assets/TrobaColla-logo.svg'

export default{
    components:{
        FilaEnigma,
        IcoTipEst
    },
    setup(){

        const dades = inject('dades')
        let solucio = ref(dades[Math.floor(Math.random()*dades.length)])
        let seleccio=ref("")
        let cerca=ref("")
        let obreLlista=ref(false)
        let intents=ref([])
        let error=ref(false)

        function selecciona(colla){
            
            cerca.value=colla.nom
            seleccio.value=colla
        }
        dades.sort((a,b)=>a.nom.localeCompare(b.nom))
        

        function endevina(colla){
            if(seleccio.value!==""){
            intents.value.push(colla)
            cerca.value=""
            seleccio.value=""
            error.value=false
        }
            else{
                console.log(seleccio.value)
                error.value=true
            }
        }

        function correcte(){
            if(intents.value.length!==0){
            if(intents.value[intents.value.length-1].id==solucio.value.id){
            return true}
            else{
                return false
            }}
        }
        function reinicia(){
            
            solucio.value = dades[Math.floor(Math.random()*dades.length)]
             intents.value = []
    }

    function eliminarAccents(str){
            return String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            }

        function filtrarDades(cerca){
            let filtrat=dades.filter(colla=>
                eliminarAccents(colla.nom|| "").includes(eliminarAccents(cerca)) ||
                eliminarAccents(colla.color_camisa|| "").includes(eliminarAccents(cerca)) ||
                eliminarAccents(colla.localitat || "").includes(eliminarAccents(cerca))||
                eliminarAccents(colla.fundacio || "").includes(eliminarAccents(cerca))||
                eliminarAccents(colla.tipus || "").includes(eliminarAccents(cerca))||
                eliminarAccents(colla.estat || "").includes(eliminarAccents(cerca))
                
            )
            return filtrat
            
        }
        
      
        return{dades,
            solucio,
            cerca,
            selecciona,
            seleccio,
            filtrarDades,
            eliminarAccents,
            obreLlista,
            endevina,
            intents,
            error,
            TrobaCollaLogo,
            correcte,
            reinicia
        }
    }
}
</script>
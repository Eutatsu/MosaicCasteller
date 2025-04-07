<template>
    <div v-if="validaCastell==null" class="text-red-600 w-32 m-2 p-2 bg-grup-6 border-solid border-2 bg-gray-200 text-center active:border-red-600">
        <img  class="brightness-0" :src="img" width="50%">
        <label><strong>Castell invalid</strong></label>
        <br>
        <label>{{ castell }}</label>
    </div>
   <div v-else class="w-32 m-2 p-2 bg-white rounded-sm border-solid border-2 border-gray-200 hover:bg-gray-200 active:border-red-600 text-center">
       <div class="mb-2">
        <img class="brightness-0" v-if="tipus=='estructura'" :src="img">
        <div v-else class="flex items-end">
        <img  class="brightness-0" :src="img" width="80%"/>
        <div class="flex-col-reverse flex items-center">
            <div v-for="(pis,index) in pisos.tronc" :key="index" 
            class="mt-1 h-0 border-solid border-t-[3px] border-black"
            :style="{width:ampladaPisos(index)+'rem'}">
        
        </div>
        <div class="flex flex-row">
        <div class="flex-col-reverse flex items-center" v-for="(pom,index) in estructura.pom.n" :key="index">
        
            <div v-for="(pis,index) in pisos.pom" :key="index" 
            class="mt-1 h-0 border-solid border-t-[3px] border-black"
            :class="index==pisos.pom-1?'w-1.5':'w-2.5'">

            
        </div>
     </div>
    </div>
        
        </div>
    </div>
    </div>
        <label><strong>{{ castell }}</strong></label>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import estructures from "../json/estructures.json"

export default{
    props:{
        tipus:{
            type:String,
            default:"castell"
        },
        castell:{
            type:String,
            default:"pd5"
        },

    },
    setup(props){
        const estructuresRef = ref(estructures)

        const validaCastell=computed(()=>{
            //Comprovar que l'entrada encaixa amb Estructura + d + Pisos + Modificadors
            const lectura = props.castell.match(/^([a-zA-Z\d]+)d(\d+)([a-z]*)$/)
            
            if (lectura){
                //Comprovar que la estructura sigui un caracter valid
                const valorEstructura =(["T","t","P","p"].includes(lectura[1])||!isNaN(lectura[1]))&&parseInt(lectura[2])<11; 
                
                if (valorEstructura){
                    //Normalitzar nomencaltura
                    //Si es fa servir la nomenclatura de Torre es canvia per un 2
                    if (lectura[1]==["T"]||lectura[1]==["t"]){
                        lectura[1]="2"
                    }
                    //P majuscula a minuscula
                    if (lectura[1]==["P"]){
                        lectura[1]="p"
                    }
                return lectura
                }
                else{
                    return null
                }
            }
            else{
                return null
            }
        })
    const estructura = computed(() => {
      if (validaCastell.value === null) return null
      const notacio = validaCastell.value[1]
      return Object.values(estructuresRef.value).find(obj => obj.notacio === notacio)
    })

    const pisos = computed(()=>{
        if (validaCastell.value === null) return null
        const tronc = parseInt(validaCastell.value[2]) - estructura.value.pom.pisos
        const pom = estructura.value.pom.pisos
        return {pom,tronc}
    })

    const mods = computed(()=> {
        if (validaCastell.value === null||validaCastell.value[3]==='') return null
        else if (['a','p','n','f','fm','fmp','s','aco'].includes(validaCastell.value[3])){
            return validaCastell.value[3]
        }
        else{
            return null
        }
    })

    const img = computed(()=> {
        if (validaCastell.value === null) return require(`@/assets/estructures/pilar.svg`)
        return require(`@/assets/estructures/`+ estructura.value.img);
    })

    function ampladaPisos(index){
        
        if(estructura.value.notacio=='p'&&index!==0){
            //Ampalda Pis de Pilar
            return 2/4
        }
        else if (index==0&&estructura.value.notacio!=='p'){
            //Amplada Pinya Base
            return (5+((estructura.value.pom.n-1))*2)/4
        }
        else if(estructura.value.notacio=='p'&&index==0){
            return 1
        }
        else{
            //Amplada Pis Base
            return (3.5+((estructura.value.pom.n-1))*2)/4
        }
        
    }

    return{
            estructuresRef,
            validaCastell,
            estructura,
            pisos,
            mods,
            img,
            ampladaPisos
        }
    }
}
</script>
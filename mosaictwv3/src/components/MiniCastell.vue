<template>
    <div v-if="validaCastell=='error'" class="w-32 m-2 p-2 bg-grup-6 border-solid border-2 border-grup-4 hover:bg-blau-500 active:border-white text-center">
        <img :src="img">
        <label><strong>Castell invalid</strong></label>
    </div>
    <div v-else class="w-32 m-2 p-2 bg-white rounded-sm border-solid border-4 border-gray-200 hover:bg-gray-200 active:border-red-600 text-center">
       <div class="mb-2">
        <img class="brightness-0" v-if="tipus=='estructura'" :src="img">
        <div v-else class="flex items-end">
        <img  class="brightness-0" :src="img" width="80%"/>
        <div class="flex-col-reverse flex items-center">
            <!--<div class="w-5 mt-1 h-0 border-solid border-t-[3px] border-white"></div>-->
            <div v-for="(pis,index) in pisos.tronc" :key="index" class="w-3.5 mt-1 h-0 border-solid border-t-[3px] border-black"></div>
            <div v-for="(pis,index) in pisos.pom" :key="index" class="w-2.5 mt-1 h-0 border-solid border-t-[3px] border-black"></div>
            <!--<div class="w-1.5 mt-1 h-0 border-solid border-t-[3px] border-white"></div>-->
           
        
        </div>
    </div>
    </div>
        <label><strong>{{ etiqueta }}</strong></label>
    </div>
</template>

<script>
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
    data(){
        return{
            estructures,
        }
    },
    computed:{
        validaCastell(){
            const lectura = this.castell.match(/^([a-zA-Z\d]+)d(\d+)([a-z]*)$/)
            if (lectura){
                const valors =["T","t","P","p"].includes(lectura[1])||!isNaN(lectura[1]); 
                if(valors){
                    if (lectura[1]==["T"]||lectura[1]==["t"]){
                        lectura[1]="2"
                    }
                    if (lectura[1]==["P"]){
                        lectura[1]="p"
                    }
                return lectura
            }
                else{
                console.log("estructura invalida")
                return "error"
            }
            }
            else{
                console.log("castell invalid")
                return "error"
            }
        },

        estructura(){
            const notacio = this.validaCastell[1]
                return Object.values(estructures).find(obj => obj.notacio === notacio)
            
            
        },

        pisos(){
            
            const tronc=parseInt(this.validaCastell[2])-this.estructura.pom.pisos
            const pom=this.estructura.pom.pisos
            console.log("Pisos Tronc:"+tronc)
            console.log("Pisos Pom:"+pom)
            return {pom:pom,tronc:tronc}
        },


        img(){
            return require("../assets/estructures/"+this.estructura.img)
        },


        etiqueta(){
            if (this.tipus=="estructura"){
                return this.estructura.notacio
            }
            else{
                return this.castell
            }
        }
    }
}
</script>
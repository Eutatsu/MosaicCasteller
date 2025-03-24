<template>
    <div> 
        <div class="max-w-screen-lg mx-auto my-2">
            <div id="opcions" class="mx-4">
                <div  id="opcions-l1" class="grid justify-between grid-cols-12 my-1">
                    <input v-model="cerca" class="border-solid border-red-600 border-2 my-2 rounded-sm lg:col-span-4 md:col-span-5 col-span-12 p-1" placeholder="Cerca colles o colors...">
                    
                    <div class="flex items-center  md:justify-end lg:col-span-8 md:col-span-7 col-span-12 justify-start ">
                    <label class="text-nowrap " for="ordena">Ordena per: </label>
                    <select id="ordena" class="rounded-sm border-red-600 border-2 bg-white p-2">
                        <option @click="ordenarNom()">Nom</option>
                        <option @click="ordenarColor()" >Color</option>
                        <option @click="ordenarNomColor()">Nom del Color</option>
                        <option @click="ordenarLlum()">Lluminositat</option>

                        <option @click="ordenarColorLlum()">Llum i Color</option>                
                        <option @click="ordenarFundacio()">Data de Fundacio</option>
                    <!--<b-form-select-option value="default">Default</b-form-select-option>-->
                </select>
            </div>
                </div>
                <div  id="opcions-l2" class="grid justify-center grid-cols-12 my-1">
                    <h2 class="text-xl md:col-span-6 col-span-12">Visualització ({{ dades_ordenades.length }} Colles):</h2>
                <div class="inline-flex items-center md:col-span-6 col-span-12 flex-wrap">
                <label class="mida_rajoles text-nowrap" for="ordena">Mida tessel·les: </label>
                    <div class="inline-flex items-center md:w-auto w-full grow">
                    <input class="w-full appearance-none bg-gray-200 h-2 rounded-full mx-1 grow" type="range" min="5" max="200" v-model="mida">
                    <input class="border-solid border-red-600 border-2 p-1 w-10 text-center rounded-sm" :placeholder="mida" v-model="mida">
                    <p class="mb-0">px</p>
                    </div>
                </div>
                </div>
                <div  id="opcions-l3" class="grid justify-center grid-cols-12 gap-3 my-1">
                    <div class="col-span-6 grid grid-cols-12 justify-between items-center">
                    <div class="flex items-center justify-between col-span-12 mx-2"><h3 class="text-lg">Tipus:</h3>
                        <label class="inline-flex flex-nowrap"><input type="checkbox" class="mx-1 accent-red-600" v-model="seccions_tipus" :value=true>Separa</label>
                    </div>
                        <div class="col-span-12 inline-flex gap-x-3 gap-y-2 items-start flex-wrap md:flex-row flex-col ">
                            <label class="inline-flex flex-nowrap items-center rounded-sm border-solid hover:bg-gray-200 hover:border-red-600 border-2 p-1 " 
                                :class="tipus.includes('convencional')?'border-red-600 border-solid border-2':'border-white'">
                                <input type="checkbox" class="hidden" value="convencional" v-model="tipus">
                            <font-awesome-icon 
                            class="text-lg mr-1"
                            :class="tipus.includes('convencional')?'text-red-600':'text-gray-500'"  :icon="['fas', 'house']" />Convencionals
                            <font-awesome-icon v-if="tipus.includes('convencional')" :icon="['fas', 'check']" class="ml-1 text-red-600" /> </label>
                            
                            <label class="inline-flex flex-nowrap items-center rounded-sm border-solid hover:bg-gray-200 hover:border-red-600 border-2 p-1 " 
                                :class="tipus.includes('universitaria')?'border-red-600 border-solid border-2':'border-white'">
                                <input type="checkbox" class="hidden" value="universitaria" v-model="tipus">
                            <font-awesome-icon 
                            class="text-lg mr-1"
                            :class="tipus.includes('universitaria')?'text-red-600':'text-gray-500'"  :icon="['fas', 'graduation-cap']"/>Universitaries
                            <font-awesome-icon v-if="tipus.includes('convencional')" :icon="['fas', 'check']" class="ml-1 text-red-600" /> </label>
                            
                            <label class="inline-flex flex-nowrap items-center rounded-sm border-solid hover:bg-gray-200 hover:border-red-600 border-2 p-1 " 
                                :class="tipus.includes('internacional')?'border-red-600 border-solid border-2':'border-white'">
                                <input type="checkbox" class="hidden" value="internacional" v-model="tipus">
                            <font-awesome-icon 
                            class="text-lg mr-1"
                            :class="tipus.includes('internacional')?'text-red-600':'text-gray-500'"  :icon="['fas', 'earth-americas']"/>Internacionals
                            <font-awesome-icon v-if="tipus.includes('convencional')" :icon="['fas', 'check']" class="ml-1 text-red-600" /> </label>
                       
                    </div>
                    </div>
                    <div class="col-span-6 grid grid-cols-12 justify-between items-center">
                        <div class="flex items-center justify-between col-span-12 mx-2"><h3 class="text-lg">Estat:</h3>
                        <label class="inline-flex flex-nowrap"><input type="checkbox" class="mx-1 accent-red-600" v-model="seccions_estat" :value=true>Separa</label>
                    </div>
                        <div class="col-span-12 inline-flex gap-x-3 gap-y-2 items-start flex-wrap md:flex-row flex-col mx-4">

                        <label class="rounded-sm inline-flex flex-nowrap items-center border-solid hover:bg-gray-200 hover:border-red-600 border-2 p-1 " 
                            :class="estat.includes('activa')?'border-red-600 border-solid border-2':'border-white'">
                            <input type="checkbox" class="hidden" value="activa" v-model="estat">
                        <font-awesome-icon 
                        class="text-lg mr-1"
                        :class="estat.includes('activa')?'text-red-600':'text-gray-500'"  :icon="['fas', 'fire']" />Actives
                        <font-awesome-icon v-if="estat.includes('activa')" :icon="['fas', 'check']" class="ml-1 text-red-600" /> </label>
                        
                        <label class="rounded-sm inline-flex flex-nowrap text-norawp items-center border-solid hover:bg-gray-200 hover:border-red-600 border-2 p-1 " 
                            :class="estat.includes('formacio')?'border-red-600 border-solid border-2':'border-white'">
                            <input type="checkbox" class="hidden" value="formacio" v-model="estat">
                        <font-awesome-icon 
                        class="text-lg mr-1"
                        :class="estat.includes('formacio')?'text-red-600':'text-gray-500'"  :icon="['fas', 'seedling']" />En formació
                        <font-awesome-icon v-if="estat.includes('formacio')" :icon="['fas', 'check']" class="ml-1 text-red-600" /> </label>
                        
                        <label class="rounded-sm inline-flex flex-nowrap items-center border-solid hover:bg-gray-200 hover:border-red-600 border-2 p-1 " 
                            :class="estat.includes('desapareguda')?'border-red-600 border-solid border-2':'border-white'">
                            <input type="checkbox" class="hidden" value="desapareguda" v-model="estat">
                        <font-awesome-icon 
                        class="text-lg mr-1"
                        :class="estat.includes('desapareguda')?'text-red-600':'text-gray-500'"  :icon="['fas', 'wind']" />Desaparegudes
                        <font-awesome-icon v-if="estat.includes('desapareguda')" :icon="['fas', 'check']" class="ml-1 text-red-600" /> 
                    </label>
                        
                    </div>
                    </div>
                </div>
                <div  id="opcions-l4" class="grid justify-center grid-cols-12 gap-3 my-1">
                    
                    
                </div>
                <div class="flex-col flex justify-start gap-2">
                    <button @click="MesOpcions()" class="bg-red-600 rounded-sm text-white px-3 py-2 font-bold w-fit hover:bg-red-500">
                        <font-awesome-icon :icon="['fas', 'eye']" /> Més Opcions <font-awesome-icon :icon="['fas', 'chevron-down']" class="transition-all transition-500" :class="desplegar?'rotate-180':{}"/> 
                    </button>
                    <div :class="desplegar?'inline':'hidden'" class="mx-2 flex gap-x-6">
                    <label  class="inline-flex flex-nowrap">
                        <input type="checkbox" class="mx-1 accent-red-600 inline-flex flex-nowrap" :value=false v-model="escuts">
                        Mostra Escuts
                    </label>
                    <label  class="inline-flex flex-nowrap">
                        <input type="checkbox" class="mx-1 accent-red-600 inline-flex flex-nowrap" :value=true v-model="icones_tipus">
                        Icones Tipus
                    </label>
                    <label  class="inline-flex flex-nowrap">
                        <input type="checkbox" class="mx-1 accent-red-600 inline-flex flex-nowrap" :value=false v-model="icones_estat">
                        Icones Estat
                    </label>
                    <label  class="inline-flex flex-nowrap">
                        <input type="checkbox" class="mx-1 accent-red-600 inline-flex flex-nowrap" :value=false v-model="patrons">
                        Patrons Especials
                    </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="mx-auto">  
            <div v-if="seccions_tipus==true && seccions_estat==false">
                <div  v-if="tipus.includes('convencional')">
                <h5 class="mt-3 text-2xl text-center">Colles Convencionals</h5>
                <MosaicRenderer
                    :llista="dades_ordenades"
                    :cerca="cerca"
                    :mida="mida"
                    seleccio="coneguts"
                    
                    id="convencional"
                    :tipus="['convencional']"
                    :estat="estat"
                    :escuts="escuts"
                    :icones_tipus="icones_tipus"
                    :icones_estat="icones_estat"
                    :reRenderKey=reRenderKey

                />
                </div>
                <div  v-if="tipus.includes('universitaria')">
                <h5 class="mt-3 text-2xl text-center">Colles Universitàries</h5>
                <MosaicRenderer
                    :llista="dades_ordenades"
                    :cerca="cerca"
                    :mida="mida"
                    seleccio="coneguts"
                    
                    id="universitaria"
                    :tipus="['universitaria']"
                    :estat="estat"
                    :escuts="escuts"
                    :icones="icones"
                    :icones_estat="icones_estat"
                    :reRenderKey=reRenderKey
                />
                </div>
                    <div  v-if="tipus.includes('internacional')">
                    <h5 class="mt-3 text-2xl text-center">Colles Internacionals</h5>
                    <MosaicRenderer
                        :llista="dades_ordenades"
                        :cerca="cerca"
                        :mida="mida"
                        seleccio="coneguts"
                        
                        id="internacional"
                        :tipus="['internacional']"
                        :estat="estat"
                        :escuts="escuts"    
                        :icones_tipus="icones_tipus"
                        :icones_estat="icones_estat"
                        :reRenderKey=reRenderKey
                    />
                </div>
            </div>

        <!--Seccions segons Estat-->
            <div v-if="seccions_estat==true&&seccions_tipus==false">
                <div  v-if="estat.includes('activa')">
                <h5 class="mt-3 text-2xl text-center">Colles Actives</h5>
                    <MosaicRenderer
                        :llista="dades_ordenades"
                        :cerca="cerca"
                        :mida="mida"
                        seleccio="coneguts"
                        
                        id="activa"
                        :tipus="tipus"
                        :estat="['activa']"
                        :escuts="escuts"
                        :icones_tipus="icones_tipus"
                        :icones_estat="icones_estat"
                        :reRenderKey=reRenderKey
                    />
                </div>
                <div  v-if="estat.includes('formacio')">
                <h5 class="mt-3 text-2xl text-center">Colles En formació</h5>
                    <MosaicRenderer
                        :llista="dades_ordenades"
                        :cerca="cerca"
                        :mida="mida"
                        seleccio="coneguts"
                        
                        id="formacio"
                        :tipus="tipus"
                        :estat="['formacio']"
                        :escuts="escuts"
                        :icones_tipus="icones_tipus"
                        :icones_estat="icones_estat"
                        :reRenderKey=reRenderKey
                    />
                </div>
                <div  v-if="estat.includes('desapareguda')">
                    <h5 class="mt-3 text-2xl text-center">Colles Desaparegudes</h5>
                    <MosaicRenderer
                        :llista="dades_ordenades"
                        :cerca="cerca"
                        :mida="mida"
                        seleccio="coneguts"
                        
                        id="desapareguda"
                        :tipus="tipus"
                        :estat="['desapareguda']"
                        :escuts="escuts"
                        :icones_tipus="icones_tipus"
                        :icones_estat="icones_estat"
                        :reRenderKey=reRenderKey
                        />
                </div>
            </div>

            <!-- Mosaic per defecte -->
            <div class="mx-auto w-fit" v-else-if="(seccions_estat==false&&seccions_tipus==false)||(seccions_estat==true&&seccions_tipus==true)">
                <MosaicRenderer
                    :llista="dades_ordenades"
                    :cerca="cerca"
                    :mida="mida"
                    seleccio="coneguts"
                    
                    id="coneguts"
                    :tipus="tipus"
                    :estat="estat"
                    :escuts="escuts"
                    :icones_tipus="icones_tipus"
                    :icones_estat="icones_estat"
                    :reRenderKey=reRenderKey
                />  
            </div>
            <br>
        <h5  class="mt-3 text-2xl text-center">Colles amb Colors Desconeguts:</h5>
        <MosaicRenderer
        id="desconeguts"
        :llista="dades_ordenades"
        :cerca="cerca"
        :mida="mida"
        seleccio="desconeguts"
        
        :tipus="tipus"
        :estat="estat"
        :escuts="escuts"
        :icones_tipus="icones_tipus"
        :icones_estat="icones_estat"
        :reRenderKey=reRenderKey
        />
            
        </div>
    </div>
</template>
<script>
import {ref} from '@vue/reactivity'
import dades from '../json/dades_colles_id.json'
import MosaicRenderer from '@/components/MosaicRenderer.vue';

export default{
        components:{
            MosaicRenderer
        },
        setup(){
            let desplegar=ref(false)

            function MesOpcions(){
                desplegar.value=!desplegar.value
            }
            return{desplegar,MesOpcions}
        },
        data(){
              return{
                dades,
                dades_ordenades:[],
                mida:"80",
                cerca: '',
                tipus: ["convencional","universitaria","internacional"],
                estat: ["activa","formacio","desapareguda"],
                seccions_tipus: false,
                seccions_estat: false,
                perfil_color:"default",
                escuts: false,
                icones_tipus: true,
                icones_estat: false,
                
                    }
                
                
                },
        
        methods:{
            
            ordenarNom(){
                this.dades_ordenades.sort((a,b)=>a.nom.localeCompare(b.nom))
                this.reRenderKey++
            },
            ordenarColor(){
                this.dades_ordenades.sort((a,b)=>a.color_hsl[0] - b.color_hsl[0])
                this.dades_ordenades.sort((a,b)=>(a.color_hsl[1]<=10) - (b.color_hsl[1]<=10))
                this.reRenderKey++
            },
            ordenarColorLlum(){
                this.dades_ordenades.sort((a,b)=>a.color_hsl[2] - b.color_hsl[2])
                let step=360/15
                for(let i=0;(step)*i<=360;i++){
                    this.dades_ordenades.sort((a,b)=>(a.color_hsl[0]<=step*(i+1)&&a.color_hsl[0]>=step*i) - (b.color_hsl[0]<=step*(i+1)&&a.color_hsl[0]>=step*i))
                    
                }
                this.dades_ordenades.sort((a,b)=>(a.color_hsl[1]<=10) - (b.color_hsl[1]<=10))
                this.reRenderKey++
            },
            ordenarLlum(){
                this.dades_ordenades.sort((a,b)=>a.color_hsl[2] - b.color_hsl[2])
                this.reRenderKey++
            },
            ordenarNomColor(){
                this.dades_ordenades.sort((a,b)=>a.color_camisa.localeCompare(b.color_camisa))
                this.reRenderKey++
            },
            ordenarFundacio(){
                this.dades_ordenades.sort((a,b)=>(Number(a.fundacio)||0) - (Number(b.fundacio)||0))
                this.reRenderKey++
            },
            
            

        },
        created(){
            
            this.dades_ordenades=[...this.dades]
            this.ordenarNom()
            },
            }
</script>

<style scoped>

.casella{
    padding:0px;
}

.casella:hover{
    padding:0px;
}

</style>

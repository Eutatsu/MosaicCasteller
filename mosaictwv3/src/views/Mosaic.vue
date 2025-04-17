<template>
    <div> 
        
        <div class="max-w-screen-lg mx-auto my-4 px-2 lg:px-0 flex flex-col gap-y-2">
            <div  id="opcions-l1" class="md:inline-flex flex flex-col md:flex-row w-full gap-x-4 gap-y-2 grid-cols-12 items-left rounded-sm drop-shadow bg-white p-2">
                    <input v-model="cerca" class="grow border-solid border-red-600 border-2 rounded-sm lg:col-span-4 md:col-span-5 col-span-12 p-1.5" placeholder="Cerca colles, colors o municipis...">
                    
                    <div class="flex items-center  justify-end lg:col-span-8 md:col-span-7 col-span-12  ">
                    <label class="text-nowrap " for="ordena">Ordena per:</label>
                    <select id="ordena" @change="ordenar($event.target.value)" class="rounded-sm border-red-600 border-2 bg-white p-2 ml-2">
                        
                        
                        <option value="nom">Nom</option>
                        <option value="color">Color</option>
                        <option value="fundacio">Data de Fundacio</option>
                        <option value="llum">Lluminositat</option>
                        <option value="nomcolor">Nom del Color</option>
                        <option value="colorllum">Llum i Color</option>   
                    <!--<b-form-select-option value="default">Default</b-form-select-option>-->
                </select>
            </div>
                </div>
                <div  class="grid justify-center grid-cols-12 items-center rounded-sm drop-shadow bg-white px-2 py-1">
                    <h2 class="text-xl md:col-span-6 col-span-12">Visualització: ({{ filtrarDades(cerca).length }} Colles)</h2>
                <div class="inline-flex items-center md:col-span-6 col-span-12 flex-wrap">
                <label class="mida_rajoles text-nowrap" for="ordena">Mida tessel·les: </label>
                    <div class="inline-flex items-center md:w-auto w-full grow">
                    <input class="w-full appearance-none bg-gray-200 h-2 rounded-full mx-1 grow" type="range" min="5" max="200" v-model="mida">
                    <input class="border-solid border-red-600 border-2 p-1 w-10 text-center rounded-sm" :placeholder="mida" v-model="mida">
                    <p class="mb-0 ml-1">px</p>
                    </div>
                </div>
                </div>
                <div  id="opcions-l3" class="grid justify-center grid-cols-12 gap-2">
                    <div class="col-span-6 grid grid-cols-12 justify-between items-center rounded-sm drop-shadow bg-white p-2">
                    <div class="flex items-center justify-between col-span-12 mb-1"><h3 class="text-lg">Tipus:</h3>
                        <label class="inline-flex flex-nowrap"><input type="checkbox" class="mx-1 accent-red-600" v-model="seccions_tipus" :value=true>Separa</label>
                    </div>
                        <div class="col-span-12 inline-flex gap-x-1 gap-y-2 items-start flex-wrap md:flex-row flex-col text-sm">
                            <button  class="inline-flex items-center group md:flex-1 justify-right hover:bg-gray-200 hover:drop-shadow w-full" 
                            
                            v-for="value in ['convencional','universitaria','internacional']"
                            :key="value"
                            @click="toggleArray(tipus,value)"
                            :value="value">
                            <font-awesome-icon 
                            class="
                            drop-shadow
                            text-lg 
                            aspect-square 
                            inline-flex 
                            flex-nowrap 
                            items-center 
                            rounded-sm 
                            border-solid 
                            bg-gray-200 
                            border-2 p-1 
                            justify-center mr-1"
                            :class="tipus.includes(value)?
                            'border-red-600 group-hover:border-red-500 bg-red-600 border-solid border-2 text-white group-hover:border-red-500 group-hover:bg-red-500':
                            'text-gray-500  group-hover:border-red-600'"  
                            :icon="
                            value=='convencional'?['fas', 'house']:
                            value=='universitaria'?['fas', 'graduation-cap']:
                            value=='internacional'?['fas', 'earth-americas']:
                            {}
                            "/>
                            <span>{{formatBotons(value)}}</span>
                            <font-awesome-icon v-if="tipus.includes(value)" :icon="['fas', 'check']" class="ml-1 text-white-600" /> 
                            </button>
                            
                           
                       
                    </div>
                    </div>
                    <div class="col-span-6 grid grid-cols-12 justify-between items-center rounded-sm drop-shadow bg-white p-2">
                        <div class="flex items-center justify-between col-span-12 mb-1"><h3 class="text-lg">Estat:</h3>
                        <label class="inline-flex flex-nowrap"><input type="checkbox" class="mx-1 accent-red-600" v-model="seccions_estat" :value=true>Separa</label>
                    </div>
                    <div class="col-span-12 inline-flex gap-x-1 gap-y-2 items-start flex-wrap md:flex-row flex-col text-sm">

                        <button  class="inline-flex items-center group md:flex-1 w-full justify-right hover:bg-gray-200 hover:drop-shadow" 
                            
                            v-for="value in ['activa','formacio','desapareguda']"
                            :key="value"
                            @click="toggleArray(estat,value)"
                            :value="value">
                            <font-awesome-icon 
                            class="
                            drop-shadow
                            text-lg 
                            aspect-square 
                            inline-flex 
                            flex-nowrap 
                            items-center 
                            rounded-sm 
                            border-solid 
                            bg-gray-200 
                            border-2 p-1 
                            justify-center mr-1"
                            :class="estat.includes(value)?
                            'border-red-600 group-hover:border-red-500 bg-red-600 border-solid border-2 text-white group-hover:border-red-500 group-hover:bg-red-500':
                            'text-gray-500  group-hover:border-red-600'"  
                            :icon="
                            value=='activa'?['fas', 'fire']:
                            value=='formacio'?['fas', 'seedling']:
                            value=='desapareguda'?['fas', 'cross']:
                            {}
                            " />
                            <span class="text-nowrap">{{formatBotons(value)}}</span>
                            
                            <font-awesome-icon v-if="estat.includes(value)" :icon="['fas', 'check']" class="ml-1 text-white-600" /> 
                            </button>
                            
                        
                    </div>
                    </div>
                </div>
                <div class="flex-col flex justify-start gap-2 rounded-sm drop-shadow bg-white p-2">
                    <button @click="desplegar=!desplegar" class="bg-red-600 rounded-sm text-white px-3 py-2 font-bold w-fit hover:bg-red-500">
                        <font-awesome-icon :icon="['fas', 'eye']" /> Més Opcions 
                        <font-awesome-icon :icon="['fas', 'chevron-down']" class="transition-all transition-1000" :class="desplegar?'rotate-180':{}"/> 
                    </button>
                    <div :class="desplegar?'inline':'hidden'" class="mx-2 flex gap-x-6 items-start flex-wrap text-nowrap">
                        
                    <label   class="inline-flex flex-nowrap items-center hover:bg-gray-200 p-1 rounded-sm flex-1">
                        <input type="checkbox" class="mx-1 accent-red-600 inline-flex flex-nowrap" :value=false v-model="escuts">
                        Mostra Escuts
                    </label>
                    <label  class="inline-flex flex-nowrap items-center hover:bg-gray-200 p-1 rounded-sm flex-1">
                        <input type="checkbox" class="mx-1 accent-red-600 inline-flex flex-nowrap" :value=false v-model="nom_color">
                        Nom del color
                    </label>
                    <label   class="inline-flex flex-nowrap items-center hover:bg-gray-200 p-1 rounded-sm flex-1">
                        <input type="checkbox" class="mx-1 accent-red-600 inline-flex flex-nowrap" :value=true v-model="icones_tipus">
                        Icones Tipus
                    </label>
                    <div class="flex flex-col hover:bg-gray-200 p-1 rounded-sm flex-1">
                        <label   class="inline-flex flex-nowrap items-center ">
                            <input type="checkbox" class="mx-1 accent-red-600 inline-flex flex-nowrap" :value=false v-model="icones_estat">
                            Icones Estat
                        </label>
                            <label  class="inline-flex flex-nowrap text-sm items-center hover:bg-white p-1 rounded-sm">
                                <input type="checkbox" class="mx-1 accent-red-600 inline-flex flex-nowrap" :value=false v-model="nomes_desparegudes">
                                Només Desparegudes
                            </label>
                    </div>
                    <label   class="inline-flex flex-nowrap items-center hover:bg-gray-200 p-1 rounded-sm flex-1">
                        <input type="checkbox" class="mx-1 accent-red-600 inline-flex flex-nowrap" :value=false v-model="patrons">
                        Patrons Especials
                    </label>
                    </div>
                </div>
            
        </div>
        <div class="mx-auto mb-8">  
            <div v-if="seccions_tipus==true && seccions_estat==false">
                <div  v-if="tipus.includes('convencional')">
                <MosaicRenderer
                        titol="Colles Convencionals"
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

                />
                </div>
                <div  v-if="tipus.includes('universitaria')">
                <MosaicRenderer
                        titol="Colles Universitàries"
                    :llista="dades_ordenades"
                    :cerca="cerca"
                    :mida="mida"
                    seleccio="coneguts"
                    
                    id="universitaria"
                    :tipus="['universitaria']"
                    :estat="estat"
                    :escuts="escuts"
                    :icones="icones_tipus"
                    :icones_estat="icones_estat"
                />
                </div>
                    <div  v-if="tipus.includes('internacional')">
                    <MosaicRenderer
                        titol="Colles Internacionals"
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
                    />
                </div>
            </div>

        <!--Seccions segons Estat-->
            <div v-if="seccions_estat==true&&seccions_tipus==false">
                <div  v-if="estat.includes('activa')">
                    <MosaicRenderer
                        titol="Colles Actives"
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
                    />
                </div>
                <div  v-if="estat.includes('formacio')">
                    <MosaicRenderer
                        titol="Colles en Formació"
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
                    />
                </div>
                <div  v-if="estat.includes('desapareguda')">
                    <MosaicRenderer
                        titol="Colles Desaparegudes"
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
                        />
                </div>
            </div>

            <!-- Mosaic per defecte -->
            <div class="mx-auto w-fit" v-else-if="(seccions_estat==false&&seccions_tipus==false)||(seccions_estat==true&&seccions_tipus==true)">
                <MosaicRenderer
                    :llista="filtrarDades(cerca)"
                    :mida="mida"
                    seleccio="coneguts"
                    
                    id="coneguts"
                    :tipus="tipus"
                    :estat="estat"
                    :escuts="escuts"
                    :patrons="patrons"
                    :icones_tipus="icones_tipus"
                    :icones_estat="icones_estat"
                    :nomes_desparegudes="nomes_desparegudes"
                    :nom_color="nom_color"
                />  
            </div>
            <br>
        <MosaicRenderer
        titol="Colles amb Colors Desconeguts"
        id="desconeguts"
        :llista="filtrarDades(cerca)"
        :mida="mida"
        seleccio="desconeguts"
        
        :tipus="tipus"
        :estat="estat"
        :escuts="escuts"
        :icones_tipus="icones_tipus"
        :icones_estat="icones_estat"
        />
            
        </div>
    </div>
</template>
<script>
import { ref, inject } from 'vue'

import MosaicRenderer from '@/components/MosaicRenderer.vue';

export default{
        components:{
            MosaicRenderer
        },
        setup(){
            //Dades i control mosaic
            const dades = inject('dades')
            let dades_ordenades=ref(dades.sort((a,b)=>a.nom.localeCompare(b.nom)))
            
            let mida = ref("80")
            let cerca=ref("")

            let tipus=ref(["convencional","universitaria","internacional"])
            let estat=ref(["activa","formacio","desapareguda"])

            let seccions_tipus=ref(false)
            let seccions_estat=ref(false)

            let perfil_color=ref('default')
            let escuts=ref(false)
            let patrons=ref(false)
            let icones_tipus=ref(true)
            let icones_estat=ref(false)
            let nomes_desparegudes=ref(true)
            let nom_color=ref(false)
            
            function ordenarNom(){
                 dades_ordenades.value.sort((a,b)=>a.nom.localeCompare(b.nom))
            }
            function ordenarColor(){
                 dades_ordenades.value.sort((a,b)=>a.color_hsl[0] - b.color_hsl[0])
                 dades_ordenades.value.sort((a,b)=>(a.color_hsl[1]<=10) - (b.color_hsl[1]<=10))
            }

            function ordenarColorLlum(){
                 dades_ordenades.value.sort((a,b)=>a.color_hsl[2] - b.color_hsl[2])
                let step=360/15
                for(let i=0;(step)*i<=360;i++){
                     dades_ordenades.value.sort((a,b)=>(a.color_hsl[0]<=step*(i+1)&&a.color_hsl[0]>=step*i) - (b.color_hsl[0]<=step*(i+1)&&a.color_hsl[0]>=step*i))
                    
                }
                 dades_ordenades.value.sort((a,b)=>(a.color_hsl[1]<=10) - (b.color_hsl[1]<=10))
            }

            function ordenarLlum(){
                 dades_ordenades.value.sort((a,b)=>a.color_hsl[2] - b.color_hsl[2])
            }

            function ordenarNomColor(){
                 dades_ordenades.value.sort((a,b)=>a.color_camisa.localeCompare(b.color_camisa))
            }
            function ordenarFundacio(){
                 dades_ordenades.value.sort((a,b)=>(Number(a.fundacio)||0) - (Number(b.fundacio)||0))
            }

            function ordenar(ordre){
                
                console.log(ordre)
                
                if (ordre=="nom"){
                    ordenarNom()
                }
                if (ordre=="color"){
                   ordenarColor()
                }
                if (ordre=="colorllum"){
                    ordenarColorLlum()
                }
                if (ordre=="nomcolor"){
                    ordenarNomColor()
                }
                if (ordre=="llum"){
                    ordenarLlum()
                }
                if (ordre=="fundacio"){
                    ordenarFundacio()     
                }
                if (ordre=="default"){
                    
                    dades_ordenades.value=[...dades]        
                        }
            }

            //Cerca
            function  eliminarAccents(str){
            return String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            }

            function filtrarDades(cerca){
            let filtrat=dades_ordenades.value.filter(colla=>
                eliminarAccents(colla.nom|| "").includes(eliminarAccents(cerca)) ||
                eliminarAccents(colla.color_camisa|| "").includes(eliminarAccents(cerca)) ||
                eliminarAccents(colla.localitat || "").includes(eliminarAccents(cerca))||
                eliminarAccents(colla.fundacio || "").includes(eliminarAccents(cerca))
                
            )
            return filtrat
            
        }
            //Altres
            let desplegar=ref(false)
            function toggleArray(array,valor){
                const index = array.indexOf(valor)
                if (index > -1) {
                    array.splice(index, 1) 
                } else {
                    array.push(valor) 
              } 
            }

            function formatBotons(valor){
                const mapaFormats={
                //Tipus
                convencional:"Convencionals",
                universitaria:"Universitàries",
                internacional:"Internacionals",

                //Estats
                activa:"Actives",
                formacio:"En formació",
                desapareguda:"Desaparegudes"
            };
            return mapaFormats[valor]|| "Desconegut"
            }

            return{
                desplegar,
                toggleArray,
                formatBotons,
                
                dades,
                dades_ordenades,
                filtrarDades,
                eliminarAccents,

                mida,
                cerca,
                tipus,
                estat,
                seccions_tipus,
                seccions_estat,
                perfil_color,
                escuts,
                patrons,

                icones_tipus,
                icones_estat,
                nomes_desparegudes,
                nom_color,

                ordenar

            }

            
        }
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

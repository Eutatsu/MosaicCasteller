<template>
    <div> 
        <div class="max-w-screen-lg mx-auto my-2">
            <form id="opcions" class="mx-4">
                <div  id="opcions-l1" class="grid justify-between grid-cols-12 my-1">
                    <input v-model="cerca" class="border-solid border-red-600 border-2 my-2 lg:col-span-4 md:col-span-5 col-span-12 p-1" placeholder="Cerca colles o colors...">
                    
                    <div class="flex items-center  md:justify-end lg:col-span-8 md:col-span-7 col-span-12 justify-start ">
                    <label class="text-nowrap " for="ordena">Ordena per: </label>
                    <select id="ordena" @change="ordenar($event)" class="border-red-600 border-2 bg-white p-2">
                        <option value="nom">Nom</option>
                        <option value="color">Color</option>
                        <option value="nomcolor">Nom Color</option>
                        <option value="llum">Lluminositat</option>
                    <!--<b-form-select-option value="default">Default</b-form-select-option>-->
                </select>
            </div>
                </div>
                <div  id="opcions-l2" class="grid justify-center grid-cols-12 my-1">
                    <h2 class="text-xl md:col-span-6 col-span-12">Visualització:</h2>
                <div class="inline-flex items-center md:col-span-6 col-span-12 flex-wrap">
                <label class="mida_rajoles text-nowrap" for="ordena">Mida tessel·les: </label>
                    <div class="inline-flex items-center md:w-auto w-full grow">
                    <input class="w-full appearance-none bg-gray-200 h-2 rounded-full mx-1 grow" type="range" min="5" max="200" v-model="mida">
                    <input class="border-solid border-red-600 border-2 p-1 w-10 text-center" :placeholder="mida" v-model="mida">
                    <p class="mb-0">px</p>
                    </div>
                </div>
                </div>
                <div  id="opcions-l3" class="grid justify-center grid-cols-12 gap-3 my-1">
                    <div class="col-span-6 grid grid-cols-12 justify-between items-center">
                    <div class="flex items-center justify-between col-span-12 mx-2"><h3 class="text-lg">Tipus:</h3>
                        <label class="inline-flex flex-nowrap"><input type="checkbox" class="mx-1 accent-red-600" v-model="seccions_tipus" :value=true>Separa</label>
                    </div>
                        <div class="col-span-12 inline-flex gap-x-6 items-start flex-wrap md:flex-row flex-col mx-4">
                        <label class="inline-flex flex-nowrap"><input type="checkbox" class="mx-1 accent-red-600" value="convencional" v-model="tipus">Convencionals</label>
                        <label class="inline-flex flex-nowrap"><input type="checkbox" class="mx-1 accent-red-600" value="universitaria" v-model="tipus">Universitaries</label>
                        <label class="inline-flex flex-nowrap"><input type="checkbox" class="mx-1 accent-red-600" value="internacional" v-model="tipus">Internacionals</label>
                    </div>
                    </div>
                    <div class="col-span-6 grid grid-cols-12 justify-between items-center">
                        <div class="flex items-center justify-between col-span-12 mx-2"><h3 class="text-lg">Estat:</h3>
                        <label class="inline-flex flex-nowrap"><input type="checkbox" class="mx-1 accent-red-600" v-model="seccions_estat" :value=true>Separa</label>
                    </div>
                        <div class="col-span-12 inline-flex gap-x-6 items-start flex-wrap md:flex-row flex-col mx-4">
                        <label class="inline-flex flex-nowrap"><input type="checkbox" class="mx-1 accent-red-600 inline-flex flex-nowrap" value="activa" v-model="estat">Actives</label>
                        <label class="inline-flex flex-nowrap"><input type="checkbox" class="mx-1 accent-red-600 inline-flex flex-nowrap" value="formacio" v-model="estat">En formació</label>
                        <label class="inline-flex flex-nowrap"><input type="checkbox" class="mx-1 accent-red-600 inline-flex flex-nowrap" value="desapareguda" v-model="estat">Desaparegudes</label>
                    </div>
                    </div>
                </div>
                <div  id="opcions-l4" class="grid justify-center grid-cols-12 gap-3 my-1">
                    
                    
                </div>
                <div>
                    <button class="bg-red-600 text-white px-3 py-2 font-bold">
                        <font-awesome-icon :icon="['fas', 'eye']" /> Més Opcions
                    </button>
                    
                    <label class="inline-flex flex-nowrap"><input type="checkbox" class="mx-1 accent-red-600 inline-flex flex-nowrap" :value=false v-model="escuts">Mostra Escuts</label>
                </div>
            </form>
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
        />
            
        </div>
    </div>
</template>
<script>
import dades from '../json/reordenades_localitat.json'
import MosaicRenderer from '@/components/MosaicRenderer.vue';
export default{
        components:{
            MosaicRenderer
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
                escuts: false
                
                    }
                
                
                },
        
        methods:{
            
            ordenarNom(){
                this.dades_ordenades.sort((a,b)=>a.nom.localeCompare(b.nom))
            },
            ordenarColor(){
                this.dades_ordenades.sort((a,b)=>a.color_hsl[0] - b.color_hsl[0])
                this.dades_ordenades.sort((a,b)=>(a.color_hsl[1]<=10) - (b.color_hsl[1]<=10))
            },
            ordenarLlum(){
                this.dades_ordenades.sort((a,b)=>a.color_hsl[2] - b.color_hsl[2])
            },
            ordenarNomColor(){
                this.dades_ordenades.sort((a,b)=>a.color_camisa.localeCompare(b.color_camisa))
            },
            
            ordenar(event){
                const ordre = event.target.value
                console.log(ordre)
                if (ordre=="nom"){
                    this.ordenarNom()
                }
                if (ordre=="color"){
                    this.ordenarColor()
                }
                if (ordre=="nomcolor"){
                    this.ordenarNomColor()
                }
                if (ordre=="llum"){
                    this.ordenarLlum()
                }
                if (ordre=="default"){
                    
            this.dades_ordenades=[...this.dades]        
                }
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

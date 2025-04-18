
<template>
    <div class="mx-auto max-w-screen-lg px-2 md:px-0 flex flex-col gap-y-2">
        <div  id="opcions-l1" class="md:inline-flex flex flex-col md:flex-row w-full gap-x-4 gap-y-2 grid-cols-12 items-left rounded-sm drop-shadow bg-white p-2 mt-4">
                    <input v-model="cerca" class="grow border-solid border-red-600 border-2 rounded-sm lg:col-span-4 md:col-span-5 col-span-12 p-1.5" placeholder="Cerca colles, colors o municipis...">
                    
                    <div class="flex items-center  justify-end lg:col-span-8 md:col-span-7 col-span-12  ">
                    <label class="text-nowrap " for="ordena">Ordena per:</label>
                    <select id="ordena" @change="ordenar($event.target.value)" class="rounded-sm border-red-600 border-2 bg-white p-2 ml-2">
                                     
                        <option value="fundacio">Data de Fundacio</option>
                        <option value="nom">Nom</option>
                        <option value="color">Color</option>
                        <option value="nomcolor">Nom del Color</option>
                        <option value="llum">Lluminositat</option>
                        <option value="colorllum">Llum i Color</option>   
                    <!--<b-form-select-option value="default">Default</b-form-select-option>-->
                </select>
            </div>
                </div>

        <div class="w-full inline-flex rounded-sm drop-shadow bg-white p-2">
            <label class="inline-flex flex-nowrap items-center hover:bg-gray-200 rounded-sm">
                        <input type="checkbox" class="mx-1 accent-red-600 inline-flex flex-nowrap" :value=false v-model="compacte">
                        Vista compacta
                    </label></div>
                    <div class="grid grid-cols-12 justify-between items-center gap-2">
                    <div class="col-span-6 rounded-sm drop-shadow bg-white p-2">
                    <h3 class="text-lg pb-2">Tipus:</h3>
                    <div class="flex gap-x-1 gap-y-2 items-start flex-wrap lg:flex-row flex-col text-sm">
                       
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
                    <div class="col-span-6 rounded-sm drop-shadow bg-white p-2">
                        <h3 class="text-lg pb-2">Estat:</h3>
                    <div class="flex gap-x-1 gap-y-2 items-start flex-wrap lg:flex-row flex-col text-sm ">

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
                    
                <div class=" rounded-sm drop-shadow bg-white p-2 mb-2 inline-flex items-center w-full flex-wrap">

                    <label class="text-nowrap mr-1 text-left md:w-auto w-full">A partir de l'any: </label>
                <input class="border-solid border-red-600 border-2 p-1 w-14 text-center rounded-sm" :placeholder="origen" v-model="origen">
                    
                        <input class="appearance-none bg-gray-200 h-2 rounded-full mx-1 grow"
                        type="range" min="1791" max="2024" v-model="origen">
                    
      
            </div>
    </div>
    <div class="mx-auto px-2 max-w-screen-2xl h-[80vh] ">
        <div class="grid grid-cols-1 pr-4">
            <div class="cols-span-1 relative">
                <div class="h-4 font-bold">
                    <label class="absolute text-center text-xs" :style="{left:calculActivitat(origen,null).inici-0.8+'%'}">{{ origen }}</label>
                    <label v-if="origen<=1800" class="absolute text-center text-xs" :style="{left:calculActivitat(1800,null).inici-0.8+'%'}">1800</label>
                    <label v-if="origen<=1900" class="absolute text-center text-xs" :style="{left:calculActivitat(1900,null).inici-0.8+'%'}">1900</label>
                    <label v-if="origen<=2000" class="absolute text-center text-xs" :style="{left:calculActivitat(2000,null).inici-0.8+'%'}">2000</label>
                    <label class="absolute text-center text-xs" :style="{left:calculActivitat(2025,null).inici-0.8+'%'}">2025</label>
                </div>
                <div class="h-0">
                    <div class="absolute w-0 border border-gray-400/50 border-1 h-[71vh] z-[999]" :style="{left:calculActivitat(1800,null).inici+'%'}"></div>
                </div>
                <div class="h-0">
                   <div class="absolute w-0 border border-gray-400/50 border-1 h-[71vh] z-[999]" :style="{left:calculActivitat(1900,null).inici+'%'}"></div>
                </div>
                <div class="h-0">
                  <div class="absolute w-0 border border-gray-400/50 border-1 h-[71vh] z-[999]" :style="{left:calculActivitat(2000,null).inici+'%'}"></div>
                </div>
                <div class="h-0">
                  <div class="absolute w-0 border border-gray-400/50 border-1 h-[71vh] z-[999]" :style="{left:calculActivitat(2025,null).inici+'%'}"></div>
                </div>
                <div class="opacity-20 h-0">
                <div v-for="(colla,index) in filtrarDades(cerca)" :key="index"
                class="absolute w-0 border-gray-400 border-l-[1px] h-[71vh] z-[999]" 
                :style="{left:calculActivitat(colla.fundacio,colla.desaparicio).inici+'%'}"></div>
            </div>
            </div>
        </div>

        <div class="transition-all grid grid-cols-1 my-1 overflow-y-auto overflow-x-hidden h-[70vh] pr-4 content-start"
        :class="compacte==true?'gap-0.5':'gap-1'">
        <Timeline v-for="(colla,index) in filtrarDades(cerca)" :key="index" :colla="colla" :origen="parseInt(origen)" class="" :compacte=compacte />
            </div> 
        </div>
        <!--<div class="mx-auto px-2 max-w-screen-2xl ">
            <div v-for="index in 20" :key="index" class="w-full animate-pulse bg-gray-300 rounded-sm">

            </div>
        </div>-->
</template>

<script>
import {onMounted, ref, inject} from 'vue'
import Timeline from '@/components/Timeline.vue'

export default({
    components:{
        Timeline
        },

    setup() {
        let cerca=ref("")

        let origen=ref(1791)
        const actualitat=new Date().getFullYear()

        let compacte=ref(false)

        const dades = inject('dades')
        const escutsSprite = inject('escutsSprite')
        const dades_ordenades=ref([...dades]);

        //Succesores

        function matchId(id){
            const colla = dades.find(c=>c.id === id)
            if(colla){
            return colla
        }
            else{
                return null
            }
        }

        //Botons Filtres
        let tipus=ref(["convencional","universitaria","internacional"])
        let estat=ref(["activa","formacio","desapareguda"])
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
        function toggleArray(array,valor){
                const index = array.indexOf(valor)
                if (index > -1) {
                    array.splice(index, 1) 
                } else {
                    array.push(valor) 
              } 
            }

         //ordre
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
                for (let i=0;i<dades_ordenades.value.length;i++){
                    let colla = dades_ordenades.value[i]
                colla.fundacio_original = Math.min(
                colla.fundacio,
                ...(colla.predecesores || []).map(c => c.fundacio)
                )}
                 dades_ordenades.value.sort((a,b)=>(Number(a.fundacio_original)||0) - (Number(b.fundacio_original)||0))
            }

            function ordenar(ordre){
                
                
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
        
        function calculActivitat(fundacio,desaparicio){
            let historia=actualitat-origen.value
            let activitat
            let fundacioVar=fundacio
            
            //Calcul Inici
            if (fundacio<origen.value){
                fundacioVar=origen.value
            }
            let inici=((fundacioVar-origen.value)/historia)*100

            //Calcul Activitat
            if (desaparicio==null){
                activitat=((actualitat-fundacioVar)/historia)*100
            }
            else if(desaparicio==-1){   
                activitat=Math.max(0,(((fundacio+5-fundacioVar)/historia)*100))
            }
            else if(desaparicio==fundacio){   
                activitat=Math.max(0,(((fundacio+1-fundacioVar)/historia)*100))
            }
            else{
                activitat=Math.max(0,(((desaparicio-fundacioVar)/historia)*100))
            }
            
            return{
                historia,
                activitat,
                inici
            }
        }
        
        
        //Cerca
        function  eliminarAccents(str){
            return String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            }

        function filtrarDades(cerca){
            let filtrat=dades_ordenades.value.filter(colla=>
               ( eliminarAccents(colla.nom|| "").includes(eliminarAccents(cerca)) ||
                eliminarAccents(colla.color_camisa|| "").includes(eliminarAccents(cerca)) ||
                eliminarAccents(colla.localitat || "").includes(eliminarAccents(cerca))||
                eliminarAccents(colla.fundacio || "").includes(eliminarAccents(cerca)))&&

                tipus.value.includes(colla.tipus)&&
                estat.value.includes(colla.estat)
            )
            
            return filtrat
            
        }
        
        

        onMounted( ()=>{
            ordenarFundacio()
        })
        return{
            dades,
            dades_ordenades,
            ordenarFundacio,
            calculActivitat,
            escutsSprite,
            origen,
            eliminarAccents,
            filtrarDades,
            cerca,
            ordenar,
            matchId,
            
            tipus,
            estat,
            formatBotons,
            toggleArray,

            compacte
        }
    },
})
</script>
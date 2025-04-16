<template>
    <div class="mx-auto px-2 max-w-screen-lg">
        <h1 class="mt-4 text-xl text-center">!! Secció en construcció !!</h1>
         <div  id="opcions-l1" class="grid justify-between grid-cols-12 my-1">
            <input v-model="cerca" class="border-solid border-red-600 border-2 rounded-sm lg:col-span-4 md:col-span-5 col-span-12 p-1 py-2" placeholder="Cerca colles, colors o municipis...">
                    
                    <div class="flex items-center  md:justify-end lg:col-span-8 md:col-span-7 col-span-12 justify-start ">
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
        <div class="col-span-6 grid grid-cols-12 justify-between items-center rounded-sm drop-shadow bg-white p-2">
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
    <div class="mx-auto px-2 max-w-screen-2xl h-[80vh] ">
       
        
      

        <div class="grid grid-cols-1  pr-4">
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


        <div class="grid grid-cols-1 my-1 overflow-y-auto overflow-x-hidden h-[70vh] pr-4 content-start gap-1">
        <Timeline v-for="(colla,index) in filtrarDades(cerca)" :key="index" :colla="colla" :origen="parseInt(origen)" class=""/>
    
       <!-- <div v-for="(colla,index) in filtrarDades(cerca)" :key="index" class="relative cols-span-1 inline-flex items-center h-4 bg-gray-200 flex hover:bg-gray-300 rounded-sm"  >
           
            <div v-if="succesores.includes(colla.id)" class="h-full">
                <div v-for="(collaS,index) in muntarSuccesores(succesores)" :key="index"  class="absolute rounded-sm h-full justify-right inline-flex items-start text-xs text-nowrap font-bold text-white gap-2" 
            :style="{
            left:calculActivitat(collaS.fundacio,collaS.desaparicio).inici+'%', 
            width:calculActivitat(collaS.fundacio,collaS.desaparicio).activitat+'%',
            
            ...(collaS.codi_color=='#ffffff'?
            {backgroundColor:'#000000'}:
            {backgroundColor:collaS.codi_color})}">
                <span  class="drop-shadow"
               >{{ collaS.nom }}</span>
               <tippy :key="collaS.id" to="parent" content-tag="div" content-class="w-fit"> 
                <TargetaInfo :colla="collaS"/>
            </tippy>
            </div>
            </div>
           <div class="transition-all absolute rounded-sm h-full justify-right inline-flex items-start text-xs text-nowrap font-bold text-white gap-2" 
            :style="{
            left:calculActivitat(colla.fundacio,colla.desaparicio).inici+'%', 
            width:calculActivitat(colla.fundacio,colla.desaparicio).activitat+'%',
            
            ...(colla.codi_color=='#ffffff'?
            {backgroundColor:'#000000'}:
            {backgroundColor:colla.codi_color})}">
                <span  class="drop-shadow"
               >{{ colla.nom }}</span>
            </div>

            <div class="absolute rounded-sm justify-right inline-flex items-start text-xs text-nowrap font-bold text-white gap-2" 
            :style="{
            left:calculActivitat( filtrarDades(cerca)[5].fundacio,filtrarDades(cerca)[5].desaparicio).inici+'%', 
            width:calculActivitat(filtrarDades(cerca)[5].fundacio,filtrarDades(cerca)[5].desaparicio).activitat+'%',
            
            ...(filtrarDades(cerca)[1].codi_color=='#ffffff'?
            {backgroundColor:'#000000'}:
            {backgroundColor:filtrarDades(cerca)[5].codi_color})}">
                <span  class="drop-shadow"
               >{{ filtrarDades(cerca)[5].nom }}</span>
            </div>
            <tippy :key="colla.id" to="parent" content-tag="div" content-class="w-fit"> 
                <TargetaInfo :colla="colla"/>
            </tippy>
        </div>-->
           
       </div> 
       <input class="w-full appearance-none bg-gray-200 h-2 rounded-full mx-1 grow" type="range" min="1791" max="2024" v-model="origen" @change="calculActivitat">
      
    </div>
</template>

<script>
import {onMounted, ref, inject} from 'vue'
import Timeline from '@/components/TimelineMultiple.vue'

export default({
    components:{
        Timeline
        },

    setup() {
        let cerca=ref("")

        let origen=ref(1791)
        const actualitat=new Date().getFullYear()


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
                colla.fundacio_real = Math.min(
                colla.fundacio,
                ...(colla.predecesores || []).map(c => c.fundacio)
                )}
                 dades_ordenades.value.sort((a,b)=>(Number(a.fundacio_real)||0) - (Number(b.fundacio_real)||0))
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
        
        

        onMounted(()=>{
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
            toggleArray
        }
    },
})
</script>
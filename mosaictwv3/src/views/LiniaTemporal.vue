<template>
    <div class="mx-auto px-2 max-w-screen-lg">
        <h1 class="mt-4 text-xl text-center">!! Secció en construcció !!</h1>
         <div  id="opcions-l1" class="grid justify-between grid-cols-12 my-1">
            <input v-model="cerca" class="border-solid border-red-600 border-2 rounded-sm lg:col-span-4 md:col-span-5 col-span-12 p-1 py-2" placeholder="Cerca colles, colors o municipis...">
                    
                    <div class="flex items-center  md:justify-end lg:col-span-8 md:col-span-7 col-span-12 justify-start ">
                    <label class="text-nowrap " for="ordena">Ordena per:</label>
                    <select id="ordena" @change="ordenar($event.target.value)" class="rounded-sm border-red-600 border-2 bg-white p-2 ml-2">
                        <option value="nom">Nom</option>
                        <option value="color">Color</option>
                        <option value="nomcolor">Nom del Color</option>
                        <option value="llum">Lluminositat</option>
                        <option value="colorllum">Llum i Color</option>                
                        <option value="fundacio">Data de Fundacio</option>
                    <!--<b-form-select-option value="default">Default</b-form-select-option>-->
                </select>
            </div>
        </div>
    </div>
    <div class="mx-auto px-2 max-w-screen-2xl h-full ">
       
        
      

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
                    <div class="absolute w-0 border border-gray-400/50 border-1 h-[51vh] z-[999]" :style="{left:calculActivitat(1800,null).inici+'%'}"></div>
                </div>
                <div class="h-0">
                   <div class="absolute w-0 border border-gray-400/50 border-1 h-[51vh] z-[999]" :style="{left:calculActivitat(1900,null).inici+'%'}"></div>
                </div>
                <div class="h-0">
                  <div class="absolute w-0 border border-gray-400/50 border-1 h-[51vh] z-[999]" :style="{left:calculActivitat(2000,null).inici+'%'}"></div>
                </div>
                <div class="h-0">
                  <div class="absolute w-0 border border-gray-400/50 border-1 h-[51vh] z-[999]" :style="{left:calculActivitat(2025,null).inici+'%'}"></div>
                </div>
                <div class="opacity-20 h-0">
                <div v-for="(colla,index) in filtrarDades(cerca)" :key="index"
                class="absolute w-0 border-gray-400 border-l-[1px] h-[51vh] z-[999]" 
                :style="{left:calculActivitat(colla.fundacio,colla.desaparicio).inici+'%'}"></div>
            </div>
            </div>
        </div>

       <div class="grid grid-cols-1 gap-1 my-1 overflow-y-auto  h-[50vh] pr-4">
        
        
        <div v-for="(colla,index) in filtrarDades(cerca)" :key="index" class="relative cols-span-1 inline-flex items-center h-4 bg-gray-200 flex hover:bg-gray-300 rounded-sm"  >
           <!--
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
-->
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
<!--
            <div class="absolute rounded-sm justify-right inline-flex items-start text-xs text-nowrap font-bold text-white gap-2" 
            :style="{
            left:calculActivitat( filtrarDades(cerca)[5].fundacio,filtrarDades(cerca)[5].desaparicio).inici+'%', 
            width:calculActivitat(filtrarDades(cerca)[5].fundacio,filtrarDades(cerca)[5].desaparicio).activitat+'%',
            
            ...(filtrarDades(cerca)[1].codi_color=='#ffffff'?
            {backgroundColor:'#000000'}:
            {backgroundColor:filtrarDades(cerca)[5].codi_color})}">
                <span  class="drop-shadow"
               >{{ filtrarDades(cerca)[5].nom }}</span>
            </div>-->
            <tippy :key="colla.id" to="parent" content-tag="div" content-class="w-fit"> 
                <TargetaInfo :colla="colla"/>
            </tippy>
        </div>
           
       </div> 
       <input class="w-full appearance-none bg-gray-200 h-2 rounded-full mx-1 grow" type="range" min="1791" max="2024" v-model="origen" @change="calculActivitat">
      
    </div>
</template>

<script>
import {onMounted, ref, inject} from 'vue'
import TargetaInfo from '@/components/TargetaInfo.vue'

export default({
    components:{
        TargetaInfo
        },

    setup() {
        let cerca=ref("")

        let origen=ref(1900)
        
        const dades = inject('dades')
        const escutsSprite = inject('escutsSprite')
        const dades_ordenades=ref([...dades]);
        const succesores=['xiquets_de_la_vila_d_alcover','xiquets_d_alcover']

        //Succesores
        function muntarSuccesores(array){
            let continuacio=[]
            for (let i = 0; i<array.length; i++){
                const trobat = dades.find(c => c.id === array[i])
                if (trobat) {
                    continuacio.push(trobat)
                }
            }
        console.log(continuacio)
            return continuacio
            
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
        
        function calculActivitat(fundacio,desaparicio){
            let actualitat=2025
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
                eliminarAccents(colla.nom|| "").includes(eliminarAccents(cerca)) ||
                eliminarAccents(colla.color_camisa|| "").includes(eliminarAccents(cerca)) ||
                eliminarAccents(colla.localitat || "").includes(eliminarAccents(cerca))||
                eliminarAccents(colla.fundacio || "").includes(eliminarAccents(cerca))
                
            )
            return filtrat
            
        }
        
        

        onMounted(()=>{
            ordenarFundacio()
            calculActivitat(1990,2025)
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
            succesores,
            muntarSuccesores
        }
    },
})
</script>
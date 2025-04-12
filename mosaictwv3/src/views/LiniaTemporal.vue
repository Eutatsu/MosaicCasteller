<template>
    <div class="mx-auto px-2 max-w-screen-lg">
        <h1 class="mt-4 text-xl text-center">!! Secció en construcció !!</h1>
         <div  id="opcions-l1" class="grid justify-between grid-cols-12 my-1">
                    <input v-model="cerca" class="border-solid border-red-600 border-2 my-2 rounded-sm lg:col-span-4 md:col-span-5 col-span-12 p-1" placeholder="Cerca colles o colors...">
                    
                    <div class="flex items-center  md:justify-end lg:col-span-8 md:col-span-7 col-span-12 justify-start ">
                    <label class="text-nowrap " for="ordena">Ordena per:</label>
                    <select id="ordena" @change="ordenar($event)" class="rounded-sm border-red-600 border-2 bg-white p-2 ml-2">
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
                    <label class="absolute text-center text-xs" :style="{left:calculActivitat(1800,null).inici-0.8+'%'}">1800</label>
                    <label class="absolute text-center text-xs" :style="{left:calculActivitat(1900,null).inici-0.8+'%'}">1900</label>
                    <label class="absolute text-center text-xs" :style="{left:calculActivitat(2000,null).inici-0.8+'%'}">2000</label>
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
                  <div class="absolute w-0 border border-gray-400/50 border-1 h-[51vh] z-[999]" :style="{left:calculActivitat(2000,null).inici+'%'}"></div>
                </div>
                <div class="opacity-20 h-0">
                <div v-for="(colla,index) in dades_ordenades" :key="index"
                class="absolute w-0 border-gray-400 border-l-[1px] h-[51vh] z-[999]" 
                :style="{left:calculActivitat(colla.fundacio,colla.desaparicio).inici+'%'}"></div>
            </div>
            </div>
        </div>

       <div class="grid grid-cols-1 gap-1 my-1 overflow-y-auto  h-[50vh] pr-4">
        
        
        <div v-for="(colla,index) in dades_ordenades" :key="index"  class="cols-span-1 inline-flex items-center h-fit bg-gray-200 flex hover:bg-gray-300 rounded-sm"  >
           <div class="relative h-3 rounded-sm" 
            :style="{left:calculActivitat(colla.fundacio,colla.desaparicio).inici+'%', 
            width:calculActivitat(colla.fundacio,colla.desaparicio).activitat+'%',
            ...(colla.codi_color=='#ffffff'?
            {backgroundColor:'#000000'}:
            {backgroundColor:colla.codi_color})}">
            </div>
            <tippy :key="reRenderKey" to="parent" content-tag="div" content-class="w-fit"> 
                <TargetaInfo :colla="colla"/>
            </tippy>
            <div class="hidden absolute h-[50vh] outline outline-black outline-1" :style="{left:calculActivitat(colla.fundacio,colla.desaparicio).inici+'%'}"></div>
        
        </div>
           
       </div> 
       <input class="w-full appearance-none bg-gray-200 h-2 rounded-full mx-1 grow" type="range" min="1791" max="2025" v-model="origen" @change="calculActivitat">
      
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
        let reRenderKey=ref(0)
        let origen=ref(1791)
        const dades = inject('dades')
        const escutsSprite = inject('escutsSprite')
        const dades_ordenades=ref([...dades]);
        const ordenarFundacio=()=>{
            
        
            dades_ordenades.value.sort((a,b)=>{
                const numA=Number(a.fundacio)||0
                const numB=Number(b.fundacio)||0
               
                if(isNaN(a.fundacio)&&!isNaN(b.fundacio)) return 1
                if (!isNaN(a.fundacio) && isNaN(b.fundacio)) return -1;
                if (isNaN(a.fundacio) && isNaN(b.fundacio)) return 0;
                
                
                return numA - numB
            })
            reRenderKey.value++
        }
        
        function calculActivitat(fundacio,desaparicio){
            
            let actualitat=2025
            let historia=actualitat-origen.value
            let activitat
            let inici=((fundacio-origen.value)/historia)*100
            let final
            if(desaparicio!==null){
                final=desaparicio-actualitat
                activitat=((desaparicio-fundacio)/historia)*100
                if(activitat==0){
                    activitat=1
                }
            }
            else{
                final=0
                activitat=((actualitat-fundacio)/historia)*100
            }
            
            return{
                historia,
                activitat,
                inici,
                final,
            }
        }
        
        
        onMounted(()=>{
            ordenarFundacio()
            calculActivitat(1990,2025)
            reRenderKey.value++
        })
        return{
            dades,
            dades_ordenades,
            ordenarFundacio,
            calculActivitat,
            escutsSprite,
            reRenderKey,
            origen
        }
    },
})
</script>
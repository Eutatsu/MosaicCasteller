<template>
    <div class="mx-auto px-2 max-w-screen-lg">
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
    <div class="mx-auto px-2 max-w-screen-2xl h-full">
       <div class="grid grid-cols-1 gap-1 my-1 overflow-y-auto  h-[50vh] pr-4">
        <div class="w-0 relative text-right"><label>{{ origen }}</label></div>
        <div class="cols-span-1  inline-flex items-center "  v-for="(colla,index) in dades_ordenades" :key="index" >
           
           <div class="grow bg-gray-200 flex items-center hover:bg-gray-300" 
            ><div class="relative h-3 " 
            :style="{left:calculActivitat(colla.fundacio,colla.desaparicio).inici+'%', 
            width:calculActivitat(colla.fundacio,colla.desaparicio).activitat+'%',
            ...(colla.codi_color=='#ffffff'?
            {backgroundColor:'#000000'}:
            {backgroundColor:colla.codi_color})}">

            
            </div>
            <tippy :key="reRenderKey" to="parent" content-tag="div" content-class="w-fit"> 
                <TargetaInfo :colla="colla"/>
            </tippy>
            </div>
        </div>
       </div> 
       <input class="w-full appearance-none bg-gray-200 h-2 rounded-full mx-1 grow" type="range" min="1791" max="2025" v-model="origen" @change="calculActivitat">
      
    </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import dades from '../json/dades_colles_id.json'
import escutsSprite from '@/assets/escuts/escuts_sprite.png'
import TargetaInfo from '@/components/TargetaInfo.vue'

export default({
    components:{
        TargetaInfo
        },

    setup() {
        let reRenderKey=ref(0)
        let origen=1900
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
            let historia=actualitat-origen
            let activitat
            let inici=((fundacio-origen)/historia)*100
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
                final
            }
        }
        
        
        onMounted(()=>{
            ordenarFundacio()
            calculActivitat(1990,2025)
            reRenderKey.value++
        })
        return{
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

<style>
html, body {
  overflow: hidden;
}
</style>
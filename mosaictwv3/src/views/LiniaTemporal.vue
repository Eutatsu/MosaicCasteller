<template>
    <div class="mx-auto px-2 max-w-screen-xl">
       <div class="grid grid-cols-1 gap-1 my-1">
        <div class="cols-span-1  inline-flex items-center"  v-for="(colla,index) in dades_ordenades" :key="index" >
           
           <div class="grow h-5 bg-gray-200 flex items-center hover:bg-gray-300" 
            ><div class="relative h-3 " 
            :style="{left:calculActivitat(colla.fundacio,colla.desaparicio).inici+'%', 
            width:calculActivitat(colla.fundacio,colla.desaparicio).activitat+'%',
            ...(colla.codi_color=='#ffffff'?
            {backgroundColor:'#000000'}:
            {backgroundColor:colla.codi_color})}">

            
            </div>
            <tippy :key="reRenderKey" to="parent" content-tag="div" content-class="w-fit"> 
                <TargetaInfo :colla="colla"></TargetaInfo>
            </tippy>
            </div>
        </div>
       </div> 
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
            const origen=1791
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
            reRenderKey
        }
    },
})
</script>

<style>
.tippy-box{
    background-color:rgba(0, 0, 0, 0.5);
    border-radius: 0px;
    
}
.tippy-content{
    padding:0px;
}
</style>
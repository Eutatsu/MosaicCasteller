<template>
    <div class="relative w-full inline-flex items-center h-5 bg-gray-200 flex hover:bg-gray-300 rounded-sm" >
        <div v-if="colla.predecesores?.length" class="items-center inline-flex">
        <div v-for="(colla,index) in colla.predecesores" :key="index" class=" absolute rounded-sm h-full inline-flex items-center text-xs text-nowrap font-bold text-white" 
            :style="{
            left:calculActivitat(colla.fundacio,colla.desaparicio).inici+'%', 
            width:calculActivitat(colla.fundacio,colla.desaparicio).activitat+'%',
            
            ...(colla.codi_color=='#ffffff'?
            {backgroundColor:'#000000'}:
            {backgroundColor:colla.codi_color})}">
                <span  class="drop-shadow ml-1"
               >{{ colla.nom }}</span>
            
        </div>
    </div>
    <div class=" absolute rounded-sm h-full justify-right inline-flex items-center text-xs text-nowrap font-bold text-white gap-2" 
            :style="{
            left:calculActivitat(colla.fundacio,colla.desaparicio).inici+'%', 
            width:calculActivitat(colla.fundacio,colla.desaparicio).activitat+'%',
            
            ...(colla.codi_color=='#ffffff'?
            {backgroundColor:'#000000'}:
            {backgroundColor:colla.codi_color})}">
                <span  class="drop-shadow ml-1"
               >{{ colla.nom }}</span>
            </div>
            <tippy :key="colla" to="parent" content-tag="div" content-class="w-fit"> 
                <TargetaInfo :colla="colla"/>
            </tippy>
    </div>
</template>

<script>
import TargetaInfo from './TargetaInfo.vue';

export default{
    name:'TimelineMultiple',
    props:{
        colla:{
            type:Object,
            required:true
        },
        origen:{
            type:Number,
            required:false,
            default:1791
        }

    },
    components:{
        TargetaInfo
    },
    setup(props){
        const actualitat=new Date().getFullYear()


        function calculActivitat(fundacio,desaparicio){
            let historia=actualitat-props.origen
            let activitat
            let fundacioVar=fundacio
            
            //Calcul Inici
            if (fundacio<props.origen){
                fundacioVar=props.origen
            }
            let inici=((fundacioVar-props.origen)/historia)*100

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
        return {
            calculActivitat,
        }
    }
}

</script>
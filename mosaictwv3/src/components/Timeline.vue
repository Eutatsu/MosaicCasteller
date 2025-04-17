<template >
    <div :class="calculActivitat(colla.fundacio,colla.desaparicio).activitat==0?'hidden':compacte==false?'inline-flex h-5':'inline-flex h-2'" 
    class="relative w-full items-center bg-gray-200 flex hover:bg-gray-300 rounded-sm">
        <div v-if="colla.predecesores?.length" class="items-center inline-flex">
        <div v-for="(colla,index) in colla.predecesores" :key="index" 
        :title="colla.nom"
        class="transition-all absolute rounded-sm h-full inline-flex items-center text-xs text-nowrap font-bold text-white" 
            :style="{
            left:calculActivitat(colla.fundacio,colla.desaparicio).inici+'%', 
            width:calculActivitat(colla.fundacio,colla.desaparicio).activitat+'%',
            
            ...(colla.codi_color=='#ffffff'?
            {backgroundColor:'#000000'}:
            {backgroundColor:colla.codi_color})}">
                <span v-if="compacte==false" class="drop-shadow ml-1 truncate"
               >{{ colla.nom }}</span>
            
        </div>
    </div>
    <div class="transition-all absolute rounded-sm h-full justify-right inline-flex items-center text-xs text-nowrap font-bold text-white" 
            :title="colla.nom"
            :style="{
            left:calculActivitat(colla.fundacio,colla.desaparicio).inici+'%', 
            width:calculActivitat(colla.fundacio,colla.desaparicio).activitat+'%',
            
            ...(colla.codi_color=='#ffffff'?
            {backgroundColor:'#000000'}:
            {backgroundColor:colla.codi_color})}">
                <span v-if="compacte==false" class="drop-shadow ml-1 truncate"
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
        },
        compacte:{
            type:Boolean,
            required:false,
            default:false
        }

    },
    components:{
        TargetaInfo
    },
    setup(props){
        const actualitat=new Date().getFullYear()+1


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

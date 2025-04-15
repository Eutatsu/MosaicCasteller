<template>
    <router-link :to="'/colles/'+collaIdx.id" class="text-red-600 hover:text-red-400 hover:underline inline-flex items-baseline">
        <div :style="{backgroundColor:collaIdx.codi_color}" class="aspect-square h-4 border-solid border border-1 mr-1 self-center"></div>
        {{ textAlt() }}
        <IcoTipEst v-if="icones==true" :colla="collaIdx" dada="tipus" class="ml-1"/>
        <IcoTipEst v-if="icones==true" :colla="collaIdx" dada="estat" class="ml-1"/>
        
        <tippy to="parent" content-tag="div" content-class="w-fit"> 
                <TargetaInfo :colla="collaIdx"/>
            </tippy>
        </router-link>
</template>

<script>
import {inject} from 'vue'
import IcoTipEst from './IcoTipEst.vue';
import TargetaInfo from './TargetaInfo.vue';

export default({
    components:{
        IcoTipEst,
        TargetaInfo
    },
    props:{
        colla:{
            type:String,
            required:true
        },
        text:{
            type:String,
            required:false
        },
        icones:{
            type:Boolean,
            required:false,
            default:false
        }
    },
    setup(props) {
        const dades = inject('dades')
        const collaIdx=dades.find(c=>c.id===props.colla)
        function textAlt(){
            if (props.text==null){
                let nom = collaIdx.nom
                return nom
            }
            else{
                return props.text
            }
        }
        return{
            textAlt,
            collaIdx
        }
    },
})
</script>

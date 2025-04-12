<template>
        <div v-if="colla==null||solucio==null" class="flex justify-center gap-2 py-1 px-2 transition-all">
            <div class="hidden md:flex md:size-24 size-16 rounded-sm flex items-center justify-center drop-shadow hover:drop-shadow-lg bg-red-600"></div>
            <div v-for="n in 5" :key="n" class="md:size-24 size-16 rounded-sm flex items-center justify-center drop-shadow hover:drop-shadow-lg bg-gray-200"></div>
        </div>
    <div v-else class="flex justify-center gap-2 relative hover:bg-gray-100 w-fit mx-auto p-1 rounded-sm "
    :class="colla.id==solucio.id?' border-red-600 border-solid border border-2':{}">
    
        <div class="hidden md:flex md:size-24 size-16 rounded-sm flex text-center items-center justify-center drop-shadow hover:drop-shadow-lg bg-red-600 transition-all"
        >
            <span class="text-white font-bold text-xs">{{ colla.nom }}</span>
        </div>
       
        <div class="overflow-hidden md:size-24 size-16 rounded-sm flex flex-col items-center justify-center text-center drop-shadow hover:drop-shadow-lg"
        :class="aproximaColor()">
            <div :style="{backgroundColor:colla.codi_color}" 
            class="aspect-square max-h-12 grow border-solid border-white border border-2 drop-shadow hover:drop-shadow-lg"></div>
            <span class="font-bold md:text-sm text-xs">
                {{ colla.color_camisa }}
            </span>
        </div>

        <div class="md:size-24 size-16 rounded-sm flex items-center justify-center drop-shadow hover:drop-shadow-lg"
        :class="aproximaAnys()">
            <span class="text-black font-bold">{{ colla.fundacio }}</span>
        </div>

        <div class="md:size-24 size-16 rounded-sm flex flex-col items-center justify-center drop-shadow hover:drop-shadow-lg"
        :class="colla.tipus==solucio.tipus?'bg-green-300':'bg-gray-200'">
            <span class="text-black font-bold text-lg md:text-3xl"><IcoTipEst :colla="colla" dada="tipus"/></span>
            <span class="hidden md:block font-bold text-sm">{{ colla.tipus }}</span>
        </div>

        <div class="md:size-24 size-16 rounded-sm flex flex-col items-center justify-center drop-shadow hover:drop-shadow-lg"
        :class="colla.estat==solucio.estat?'bg-green-300':'bg-gray-200'">
            <span class="text-black font-bold text-lg md:text-3xl"><IcoTipEst :colla="colla" dada="estat"/></span>
            <span class="hidden md:block font-bold text-sm">{{ colla.estat }}</span>
        </div>

        <div class="overflow-hidden md:size-24 size-16 rounded-sm flex items-center justify-center bg-gray-200 text-center drop-shadow hover:drop-shadow-lg"
        :class="colla.localitat==solucio.localitat?'bg-green-300':'bg-gray-200'">
            <span class="text-black font-bold md:text-sm text-xs">{{ colla.localitat }}</span>
        </div>

        <tippy to="parent" content-tag="div" content-class="w-fit" placement="bottom"> 
                <TargetaInfo :colla="colla" class=""/>
            </tippy>
    </div>
</template>

<script>
import IcoTipEst from '@/components/IcoTipEst.vue';
import TargetaInfo from './TargetaInfo.vue';

    export default{
        name:'FilaEnigma',
        props:{
            colla:{
                type:Object,
                required:false,
                default:null
            },
            solucio:{
                type:Object,
                required:false,
                default:null
            }

        },
        components:{
            IcoTipEst,
            TargetaInfo
        },
        setup(props){
            function aproximaAnys(){
                let diferencia = props.colla.fundacio-props.solucio.fundacio
                if (diferencia === 0) {
                    return 'bg-green-300';
                } else if (Math.abs(diferencia) <= 10) {
                    return 'bg-amber-300';
                } else if (Math.abs(diferencia) > 10) {
                    return 'bg-gray-200';
                } else {
                    return 'bg-gray-200';
                }
            }
            function aproximaColor(){
                let diferencia = props.colla.color_hsl[0]-(props.solucio.color_hsl[0])
                if (Math.abs(diferencia)>180){
                    diferencia=diferencia-360
                }
                if (Math.abs(diferencia) <= 15) {
                    return 'bg-green-300';
                } else if (Math.abs(diferencia) <= 90) {
                    return 'bg-amber-300';
                } else if (Math.abs(diferencia) > 90) {
                    return 'bg-gray-200';
                } else {
                    return 'bg-gray-200';
                }
            }
            return{
                aproximaAnys,
                aproximaColor
            }
        }
    }
</script>
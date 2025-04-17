<template>
        <div v-if="colla==null||solucio==null" class="w-full flex justify-center gap-2 py-1 px-2 transition-all">
            <div class="hidden md:flex flex-1 aspect-square rounded-sm flex items-center justify-center drop-shadow hover:drop-shadow-lg bg-red-600"></div>
            <div v-for="n in 5" :key="n" class="flex-1 aspect-square rounded-sm flex items-center justify-center drop-shadow hover:drop-shadow-lg bg-gray-200"></div>
        </div>
    <div v-else class=" w-full flex justify-center gap-2 relative hover:bg-gray-100 w-fit mx-auto py-1 px-2 rounded-sm "
    :class="colla.id==solucio.id?' border-red-600 border-solid border border-2':{}">
    
    
        <div v-if="colla!==null||solucio!==null" class="hidden md:flex flex-1 aspect-square rounded-sm flex text-center items-center justify-center drop-shadow hover:drop-shadow-lg bg-red-600"
        >
        <Transition
  name="fade"
  appear
>
            <span  class="text-white font-bold text-sm">{{ colla.nom }}</span>

        </Transition>
        </div>

        <Transition
  name="flip1"
  appear>
        <div 
        v-if="colla!==null||solucio!==null"
        class="overflow-hidden flex-1 aspect-square rounded-sm flex flex-col items-center justify-center text-center drop-shadow hover:drop-shadow-lg"
        :class="aproximaColor()">
            <div :style="{backgroundColor:colla.codi_color}" 
            class="aspect-square max-h-12 grow border-solid border-white border border-2 drop-shadow hover:drop-shadow-lg"></div>
            <span class="font-bold md:text-sm text-xs">
                {{ colla.color_camisa }}
            </span>
        </div>
    </Transition>

    <Transition
    
  name="flip2"
  appear
    >
        <div 
        v-if="colla!==null||solucio!==null"
        class="flex-1 aspect-square rounded-sm flex items-center justify-center drop-shadow hover:drop-shadow-lg"
        :class="aproximaAnys()">
            <span class="text-black font-bold">{{ colla.fundacio }}
            <span v-if="colla.fundacio<solucio.fundacio" title="fundacio posterior">▲
            </span>
            <span v-else-if="colla.fundacio>solucio.fundacio" title="fundacio anterior">▼</span></span>
        </div>
    </Transition>
        <Transition
  name="flip3"
  appear
>
        <div 
        v-if="colla!==null||solucio!==null"
        class="flex-1 aspect-square rounded-sm flex flex-col items-center justify-center drop-shadow hover:drop-shadow-lg"
        :class="colla.tipus==solucio.tipus?'bg-green-300':'bg-gray-200'">
            <span class="text-black font-bold text-lg md:text-3xl"><IcoTipEst :colla="colla" dada="tipus"/></span>
            <span class="hidden md:block font-bold text-sm">{{ formatDada(colla.tipus) }}</span>
        </div>
        </Transition>

        <Transition
  name="flip4"
  appear
>
        <div 
        v-if="colla!==null||solucio!==null"
        class="flex-1 aspect-square rounded-sm flex flex-col items-center justify-center drop-shadow hover:drop-shadow-lg"
        :class="colla.estat==solucio.estat?'bg-green-300':'bg-gray-200'">
            <span class="text-black font-bold text-lg md:text-3xl"><IcoTipEst :colla="colla" dada="estat"/></span>
            <span class="hidden md:block font-bold text-sm">{{ formatDada(colla.estat) }}</span>
            
        </div>
        
        </Transition>

        <Transition
  name="flip5"
  appear
>
        <div 
        v-if="colla!==null||solucio!==null"
        class="overflow-hidden flex-1 aspect-square rounded-sm flex items-center justify-center bg-gray-200 text-center drop-shadow hover:drop-shadow-lg"
        :class="colla.localitat==solucio.localitat?'bg-green-300':'bg-gray-200'">
            <span class="text-black font-bold md:text-sm text-xs">{{ colla.localitat }}</span>
        </div>
        </Transition>


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

            function formatDada(estat){
            const mapaFormats={
                //Tipus
                convencional:"Convencional",
                universitaria:"Universitària",
                internacional:"Internacional",

                //Estats
                activa:"Activa",
                formacio:"En formació",
                desapareguda:"Desapareguda"
            };
            return mapaFormats[estat]|| "Desconegut"
        }
            
            return{
                aproximaAnys,
                aproximaColor,
                formatDada
            }
        }
    }
</script>

<style>
    .flip1-enter-active {
  transition: opacity 0.5s ease, transform 1s ease;
  transition-delay:0.2s

}

.flip2-enter-active {
  transition: opacity 0.5s ease, transform 1s ease;
  transition-delay:0.6s
}
.flip3-enter-active {
  transition: opacity 0.5s ease, transform 1s ease;
  transition-delay:1s

}
.flip4-enter-active {
  transition: opacity 0.5s ease, transform 1s ease;
  transition-delay:1.4s
}
.flip5-enter-active {
  transition: opacity 0.5s ease, transform 1s ease;
  transition-delay:1.8s
}


.flip1-enter-from,
.flip2-enter-from,
.flip3-enter-from,
.flip4-enter-from,
.flip5-enter-from{
  opacity: 0;
  transform: rotateY(0.25turn);
}
.flip1-enter-to,
.flip2-enter-to,
.flip3-enter-to,
.flip4-enter-to,
.flip5-enter-to{
  opacity: 1;
  transform: rotateY(0turn);
}



.fade-enter-active{
  transition: opacity 0.2s ease;
}
.fade-enter-from{
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}

</style>
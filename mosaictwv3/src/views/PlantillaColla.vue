 <template>
    <div>
        <div class="w-full" :class="colla.color_hsl[2]>=50?'text-black':'text-white'" :style=" colla.codi_color!=='#ffffff'?{backgroundColor: colla.codi_color}:{backgroundColor:'#e0e0e0'}">
           
            <div class="max-w-screen-lg mx-auto py-4 grid grid-cols-12">
                
                <div class="ml-2 aspect-square  col-span-6 md:col-span-3 mr-4" :class="!colla.xy_escut?.length&&colla.color_hsl[2]>=50?'brightness-0 opacity-50':{}" 
                :style="colla.xy_escut?.length?
                    {
                        
                    backgroundImage: `url(${escutsSprite})`, 
                    backgroundPosition: `${-100*colla.xy_escut[0]}% ${-100*colla.xy_escut[1]}%` ,
                    backgroundSize: 100*12+'%'}:
                    {
                        backgroundImage:`url(${escutDesconegut})`,
                        backgroundSize:100+'%'}">
                </div>

                <div class=" col-span-6 justify-center md:order-last md:col-span-4 text-center self-center flex gap-3 p-2">
                    <div class="flex flex-col justify-center items-center">
                    <div class="border-solid border-4 border-white size-24 drop-shadow flex items-center justify-center hover:drop-shadow-lg hover:animate-pulse cursor-pointer"
                    :style=" 
                        colla.patro?.length?{
                            backgroundColor: colla.codi_color,
                            backgroundImage: `url(${require('../assets/patrons/' + colla.patro[0])})`,
                            backgroundPosition: `center`,
                            backgroundSize: `${colla.patro[1]}%`
                        }:
                        colla.codi_color!=='#ffffff'?{backgroundColor: colla.codi_color}:
            
                        {backgroundColor:'#e0e0e0'}">
                    <span v-if="colla.codi_color=='#ffffff'" class="text-6xl font-bold my-auto">?</span>
                    <tippy to="parent" content-tag="div" theme="light" content-class="rounded-sm"> 
                        <div class="p-2 justify-center">
                            <p class="py-1 font-bold text-base">{{ colla.color_camisa }}</p>
                            <p><span class="font-bold">PANTONE:</span> <span v-if="colla.pantone?.length">{{ colla.pantone }}</span><span v-else>No especificat</span></p>
                            <p><span class="font-bold">HEX:</span> {{ colla.codi_color }}</p>
                            <p><span class="font-bold">RGB:</span> {{ colla.color_rgb[0] }}, {{ colla.color_rgb[1] }}, {{ colla.color_rgb[2] }}</p>
                            <p><span class="font-bold">HSL:</span> {{ colla.color_hsl[0] }}, {{ colla.color_hsl[1] }}%, {{ colla.color_hsl[2] }}%</p>
                            <p><span class="font-bold">CMYK:</span></p>
                        </div>
                    </tippy>
                    </div>
                    <p class="py-2 font-bold max-w-24">{{ colla.color_camisa }}</p>
                        </div>
                    <div class="text-left lg:text-nowrap text-sm hidden sm:block">
                        <p><span class="font-bold">PANTONE:</span> <span v-if="colla.pantone?.length">{{ colla.pantone }}</span><span v-else>No especificat</span></p>
                        <p><span class="font-bold">HEX:</span> {{ colla.codi_color }}</p>
                        <p><span class="font-bold">RGB:</span> {{ colla.color_rgb[0] }}, {{ colla.color_rgb[1] }}, {{ colla.color_rgb[2] }}</p>
                        <p><span class="font-bold">HSL:</span> {{ colla.color_hsl[0] }}, {{ colla.color_hsl[1] }}%, {{ colla.color_hsl[2] }}%</p>
                        <p><span class="font-bold">CMYK:</span></p>
                    </div>
                </div>

                <div class="col-span-12 md:col-span-5 flex flex-col px-4">
                    <h1 class="text-2xl font-bold inline-flex items-center"><span>{{ colla.nom }}
                        <span class="text-nowrap">
                            <IcoTipEst :colla="colla" dada="tipus" class=""/>
                        <IcoTipEst :colla="colla" dada="estat" class="ml-2"/>
                        </span></span>
                    </h1>
                    <h2 class="text-lg ">{{ colla.localitat }}</h2>
                    <h2 class="text-lg  ">{{ colla.fundacio }} - 
                        <span v-if="colla.desaparicio==null">Actualitat</span>  
                        <span v-else>{{ colla.desaparicio }}</span> </h2>   
                    
                    <h2 class="text-lg  ">Colla {{ formatDada(colla.tipus) +' '+ formatDada(colla.estat)}}</h2>
                        <p class="my-1 text-xl /70">
                    <a class="mx-1" title="Pàgina Web de la Colla" v-if="colla.web!==null" :href="'https://'+colla.web" target="_blank" alt="Lloc Web"><font-awesome-icon :icon="['fas','globe']"/></a>
                    <a  class="mx-1" title="Article Wikipedia de la Colla" :href="colla.url" target="_blank" alt="Article Wikipedia"><font-awesome-icon :icon="['fab', 'wikipedia-w']"/></a></p>
            
                </div>

                

            </div>
        </div>
        <div class="max-w-screen-lg md:mx-auto py-4 px-4 ">
            <h2 class="text-xl font-bold">Estadístiques de la Colla (En construcció):</h2>
            <h3 class="text-xl">Millors Castells:</h3>
            <div class="flex flex-wrap hidden">
            <MiniCastell castell="Jd12fmpa"/>   
            <MiniCastell castell="3d29"/> 
            <MiniCastell castell="3d7"/>
            
            <MiniCastell castell="4d7"/>
            <MiniCastell castell="3d7a"/>
            
            <MiniCastell castell="Td7"/>
            
            <MiniCastell castell="2d5"/>    
            <MiniCastell castell="Pd5"/>   
            <MiniCastell castell="5d7"/>
            
            <MiniCastell castell="12d7"/>
            <MiniCastell castell="2pd5"/>
             </div>
        </div>
    </div>
 </template>

 <script>
 import { inject,computed } from 'vue'
import MiniCastell from '@/components/MiniCastell.vue';
import IcoTipEst from '@/components/IcoTipEst.vue';
import escutDesconegut from '@/assets/escuts/escut_desconegut.svg'


export default{
    props:['id'],
    components:{
        MiniCastell,
        IcoTipEst
    },
setup(props){
    const dades = inject('dades')
    const escutsSprite = inject('escutsSprite')

    const colla = computed(() =>
      dades.find(colla => colla.id === props.id)
    )

    function formatDada(estat){
        const mapaFormats={
                //Tipus
                convencional:"convencional",
                universitaria:"universitària",
                internacional:"internacional",

                //Estats
                activa:"activa",
                formacio:"en formació",
                desapareguda:"desapareguda"
            }
            
            return mapaFormats[estat]|| "Desconegut"
            }

    const idx=Math.floor(Math.random()*173)
    
    //const idx=166
    return{
        colla,
        dades,
        escutsSprite,
        idx,
        formatDada,
        escutDesconegut
    }
}}
</script>

<style>

.tippy-box{
    border-radius:  0.25rem !important; 
    
}
.tippy-content{
    padding:0px !important;
}

</style>
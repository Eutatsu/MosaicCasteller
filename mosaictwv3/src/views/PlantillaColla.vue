 <template>
    <div>
        <div class="w-full" :class="colla.color_hsl[2]>=50?'text-black':'text-white'" :style=" colla.codi_color!=='#ffffff'?{backgroundColor: colla.codi_color}:{backgroundColor:'#e0e0e0'}">
           
            <div class="max-w-screen-lg mx-auto py-4 grid grid-cols-12">
                
                <div class="ml-2 aspect-square  col-span-5 md:col-span-3 mr-4" :class="!colla.xy_escut?.length&&colla.color_hsl[2]>=50?'brightness-0 opacity-50':{}" 
                :style="colla.xy_escut?.length?
                    {
                        
                    backgroundImage: `url(${escutsSprite})`, 
                    backgroundPosition: `${-100*colla.xy_escut[0]}% ${-100*colla.xy_escut[1]}%` ,
                    backgroundSize: 100*12+'%'}:
                    {
                        backgroundImage:`url(${escutDesconegut})`,
                        backgroundSize:100+'%'}">
                </div>

                <div class=" col-span-7 justify-center md:order-last md:col-span-4 text-center self-center flex gap-3 p-2">
                    <div class="flex flex-col justify-center items-center">
                    <div class="border-solid border-4 border-white w-20 h-20 md:w-24 md:h-24 drop-shadow flex items-center justify-center"
                    :style=" colla.codi_color!=='#ffffff'?{backgroundColor: colla.codi_color}:{backgroundColor:'#e0e0e0'}">
                    <span v-if="colla.codi_color=='#ffffff'" class="text-6xl font-bold my-auto">?</span>
                    </div>
                    <p class="py-2 font-bold max-w-24">{{ colla.color_camisa }}</p>
                        </div>
                    <div class="text-left lg:text-nowrap">
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
                        <font-awesome-icon 
                        class="opacity-50 "
                        :title="
                        colla.tipus=='convencional'?'Colla Convencional':
                        colla.tipus=='universitaria'?'Colla Universitaria':
                        colla.tipus=='internacional'?'Colla Internacional':
                        {}
                        " 

                        :icon="colla.tipus=='convencional'?['fas', 'house']:
                        colla.tipus=='universitaria'?['fas', 'graduation-cap']:
                        colla.tipus=='internacional'?['fas', 'earth-americas']:
                        {}
                        "/>

                        <font-awesome-icon 
                        class="opacity-50 ml-2"
                        :title="
                        colla.estat=='activa'?'Colla Activa':
                        colla.estat=='formacio'?'Colla en Formació':
                        colla.estat=='desapareguda'?'Colla Desapareguda':
                        {}
                        " 

                        :icon="colla.estat=='activa'?['fas', 'fire']:
                        colla.estat=='formacio'?['fas', 'seedling']:
                        colla.estat=='desapareguda'?['fas', 'wind']:
                        {}
                        "/></span></span>
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
            <div class="flex flex-wrap">
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
//import ref from 'vue'
import dades from '../json/dades_colles_id.json';
import escutsSprite from '@/assets/escuts/escuts_sprite.png';
import MiniCastell from '@/components/MiniCastell.vue';
import escutDesconegut from '@/assets/escuts/escut_desconegut.svg'


export default{
    props:['id'],
    data(){
        return{
            colla: null
        }
    },
    created(){
        this.colla = dades.find(colla => colla.id === this.id);
    },
    components:{
        MiniCastell
    },
setup(){
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
        dades,
        escutsSprite,
        idx,
        formatDada,
        escutDesconegut
    }
}}
</script>


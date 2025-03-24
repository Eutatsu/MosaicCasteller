 <template>
    <div>
        <div class="w-full" :class="dades[idx].color_hsl[2]>=50?'text-black':'text-white'" :style=" dades[idx].codi_color!=='#ffffff'?{backgroundColor: dades[idx].codi_color}:{backgroundColor:'#e0e0e0'}">
            <div class="max-w-screen-lg flex grid-cols-12 mx-auto py-4">
                <div class="col-span-auto w-[200px] h-[200px]" :style="dades[idx].xy_escut?.length?
            {
                
            backgroundImage: `url(${escutsSprite})`, 
            backgroundPosition: `${-100*dades[idx].xy_escut[0]}% ${-100*dades[idx].xy_escut[1]}%` ,
            backgroundSize: 100*12+'%'}:{}">
                </div>
                <div class="flex justify-between grow">
                <div class="flex flex-col px-4">
                    <h1 class="text-2xl font-bold inline-flex items-center">{{ dades[idx].nom }}
                        <span class="opacity-50 ml-2">
                        <div title="Colla Convencional">
                        <font-awesome-icon v-if="dades[idx].tipus=='convencional'"  :icon="['fas', 'house']"/>
                        </div>
                        <div title="Colla Universitaria">
                        <font-awesome-icon v-if="dades[idx].tipus=='universitaria'" :icon="['fas', 'graduation-cap']"/>
                        </div>
                        <div  title="Colla Internacional">
                        <font-awesome-icon v-if="dades[idx].tipus=='internacional'" :icon="['fas', 'earth-americas']"/>
                        </div>
                    </span>
                    <span class="opacity-50 ml-2">
                        <div class="flex justify-end" title="Colla Activa">
                        <font-awesome-icon v-if="dades[idx].estat=='activa'" :icon="['fas', 'fire']"/>
                        </div>
                        <div class="flex justify-end" title="Colla en Formació">
                        <font-awesome-icon v-if="dades[idx].estat=='formacio'"  :icon="['fas', 'seedling']"/>
                        </div>
                        <div class="flex justify-end" title="Colla Desapareguda">
                        <font-awesome-icon v-if="dades[idx].estat=='desapareguda'" :icon="['fas', 'wind']"/>
                        </div>
                    </span>
                    </h1>
                    <h2 class="text-lg ">{{ dades[idx].localitat }}</h2>
                    <h2 class="text-lg  ">{{ dades[idx].fundacio }} - 
                        <span v-if="dades[idx].desaparicio==null">Actualitat</span>  
                        <span v-else>{{ dades[idx].desaparicio }}</span> </h2>   
                    
                    <h2 class="text-lg  ">Colla {{ formatDada(dades[idx].tipus) +' '+ formatDada(dades[idx].estat)}}</h2>
                        <p class="my-1 text-xl /70">
                <a class="mx-1" title="Pàgina Web de la Colla" v-if="dades[idx].web!==null" :href="'https://'+dades[idx].web" target="_blank" alt="Lloc Web"><font-awesome-icon :icon="['fas','globe']"/></a>
                <a  class="mx-1" title="Article Wikipedia de la Colla" :href="dades[idx].url" target="_blank" alt="Article Wikipedia"><font-awesome-icon :icon="['fab', 'wikipedia-w']"/></a></p>
          
                </div>
                <div class="text-center self-center flex gap-3">
                    <div>
                    <div class="border-solid border-4 border-white w-24 h-24 drop-shadow flex items-center justify-center"
                :style=" dades[idx].codi_color!=='#ffffff'?{backgroundColor: dades[idx].codi_color}:{backgroundColor:'#e0e0e0'}">
                <span v-if="dades[idx].codi_color=='#ffffff'" class="text-6xl font-bold my-auto">?</span>
                </div>
                <p class="py-2 font-bold max-w-24">{{ dades[idx].color_camisa }}</p>
            </div>
            <div class="text-left">
                <p><span class="font-bold">PANTONE:</span> </p>
                <p><span class="font-bold">HEX:</span> {{ dades[idx].codi_color }}</p>
                <p><span class="font-bold">RGB:</span> {{ dades[idx].color_rgb[0] }}, {{ dades[idx].color_rgb[1] }}, {{ dades[idx].color_rgb[2] }}</p>
                <p><span class="font-bold">HSL:</span> {{ dades[idx].color_hsl[0] }}, {{ dades[idx].color_hsl[1] }}%, {{ dades[idx].color_hsl[2] }}%</p>
                <p><span class="font-bold">CMYK:</span></p>
            </div>
                </div>
            </div>

            </div>
        </div>
        <div class="max-w-screen-lg mx-auto py-4">
            <h2 class="text-xl">Millors Castells:</h2>
            <div class="flex">
            <MiniCastell castell="3d6"/>
            <MiniCastell castell="4d5"/>
            <MiniCastell castell="3d7"/>
            
            <MiniCastell castell="3d7a"/>
            <MiniCastell castell="12d12fmp"/>
            <MiniCastell castell="pd5"/>
             </div>
        </div>
    </div>
 </template>

 <script>
//import ref from 'vue'
import dades from '../json/reordenades_localitat.json';
import escutsSprite from '@/assets/escuts/escuts_sprite.png';
import MiniCastell from '@/components/MiniCastell.vue';


export default{
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
    console.log(idx)
    return{
        dades,
        escutsSprite,
        idx,
        formatDada
    }
}}
</script>
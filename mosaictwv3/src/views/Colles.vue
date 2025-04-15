<template>
    <div class="max-w-screen-lg flex mx-auto self-center mt-4">
        <div class="grow group flex flex-col mx-2"
           
            
            >
                <input v-model="cerca" @change="filtrarDades(cerca)" placeholder="Cerca colles, colors, municipis..." tabindex="0" 
                class=" w-full rounded-sm border-red-600 border-2 bg-white p-2"
                @focus="obreLlista=true"
                @blur="obreLlista=false"
                >
                <div class="col-span-6 grid grid-cols-12 justify-between items-center rounded-sm drop-shadow bg-white p-2">
                    <div class="col-span-12 inline-flex gap-x-1 gap-y-2 items-start flex-wrap md:flex-row flex-col text-sm">
                            <button  class="inline-flex items-center group md:flex-1 justify-right hover:bg-gray-200 hover:drop-shadow w-full" 
                            
                            v-for="value in ['convencional','universitaria','internacional']"
                            :key="value"
                            @click="toggleArray(tipus,value)"
                            :value="value">
                            <font-awesome-icon 
                            class="
                            drop-shadow
                            text-lg 
                            aspect-square 
                            inline-flex 
                            flex-nowrap 
                            items-center 
                            rounded-sm  
                            border-solid 
                            bg-gray-200 
                            border-2 p-1 
                            justify-center mr-1"
                            :class="tipus.includes(value)?
                            'border-red-600 group-hover:border-red-500 bg-red-600 border-solid border-2 text-white group-hover:border-red-500 group-hover:bg-red-500':
                            'text-gray-500  group-hover:border-red-600'"  
                            :icon="
                            value=='convencional'?['fas', 'house']:
                            value=='universitaria'?['fas', 'graduation-cap']:
                            value=='internacional'?['fas', 'earth-americas']:
                            {}
                            "/>
                            <span>{{formatBotons(value)}}</span>
                            <font-awesome-icon v-if="tipus.includes(value)" :icon="['fas', 'check']" class="ml-1 text-white-600" /> 
                            </button>
                            
                           
                       
                    </div>
                    <div class="col-span-12 inline-flex gap-x-1 gap-y-2 items-start flex-wrap md:flex-row flex-col text-sm">

                        <button  class="inline-flex items-center group md:flex-1 w-full justify-right hover:bg-gray-200 hover:drop-shadow" 
                            
                            v-for="value in ['activa','formacio','desapareguda']"
                            :key="value"
                            @click="toggleArray(estat,value)"
                            :value="value">
                            <font-awesome-icon 
                            class="
                            drop-shadow
                            text-lg 
                            aspect-square 
                            inline-flex 
                            flex-nowrap 
                            items-center 
                            rounded-sm 
                            border-solid 
                            bg-gray-200 
                            border-2 p-1 
                            justify-center mr-1"
                            :class="estat.includes(value)?
                            'border-red-600 group-hover:border-red-500 bg-red-600 border-solid border-2 text-white group-hover:border-red-500 group-hover:bg-red-500':
                            'text-gray-500  group-hover:border-red-600'"  
                            :icon="
                            value=='activa'?['fas', 'fire']:
                            value=='formacio'?['fas', 'seedling']:
                            value=='desapareguda'?['fas', 'cross']:
                            {}
                            " />
                            <span class="text-nowrap">{{formatBotons(value)}}</span>
                            
                            <font-awesome-icon v-if="estat.includes(value)" :icon="['fas', 'check']" class="ml-1 text-white-600" /> 
                            </button>
                            

                        </div>
                </div>
                
                <!--<div class="relative h-0 w-full">
            <ul class="absolute w-full bg-white drop-shadow rounded-sm max-h-96 overflow-y-auto p-1 z-[999]"
            :class="obreLlista==true?'inline':'hidden'"
            >
                <li class="inline-flex items-center p-2 hover:bg-red-600 font-bold text-black hover:text-white rounded-sm w-full text-left cursor-pointer"
                
                 v-for="(colla,index) in filtrarDades(cerca)" :key="index"
               > <div :style="{backgroundColor:colla.codi_color}" class="aspect-square h-5 border-solid border border-1 mr-2"></div>
               <div class="flex flex-col md:flex-row md:items-center">
               <span>{{ colla.nom }}</span>
               <span class="font-normal text-sm mr-2 md:ml-2">{{colla.localitat}} / {{ colla.fundacio }} / 
                <IcoTipEst  :key="'estat'+colla.id" :colla="colla" dada="tipus" class=""/> / <IcoTipEst :key="'estat'+colla.id" :colla="colla" dada="estat" class=""/></span>
            </div>
        </li>
            </ul
        </div>>-->
        </div>
    </div>

    <div class="grid grid-cols-12 gap-2 p-2">
        <div v-for="(colla,index) in filtrarDades(cerca)" :key="index" class="2xl:col-span-2 lg:col-span-3 md:col-span-4 xs:col-span-6 col-span-12  drop-shadow hover:drop-shadow-lg rounded-sm bg-white hover:bg-gray-100 flex flex-row">
            <div class="flex flex-row justify-center p-1">
           <div class="flex flex-col">
            <router-link :to="'/colles/'+colla.id"  class=" justify-center cursor-pointer"
                    style="width:100px; height:100px"
                    :style=" 
                        colla.patro?.length?{
                            backgroundColor: colla.codi_color,
                            backgroundImage: `url(${require('../assets/patrons/' + colla.patro[0])})`,
                            backgroundPosition: `center`,
                            backgroundSize: `${colla.patro[1]}%`
                        }:
                        colla.codi_color!=='#ffffff'?{backgroundColor: colla.codi_color}:
            
                        {backgroundColor:'#e0e0e0'}">
                       <div class="aspect-square"  :class="!colla.xy_escut?.length&&colla.color_hsl[2]>=50?'brightness-0':{}" 
                         style="width:100px; height:100px"
                :style="colla.xy_escut?.length?
                    {
                    
                    backgroundImage: `url(${escutsSprite})`, 
                    backgroundPosition: `${-100*colla.xy_escut[0]}% ${-100*colla.xy_escut[1]}%` ,
                    backgroundSize: 100*12+'%'}:
                    {
                        backgroundImage:`url(${escutDesconegut})`,
                        backgroundSize:100+'%',
                        opacity:'50%'
                        }">
                </div>
                
                </router-link>
                <div class="text-xs flex flex-col gap-y-1 w-[100px] bg-gray-200 mt-1 p-1 rounded-sm drop-shadow">
                
                            <p class="py-1 font-bold text-sm">{{ colla.color_camisa }}</p>
                            <p v-if="colla.patro?.length"><strong>Patró especial:</strong>Sí</p>
                            <div div="flex flex-col">
                                <div class="font-bold">PANTONE: </div>
                                    <span v-if="colla.pantone?.length">{{ colla.pantone }}</span><span v-else>No especificat</span>
                               
                            </div>

                            <div div="flex flex-col">
                                <div class="font-bold">HEX: </div>
                                <div class="inline-flex">
                                    <div :style="{backgroundColor:colla.codi_color}" class="aspect-square h-4 drop-shadow-sm border-solid border border-1"></div>
                                    <p >{{ colla.codi_color }}</p>
                                </div>
                            </div>

                            <div div="flex flex-col">
                            <div class="font-bold"> RGB:</div>
                            <div class="inline-flex">
                                <div :style="{backgroundColor: `rgb(${colla.color_rgb[0]}, ${colla.color_rgb[1]}, ${colla.color_rgb[2]})`}" 
                                class="aspect-square h-4 drop-shadow-sm border-solid border border-1"></div><p class="flex">
                                {{ colla.color_rgb[0] }},{{ colla.color_rgb[1] }},{{ colla.color_rgb[2] }}</p>
                            </div></div>

                            <div div="flex flex-col">
                            <div class="font-bold"> HSL:</div>
                            <div class="inline-flex">
                                <div :style="{backgroundColor: `hsl(${colla.color_hsl[0]}, ${colla.color_hsl[1]}%, ${colla.color_hsl[2]}%)`}" 
                                class="aspect-square h-4 drop-shadow-sm border-solid border border-1"></div><p class="flex">
                               {{ colla.color_hsl[0] }}, {{ colla.color_hsl[1] }}%, {{ colla.color_hsl[2] }}%</p>
                            </div></div>

                            <p><span class="font-bold">CMYK:</span></p>
                        
                </div>
            </div>
            </div>
            <div class="py-2 px-1 text-sm flex flex-col gap-1">
                <router-link :to="'/colles/'+colla.id">
            <h2 class="hover:underline max-w-64 text-base">
            <strong>{{ colla.nom }}</strong>
            <span class="text-nowrap text-base ml-2">
                        <IcoTipEst :key="colla.id" :colla="colla" dada="tipus" class=""/>
                        <IcoTipEst :key="colla.id" :colla="colla" dada="estat" class="ml-2"/>
                        
            </span></h2></router-link>
            
            <h3 >Colla {{ formatDada(colla.tipus)+' '+ formatDada(colla.estat)}}</h3>
            <h3 ><strong>Localitat: </strong>{{ colla.localitat }}</h3>
            <h3 ><strong>Fundació: </strong>{{ colla.fundacio }}</h3>
            <h3 v-if="colla.estat=='desapareguda'"><strong>Desaparició: </strong>
                <span v-if="colla.desaparicio!==-1">{{ colla.desaparicio }}</span>
                <span v-else>Desconegut</span></h3>
            <h3 v-if="colla.refundacio?.length"><strong>Refundació: </strong>{{ colla.refundacio }}</h3>
            <div><a class="" v-if="colla.url!==null" 
            :href="colla.url" target="_blank" title="Article Wikipedia">
            <strong>Article Wikipedia: </strong><font-awesome-icon  class="text-base" :icon="['fab', 'wikipedia-w']"/></a>
            </div>
        <div><a class="" v-if="colla.web!==null" 
            :href="'https://'+colla.web" target="_blank" title="Lloc Web">
            <strong>Lloc Web: </strong><font-awesome-icon class="text-base" :icon="['fas','globe']"/></a></div>
        </div>        
                
           <div  v-for="(value,key) in colla"  :key=key ><p v-if="!ignoreKeys.includes(key)"><strong>{{key}}</strong>: {{ value }}</p>
           
        </div>
    
            
        
    </div>
            
    </div>
</template>

<script>
import {ref,inject} from 'vue'
import escutDesconegut from '@/assets/escuts/escut_desconegut.svg'
import IcoTipEst from '@/components/IcoTipEst.vue'

export default{
    components:{
        IcoTipEst
    },
    setup(){
        const dades = inject('dades')
        const escutsSprite = inject('escutsSprite')
        const ignoreKeys =['fundacio','refundacio','desaparicio','patro','localitat','tipus','estat','id','xy_escut','web','url','nom','pantone','color_camisa','codi_color','color_rgb','color_hsl']
        let seleccio=ref("")
        let cerca=ref("")
        let obreLlista=ref(false)

        //Botons
        let tipus=ref(["convencional","universitaria","internacional"])
        let estat=ref(["activa","formacio","desapareguda"])
        function formatBotons(valor){
                const mapaFormats={
                //Tipus
                convencional:"Convencionals",
                universitaria:"Universitàries",
                internacional:"Internacionals",

                //Estats
                activa:"Actives",
                formacio:"En formació",
                desapareguda:"Desaparegudes"
            };
            return mapaFormats[valor]|| "Desconegut"
        }
        function toggleArray(array,valor){
            console.log('trying array '+array)
                const index = array.indexOf(valor)
                if (index > -1) {
                    array.splice(index, 1) 
                } else {
                    array.push(valor) 
              } 
            }

        //Ordre Dades
        dades.sort((a,b)=>a.nom.localeCompare(b.nom))
        function selecciona(colla){
            
            cerca.value=colla.nom
            seleccio.value=colla
        }
    
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
            };
            return mapaFormats[estat]|| "Desconegut"
        }

        function filtrarDades(cerca){
            let filtrat=dades.filter(colla=>
               ( eliminarAccents(colla.nom|| "").includes(eliminarAccents(cerca)) ||
                eliminarAccents(colla.color_camisa|| "").includes(eliminarAccents(cerca)) ||
                eliminarAccents(colla.localitat || "").includes(eliminarAccents(cerca))||
                eliminarAccents(colla.fundacio || "").includes(eliminarAccents(cerca)))&&

                tipus.value.includes(colla.tipus)&&
                estat.value.includes(colla.estat)
            )
            
            return filtrat
            
        }
        
        function  eliminarAccents(str){
            return String(str).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            }

        return{
            dades,
            escutsSprite,
            escutDesconegut,
            ignoreKeys,

            
            eliminarAccents,
            filtrarDades,
            selecciona,
            formatDada,
            obreLlista,
            cerca,

            tipus,
            estat,
            formatBotons,
            toggleArray
        }
    }
}

</script>
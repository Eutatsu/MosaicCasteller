<template>
    <div class="grid grid-cols-12 gap-2 p-2">
        <router-link :to="'/colles/'+colla.id" v-for="(colla,index) in dades" :key="index" class="2xl:col-span-2 lg:col-span-3 md:col-span-4 xs:col-span-6 col-span-12  drop-shadow hover:drop-shadow-lg rounded-sm bg-white flex flex-row">
            <div class="flex flex-row justify-center p-1">
           <div class="flex flex-col">
            <div class=" justify-center cursor-pointer"
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
                
                </div>
                <div class="text-xs flex flex-col gap-y-1 w-[100px]">
                
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
            <div class="py-2 text-sm flex flex-col gap-1">
            <h2 class="hover:underline max-w-64">
            <strong>{{ colla.nom }}</strong>
            <span class="text-nowrap text-base ml-2">
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
                        colla.estat=='desapareguda'?['fas', 'cross']:
                        {}
                        "/>
            </span></h2>
            
            <h3 >Colla {{ colla.tipus+' '+ colla.estat}}</h3>
            <h3 ><strong>Localitat: </strong>{{ colla.localitat }}</h3>
            <h3 ><strong>Fundació: </strong>{{ colla.fundacio }}</h3>
            <h3 v-if="colla.desaparicio?.length"><strong>Desaparició: </strong>{{ colla.desaparicio }}</h3>
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
    
            
        
        </router-link>
            
    </div>
</template>

<script>
import {inject} from 'vue'
import escutDesconegut from '@/assets/escuts/escut_desconegut.svg'

export default{
    setup(){
        const dades = inject('dades')
        const escutsSprite = inject('escutsSprite')
        const ignoreKeys =['fundacio','refundacio','desaparicio','patro','localitat','tipus','estat','id','xy_escut','web','url','nom','pantone','color_camisa','codi_color','color_rgb','color_hsl']
        return{
            dades,
            escutsSprite,
            escutDesconegut,
            ignoreKeys
        }
    }
}

</script>
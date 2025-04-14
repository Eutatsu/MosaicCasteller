<template>
    <h3 v-if="titol" class="mt-3 text-2xl text-center">{{titol + ' ('+filtrarDades().length+'):'}}{{  }}</h3>
    <div id="mosaic" class="flex flex-wrap justify-center">
        
       <!-- <div :style="{ backgroundImage: `url(${escutsSprite})`, width:mida+'px', height:mida+'px',backgroundPosition:-mida+'px 0px' ,backgroundSize:mida*12+'px'}">
    test test
  </div>-->

        <div
        class="
        relative
        grid flex-col 
        outline-white
        
        z-[500]
        hover:z-[700]

        hover:outline-gray-200/75
        hover:drop-shadow-md 
        hover:outline-solid 
        hover:outline-[3px] 
        hover:outline 
        
        
        focus:outline-white
        focus:drop-shadow-lg
        focus:outline-solid
        focus:oultine-[3px] 
        focus:outline

        transition"
        :class="colla.color_hsl[2]>=40 ? 'text-black':'text-white'"

        v-for="(colla,index) in filtrarDades()" 
        :key="index"
        tabindex="0"
        :id="'colla-'+id+'-'+index"
        :style="{ 
            width:mida + 'px',
            height:mida + 'px', 
            backgroundColor: perfilColor(colla),
            ...backgroundStyles(colla)
            }"
        
        
        
        >
        <!--<img src="../assets/escuts/escuts_sprite.png" style="width:100%" class="overflow-hidden absolute">-->
        <div class="absolute flex flex-col h-full w-full justify-between items-end px-1 opacity-60 overflow-hidden"
        :class="midaIcones">
        <div v-if="icones_tipus==true" class="">
            <IcoTipEst :colla="colla" dada="tipus" />
        </div>  
        
        <div v-if="(icones_estat==false&&nomes_desparegudes==true)&&colla.estat=='desapareguda'" class="h-full flex items-end" 
        >
           <IcoTipEst :colla="colla" dada="estat" />
        </div>

        <div v-if="icones_estat==true" class="h-full flex items-end" >
           <IcoTipEst :colla="colla" dada="estat" />
        </div>
        </div>

        <p class="place-self-center truncate w-full text-center font-bold opacity-80 px-1" 
        v-if="seleccio=='desconeguts'||nom_color==true" 
        :style="{fontSize:(mida/6)+'px'}">
            {{ colla.color_camisa }}
        </p>
            <tippy :key=colla.id to="parent" content-tag="div" content-class="w-fit"> 
                <TargetaInfo :colla="colla"></TargetaInfo>
            </tippy>
        </div>
    </div>
</template>

<script>
import { inject,computed } from 'vue'
import TargetaInfo from './TargetaInfo.vue'
import IcoTipEst from './IcoTipEst.vue'

export default {
    components:{
        TargetaInfo,
        IcoTipEst
        },
    name: 'MosaicRenderer',
    props:{
            titol:{
                type:String,
                required:false
            },
            llista: {
                type: Array,
                required:true
            },
            mida:{
                type: String,
                default:"80"
            },
            seleccio:{
                type: String,
                default:""
            },
            tipus:{
                type: Array
            },
            estat:{
                type: Array
            },
            id:{
                type:String,
                default:"id"
            },
            perfil_color:{
                type:String,
                default:"default",
                required:false
            },
            patrons:{
                type:Boolean,
                default:false,
                required:false
            },
            escuts:{
                type:Boolean,
                default:false,
                required:false
            },
            icones_tipus:{
                type:Boolean,
                default:true,
                required:false
            },
            icones_estat:{
                type:Boolean,
                default:true,
                required:false
            },
            nom_color:{
                type:Boolean,
                default:true,
                required:false
            },
            nomes_desparegudes:{
                type:Boolean,
                default:true,
                required:false
            }
                },
    setup(props){
    
//icones
        const midaIcones = computed(()=>{
            if(props.mida>=50&&props.mida<=120){
                return 'text-lg'
            }
            else if(props.mida>120){
                return 'text-2xl'
            }
            else if(props.mida<50&&props.mida>40){
                return 'text-sm'
            }
            else if(props.mida<40){
                return 'hidden'
            }
            else {
                return 'hidden'
            }
        })

//escuts i patrons
        const escutsSprite = inject('escutsSprite')
        function backgroundStyles(colla){
            const styles = {}
            if (colla.patro?.length&&props.patrons==true){
                if (colla.xy_escut?.length&&props.escuts==true){
                    styles.backgroundImage= `url(${escutsSprite}), url(${require('../assets/patrons/' + colla.patro[0])})`, 
                    styles.backgroundPosition= `${-props.mida*colla.xy_escut[0]}px ${-props.mida*colla.xy_escut[1]}px, center`,
                    styles.backgroundSize= `${props.mida * 12}px, ${colla.patro[1]}%`
                }
                else {
                    styles.backgroundImage= `url(${require('../assets/patrons/' + colla.patro[0])})`, 
                    styles.backgroundPosition= `center`,
                    styles.backgroundSize= `${colla.patro[1]}%`
                }
            }
            else{
                if (colla.xy_escut?.length&&props.escuts==true){
                    styles.backgroundImage= `url(${escutsSprite})`, 
                    styles.backgroundPosition= `${-props.mida*colla.xy_escut[0]}px ${-props.mida*colla.xy_escut[1]}px`,
                    styles.backgroundSize= props.mida*12+'px'
                }
                
            }
            return styles
        }
//cerca i dades

        function  filtrarDades(){
            return  props.llista.filter(colla=>
            
            props.tipus.includes(colla.tipus)&&
            props.estat.includes(colla.estat)&&
            (
                (
                colla.codi_color!=="#ffffff"&& 
                props.seleccio=="coneguts"
            )||
            (
                (colla.codi_color=="#ffffff"||colla.color_camisa=="Desconegut")
                && 
                props.seleccio=="desconeguts")
            )
            )
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

        function perfilColor(colla){
            if (props.perfil_color==="default"){
                return colla.codi_color;
            }
            else if (props.perfil_color==="monocrom"){
                return "hsl(0,0%,"+colla.color_hsl[2]+"%)";
            }
            else if (props.perfil_color==="hsl"){
                return "hsl("+colla.color_hsl[0]+","+colla.color_hsl[1]+"%,"+colla.color_hsl[2]+"%)";
            }
            else{
                return "ffffff"
            }
        }
    return{
        escutsSprite,
        backgroundStyles,
        filtrarDades,
        formatDada,
        perfilColor,
        midaIcones
        }
    },
}
</script>

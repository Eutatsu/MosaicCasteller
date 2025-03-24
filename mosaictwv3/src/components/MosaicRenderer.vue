<template>
    <div id="mosaic" class="flex flex-wrap justify-center">
       <!-- <div :style="{ backgroundImage: `url(${escutsSprite})`, width:mida+'px', height:mida+'px',backgroundPosition:-mida+'px 0px' ,backgroundSize:mida*12+'px'}">
    test test
  </div>-->

        <div
        class="grid flex-col"
        
        v-for="(colla,index) in filtrarDades" 
        :key="index"
        :class="casella" 
        tabindex="0"
        :id="'colla-'+id+'-'+index"
        :style="{ 
            width:mida + 'px',
            height:mida + 'px', 
            backgroundColor: perfilColor(colla),
            ...(
            colla.xy_escut?.length&&escuts==true
            ? {backgroundImage: `url(${escutsSprite})`, 
            backgroundPosition: `${-mida*colla.xy_escut[0]}px ${-mida*colla.xy_escut[1]}px` ,
            backgroundSize: mida*12+'px'}:{})}"
        
        
        
        >
        <!--<img src="../assets/escuts/escuts_sprite.png" style="width:100%" class="overflow-hidden absolute">-->
        <div v-if="icones_tipus==true" class="my-1 justify-self-start  w-full" :class="colla.color_hsl[2]>=35 ? 'text-black/30':'text-white/40'">
            <div class="flex justify-end" title="Colla Convencional">
            <font-awesome-icon v-if="colla.tipus=='convencional'" class="mx-1" :icon="['fas', 'house']"/>
            </div>
            <div class="flex justify-end" title="Colla Universitaria">
            <font-awesome-icon v-if="colla.tipus=='universitaria'" class="mx-1" :icon="['fas', 'graduation-cap']"/>
            </div>
            <div class="flex justify-end" title="Colla Internacional">
            <font-awesome-icon v-if="colla.tipus=='internacional'" class="mx-1" :icon="['fas', 'earth-americas']"/>
            </div>
        </div>  
        <p class="place-self-center" 
        v-if="seleccio=='desconeguts'" 
        :style="{fontSize:text+'px'}">
            {{ colla.color_camisa }}
        </p>
        
        <div v-if="icones_estat==true" class="my-1 justify-self-end place-self-end w-full" :class="colla.color_hsl[2]>=35 ? 'text-black/30':'text-white/40'">
            <div class="flex justify-end" title="Colla Activa">
            <font-awesome-icon v-if="colla.estat=='activa'" class="mx-1" :icon="['fas', 'fire']"/>
            </div>
            <div class="flex justify-end" title="Colla en Formació">
            <font-awesome-icon v-if="colla.estat=='formacio'" class="mx-1 " :icon="['fas', 'seedling']"/>
            </div>
            <div class="flex justify-end" title="Colla Desapareguda">
            <font-awesome-icon v-if="colla.estat=='desapareguda'" class="mx-1 " :icon="['fas', 'wind']"/>
            </div>
        </div>
           <img v-if="colla.patro?.length" :src="require('../assets/patrons/'+colla.patro)" style="width:100%;">
           
            <tippy :key="reRenderKey" to="parent" content-tag="div" content-class="w-fit"> 
                <div class="bg-black/40 px-3 py-1 border-b border-white ">
                <h2 class="text-base text-center max-w-64 justify-center"><strong>{{ colla.nom }}</strong><br></h2>
            </div>
            <div class="flex flex-row justify-center px-3 py-1">
                <div class="my-auto" v-if="colla.xy_escut?.length" :style="{
            width:'100px',
            height: '100px',  
            backgroundImage: `url(${escutsSprite})`, 
            backgroundPosition: `${-100*colla.xy_escut[0]}px ${-100*colla.xy_escut[1]}px`,
            backgroundSize: 100*12+'px'           
        }
               ">
                </div>
            <div class=" text-sm text-center max-w-40">
            <p>  
                    <strong>{{ colla.color_camisa }}</strong><br>
                    
                    <strong>Localitat:</strong> {{ colla.localitat }}<br>
                    <strong>Tipus:</strong> {{ formatDada(colla.tipus) }}<br>
                    <strong>Estat:</strong> {{ formatDada(colla.estat) }}<br>
                    <strong>Fundació:</strong> {{ colla.fundacio }}
                </p>
                <p v-if="colla.desaparicio!==null"><strong>
                    Desaparició:
                </strong> {{ colla.desaparicio }}<br>
                </p>

                <p v-if="colla.refundacio!==null"> <strong>
                    Refundació:
                </strong> {{ colla.refundacio }}<br>
                </p>
                <p class="my-1 text-xl">
                <a class="mx-1" title="Pàgina Web de la Colla" v-if="colla.web!==null" :href="'https://'+colla.web" target="_blank" alt="Lloc Web"><font-awesome-icon :icon="['fas','globe']"/></a>
                <a  class="mx-1" title="Article Wikipedia de la Colla" :href="colla.url" target="_blank" alt="Article Wikipedia"><font-awesome-icon :icon="['fab', 'wikipedia-w']"/></a></p>
            </div>
        </div>
            </tippy>
        </div>
    </div>
</template>

<script>
import escutsSprite from '@/assets/escuts/escuts_sprite.png';
export default {
    data(){
        return{
    escutsSprite,
        }
    },
    name: 'MosaicRenderer',
    props:{
            llista: {
                type: Array,
                required:true
            },
            cerca: {
                type: String,
                default:""
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
            reRenderKey:{
                type:Number,
                required:false,
                default:0
            }
                },
        computed:{
            casella() {
                if (this.$route.name === 'cognitiu') {
                    return 'casella grow'; 
                }
                else{
                return 'casella';} 
    },
        

        filtrarDades(){
            return this.llista.filter(colla=>
            (
                this.eliminarAccents(colla.nom).includes(this.eliminarAccents(this.cerca)) 
                ||
                this.eliminarAccents(colla.color_camisa).includes(this.eliminarAccents(this.cerca))
                ||
                
                this.eliminarAccents(colla.localitat || "").includes(this.eliminarAccents(this.cerca))
            )
            &&
            this.tipus.includes(colla.tipus)
            &&
            this.estat.includes(colla.estat)
            &&(
                (
                colla.codi_color!=="#ffffff" 
                && 
                this.seleccio=="coneguts"
            )
            ||(
                (colla.codi_color=="#ffffff"||colla.color_camisa=="Desconegut")
                && 
                this.seleccio=="desconeguts")
            )
            )
            
        },

        
        
        
        text(){
            return this.mida/5
        }
    },
    methods:{

        eliminarAccents(str){
                return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            },
            
        formatDada(estat){
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
        },
        perfilColor(colla){
            if (this.perfil_color==="default"){
                return colla.codi_color;
            }
            else if (this.perfil_color==="monocrom"){
                return "hsl(0,0%,"+colla.color_hsl[2]+"%)";
            }
            else if (this.perfil_color==="hsl"){
                return "hsl("+colla.color_hsl[0]+","+colla.color_hsl[1]+"%,"+colla.color_hsl[2]+"%)";
            }
            else{
                return "ffffff"
            }
            
        },




        },
            
    
}
</script>

<style>

.casella:hover{

outline:3px solid rgba(190, 190, 190, 0.75);
cursor: pointer;
z-index: 999;
position:relative

}

.casella:focus{

outline:3px solid white;
cursor: pointer;
z-index: 999;
position:relative

}

.tippy-box{
    background-color:rgba(0, 0, 0, 0.5);
    border-radius: 0px;
    
}
.tippy-content{
    padding:0px;
}
</style>
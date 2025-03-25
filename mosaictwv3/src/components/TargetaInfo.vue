<template>
    <div class="bg-black/40 px-3 py-2 border-b border-white ">
        <router-link :to="'/colla/'+colla.id"><h2 class="hover:underline text-base text-center max-w-64 justify-center"><strong>{{ colla.nom }} <font-awesome-icon :icon="['fas', 'address-card']" class="opacity-70" /></strong><br></h2></router-link>
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
                <div class="text-sm text-center max-w-40">
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
                    <a class="mx-1" title="Article Wikipedia de la Colla" :href="colla.url" target="_blank" alt="Article Wikipedia"><font-awesome-icon :icon="['fab', 'wikipedia-w']"/></a></p>
        </div>
    </div>
</template>

<script>
import escutsSprite from '@/assets/escuts/escuts_sprite.png';

export default {
    name:'TargetaInfo',
    props:{
        colla:{
            type:String,
            default:""
        }
    },
    data(){
    return{
        escutsSprite,
        }
    },
    setup(){
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
        formatDada
    }
    }
}
</script>
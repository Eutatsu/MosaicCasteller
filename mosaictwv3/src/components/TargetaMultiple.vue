<template>
    <div v-if="colles==null">
    <div class="bg-black/40 px-3 py-2 border-b border-white rounded-t-sm">
        <router-link  
       :to="'/colles/'+colla.id"><h2 class="hover:underline text-base text-center max-w-64 justify-center">
            <strong>{{ colla.nom }} <font-awesome-icon :icon="['fas', 'address-card']" class="opacity-70" /></strong><br></h2></router-link>
        </div>
            <div class="flex flex-row justify-center px-3 py-1">
                <router-link :to="'/colles/'+colla.id"><div class="my-auto" v-if="colla.xy_escut?.length" :style="{
                        width:'100px',
                        height: '100px',  
                        backgroundImage: `url(${escutsSprite})`, 
                        backgroundPosition: `${-100*colla.xy_escut[0]}px ${-100*colla.xy_escut[1]}px`,
                        backgroundSize: 100*12+'px'           
                    }
                        ">
                </div></router-link>
                <div class="text-sm text-center max-w-40">
                    <p>  
                        <strong>{{ colla.color_camisa }}</strong><br>
                        
                        <strong>Localitat:</strong> {{ colla.localitat }}<br>
                        <strong>Tipus:</strong> {{ formatDada(colla.tipus) }}<br>
                        <strong>Estat:</strong> {{ formatDada(colla.estat) }}<br>
                        <strong>Fundació:</strong> {{ colla.fundacio }}
                    </p>
                    <p v-if="colla.estat=='desapareguda'"><strong>
                        Desaparició:
                    </strong>
                    <span v-if="colla.desaparicio!==-1">{{ colla.desaparicio }}</span>
                    <span v-else>Desconegut</span><br>
                    </p>

                    

                    <p class="my-1 text-xl">
                    <a class="mx-1" title="Pàgina Web de la Colla" v-if="colla.web!==null" :href="'https://'+colla.web" target="_blank" alt="Lloc Web"><font-awesome-icon :icon="['fas','globe']"/></a>
                    <a class="mx-1" title="Article Wikipedia de la Colla" :href="colla.url" target="_blank" alt="Article Wikipedia"><font-awesome-icon :icon="['fab', 'wikipedia-w']"/></a></p>
        </div>
    </div>
</div>
<div v-else-if="colles">
    <div class="bg-black/40 px-3 py-2 border-b border-white rounded-t-sm">
        <router-link  
       :to="'/colles/'+colles[mostra].id"><h2 class="hover:underline text-base text-center max-w-64 justify-center">
            <strong>{{ colles[mostra].nom }} <font-awesome-icon :icon="['fas', 'address-card']" class="opacity-70" /></strong><br></h2></router-link>
        </div>
            <div class="flex flex-row justify-center px-3 py-1">
                <router-link :to="'/colles/'+colles[mostra].id"><div class="my-auto" v-if="colles[mostra].xy_escut?.length" :style="{
                        width:'100px',
                        height: '100px',  
                        backgroundImage: `url(${escutsSprite})`, 
                        backgroundPosition: `${-100*colles[mostra].xy_escut[0]}px ${-100*colles[mostra].xy_escut[1]}px`,
                        backgroundSize: 100*12+'px'           
                    }
                        ">
                </div></router-link>
                <div class="text-sm text-center max-w-40">
                    <p>  
                        <strong>{{ colles[mostra].color_camisa }}</strong><br>
                        
                        <strong>Localitat:</strong> {{ colles[mostra].localitat }}<br>
                        <strong>Tipus:</strong> {{ formatDada(colles[mostra].tipus) }}<br>
                        <strong>Estat:</strong> {{ formatDada(colles[mostra].estat) }}<br>
                        <strong>Fundació:</strong> {{ colles[mostra].fundacio }}
                    </p>
                    <p v-if="colles[mostra].estat=='desapareguda'"><strong>
                        Desaparició:
                    </strong>
                    <span v-if="colles[mostra].desaparicio!==-1">{{ colles[mostra].desaparicio }}</span>
                    <span v-else>Desconegut</span><br>
                    </p>

                    

                    <p class="my-1 text-xl">
                    <a class="mx-1" title="Pàgina Web de la Colla" v-if="colles[mostra].web!==null" :href="'https://'+colles[mostra].web" target="_blank" alt="Lloc Web"><font-awesome-icon :icon="['fas','globe']"/></a>
                    <a class="mx-1" title="Article Wikipedia de la Colla" :href="colles[mostra].url" target="_blank" alt="Article Wikipedia"><font-awesome-icon :icon="['fab', 'wikipedia-w']"/></a></p>
        </div>
    </div>
</div>
</template>

<script>
import { ref,inject,computed } from 'vue'

export default {
    name:'TargetaInfo',
    props:{
        colla:{
            type: Object,
            required: true
        }
    },
    setup(){
        const escutsSprite = inject('escutsSprite')
        let mostra = ref(0)
        const colles = computed(()=>{
            const muntat = []
            if (Array.isArray(colla.predecesores)){
                muntat.push(...colla.predecesores)
                muntat.push(colla)
                
                return muntat
            }
            else{
                return null
            }
        })

        if (colles) mostra=ref(colles.value[colles.length-1])


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
        formatDada,
        escutsSprite,
        colles,
        seleccionada,
        mostra
    }
    }
}
</script>

<style>

.tippy-box{
    background-color:rgba(0, 0, 0, 0.5);
    border-radius:  0.25rem;
    
}
.tippy-content{
    padding:0px;
}

</style>
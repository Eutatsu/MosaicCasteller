<template>
    <span v-if="dada=='tipus'">
    <font-awesome-icon
    class="opacity-50 hover:opacity-70"
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
    <tippy v-if="tippy==true"  to="parent" placement="top" trigger="click focusin" theme="light" content-tag="div" content-class="w-fit p-2 rounded-sm text-center" >
        Colla {{ formatDada(colla.tipus) }}</tippy>
    </span>
<span v-else-if="dada=='estat'">
    <font-awesome-icon
    class="opacity-50 hover:opacity-70"
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
    <tippy v-if="tippy==true" to="parent" placement="top" trigger="click focusin" theme="light" content-tag="div" content-class="w-fit p-2 rounded-sm text-center" >
        Colla {{ formatDada(colla.estat) }}</tippy>
    </span>
</template>

<script>
export default{
    name:'IcoTipEst',
    props:{
        colla:{
            type: Object,
            required: true
        },
        dada:{
            type: String,
            required: true,
            default:'tipus'
        },
        tippy:{
            type:Boolean,
            required:false,
            default:true
        }
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
            };
            return mapaFormats[estat]|| "Desconegut"
        }
        return{
            formatDada
        }
    }
}
</script>
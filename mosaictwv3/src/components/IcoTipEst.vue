<template>
    <font-awesome-icon v-if="dada=='tipus'"
    class="opacity-50"
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

    <font-awesome-icon v-else-if="dada=='estat'"
    class="opacity-50"
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
        }
    }
}
</script>
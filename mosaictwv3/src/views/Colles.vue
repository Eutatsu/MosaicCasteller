<template>
    <div class="flex flex-wrap">
        <div v-for="(colla,index) in dades" :key="index" >
        <TargetaInfo :colla="colla"/>
        </div>
    </div>
</template>

<script>
import {inject} from 'vue'
import TargetaInfo from '@/components/TargetaInfo.vue'

export default{
    components:{
        TargetaInfo
    },
    setup(){
        const dades = inject('dades')
        return{
            dades
        }
    }
}

</script>
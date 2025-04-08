<template>
    <div class="w-fit self-center mx-auto ">
        <h1 class="mt-4 text-xl text-center">!! Secció en construcció !!</h1>
        <tr>
            <th class=" text-white px-4 bg-red-600" v-for="(key, index) in titols" :key="index">
                {{ key }}
            </th>
        </tr>
        <tr class="font-normal px-4 bg-red-100 " v-for="(item, index) in dades_ordenades" :key="index">
               <td class="border border-red-600 " 
               v-for="(value,key) in item " :key="key" 
               :style="key=='codi_color'?{backgroundColor:value}:
                key==='color_rgb'?{ backgroundColor: `rgb(${value[0]}, ${value[1]}, ${value[2]})` }:
               key=='color_hsl'?{ backgroundColor: `hsl(${value[0]}, ${value[1]}%, ${value[2]}%)` }:
               {}">
                <div v-if="key=='url'">
                    <a  class="mx-1" :href="value" target="_blank" alt="Article Wikipedia">
                        <font-awesome-icon :icon="['fab', 'wikipedia-w']"/></a>
           
                </div>
                <div v-else-if="key=='web'">
                    <a class="mx-1" v-if="value!==null" :href="'https://'+value" target="_blank" alt="Lloc Web">
                        <font-awesome-icon :icon="['fas','globe']"/></a>
                </div>
                <div v-else-if="key=='xy_escut'" :style="key?.length
            ? 
            {
                width:'100px',
                height:'100px',
                
            backgroundImage: `url(${escutsSprite})`, 
            backgroundPosition: `${-100*value[0]}% ${-100*value[1]}%` ,
            backgroundSize: 100*12+'%'}:{}">
                </div>
                <div v-else>
                {{ value }}
            </div>
               </td>
            </tr>
        </div>
</template>

<script>
import { ref, computed, onMounted, inject } from 'vue';

export default{
    setup(){
        const dades = inject('dades')
        const escutsSprite = inject('escutsSprite')
        const dades_ordenades=ref([...dades])
        const titols=computed(()=>Object.keys(dades[0]))

        const ordenarNom=()=>{
            dades_ordenades.value.sort((a,b)=> a.nom.localeCompare(b.nom))
        }
        onMounted(()=>{
            ordenarNom();
            
        })
        return{
                dades_ordenades,
                titols,
                ordenarNom,
                escutsSprite,
                dades,
            }
    }
}
</script>
<template>
    <div>
        Padre
        Contador: {{ counterPadre }}
    </div>
    <button @click="counterPadre++">Dale</button>
    <Hijo :counter="counterPadre"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Hijo from "@/components/Hijo.vue";

export default defineComponent({
    components: {
        Hijo
    },
    data() {
        return {
            counterPadre: 0
        }
    },
}) 
</script>
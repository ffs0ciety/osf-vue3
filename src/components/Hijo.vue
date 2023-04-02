<template>
    <div>
        Hijo: {{ counter }}
    </div>
    <!-- <button @click="counter++">Dale</button> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        counter: Number
    },
    data() {
        return {
            
        }
    },
}) 
</script>
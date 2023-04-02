
<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import { Line } from 'vue-chartjs'
import moment from 'moment'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { last } from "lodash"
import _ from "lodash"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


export default defineComponent({
    components: {
        Line
    },
    props: {
        historical: Array
    },
    data() {
        return {
            test: [
                "Sun Apr 02 2023 18:30:13 GMT+0000 (Coordinated Universal Time)",
                "Sun Apr 03 2023 18:30:13 GMT+0000 (Coordinated Universal Time)",
                "Sun Apr 05 2023 18:30:13 GMT+0000 (Coordinated Universal Time)",
                "Sun Apr 06 2023 18:30:13 GMT+0000 (Coordinated Universal Time)"
            ],

            // chartData: {
            //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            //     datasets: [
            //         {
            //             label: 'Data One',
            //             backgroundColor: '#f87979',
            //             data: [40, 39, 10, 40, 39, 80, 40]
            //         }
            //     ]
            // },
            chartData: {
                labels: this.getLabels(this.historical) ,
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: this.getLabels(this.historical).map((x,index) => {return index})
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: true
            }
        }
    },
    methods: {
        getLabels(arr:Array<String>){
            var lastDate =new Date(arr[arr.length-1]);
            var labels = []
            var day = new Date(arr[0]);

            while(day < lastDate){
                labels.push(_.clone(day));
                new Date(day.setDate(day.getDate()+1))
            }
            labels.push(lastDate)
           return labels;
        },
        getCount(){
            return [1,2,3,4,5]
        },
        toDate(str:string){
            return moment(str).format("DD/MM/YYYY HH:MM")
        }
    },
    async mounted() {
    }

})
</script>


<template>
    <!-- <div v-for="(item, index) in historical" :key="index"> -->
        <!-- {{ historical.map( (item, index) => { return index+1}) }} -->
    <!-- {{ historical.map( (item, index) => { return index+1}) }} -->
    <!-- {{  test
            .map( x => {return toDate(x)}) 
            .sort( (a,b) => {return a>b})
    }} -->
    <!-- {{ allLabels }} -->
    <!-- {{ getLabels(test) }} -->
    <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

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

import _ from "lodash"
import {chartDataFromHistorical} from "@/utils/DataCalendar"

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
            charged: false,
            chartData: {},
            chartOptions: {
                responsive: true,
                maintainAspectRatio: true
            }
        }
    },
    methods: {
    
    },
    updated() {
        // console.log('on mounted', this.historical)
        this.chartData = {
                labels: chartDataFromHistorical(this.historical, {labels:'day'}).labels,
                datasets: [
                    {
                        label: 'Steps!',
                        backgroundColor: '#f87979',
                        data: chartDataFromHistorical(this.historical, {labels:'day'}).dataSet,
                        tension: 0.5
                    }
                ],
            }

        this.charged = true

    },

})
</script>


<template>
    {{ historical }}
    -------
    <!-- {{ charged }} -->
    {{ chartData.labels }}

    <div v-if="charged">
        <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
</template>
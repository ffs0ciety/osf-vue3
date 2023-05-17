

// export default module.exports = {

import _ from "lodash"

//     historical: ( dataset: Array<String>, config: Object) => {

//     }

// }

type ChartData = {
    labels: any
    dataSet: any,
}



type CharDataConfig = {
    labels: 'day' | 'month' | 'year'
}

export function chartDataFromHistorical(data: Array<String>, config: CharDataConfig): ChartData {

    var historicalData = data.map(data => {
        return data.slice(0, 15)
    }).sort((a, b) => { return new Date(a) > new Date(b) })

    var firstDate = new Date(historicalData[0]);
    var lastDate = historicalData[historicalData.length - 1]
    var labels = new Map<String, number>;
    var dataSet = []
    switch (config.labels) {
        case 'day':
            while (new Date(firstDate) <= new Date(lastDate)) {
                var date = new Date(firstDate).toString();
                labels.set(date.slice(0,15), 0)
                firstDate = new Date(new Date(firstDate).setDate(new Date(firstDate).getDate() + 1));
            }
            historicalData.forEach( date => {
                var short = date.slice(0,15);
                var aux = labels.get(short);
                labels.set(short, aux+1)
            })

            var count = 0;
            Array.from(labels.values()).forEach( item => {
                count = count + item;
                dataSet.push(count);
            })
            break;
        case 'month':
            while (new Date(firstDate) <= new Date(lastDate)) {
                var date = new Date(firstDate).toString();
                labels.set(date.slice(4,8)+date.slice(11,15), 0)
                firstDate = new Date(new Date(firstDate).setMonth(new Date(firstDate).getMonth() + 1));
            }

            historicalData.forEach( date => {
                var short = date.slice(4,8)+date.slice(11,15);
                var aux = labels.get(short);
                labels.set(short, aux+1)
            })
            var count = 0;
            Array.from(labels.values()).forEach( item => {
                count = count + item;
                dataSet.push(count);
            })
            break;

        default:
            break;
    }

    return {
        labels: Array.from(labels.keys()),
        dataSet: dataSet
    }
}

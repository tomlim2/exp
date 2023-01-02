<template>
  <VChart class="chart" :option="option" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { ScatterChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, defineComponent } from "vue";
import paintData from '@/helpers/masterPainterColorChoice.json'

use([
  CanvasRenderer,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

export default defineComponent({
  name: "HelloWorld",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "dark",
  },
  setup() {
    const detailData = paintData[0]
    const data = detailData.x.map((x,index)=>{
      return [+x, +detailData.y[index]]
    })
  
    console.log(data);
    const opeionDetail = {
        title: {
          text: 'Master Painter Color Choices Throughout History',
          subtext: 'Data From Plot.ly',
          left: 'right'
        },
        xAxis: {
          type: 'value',
          splitLine: {
            show: false
          },
          scale: true,
          splitNumber: 5,
          max: 'dataMax',
          axisLabel: {
            formatter: function (val) {
              return val + 's';
            }
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 360,
          interval: 60,
          name: 'Hue',
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: 'scatter',
            type: 'scatter',
            symbolSize: function (val, param) {
              return (
                detailData.marker.size[param.dataIndex] / detailData.marker.sizeref
              );
            },
            itemStyle: {
              color: function (param) {
                return detailData.marker.color[param.dataIndex];
              }
            },
            data: data
          }
        ]
      }
    const option = ref(opeionDetail);

    return { option };
  },
});
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>
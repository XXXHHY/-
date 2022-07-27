<template>
  <div ref="echarts"></div>
</template>

<script>
// 引入echarts
import * as echarts from "echarts";

export default {
  props: {
    // isAxisChart为true则是折线图和柱状图，为false是饼图
    isAxisChart: {
      type: Boolean,
      default: true,
    },
    // 定义从Home.vue传过来的echartData数据
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: []
        };
      },
    },
  },
  data() {
    return {
      // 折线图和柱状图的配置格式
      axisOptins: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [],
      },
      // 饼图的配置格式
      normalOptin: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
      // ？？？？？
      echart: null
    };
  },
  computed: {
    options() {
      // 如果isAxisChart为true，就用折线图和柱状图的配置格式
      // 如果isAxisChart为false，就用饼图的配置格式
      // 并且可以直接用计算属性options
      return this.isAxisChart ? this.axisOptins : this.normalOptin;
    },
  },
  methods: {
    initChart() {
      this.initChartDate()
      if(this.echart) {

        this.echart.setOption(this.options)
      } else {
        this.echart = echarts.init(this.$refs.echarts)
        this.echart.setOption(this.options)
      }
    },
    initChartDate() {
      if(this.isAxisChart) {
        // 如果是折线图或柱状图，就把配置格式的data和series传入
        this.axisOptins.xAxis.data = this.chartData.xData
        this.axisOptins.series = this.chartData.series
      } else {
        // 如果是饼图，就把配置格式的series传入
        this.normalOptin.series = this.chartData.series
      }
    }
  },
  watch: {
    // 监听chartData是否发生变化，只要变化，立刻调用initChart()函数
    chartData: {
      handler() {
        this.initChart()
      },
      deep: true,
      // immediate: true
    }
  }
};
</script>

<style lang='less' scoped>
</style>
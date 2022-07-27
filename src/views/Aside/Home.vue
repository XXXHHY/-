<template>
  <el-row class="home" gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <!-- 左侧user区域 -->
      <el-card shadow="hover">
        <div class="user">
          <img src="../../img/avatar_1.png" />
          <div class="userInfo">
            <p class="name">{{ this.$store.state.user.name }}</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2021-7-9</span></p>
          <p>上次登录地点：<span>重庆</span></p>
        </div>
      </el-card>
      <!-- 左侧user区域 -->

      <!-- 左侧table区域 -->
      <el-card style="margin-top: 20px; height: 300px">
        <el-table :data="tableData">
          <el-table-column prop="name" label="课程" />
          <el-table-column prop="todayBuy" label="今日购买" />
          <el-table-column prop="monthBuy" label="本月购买" />
          <el-table-column prop="totalBuy" label="总购买" />
        </el-table>
      </el-card>
      <!-- 左侧table区域 -->
    </el-col>

    <!-- 右侧图表区域 -->
    <el-col :span="16" style="margin-top: 20px">
      <!-- 右侧上方区域 -->
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <component
            :is="item.icon"
            :style="{ width: '70px', height: '70px', color: item.color }"
          ></component>
          <div class="info">
            <p>￥{{ item.value }}</p>
            <p>{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 右侧上方区域 -->

      <!-- 右侧折线图区域 -->
      <el-card style="height: 235px">
        <!-- <div style="height: 235px" ref="echarts"></div> -->
        <echart :chartData="echartData.order" style="height: 235px" />
      </el-card>
      <!-- 右侧折线图区域 -->

      <!-- 右侧柱状图区域 -->
      <div class="graph">
        <el-card style="height: 205px; width: 50%">
          <!-- <div style="height: 200px" ref="userEcharts"></div> -->
          <echart :chartData="echartData.user" style="height: 200px" />
        </el-card>
        <el-card style="height: 205px; width: 50%">
          <!-- <div style="height: 200px" ref="videoEcharts"></div> -->
          <echart :chartData="echartData.video" :isAxisChart="false" style="height: 200px" />
        </el-card>
      </div>
      <!-- 右侧柱状图区域 -->
    </el-col>
    <!-- 右侧图表区域 -->
  </el-row>
</template>

<script>
// import * as echarts from "echarts";
import Echart from "../../components/Echart.vue";
export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "Checked",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "Collection",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "CircleClose",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "Checked",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "Collection",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "CircleClose",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  created() {
    this.getDate();
  },
  methods: {
    async getDate() {
      const { data: res } = await this.$http.get("/home/getData");
      console.log(res,'getData');
      console.log(this.$store.state.user.name,'token')
      if (res.code !== 20000) return alert("数据获取失败！！");
      this.tableData = res.data.tableData;
      // 折线图数据处理
      // 折线图数据接收为order
      const order = res.data.orderData;
      // 折线图x坐标数据
      const xData = order.date;
      // Echarts画图需要的keyArray
      const keyArray = Object.keys(order.data[0]);
      // Echarts画图需要的series
      const series = [];
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: order.data.map((item) => item[key]),
          type: "line",
        });
      });
      // const option = {
      //   xAxis: {
      //     data: xData,
      //   },
      //   yAxis: {},
      //   legend: {
      //     data: keyArray,
      //   },
      //   series,
      // };
      // 画图，详情可见echarts官网示例
      // const E = echarts.init(this.$refs.echarts);
      // E.setOption(option);
      this.echartData.order.xData = xData;
      this.echartData.order.series = series;

      // 用户图：左下角柱状图
      // const userOption = {
      //   legend: {
      //     // 图例文字颜色
      //     textStyle: {
      //       color: "#333",
      //     },
      //   },
      //   grid: {
      //     left: "20%",
      //   },
      //   // 提示框
      //   tooltip: {
      //     trigger: "axis",
      //   },
      //   xAxis: {
      //     type: "category", // 类目轴
      //     data: res.data.userData.map((item) => item.date),
      //     axisLine: {
      //       lineStyle: {
      //         color: "#17b3a3",
      //       },
      //     },
      //     axisLabel: {
      //       interval: 0,
      //       color: "#333",
      //     },
      //   },
      //   yAxis: [
      //     {
      //       type: "value",
      //       axisLine: {
      //         lineStyle: {
      //           color: "#17b3a3",
      //         },
      //       },
      //     },
      //   ],
      //   color: ["#2ec7c9", "#b6a2de"],
      //   series: [
      //     {
      //       name: "新增用户",
      //       data: res.data.userData.map((item) => item.new),
      //       type: "bar",
      //     },
      //     {
      //       name: "活跃用户",
      //       data: res.data.userData.map((item) => item.active),
      //       type: "bar",
      //     },
      //   ],
      // };
      // const U = echarts.init(this.$refs.userEcharts);
      // U.setOption(userOption);
      this.echartData.user.xData = res.data.userData.map((item) => item.date);
      this.echartData.user.series = [
        {
          name: "新增用户",
          data: res.data.userData.map((item) => item.new),
          type: "bar",
        },
        {
          name: "活跃用户",
          data: res.data.userData.map((item) => item.active),
          type: "bar",
        },
      ];

      // 右下角饼图
      // const videoOption = {
      //   tooltip: {
      //     trigger: "item",
      //   },
      //   color: [
      //     "#0f78f4",
      //     "#dd536b",
      //     "#9462e5",
      //     "#a6a6a6",
      //     "#e1bb22",
      //     "#39c362",
      //     "#3ed1cf",
      //   ],
      //   series: [
      //     {
      //       data: res.data.videoData,
      //       type: "pie",
      //     },
      //   ],
      // };
      // const V = echarts.init(this.$refs.videoEcharts);
      // V.setOption(videoOption);
      this.echartData.video.series = [
          {
            data: res.data.videoData,
            type: "pie",
          },
        ]
    },
  },
  components: {
    Echart,
  },
};
</script>

<style lang='less' scoped>
.home {
  .user {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid black;

    img {
      width: 120px;
    }
  }

  .num {
    // display: flex;
    // height: 400px;
    .el-card {
      display: inline-block;
      width: 33%;
      height: 70px;

      .info {
        text-align: center;
        line-height: 100%;
        p {
          margin: 10px;
          padding: 0;
        }
      }
    }
  }

  .graph {
    display: flex;
  }
}
</style>
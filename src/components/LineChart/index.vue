<template>
  <div>
    <v-card class="pa-2">
      <v-row dense>
        <v-col lg="5" md="5" sm="5" cols="6" class=" ">
          <v-menu
            v-model="menu_start_date"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field v-model="start_date" label="Start" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="start_date" @input="menu_start_date = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col lg="5" md="5" sm="5" cols="6">
          <v-menu
            v-model="menu_end_date"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field v-model="end_date" label="End" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="end_date" @input="menu_end_date = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col lg="2" md="2" sm="2" cols="2">
          <v-btn large outlined width="100%" @click="load">Load</v-btn>
        </v-col>
      </v-row>
    </v-card>
    <div style="" ref="lineChart"></div>
  </div>
</template>
<script>
import Plotly from "plotly.js";
import { mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";

export default {
  data() {
    return {
      menu_start_date: false,
      menu_end_date: false,
      start_date: moment().format("YYYY-MM-DD"),
      end_date: moment().format("YYYY-MM-DD"),
      menu: false
    };
  },
  props: ["sensor_id"],
  computed: {
    ...mapGetters(["allSensorDatas", "allTemperatureDatas", "allHumidityDatas"]),
    utcMoment() {
      return moment;
    }
  },
  methods: {
    ...mapActions(["addTempDataY", "fetchTemperatureDatas", "fetchHumidityDatas"]),
    renderChart() {
      let chart = this.$refs.lineChart;
      let traceTemper = {
        x: [],
        y: [],
        type: "line"
      };

      let traceHumi = {
        x: [],
        y: [],
        type: "line"
      };

      let layout = {
        title: "Temperatrue && Humidity",
        // paper_bgcolor:"#1E1E1E",
        // plot_bgcolor:"#1E1E1E",
        // font:{
        //   color:"white"
        // },
        xaxis: {
          title: "Times"
        },
        yaxis: {
          title: "temperature && Humidity"
        }
      };

      let temPromise = this.fetchTemperatureDatas({
        sensor_id: this.sensor_id,
        selects: "temperature",
        start: moment(this.start_date)
          .startOf("day")
          .format(),
        end: moment(this.end_date)
          .endOf("day")
          .format()
      }).then(() => {
        if (this.allTemperatureDatas.x) {
          traceTemper.x = this.allTemperatureDatas.x.map(row => {
            return moment(row)
              .tz("Asia/Tokyo")
              .format();
          });
          traceTemper.y = this.allTemperatureDatas.y;
        }
      });

      let humiPromise = this.fetchHumidityDatas({
        sensor_id: this.sensor_id,
        selects: "humidity",
        start: moment(this.start_date)
          .startOf("day")
          .format(),
        end: moment(this.end_date)
          .endOf("day")
          .format()
      }).then(() => {
        if (this.allHumidityDatas.x) {
          traceHumi.x = this.allHumidityDatas.x.map(row => {
            return moment(row)
              .tz("Asia/Tokyo")
              .format();
          });
          traceHumi.y = this.allHumidityDatas.y;
        }
      });

      Promise.all([temPromise, humiPromise]).then(() => {
        Plotly.newPlot(chart, [traceTemper, traceHumi], layout, {
          responsive: true,
          displaylogo: false
        });
      });
    },
    load() {
      if (this.start_date > this.end_date) {
        alert("start date cannot be smaller then end date");
      }
      this.renderChart();
    }
  },

  created() {},

  mounted() {
    this.renderChart();
  }
};
</script>
<style scoped></style>

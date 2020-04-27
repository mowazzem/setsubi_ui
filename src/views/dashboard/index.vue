<template>
  <div>
    <div v-for="(sensor, index) in allSensors" :key="index">
      <v-row>
        <v-col lg="9" md="9" sm="12">
          <v-card class="pa-0 ma-0">
            <wbgt :temperature="temperature" :humidity="humidity" />
          </v-card>
        </v-col>
        <v-col class="pa-0" lg="3" md="3" sm="12" cols="12">
          <v-row class="ma-0">
            <v-col lg="12" md="12" sm="6" cols="6">
              <dataCard
                :title="tempTitle"
                :sensor_id="sensor.id"
                :sensor_value="temperature"
                :time="time"
                :status="status"
              />
            </v-col>
            <v-col lg="12" md="12" sm="6" cols="6">
              <dataCard
                :title="humiTitle"
                :sensor_id="sensor.id"
                :sensor_value="humidity"
                :time="time"
                :status="status"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col lg="12" md="12" sm="12" cols="12">
          <v-card class="pa-1">
            <lineChart :sensor_id="sensor.id" />
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import dataCard from "../../components/DataCard";
import lineChart from "../../components/LineChart";
import wbgt from "../../components/Wbgt";
import { mapGetters, mapActions } from "vuex";
import Paho from "paho-mqtt";
import moment from "moment-timezone";

export default {
  data() {
    return {
      status: false,
      client: null,
      connectionOptions: null,
      // tempTitle:this.$t('iot_card').current+this.$t('iot_card').temperature,
      sensors: [],
      sensor_id: "",
      temperature: "...Loading",
      humidity: "...Loading",
      time: moment().format("LTS")
    };
  },
  components: {
    dataCard,
    lineChart,
    wbgt
  },
  computed: {
    ...mapGetters(["allSensors"]),
    tempTitle() {
      return this.$t("iot_card").temperature;
    },
    humiTitle() {
      return this.$t("iot_card").humidity;
    }
  },
  methods: {
    ...mapActions(["fetchSensors"]),

    onConnect() {
      // Once a connection has been made, make a subscription and send a message.
      console.log("onConnect");
      this.client.subscribe("sensor-data");
      this.status = true;
    },

    onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        this.status = false;
      }
    },

    onMessageArrived(message) {
      let jsonObj = JSON.parse(message.payloadString);
      this.temperature = jsonObj.sensor_value.temperature;
      this.humidity = jsonObj.sensor_value.humidity;
      this.time = moment(jsonObj.time).format("LTS");
      this.$root.$emit("update_wbgt", {
        humidity: Math.ceil(this.humidity),
        temperature: Math.ceil(this.temperature)
      });
    },

    save() {
      console.log(new Date());
    }
  },

  created() {

    this.fetchSensors();

    let client = new Paho.Client("localhost", 9001, "browser");
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.onMessageArrived;
    let connectionOptions = {
      onSuccess: this.onConnect,
      userName: "kds",
      password: "kds"
    };

    this.connectionOptions = connectionOptions;

    client.connect(connectionOptions);
    this.client = client;
  },

  mounted() {
    this.$root.$on("sensor_reconnect", () => {
      this.client.connect(this.connectionOptions);
    });
  },
  destroyed() {
    this.client.disconnect();
  }
};
</script>

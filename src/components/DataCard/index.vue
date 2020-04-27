<template>
  <div>
    <v-card max-width="100%" height="100%" raised outlined>
      <v-card-text align="center">
        <div class="mb-10" align="center">{{this.$t('iot_card').current}} {{ title }}</div>
        <div class="mb-2">{{this.$t('iot_card').last_updated}} {{ title }}</div>
        <h1 ref="el_sensor_value" align="center">
          {{ sensor_value }}
        </h1>
        <div class="mb-10 mt-2">{{ time }}</div>
      </v-card-text>
      <v-card-actions class="pa-1">
        <span v-if="status" class="green--text">Connected</span>
        <span v-if="!status" class="red--text">Disconnected</span>
        <v-spacer></v-spacer>
        <span v-if="!status">
          <v-btn small fab @click="sensor_reconnect">
            <v-icon small>
              mdi-reload
            </v-icon>
          </v-btn>
        </span>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["title", "sensor_value", "time", "status"],

  methods: {
    sensor_reconnect() {
      this.$root.$emit("sensor_reconnect");
    }
  },
  watch: {
    sensor_value() {
      let elSenseVal = this.$refs.el_sensor_value;
      elSenseVal.classList.add("blink");
      setTimeout(() => {
        elSenseVal.classList.remove("blink");
      }, 4000);
    }
  }
};
</script>
<style scoped>
@-webkit-keyframes blink {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.blink {
  -webkit-animation-name: blink;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: cubic-bezier(1, 0, 0, 1);
  -webkit-animation-duration: 1s;
  color:purple;
}
</style>

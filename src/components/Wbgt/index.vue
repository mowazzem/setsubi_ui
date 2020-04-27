<template>
  <div>
    <table class="table-border">
      <thead>
        <tr>
          <th></th>
          <th v-for="num in humiRange" :key="num">{{ num }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ta in tempRange" :key="ta">
          <td>{{ ta }}</td>
          <td
            v-for="rh in humiRange"
            :key="rh"
            class="pa-0"
            id=""
            align="center"
            style="color:white"
          >
            <!-- {{calculateWbgt(ta,rh)}} -->
            <div
              v-if="calculateWbgt(ta, rh) < 25"
              class="normal"
              :ref="'humi_' + rh + '_temp_' + ta"
            >
              {{ calculateWbgt(ta, rh) }}
            </div>
            <div
              v-if="calculateWbgt(ta, rh) >= 25 && calculateWbgt(ta, rh) <= 27"
              class="warn"
              :ref="'humi_' + rh + '_temp_' + ta"
            >
              {{ calculateWbgt(ta, rh) }}
            </div>
            <div
              v-if="calculateWbgt(ta, rh) >= 28 && calculateWbgt(ta, rh) < 31"
              class="dangerous"
              :ref="'humi_' + rh + '_temp_' + ta"
            >
              {{ calculateWbgt(ta, rh) }}
            </div>
            <div
              v-if="calculateWbgt(ta, rh) >= 31"
              class="very-danger"
              :ref="'humi_' + rh + '_temp_' + ta"
            >
              {{ calculateWbgt(ta, rh) }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "Wbgt",
  data() {
    return {
      focusEl: null,
      tempClass: ""
    };
  },
  props: ["temperature", "humidity"],
  computed: {
    humiRange() {
      let range = [];
      for (let i = 20; i <= 100; i += 5) {
        range.push(i);
      }
      return range;
    },
    tempRange() {
      let range = [];
      for (let i = 40; i >= 21; i--) {
        range.push(i);
      }
      return range;
    }
  },
  methods: {
    calculateWbgt(ta, rh) {
      let Ta = parseFloat(ta);
      let RH = parseFloat(rh);
      return Math.ceil(0.725 * Ta + 0.0368 * RH + 0.00364 * Ta * RH - 3.246);
    },
    cellHighlight(humi, temper) {
      if (this.focusEl) {
        this.focusEl.classList.remove("active");
        this.focusEl.classList.add(this.tempClass);
      }
      let el = this.$refs["humi_" + humi + "_temp_" + temper][0];
      if (el) {
        this.tempClass = el.classList[0];
        el.classList.remove(...el.classList);
        el.classList.add("active");
        this.focusEl = el;
      }
    }
  },
  created() {},
  mounted() {
    this.$root.$on("update_wbgt", obj => {
      let divider = 10;
      let mod = obj.humidity % divider;
      let rh = 0;
      if (mod < 5 && mod > 0) {
        rh = obj.humidity + (5 - mod);
      } else if (mod > 5 && mod > 0) {
        rh = obj.humidity + (10 - mod);
      } else {
        rh = obj.humidity;
      }
      this.cellHighlight(parseInt(rh), parseInt(obj.temperature));
    });
  }
};
</script>
<style lang="scss" scoped>
@keyframes blinker {
  50% {
    opacity: 0.5;
  }
}
.active {
  background-color: purple;
  animation: blinker 1s step-start infinite;
}
.table-border {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

@media (min-width: 601px) {
  .table-border td
  {
    border: 1px solid aquamarine;
  }

  .table-border th{
    border: 1px solid purple;
  }

  .table-border tr td:first-child{
    border:1px solid purple;
  }
}
@media (max-width: 600px) {
  .table-border td,
  th {
    border: 1px solid white;
    width: 10px;
    height: 10px;
  }
}
.normal {
  background-color: #1e9e1e;
}
.warn {
  background-color: #c36900;
}
.dangerous {
  background-color: red;
}
.very-danger {
  background-color: maroon;
}
.table-card {
  width: 50%;
}
</style>

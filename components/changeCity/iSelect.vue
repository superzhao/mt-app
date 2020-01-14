<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.id"
        :label="item.value"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
      <el-option v-for="item in city" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import _ from "lodash";
import { getAllProvince, getCtyisById, getAllCitis } from "@/api/geo";
export default {
  name: "iselect",
  data() {
    return {
      province: [],
      pvalue: "",
      city: [],
      cvalue: "",
      input: "",
      cities: []
    };
  },
  created() {
    //获取所有省份
    getAllProvince().then(res => {
      const { code, data } = res;
      if (code == 0) {
        this.province = data;
      } else {
        this.province = [];
      }
    });
    //获取所有城市
    getAllCitis().then(res => {
      const { code, data } = res;
      if (code == 0) {
        this.cities = data.map(item => ({
          value: item.name
        }));
      } else {
        this.cities = [];
      }
    });
  },
  methods: {
     querySearchAsync: _.throttle(function(queryString, cb) {
      var results = queryString
        ? this.cities.filter(this.createStateFilter(queryString))
        : this.cities;
      cb(results);
    }, 500),
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
        );
      };
    },
    handleSelect() {}
  },
  watch: {
    pvalue: async function(newValue) {
      getCtyisById({ id: newValue }).then(res => {
        const { code, data } = res;
        if (code == 0) {
          this.city = data;
        } else {
          this.city = [];
        }
      });
    }
  }
};
</script>

<style lang="scss" >
  @import "@/assets/css/changeCity/iselect.scss";
</style>
</style>
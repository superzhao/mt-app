<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团" />
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input
            v-model="search"
            @focus="onFocus"
            @blur="onBlur"
            @input="onInput"
            placeholder="搜索商家或地点"
          />
          <button class="el-button el-button--primary">
            <i class="el-icon-search" />
          </button>
          <dl v-if="isHotPlace" class="hotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item,idx) in $store.state.home.hotPlace" :key="idx">
              <nuxt-link :to="'/products?keyword='+item.name">{{item.name}}</nuxt-link>
              
            </dd>
          </dl>
          <dl v-if="isSearchList" class="searchList">
            <dd v-for="(item,idx) in searchList" :key="idx">
              <nuxt-link :to="'/products?keyword='+item.name"><p>{{item.name}}1</p></nuxt-link>
            </dd>
          </dl>
        </div>
        <p class="suggest">
         <nuxt-link :to="'/products?keyword='+item.name" v-for="(item,idx) in $store.state.home.hotPlace" :key="idx">{{item.name}}</nuxt-link>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund" />
            <p class="txt">随时退</p>
          </li>
          <li>
            <i class="single" />
            <p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue" />
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from "lodash";
import { getTop } from "../../../api/search";
import { async } from 'q';
export default {
  data() {
    return {
      search: "",
      isFocus: false,
      hotPlace: [],
      searchList: []
    };
  },
  created() {},
  computed: {
    isHotPlace() {
      return this.isFocus && !this.search;
    },
    isSearchList() {
      return this.isFocus && this.search;
    }
  },
  methods: {
    onFocus() {
      this.isFocus = true;
    },
    onBlur() {
      const _this=this
      setTimeout(function(){
        _this.isFocus=false
      },200)
    },
    onInput: _.throttle(function(){
       let city=this.$store.state.geo.city.replace('市','')
        getTop({ name: this.search,city:city }).then(res => {
          if (res.code == 0) {
            this.searchList = res.data;
          } else {
            this.searchList = [];
          }
        });
      }, 500)
    }
  
};
</script>

<style lang="css">
</style>

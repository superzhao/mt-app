<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword" />
      <category :types="types" :areas="areas" />
      <list :list="list" />
    </el-col>
    <el-col :span="5">
      <amap :width="230" :height="290" :point="point" :pointTitle="pointTitle"/>
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from "@/components/products/crumbs.vue";
import Category from "@/components/products/category.vue";
import List from "@/components/products/list.vue";
import Amap from "@/components/public/map.vue";
import { resultsByKeywords } from "@/api/search";
import { findCategoryByCity } from "@/api/category";
export default {
  name: "detail",
  data() {
    return {
      keyword: "",
      city: "",
      list: [],
      types: [],
      areas: [],
      point: [116.46, 39.92],
      pointTitle: ""
    };
  },
  async asyncData(ctx) {
    let keyword = ctx.route.query.keyword,
      city = ctx.store.state.geo.city.replace(/市/, ""),
      list;
    //获取list
    const {
      code,
      data: { count, pois }
    } = await resultsByKeywords({ city: city, keyword: keyword });
    if (code !== 0 || count == 0) {
      list = [];
    } else {
      list = pois
        .filter(item => item.photos.length)
        .map(item => {
          return {
            type: item.type,
            img: item.photos[0].url,
            name: item.name,
            comment: Math.floor(Math.random() * 10000),
            rate: Number(item.biz_ext.rating),
            price: Number(item.biz_ext.cost),
            scene: item.tag,
            tel: item.tel,
            status: "可订明日",
            location: item.location.split(','),
            module: item.type.split(";")[0]
          };
        });
    }
    //获取city
    const {
      code: code1,
      data: { types, areas }
    } = await findCategoryByCity({ city: city });
    return {
      keyword,
      city,
      list,
      types,
      areas,
      point: list[0].location,
      pointTitle: list[0].name
    };
  },
  created() {
    // this.keyword = this._routerRoot._route.query.keyword;
  },
  components: { Crumbs, Category, List, Amap }
};
</script>

<style lang="scss">
@import "@/assets/css/products/index.scss";
</style>
<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd
        v-for="item in list"
        :key="item.id">{{ item.name==='市辖区'?item.province:item.name }}</dd>
    </dl>
  </div>
</template>

<script>
import { getHotCitis } from "@/api/geo";
export default {
  name: "hotCitis",
  data() {
    return {
      list: []
    };
  },
  created() {
    getHotCitis().then(res => {
      if (res.code == 0) {
        this.list = res.data;
      } else {
        this.list = [];
      }
    });
  }
};
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/hot.scss";
</style>
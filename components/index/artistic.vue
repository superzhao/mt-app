<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd :class="{active:kind==='all'}" kind="all" keyword="景点">全部</dd>
      <dd :class="{active:kind==='part'}" kind="part" keyword="美食">约会聚餐</dd>
      <dd :class="{active:kind==='spa'}" kind="spa" keyword="丽人">丽人SPA</dd>
      <dd :class="{active:kind==='movie'}" kind="movie" keyword="电影">电影演出</dd>
      <dd :class="{active:kind==='travel'}" kind="travel" keyword="旅游">品质出游</dd>
    </dl>
    <ul class="ibody">
      <li v-for="item in cur" :key="item.title">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.img" class="image" />
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos">
              <span>{{ item.pos }}</span>
            </li>
            <li class="price">
              ￥
              <em>{{ item.price }}</em>
              <span>/起</span>
            </li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
import { resultsByKeywords } from "../../api/search";
export default {
  data: () => {
    return {
      kind: "all",
      list: {
        all: [],
        part: [],
        spa: [],
        movie: [],
        travel: []
      }
    };
  },
  created() {
    resultsByKeywords({ city: this.$store.state.geo.city, keyword:'全部' }).then(
      res => {
        if (res.code == 0 && res.data.count) {
          let pois = res.data.pois;
          let r = pois
            .filter(item => item.photos.length)
            .map(item => {
              return {
                title: item.name,
                pos: item.type.split(";")[0],
                price: item.biz_ext.cost || "暂无",
                img: item.photos[0].url,
                url: "//abc.com"
              };
            });
          this.list.all = r.slice(0,9);
        } else {
          this.list.all = [];
        }
      }
    );
  },
  computed: {
    cur: function() {
      return this.list[this.kind];
    }
  },
  methods: {
    over: function(e) {
      let dom = e.target;
      let tag = dom.tagName.toLowerCase();
      let self = this;
      if (tag === "dd") {
        this.kind = dom.getAttribute("kind");
        let keyword = dom.getAttribute("keyword");
        resultsByKeywords({ city: this.$store.state.geo.city, keyword }).then(
          res => {
            if (res.code == 0 && res.data.count) {
              let pois = res.data.pois;
              let r = pois
                .filter(item => item.photos.length)
                .map(item => {
                  return {
                    title: item.name,
                    pos: item.type.split(";")[0],
                    price: item.biz_ext.cost || "暂无",
                    img: item.photos[0].url,
                    url: "//abc.com"
                  };
                });
              this.list[this.kind] = r.slice(0, 9);
            } else {
              this.list[this.kind] = [];
            }
          }
        );
      } else {
        this.kind = "all";
      }
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>

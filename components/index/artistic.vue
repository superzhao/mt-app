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
export default {
  data: () => {
    return {
      kind: "all",
      list: {
        all: [
          {
            title: "北京维景国际大酒店",
            pos: "西红门",
            price: 90,
            img:
              "https://p1.meituan.net/msmerchant/3ef69a0c07ea97d666dccdd68f0c0abb485331.jpg@368w_208h_1e_1c"
          },
          {
            title: "小大董",
            pos: "王府井/东单",
            price: 288,
            img:
              "https://p0.meituan.net/msmerchant/7acf8c7c818aed2b8d3a89f7b70bd1b55654528.jpg@368w_208h_1e_1c"
          },
          {
            title: "谦亨短发设计",
            pos: "崇文门新世界",
            price: 288,
            img:
              "https://p0.meituan.net/wedding/7f274360936a5233902be9afe5054eef4134276.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C368w_208h_1e_1c"
          },
          {
            title: "木北造型",
            pos: "崇文门新世界",
            price: 288,
            img:
              "https://p1.meituan.net/dpmerchantpic/894a230555aedd63c423a454b48e5842180576.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C368w_208h_1e_1c"
          },
          {
            title: "百老汇影城",
            pos: "国瑞购物中心",
            price: 50,
            img:
              "https://p0.meituan.net/deal/__31137021__2342842.jpg@368w_208h_1e_1c"
          },
          {
            title: "北京三里屯通盈中心洲际酒店",
            pos: "三里屯",
            price: 18888,
            img:
              "https://p1.meituan.net/tdchotel/8d2d8549f205d79fbc2319f65ac1ff821861291.png@368w_208h_1e_1c"
          }
        ],
        part: [
          {
            title: "北京维景国际大酒店",
            pos: "西红门",
            price: 90,
            img:
              "https://p1.meituan.net/msmerchant/3ef69a0c07ea97d666dccdd68f0c0abb485331.jpg@368w_208h_1e_1c"
          },
          {
            title: "小大董",
            pos: "王府井/东单",
            price: 288,
            img:
              "https://p0.meituan.net/msmerchant/7acf8c7c818aed2b8d3a89f7b70bd1b55654528.jpg@368w_208h_1e_1c"
          }
        ],
        spa: [
          {
            title: "谦亨短发设计",
            pos: "崇文门新世界",
            price: 88,
            img:
              "https://p0.meituan.net/wedding/7f274360936a5233902be9afe5054eef4134276.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C368w_208h_1e_1c"
          },
          {
            title: "木北造型",
            pos: "崇文门新世界",
            price: 66,
            img:
              "https://p1.meituan.net/dpmerchantpic/894a230555aedd63c423a454b48e5842180576.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C368w_208h_1e_1c"
          }
        ],
        movie: [
          {
            title: "百老汇影城",
            pos: "国瑞购物中心",
            price: 50,
            img:
              "https://p0.meituan.net/deal/__31137021__2342842.jpg@368w_208h_1e_1c"
          }
        ],
        travel: [
          {
            title: "北京三里屯通盈中心洲际酒店",
            pos: "三里屯",
            price: 18888,
            img:
              "https://p1.meituan.net/tdchotel/8d2d8549f205d79fbc2319f65ac1ff821861291.png@368w_208h_1e_1c"
          }
        ]
      }
    };
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

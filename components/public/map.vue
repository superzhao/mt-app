<template>
  <div>
    <div :id="id" :style="{width:width+'px',height:height+'px',margin:'34px auto'}" class="m-map" />
  </div>
</template>
<script>
export default {
  name: "map",
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    point: {
      type: Array,
      default() {
        return [116.46, 39.92];
      }
    },
    pointTitle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      id: "map",
      key: "b5c1fca9a5bbacbdc86c65962442d9be"
    };
  },
  mounted() {
    this.id = `map${Math.random()
      .toString()
      .slice(4, 6)}`;
    window.onMapLoad = () => {
      let map = new window.AMap.Map(this.id, {
        resizeEnable: true,
        zoom: 11,
        center: this.point
      });
      AMap.plugin(["AMap.ToolBar"], function() {
        map.addControl(new AMap.ToolBar());
      });
      let marker = new AMap.Marker({
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: this.point,
        title: this.pointTitle
      });
      map.add(marker);
    };

    const url = `https://webapi.amap.com/maps?v=1.4.10&key=${this.key}&callback=onMapLoad`;
    let jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style lang="scss" scoped>
</style>
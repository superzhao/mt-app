<template>
  <div class>
    <dl class="m-category">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in charList" :key="item">
        <a :href="'#city-'+item">{{ item }}</a>
      </dd>
    </dl>
    <dl v-for="item in block" :key="item.title" class="m-category-section">
      <dt :id="'city-'+item.title">{{ item.title }}</dt>
      <dd>
        <span v-for="c in item.city" :key="c">{{ c }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import { getAllCitis } from "@/api/geo";
import pinyin from "js-pinyin";
pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
export default {
  name: "category",
  data() {
    return {
      charList: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
      block: []
    };
  },
  mounted() {
    getAllCitis().then(res => {
      const { code, data } = res;
      let a = [];

      if (code == 0) {
        let p,
          c,
          o = {};
        for (let item of data) {
          p = pinyin
            .getFullChars(item.name)
            .toLocaleLowerCase()
            .slice(0, 1);
          c = p.charCodeAt(0);
          if (c > 96 && c < 123) {
            if (!o[p]) {
              o[p] = [];
            }
            o[p].push(item.name);
          }
        }

        for (let k in o) {
          a.push({ title: k, city: o[k] });
        }
        this.block = a;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/changeCity/category.scss";
</style>
<template>
  <div class="m-product-category">
    <div class="classic">
      <div>
        <span>分类</span>
        <span>全部</span>
      </div>
      <ul>
        <li v-for="(item,idx) in types" :key="idx">
          <iselect :name="item.type" :list="item.module" />
        </li>
      </ul>
    </div>
    <div class="classic">
      <div>
        <span>分类</span>
        <span>全部</span>
      </div>
      <ul>
        <li v-for="(item,idx) in areas" :key="idx">
          <iselect :name="item.type" :list="item.module" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import iselect from "./iselect.vue";
export default {
  props: {
    types: {
      type: Array,
      default() {
        return [];
      }
    },
    areas: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  created() {
    console.log(this.types, this.areas, 333);
  },
  components: {
    iselect
  }
};
</script>

<style lang="scss">
</style>

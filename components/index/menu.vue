<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="onKindMouseLeave">
      <dt>全部分类</dt>
      <dd v-for="(item,idx) in menus" :key="idx" @mouseenter="onKindMouseEnter">
        <i :class="item.type" />
        {{item.name}}
        <span class="arrow"></span>
      </dd>
    </dl>
    <div
      class="detail"
      v-if="kind"
      @mouseenter="onDetailMouseEnter"
      @mouseleave="onDetailMouseLeave"
    >
      <template v-for="(item,idx) in curMenu.detaile">
        <h4 :key="idx">{{item.title}}</h4>
        <span v-for="(v) in item.list" :key="v">{{v}}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu",
  data() {
    return {
      menus: [
        {
          type: "food",
          name: "美食",
          detaile: [
            {
              title: "美食",
              list: ["代金券", "甜点", "饮品", "自助餐"]
            },
            {
              title: "美食1",
              list: ["代金券1", "甜点1", "饮品1", "自助餐1"]
            }
          ]
        },
        {
          type: "takeout",
          name: "外卖",
          detaile: [
            {
              title: "外卖",
              list: ["美团", "饿了么"]
            }
          ]
        }
      ],
      kind: ""
    };
  },
  computed: {
    curMenu() {
      return this.menus.filter(item => item.type === this.kind)[0] || [];
    }
  },
  methods: {
    onKindMouseLeave() {
      this._timer = setTimeout(() => {
        this.kind = "";
      }, 0);
    },
    onKindMouseEnter(e) {
      this.kind = e.target.querySelector("i").className;
    },
    onDetailMouseEnter() {
      clearTimeout(this._timer);
    },
    onDetailMouseLeave() {
      this.kind = "";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
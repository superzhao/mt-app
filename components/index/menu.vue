<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="onKindMouseLeave">
      <dt>全部分类</dt>
      <dd v-for="(item,idx) in menu" :key="idx" @mouseenter="onKindMouseEnter">
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
      <template v-for="(item,idx) in curMenu.child">
        <h4 :key="idx">{{item.title}}</h4>
        <span v-for="(v) in item.child" :key="v">{{v}}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu",
  data() {
    return {
      menu: this.$store.state.home.menu,
      kind: ""
    };
  },
  computed: {
    curMenu() {
      console.log(this.menu.filter(item => item.type === this.kind)[0],1)
      return this.menu.filter(item => item.type === this.kind)[0] || [];
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
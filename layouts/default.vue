<template >
  <el-container class="layout-default">
    <el-header>
      <my-header />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>
      <my-footer/>
    </el-footer>
  </el-container>
</template>
<script >
import MyHeader from "@/components/public/header";
import MyFooter from "@/components/public/footer";
export default {
  name: "default",
  components: { MyHeader,MyFooter }
};
</script>
<style>
</style>

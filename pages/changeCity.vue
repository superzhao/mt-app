<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <iSelect/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hotCitis/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <categroy/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/changeCity/iselect.vue'
import hotCitis from '@/components/changeCity/hotCitis.vue'
// import Categroy from '@/components/changeCity/categroy.vue'
export default {
  components:{
    iSelect,
    hotCitis,
    // Categroy
  }
}
</script>

<style lang="css">
</style>

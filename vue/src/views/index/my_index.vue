<template>
  <div class="domeWapper flex_div flex_auto">
    <div class="btnWapper">
      <el-button type="primary" @click="refresh" size="small">刷新</el-button>
      <el-button type="primary" @click="mixniClick" size="small">点击查询</el-button>
      <el-button type="primary" @click="exportExcel" size="small">导出数据</el-button>
    </div>
    <div class="tableWaper flex_div flex_auto">
      <el-table class="flex_div flex_auto"
      v-loading="loading"
      :data="tableData"
      border
      stripe
      style="">
        <el-table-column
          align="center"
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
// import mixin from '@/assets/mixins/mixin.js'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  // mixins: [mixin],
  inject: ['reload'], // 引入方法
  data () {
    return {
      loading: false,
      msg: 'baixue',
      tableData: []
    }
  },
  created () {
    this.mixniClick()
    this.hello()// mixins混入的方法
  },
  mounted () {},
  methods: {
    async mixniClick () {
      // console.log(this.name2)点击按钮的时候获取，mixins混入的数据
      let res = await this.$http.post(`/getTableList`)
      this.tableData = res.list
    },
    exportExcel () {
      console.log('导出数据')
      var wb = XLSX.utils.table_to_book(document.querySelector('.el-table'))
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    refresh () {
      this.reload() // 调用方法
      // console.log('刷新')
    }
  }
}
</script>
<style>
.domeWapper {
  flex-direction:column ;
  /* height: 50%; */
  /* width: 100%; */
  /* min-width: 600px; */
  padding:0 40px 40px 40px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.btnWapper{
  /* display: flex; */
  padding-bottom: 20px;
  text-align: right;
  width: 100%;
}
.tableWaper{
  /* display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%; */

}
.flex_div {
  display: flex;
  flex-direction: column;
}
.flex_div .flex_auto {
  flex: 1;
  overflow: auto;
}
.el-table::before{
  height: 0 !important;
}
.el-table__body-wrapper{
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
}
.el-table__body{
  /* display: flex; */
  /* flex-direction: column; */
   flex: 1;
  overflow: auto;
}

/* 修改滚动条的样式 */
/* ::-webkit-scrollbar {
  background: rgba(0, 0, 0, 0);
  width: 7px;
  height: 7px;
}
::-webkit-scrollbar-thumb {
  background: rgba(37, 36, 36, 0.27);
  border-radius: 10px;
} */

</style>

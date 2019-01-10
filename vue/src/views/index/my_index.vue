<template>
  <div class="domeWapper flex_div flex_auto">
    <div class="btnWapper">
      <el-button type="primary" @click="refresh" size="small" class="noprint">刷新</el-button>
      <el-button type="primary" @click="mixniClick" size="small">点击查询</el-button>
      <el-button type="primary" @click="exportExcel" size="small">导出数据</el-button>
      <el-button type="primary" @click="printExcel" size="small">打印1</el-button>
      <el-button type="primary" @click="printExcel2" size="small">打印2</el-button>
    </div>
    <div class="tableWaper flex_div flex_auto noprint" >
      <h1 ref="print" class="noprint">表头</h1>
      <el-table id="printTable" ref="print" class="flex_div flex_auto noprint"
      v-loading="loading"
      :data="tableData"
      border
      stripe
      style="">
        <el-table-column
          align="center"
          prop="date"
          label="日期"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="姓名"
          width="200">
        </el-table-column>
        <el-table-column
        :show-overflow-tooltip="true"
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
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import qs from 'qs'// 需要转换 用JOSN.stringify()不行
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
    // 获取列表数据
    async mixniClick () {
      // console.log(this.name2)点击按钮的时候获取，mixins混入的数据
      let res = await this.$http.post(`/getTableList`)
      this.tableData = res.list
    },
    // 导出excel
    exportExcel () {
      console.log('导出数据')
      var wb = XLSX.utils.table_to_book(document.querySelector('.el-table'))
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    // 刷新
    refresh () {
      this.reload() // 调用方法
      // console.log('刷新')
    },
    // 打印   直接用这种方法打印会出现样式混乱
    printExcel () {
      this.$print(this.$refs.print)
    },
    printExcel2 () {
      window.print()
    }
  }
}
</script>
<style type="text/css" media="print">
@media print{

  .noprint{
    display: none;
    }
  .el-table{
    /* width: 600px; */
    /* height: 400px; */
    border-bottom: 0 none;
    border-left: 0 none;

  }
  .el-table tr{
    /* border-left: 1px solid #ccc; */
  }
  .has-gutter tr{
    /* border-top:1px solid #000; */
  }
  .el-table_1_column_1 is-center {
    /* border-left: 1px solid #ccc; */

  }
  .domeWapper{
    border:0 none;
  }
}

</style>
<style >
.domeWapper {
  flex-direction:column ;
  /* height: 50%; */
  /* width: 800px; */
  width: 800px;
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
::-webkit-scrollbar {
  background: rgba(0, 0, 0, 0);
  width: 7px;
  height: 7px;
}
::-webkit-scrollbar-thumb {
  background: rgba(37, 36, 36, 0.27);
  border-radius: 10px;
}

</style>

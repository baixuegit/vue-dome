<template>
  <div class="wapper">
     <el-button type="primary" @click="printExcel" size="small" class="noPrint">打印1</el-button>
    <div class="conter" id="conter">
      <h3>标题</h3>
      <div class="table">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
      <div class="table_footer disNone">
        <span class="">制单时间：{{data}}</span>
        <span class="">制单人：{{user}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: '柏雪',
      data: 2222
    }
  },
  methods: {
    printExcel () {
      // 点击的时候发个请求，那到打印的单号和，制单时间
      window.print()
    }
  }
}
</script>

<style>
.table{
  border: 1px solid rgb(185, 169, 169);
  width: 600px;
  height: 400px;
  margin: 0 auto;
}
.table ul li{
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
  line-height: 50px;

}
.table ul{
  margin: 0;
}
.disNone{
  display:none;
}
.table_footer{
  margin-top:20px ;
}
.table_footer span{
  padding: 10px;
}

</style>
<style type="text/css" media="print">
@media print {
  .noPrint{
    display: none;
  }
  .disNone{
    display: block;
  }
}
</style>

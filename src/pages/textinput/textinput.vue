<template>
    <div id="textinput">
        <div class="weui-cells__title">文本框</div>
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入文本" />
                </div>
            </div>
        </div>
        <a href="javascript:;" class="weui-btn weui-btn_primary">提交</a>
    </div>
</template>

<script>
export default {
  data(){
    return {
      applys:''
    }
  },
  created() {
    this.applys = this.$route.params.applyName;
  }
};
</script>

<style>

</style>

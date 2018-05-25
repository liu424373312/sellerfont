<template>
  <div id="search">
    <div class="weui-search-bar" id="searchBar">
      <form class="weui-search-bar__form">
        <div class="weui-search-bar__box">
          <i class="weui-icon-search"></i>
          <input type="search" v-model="search" class="weui-search-bar__input" id="searchInput" placeholder="输入商品名称" @input="resultshow" required/>
          <a href="javascript:" class="weui-icon-clear" id="searchClear"></a>
        </div>
        <label class="weui-search-bar__label" id="searchText">
          <i class="weui-icon-search"></i>
          <span>搜索</span>
        </label>
      </form>
      <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
    </div>
    <div class="weui-cells searchbar-result" id="searchResult">
      <div v-for="(item,index) in data" :key="index">
        <div v-for="(item,index) in item.foods" :key="index">
          <div v-if="resultshow(item)" class="weui-cell weui-cell_access" @click="goodsdetail(item)">
            <div class="weui-cell__bd weui-cell_primary">
              <p>{{item.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import weui from "weui.js";
import $ from "jquery";
export default {
  data() {
    return {
      search: "",
      empty: true
    };
  },
  props: ["data"],
  methods: {
    resultshow(item) {
      var name = new String(item.name);
      if (name.indexOf(this.search) >= 0) {
        return true;
        this.empty = false;
      } else {
        return false;
      }
    },
    goodsdetail(item) {
      this.setCookie("productId", item.id, 1);
      this.$router.push("goodsdetail");
    }
  },
  created() {},
  mounted() {
    var $searchBar = $("#searchBar"),
      $searchResult = $("#searchResult"),
      $searchText = $("#searchText"),
      $searchInput = $("#searchInput"),
      $searchClear = $("#searchClear"),
      $searchCancel = $("#searchCancel");
    $(function() {
      function hideSearchResult() {
        $searchResult.hide();
        $searchInput.val("");
      }
      function cancelSearch() {
        hideSearchResult();
        $searchBar.removeClass("weui-search-bar_focusing");
        $searchText.show();
      }

      $searchText.on("click", function() {
        $searchBar.addClass("weui-search-bar_focusing");
        $searchInput.focus();
      });
      $searchInput
        .on("blur", function() {
          if (!this.value.length) cancelSearch();
        })
        .on("input", function() {
          if (this.value.length) {
            $searchResult.show();
          } else {
            $searchResult.hide();
          }
        });
      $searchClear.on("click", function() {
        hideSearchResult();
        $searchInput.focus();
      });
      $searchCancel.on("click", function() {
        cancelSearch();
        $searchInput.blur();
      });
    });
    $searchResult.hide();
    $searchInput.val("");
  }
};
</script>

<style>
.cancel {
  display: block;
}
</style>

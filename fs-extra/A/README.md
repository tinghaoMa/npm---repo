## 运行说明

### 安装tnpm
- npm install -g tnpm --registry=http://registry.npm.alibaba-inc.com (tnpm为阿里内部镜像，可极大提升安装速度)

### npm命令
执行`npm install`


## 目录规范

- API
  - shop
  	- detail

- components
  - cart
    - cart.acss
    - cart.axml
    - cart.js
    - cartModel.js
    - cart.json

- config
  - base-url

- pages
  - shop-detail
    - menu

- utils
  - reuqest
  - eventBus

## 上线前检查

- 所有mock都去掉。
- 所有TODO都解决。
- 清除console.log。
- isDebug设置成false。
- 检查服务器地址是否配置对。
- 调试页面是否关闭。

## 支付宝适配问题
- 命名
  - 组件引入时，引入命名非中划线间隔全部报错。使用`my-comopnents`而非`myComponent`。
  - 引入的文件整体路径长度不超过100字母。
- acss中
  @keyframe 部分有注释导致编译出错，注意删除注释。
- axml中
  - `<view id="item-{{id}}" can-scroll="{{true}}"> {{text}} </view>` 注意属性类绑定必须要`"{{}}"`,尤其bool属性要注意。
  - `a:if`判断在淘宝小程序会重新mount组件，支付宝不会（貌似只会hidden）。
  - 动态计算或者传属性都需要`{{}}`, 传入的动态值只支持`data`和`props`中的属性,且`props`不随变化更新UI。
  - `<text class="{{sortby === 'discount' ? 'active' : null}}"/>` `null` 改为 `''`
  - 事件使用冒号不识别，改成on开头。使用`onClick="onClick"`而非`:click="onClick"`。
  - 事件传参使用data-xxx。使用`onClick="onClick" data-item=xxx`而非`:click="onClick(xxx)"`。
  - `<scroll-view lower-threshold=0/>` 导致回掉不走，目测是支付宝bug，改成1即可。
  - 支付宝不识别`onClick`，双端都识别`onTap`。支付宝阻止冒泡使用`catchTap`,淘宝则需要`e.stopPropagation()`。
  ```
    // 如想兼容阻止冒泡推荐使用
    <view onClick="tap" catchTap="tap">
    tap(e) {
      e.stopPropagation && e.stopPropagation(); // stopPropagation只有淘宝有这个函数
    }
  ```
- js
  - `setData` 传输的数据会耗费大量性能，甚至卡死，列表元素注意精简data内容，尤其注意因为统计需求导致data过大。
  - view的`$id`不是全局唯一，page唯一。
  - 自定义props赋值带引号，不然传输数据出错。使用`<my-component model="{{myModel}}"/>`,而不是`<my-component model={{myModel}}/>`
  - 支付宝有循环引用检测，两个对象互相持有会报错。
  - `data`声明的变量如果是动态变更的，需要在didMount里再次执行setData, 不然不会变更。
- API
  - `my.navigateTo` url参数在支付宝支持相对路径，所以绝对路径的url以`/`开头。
  - `my.getSystemInfoSync` 在支付宝Android端,当我们的工程打包进主站之后在适配商品列表卡位置的时候获取到的windowHeight不正确,必须进行动态获取，分析可能是
    因为计算的时候把titleBar的高度少算了。
  - 淘宝小程序iOS, webP支持限制：
    1. URL链接是否包含.webp后缀。
    2. 是否是Alicdn域。
- 主站适配经验 https://yuque.antfin-inc.com/taobao-o2o/qllagw/ngvsfy


## 机型适配问题
- iOS10，使用默认布局，可能导致购物车字重影。推荐使用flex。

## 查错方式

如果系统报错没有有效信息，可采用注释排除法。

- 先找到出错的页面，逐步注释axml的组件，查看报错是否消失。
- 如果注释掉报错都没消失，进入组件或者page初始化方法，逐步注释，查看报错是否消失。

## 性能埋点

- timerSum 是 track-count 的总次数，
- histogramSum 是 track-timing 的总次数

## 上传版本号
- 张江山: x.x.101
- 马廷皓: x.x.102
- 王阿磊: x.x.103
- 张志鑫: x.x.104
- dev分支: x.x.200

## 小程序跳转例子
```js
my.navigateToMiniProgram({
    appId: '8251537',
    path: '/retail-mini-app/pages/shop-detail/shop-detail?shop_id=2234602943'
})
```

## 主站工程运行问题
- 需要执行 tnpm i --by=yarn
- `Uncaught TypeError: Cannot read property 'createTextNode' of undefined` 删除node_modules下的babel-runtime库，因为支付宝IDE内部已经安装babel-runtime库，然后我们手动安装后导致冲突，删除后试试

## 支付宝单独页面性能测试跳转链接
店铺页：alipays://platformapi/startapp?appId=2018090761255717&page=retail-mini-app/pages/shop-detail/shop-detail?shop_id=2231684409


海报详情页：alipays://platformapi/startapp?appId=2018090761255717&page=retail-mini-app/pages/banner-detail/banner-detail?ele_id=E16548789905084899505&is_medicine_shop=0&poster_id=2267152768&shop_id=2231684409

商家资质页：alipays://platformapi/startapp?appId=2018090761255717&page=retail-mini-app/pages/shop-certification/shop-certificate?shopId=2231684409

商品详情页：alipays://platformapi/startapp?appId=2018090761255717&page=retail-mini-app/pages/item-detail/item-detail?ele_id=E16548789905084899505&from_page=1&is_medicine_shop=0&shop_id=2231684409&sku_id=15409988167677208

商品评价页：alipays://platformapi/startapp?appId=2018090761255717&page=retail-mini-app/pages/item-store-eval/item-store-eval?activeTagName=%E5%85%A8%E9%83%A8&eleId=E206541576867301711&sku_ids=1537321353868032

搜索页：alipays://platformapi/startapp?appId=2018090761255717&page=retail-mini-app/pages/shop-search/shop-search?ele_id=E206541576867301711&is_medicine_shop=1&shop_id=2232931842

图文详情页：alipays://platformapi/startapp?appId=2018090761255717&page=retail-mini-app/pages/item-rtf/item-rtf

频道页：alipays://platformapi/startapp?appId=2018090761255717&page=pages/webview-redirect/webview-redirect?url=https://h5.ele.me/newretail/p/channel/?channel=supermarket&hideNavbar=1&spm=0.0.0.0&geohash=wtmkjx1y6smc&geolat=30.273671&geolng=120.126971&isAliMiniApp=1&navBarHeight=44&statusBarHeight=20

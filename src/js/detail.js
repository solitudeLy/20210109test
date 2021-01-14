// 入口函数

$(function () {

  // 0. 准备一个全局变量表示库存
  let goods_number = 1
  // 准备一个计数器
  let count = 1
  // 准备一个变量保存商品信息
  let goods_info = null

  // 1. 获取商品 id
  const id = window.sessionStorage.getItem('goods_id')

  // 1-2. 判断 id 是否存在
  if (!id) {
    alert('您查看的商品不存在, 点击确定回到列表页')
    window.location.href = '../views/list.html'
    return
  }

  // 2. 获取商品信息
  getGoodsInfo()
  async function getGoodsInfo() {
    // 2-1. 发送请求
    const res = await $.get('../php/goodsInfo.php', { id }, null, 'json')

    bindHtml(res.info)
  }

  // 3. 渲染页面
  function bindHtml(info) {
    // 给全局变量进行赋值
    goods_number = info.goods_number
    // 给全局变量赋值
    goods_info = info

    let s1 = `
      <div class="enlargeBox">
        <div class="show">
          <img src="${ info.goods_big_logo }" alt="">
        </div>
        <div class="list">
          <p class="active">
            <img src="${ info.goods_small_logo }" alt="">
          </p>
        </div>
      </div>
      <div class="goodsInfo">
        <p class="desc">${ info.goods_name }</p>
        <div class="btn-group size">
          <button type="button" class="btn btn-default">S</button>
          <button type="button" class="btn btn-default">M</button>
          <button type="button" class="btn btn-default">L</button>
          <button type="button" class="btn btn-default">XL</button>
        </div>
        <p class="price">
          ￥ <span class="text-danger">${ info.goods_price }</span>
        </p>
        <div class="num">
          <button class="sub">-</button>
          <input class="number" type="text" value="1">
          <button class="add">+</button>
        </div>
        <div>
          <button class="add_cart btn btn-success">加入购物车</button>
          <button class="btn btn-warning">继续去购物</button>
        </div>
      </div>
    `
    $('.goodsDetail').html(s1)

    // 商品详情的渲染
    $('.goodsDesc').html(info.goods_introduce)
  }

  // 4. 绑定事件
  $('.goodsDetail').on('click', '.add', () => {
    // 计数增加1
    count++

    // 极限值判断
    if (count > goods_number) return count = goods_number

    // 把值赋值给 input 文本框
    $('.goodsDetail .number').val(count)
  })

  $('.goodsDetail').on('click', '.sub', () => {
    // 减少数量
    count--

    // 极限值判断
    if (count < 1) return count = 1

    // 给文本框进行赋值
    $('.goodsDetail .number').val(count)
  })

  // 5. 加入购物车
  $('.goodsDetail').on('click', '.add_cart', function () {

    // 5-2. 获取 localStorage 里面的数据
    const list = JSON.parse(window.localStorage.getItem('list')) || []

    // 5-3. 把当前这一条数据存储到 list 里面
    // 5-3-1. 判断 list 里面有没有 和 goods_info 一样的一条数据
    const res = list.filter(item => item.goods_id === goods_info.goods_id)

    // 5-3-2. 条件判断 res 的 length
    if (res.length) {
      // 表示有
      // 应该修改的是 res[0] 里面的 cart_number
      res[0].cart_number += count
    } else {
      // 表示没有
      // 直接拿到 count 的值, 赋值给 goods_info.cart_number
      goods_info.cart_number = count
      // 直接 push 到数组里面
      list.push(goods_info)
    }

    // 5-4. 再次存储回 localStorage 里面
    window.localStorage.setItem('list', JSON.stringify(list))
  })
})




// 登录状态确认
const nickname = getCookie('nickname')
  // 1-2. 条件判断
  if (nickname) {
    // 登录过
    $('.off').addClass('hide')
    console.log($('.off'))
    $('.on').text(`欢迎您 : ${ nickname }`).removeClass('hide')

    // 拿到 lcoalStorage 里面存储的 list 数据
    const list = JSON.parse(window.localStorage.getItem('list')) || []
    $('.cartNum').text(list.length)
  } else {
    // 没有登录过 或者 过期了
    $('.off').removeClass('hide')
    $('.on').addClass('hide')
  }

//    banner 区域
class Banner {
    constructor (select) {
      // 范围元素
      this.ele = document.querySelector(select)
      // imgBox
      this.imgBox = this.ele.querySelector('.imgBox')
      // pointBox
      this.pointBox = this.ele.querySelector('.pointBox')
      // 左按钮
      this.leftBtn = this.ele.querySelector('.left')
      // 右按钮
      this.rightBtn = this.ele.querySelector('.right')
      // 接受定时器返回值
      this.timer = 0
      // 表示索引的属性
      this.index = 1
      // 开关
      this.flag = true
      // 可视窗口的宽度
      this.banner_width = this.ele.clientWidth
  
      // 直接启动启动器
      this.init()
    }
  
    // 方法
    // 1. 启动器
    init () {
      this.setPoint()
      this.copyEle()
      this.autoPlay()
      this.overOut()
      this.leftRightEvent()
      this.pointEvent()
      this.tabChange()
    }
  
    // 2. 设置焦点
    setPoint () {
      const num = this.imgBox.children.length
  
      const frg = document.createDocumentFragment()
      for (let i = 0; i < num; i++) {
        const li = document.createElement('li')
        if (i === 0) li.classList.add('active')
        li.dataset.page = i
        frg.appendChild(li)
      }
  
      // 把创建好的所有 li 插入到 this.pointBox 里面
      this.pointBox.appendChild(frg)
  
      // 重新调整 this.pointBox 的宽度
      this.pointBox.style.width = num * (20 + 10) + 'px'
    }
  
    // 3. 复制元素
    copyEle () {
      // 因为一直要用到 this.imgBox, 书写一个解构赋值
      // this 是当前构造函数的实例对象, 也是对象
      // 我写 this.imgBox 是在访问 当前实例对象中的 imgBox 成员
      // 我就可以快速从 this 这个对象中获取一些成员
      // const box = this.imgBox
      const { imgBox: box, banner_width: bw } = this
      // 赋值的 this.imgBox 里面的第一个子元素和最后一个子元素
      const first = box.firstElementChild.cloneNode(true)
      const last = box.lastElementChild.cloneNode(true)
  
      // 添加会 this.imgBox 内部
      box.appendChild(first)
      box.insertBefore(last, box.firstElementChild)
  
      // 从新调整宽度
      box.style.width = box.children.length * 100 + '%'
  
      // 从新调整定位关系
      box.style.left = -bw + 'px'
    }
  
    // 4. 自动轮播
    autoPlay () {
      // 开启定时器
      this.timer = setInterval(() => {
        this.index++
  
        // 使用运动函数运动到下一张
        // 此时没有调用 this.moveEnd
        // 只是把 moveEnd 函数的地址给到 move 里面
        // move 的第三个参数接受的是 moveEnd 函数的地址
        // move(this.imgBox, { left: -this.index * this.banner_width }, this.moveEnd.bind(this))
        move(this.imgBox, { left: -this.index * this.banner_width }, () => this.moveEnd())
      }, 2000)
    }
  
    // 5. 运动结束
    moveEnd () {
      const { index, imgBox: box, banner_width: bw, pointBox: pBox } = this
      // 判断 this.index
      if (index === box.children.length - 1) {
        this.index = 1
        box.style.left = -this.index * bw + 'px'
      }
  
      // 判断 this.index
      if (index === 0) {
        this.index = box.children.length - 2
        box.style.left = -this.index * bw + 'px'
      }
  
      // 焦点配套
      for (let i = 0; i < pBox.children.length; i++) {
        pBox.children[i].classList.remove('active')
      }
      pBox.children[this.index - 1].classList.add('active')
  
      // 开启开关
      this.flag = true
    }
  
    // 6. 移入移出
    overOut () {
      // 移入 banner 区域
      this.ele.addEventListener('mouseover', () => clearInterval(this.timer))
      // 移出 banner 区域
      this.ele.addEventListener('mouseout', () => this.autoPlay())
    }
  
    // 7. 左右切换
    leftRightEvent () {
      // 左按钮
      this.leftBtn.addEventListener('click', () => {
        // 判断开关
        if (!this.flag) return
        this.flag = false
        this.index--
        move(this.imgBox, { left: -this.index * this.banner_width }, this.moveEnd.bind(this))
      })
      // 右按钮
      this.rightBtn.addEventListener('click', () => {
        if (!this.flag) return
        this.flag = false
        this.index++
        move(this.imgBox, { left: -this.index * this.banner_width }, this.moveEnd.bind(this))
      })
    }
  
    // 8. 焦点切换
    pointEvent () {
      // 事件委托, 委托给 this.pointBox
      this.pointBox.addEventListener('click', e => {
        e = e || window.event
        const target = e.target || e.srcElement
  
        if (target.nodeName === 'LI') {
          if (!this.flag) return
          this.flag = false
          // 拿到元素身上记录的内容
          this.index = target.dataset.page - 0 + 1
          move(this.imgBox, { left: -this.index * this.banner_width }, this.moveEnd.bind(this))
        }
      })
    }
  
    // 9. 页面切换
    tabChange () {
      // 给 document 绑定事件
      document.addEventListener('visibilitychange', () => {
        const state = document.visibilityState
  
        if (state === 'hidden') clearInterval(this.timer)
        if (state === 'visible') this.autoPlay()
      })
    }
  }


//   -------------------------------------------




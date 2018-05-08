var version = 1.0
var data = [{
  name: "✬十二星座",
    page: {
      views: [{
        type: "list",
        props: {
          data: ["点击输入想要查询的星座，总有你喜欢的♥"]
        },
        layout: $layout.fill,
        events: {
          didSelect: function(tableView, indexPath) {
            switch (indexPath.row) {
              case 0:
$input.text({
  type: $kbType.text,
  placeholder: "请输入查询的星座，例如:天蝎座",
  handler: function(text) {
$ui.loading(true)
$http.get({
  url: "https://www.sortime.com/api/v2/constellation/" + encodeURI(text),
  handler(resp) {
    let dic = resp.data.result.result
    $ui.loading(false)
    $ui.alert({
      title: "当前日期:" + dic.today.date + "\n🎉 今日运势 🎉",
      message: "速配星座:" + "❤" + dic.today.star + "\n幸运颜色:" + dic.today.color + "\n幸运数字:" + dic.today.number + "\n☞寄语: " + dic.today.presummary
     })
    }
   })
  }
})
              break
              default:
               break
            }
          }
        }
      }]
    }
  },
  {
  name: "🗳生活小查询",
    page: {
      views: [{
        type: "list",
        props: {
          data: ["归属地查询","ip查询","邮编查询","iphone序列号查询","历史上的今天","汇率查询","固件验证查询"]
        },
        layout: $layout.fill,
        events: {
          didSelect: function(tableView, indexPath) {
            switch (indexPath.row) {
              case 0:
              $ui.loading(true)
$input.text({
  type: $kbType.number,
  placeholder: "请输入您的号码",
  handler: function(text) {
$ui.loading(true)
$http.get({
  url: "https://h.ip138.com/mobile/getlocation/?mobile=" + text,
  handler(resp) {
    let dic = resp.data.data
    $ui.loading(false)
    $ui.alert({
      title: "☟ 查询结果 ☟",
      message: "" + dic.location + " " + dic.card + "\n区号: " + dic.zip
    })
  }
})
  }
})
              break
              case 1:
              $ui.loading(true)
$input.text({
  type: $kbType.text,
  placeholder: "请输入您的ip",
  handler: function(text) {
$ui.loading(true)
$http.get({
  url: "https://clientapi.ipip.net/weixin_app.php?a=show&ip=" + text,
  handler(resp) {
    let dic = resp.data
    $http.get({
  url: "https://apisuper.com/api/getIp",
  handler(resp) {
    let dic1 = resp.data.data
    $ui.loading(false)
    $ui.alert({
      title: "•••查询结果•••",
      message: "查询ip: " + dic.ip + " " + dic.ip_cz + "\n本机ip: " + dic1.ip + " " + dic1.addressStr
         })
        }
      })
     }
   })
  }
})
               break
               case 2:
$input.text({
  type: $kbType.text,
  placeholder: "请输入您的地址或邮编",
  handler: function(text) {
$ui.loading(true)
$http.get({
  url: "https://api.wjd.weiyoutong.cn/common/searchpostcode?page=1&limit=20&token=SrhGqFlPbZbtv8v8X_dWg%7CsCHe6FuPoD8kQZH_X5lM9eSJQXCeEOHGHUUFHWubHyck2zQ4fy5RY%3D&searchkey=" + encodeURIComponent(text),
  handler(resp) {
  let data = resp.data.data
    arr = new Array()
    $ui.loading(false)
    for (i in data) {
      let item = data[i]
      arr.push(`${item.ADDR} ${item.POSTCODE}`)
    }
    $ui.alert(arr.join("\n"))
    }
   })
  }
})
               break
               case 3:
$input.text({
  type: $kbType.text,
  placeholder: "设置＞通用＞本机＞序列号",
  handler: function(text) {
$ui.loading(true)
$http.get({
  url: "https://applebaoxiu.wang/SNQuery/app/wx4b3e80391a1eb8e4/apple?sn=" + text,
  handler(resp) {
    let dic = resp.data.message
    $ui.loading(false)
    $ui.alert({
      title: "☟ 查询结果 ☟",
      message: "" + dic.color + " " + dic.capacity + " " + dic.model + "\n型号: " + dic.number + " 网络: " + dic.network + "\n生产地: " + dic.production.start + " " + dic.production.origin + "\n激活日: " + dic.purchase.date
    })
    }
   })
  }
})
               break
               case 4:
let screenWidth = $device.info.screen.width
$ui.loading(true)
$http.get({
  url: "https://www.hangjiapai.com/diary/today/list",
  handler(resp) {
    let data = resp.data.data
    arr = new Array()
    $ui.loading(false)
    for (i in data) {
      let item = data[i]
      arr.push({ itemLabel: { text: `${item.date} ${item.title}` } })
    }
    $ui.render({
      props: {
        title: "历史上的今天"
      },
      views: [{
        type: "list",
        props: {
          id: "mainList",
          data: arr,
          template: {
            views: [{
              type: "label",
              props: {
                id: "itemLabel",
                lines: 2,
                font: $font(16)
              },
              layout: (make, view) => {
                make.width.equalTo(view.super).offset(-30)
                make.center.equalTo(view.super)
              }
            }]
          }
        },
        layout: $layout.fill,
        events: {
          rowHeight: function(sender, indexPath) {
            let itemLength = $("mainList").object(indexPath).itemLabel.text.length
            if (itemLength > 21) {
              return 60
            } else {
              return 40
            }
          }
        }
      }]
    })
  }
})   
               break
               case 5:
$app.open()
$app.strings = {
  "en": {
    "main-title": "Exchange Rates",
    "copied": "Copied",
    "name-eur": "🇪🇺 Euro",
    "name-cny": "🇨🇳 Chinese Yuan",
    "name-hkd": "🇭🇰 Hong Kong Dollar",
    "name-usd": "🇺🇸 US Dollar",
    "name-gbp": "🇬🇧 British Pound",
    "name-jpy": "🇯🇵 Japanese Yen",
    "name-inr": "🇮🇳 Indian Rupee",
    "name-aud": "🇦🇺 Australian Dollar",
    "name-cad": "🇨🇦 Canadian Dollar",
    "name-sgd": "🇸🇬 Singapore Dollar",
    "name-chf": "🇨🇭 Swiss Franc",
    "name-myr": "🇲🇾 Malaysian Ringgit",
    "name-thb": "🇹🇭 Thai Baht",
    "name-krw": "🇰🇷 South Korean Won",
    "name-bgn": "🇧🇬 Bulgarian Lev",
    "name-brl": "🇧🇷 Brazilian Real",
    "name-czk": "🇨🇿 Czech Koruna",
    "name-dkk": "🇩🇰 Danish Krone",
    "name-hrk": "🇭🇷 Croatian Kuna",
    "name-huf": "🇭🇺 Hungarian Forint",
    "name-idr": "🇮🇩 Indonesian Rupiah",
    "name-ils": "🇮🇱 Israeli Shekel",
    "name-mxn": "🇲🇽 Mexican Peso",
    "name-nok": "🇳🇴 Norwegian Krone",
    "name-nzd": "🇳🇿 New Zealand Dollar",
    "name-php": "🇵🇭 Philippine Peso",
    "name-pln": "🇵🇱 Polish Zloty",
    "name-ron": "🇷🇴 Romanian Leu",
    "name-rub": "🇷🇺 Russian Ruble",
    "name-sek": "🇸🇪 Swedish Krona",
    "name-try": "🇹🇷 Turkish Lira",
    "name-zar": "🇿🇦 South African Rand"
  },
  "zh-Hans": {
    "main-title": "汇率查询",
    "copied": "已复制",
    "name-eur": "🇪🇺 欧元",
    "name-cny": "🇨🇳 人民币",
    "name-hkd": "🇭🇰 港币",
    "name-usd": "🇺🇸 美元",
    "name-gbp": "🇬🇧 英镑",
    "name-jpy": "🇯🇵 日元",
    "name-inr": "🇮🇳 印度卢比",
    "name-aud": "🇦🇺 澳元",
    "name-cad": "🇨🇦 加拿大元",
    "name-sgd": "🇸🇬 新加坡元",
    "name-chf": "🇨🇭 瑞士法郎",
    "name-myr": "🇲🇾 马来西亚林吉特",
    "name-thb": "🇹🇭 泰铢",
    "name-krw": "🇰🇷 韩元",
    "name-bgn": "🇧🇬 保加利亚列弗",
    "name-brl": "🇧🇷 巴西雷亚尔",
    "name-czk": "🇨🇿 捷克克朗",
    "name-dkk": "🇩🇰 丹麦克郎",
    "name-hrk": "🇭🇷 克罗地亚库那",
    "name-huf": "🇭🇺 匈牙利福林",
    "name-idr": "🇮🇩 印尼卢比",
    "name-ils": "🇮🇱 以色列镑",
    "name-mxn": "🇲🇽 墨西哥比索",
    "name-nok": "🇳🇴 挪威克郎",
    "name-nzd": "🇳🇿 新西兰元",
    "name-php": "🇵🇭 菲律宾比索",
    "name-pln": "🇵🇱 波兰兹罗提",
    "name-ron": "🇷🇴 罗马尼亚列伊",
    "name-rub": "🇷🇺 俄罗斯卢布",
    "name-sek": "🇸🇪 瑞典克郎",
    "name-try": "🇹🇷 土耳其里拉",
    "name-zar": "🇿🇦 南非兰特"
  },
  "zh-Hant": {
    "main-title": "匯率查詢",
    "copied": "已復制",
    "name-eur": "🇪🇺 歐元",
    "name-cny": "🇨🇳 人民幣",
    "name-hkd": "🇭🇰 港幣",
    "name-usd": "🇺🇸 美元",
    "name-gbp": "🇬🇧 英鎊",
    "name-jpy": "🇯🇵 日元",
    "name-inr": "🇮🇳 印度盧比",
    "name-aud": "🇦🇺 澳元",
    "name-cad": "🇨🇦 加拿大元",
    "name-sgd": "🇸🇬 新加坡元",
    "name-chf": "🇨🇭 瑞士法郎",
    "name-myr": "🇲🇾 馬來西亞林吉特",
    "name-thb": "🇹🇭 泰銖",
    "name-krw": "🇰🇷 韓元",
    "name-bgn": "🇧🇬 保加利亞列弗",
    "name-brl": "🇧🇷 巴西雷亞爾",
    "name-czk": "🇨🇿 捷克克朗",
    "name-dkk": "🇩🇰 丹麥克郎",
    "name-hrk": "🇭🇷 克羅地亞庫那",
    "name-huf": "🇭🇺 匈牙利福林",
    "name-idr": "🇮🇩 印尼盧比",
    "name-ils": "🇮🇱 以色列鎊",
    "name-mxn": "🇲🇽 墨西哥比索",
    "name-nok": "🇳🇴 挪威克郎",
    "name-nzd": "🇳🇿 新西蘭元",
    "name-php": "🇵🇭 菲律賓比索",
    "name-pln": "🇵🇱 波蘭茲羅提",
    "name-ron": "🇷🇴 羅馬尼亞列伊",
    "name-rub": "🇷🇺 俄羅斯盧布",
    "name-sek": "🇸🇪 瑞典克郎",
    "name-try": "🇹🇷 土耳其里拉",
    "name-zar": "🇿🇦 南非蘭特"
  }
}

var symbols = ["EUR", "CNY", "HKD", "USD", "GBP", "JPY", "INR", "AUD", "CAD", "SGD", "CHF", "MYR", "THB", "KRW", "BGN", "BRL", "CZK", "DKK", "HRK", "HUF", "IDR", "ILS", "MXN", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "TRY", "ZAR"]
var names = symbols.map(function(item) {
  return $l10n("name-" + item.toLowerCase())
})
var rates = {}
var selectedIndex = $cache.get("selected-index") || 0

$ui.render({
  props: { title: $l10n("main-title") },
  views: [
    {
      type: "input",
      props: {
        type: $kbType.decimal,
        text: "1"
      },
      layout: function(make, view) {
        make.left.top.inset(10)
        make.height.equalTo(32)
        make.width.equalTo(view.super).multipliedBy(0.5).offset(-15)
      },
      events: {
        changed: function(sender) { calculate() }
      }
    },
    {
      type: "button",
      props: { title: names[selectedIndex] },
      layout: function(make) {
        var input = $("input")
        make.left.equalTo(input.right).offset(10)
        make.top.height.equalTo(input)
        make.right.inset(10)
      },
      events: {
        tapped: function(sender) {
          $ui.menu({
            items: names,
            handler: function(title, idx) {
              selectedIndex = idx
              sender.title = names[idx]
              calculate()
              $cache.set("selected-index", idx)
            }
          })
        }
      }
    },
    {
      type: "list",
      props: {
        template: [
          {
            type: "label",
            props: {
              id: "name-label"
            },
            layout: function(make, view) {
              make.left.equalTo(15)
              make.centerY.equalTo(view.super)
            }
          },
          {
            type: "label",
            props: {
              id: "value-label",
              align: $align.center
            },
            layout: function(make, view) {
              make.centerY.equalTo(view.super)
              make.right.inset(15)
            }
          }
        ],
        data: names.map(function(item) { return { "name-label": { text: item } } })
      },
      layout: function(make) {
        make.top.equalTo($("input").bottom).offset(10)
        make.left.bottom.right.equalTo(0)
      },
      events: {
        pulled: function() { fetch(true) },
        didSelect: function(sender, indexPath) {
          var base = rates[symbols[selectedIndex]] || 1.0
          var number = Number($("input").text)
          $clipboard.text = (number * (rates[symbols[indexPath.row]] || 1.0) / base).toFixed(4)
          $ui.toast($l10n("copied"))
        }
      }
    }
  ]
})

function calculate() {
  var base = rates[symbols[selectedIndex]] || 1.0
  var number = Number($("input").text)
  $("list").data = symbols.map(function(symbol, idx) {
    return {
      "name-label": { text: names[idx] },
      "value-label": { text: (number * (rates[symbol] || 1.0) / base).toFixed(4) + " " + symbol }
    }
  })
}

function fetch(pulled) {
  $ui.loading(!pulled)
  $http.get({
    url: "https://api.fixer.io/latest",
    handler: function(resp) {
      $ui.loading(false)
      $("list").endRefreshing()
      rates = resp.data.rates
      calculate()
    }
  })
}
fetch(false)        
               break
               case 6:
var version = $device.info.version
var model = $device.info.model
var API = "https://ipsw.me/api/ios/v3/device/"
var signed = false
$ui.loading(true)

function output(information, versions) {
  $ui.alert({
    title: "•••【温馨提示】•••",
    message: "当前固件：" + information + "\n可验证固件：" + versions
  })
}

function matchVersion(data){
  var firmwares = data[model].firmwares.map(function(item) { return item.signed ? item.version : '' })
  return firmwares
}

function match(versions) {
  $http.get({
    url: API + model + "/" + version + "/info.json",
    handler: function(resp) {
      $ui.loading(false)
      data = matchVersion(resp.data)
      for (const key in data) {if(data[key] == version){signed = true;break;}}
      output(version + (signed ? " (可以验证)" : " (不可验证)"), versions)
    }
  })
}

$http.get({
  url: API + model,
  handler: function(resp) { 
    match(matchVersion(resp.data).filter(function(n){return n}).join(", "))
  }
})     
               break
              default:
               break
            }
          }
        }
      }]
    }
  },
  {
    name: "🔢计算器",
    page: {
      views: [{
          type: "matrix",
          props: {
            columns: 4,
            itemHeight: 88,
            spacing: 1,
            template: [{
              type: "label",
              props: {
                id: "tile",
                bgcolor: $color("#474b51"),
                textColor: $color("#abb2bf"),
                align: $align.center,
                font: $font(32)
              },
              layout: $layout.fill
            }],
            data: ["(", ")", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", "C", ".", "="].map(function(item) {
              return {
                tile: {
                  text: "" + item
                }
              }
            })
          },
          layout: function(make) {
            make.left.bottom.right.equalTo(0)
            make.height.equalTo(446)
          },
          events: {
            didSelect: function(sender, indexPath, data) {
              var token = data.tile.text
              var label = $("input")
              if (token === "C") {
                label.text = ""
              } else if (token === "=") {
                label.text = eval(label.text)
              } else {
                label.text = label.text + token
              }
            }
          }
        },
        {
          type: "label",
          props: {
            id: "input",
            align: $align.right,
            font: $font("bold", 48)
          },
          layout: function(make) {
            make.left.right.inset(15)
            make.top.equalTo(0)
            make.bottom.equalTo($("matrix").top)
          }
        }
      ]
    }
  },
 {
    name: "♬听听歌也无妨",
    page: {
      views: [{
        type: "list",
        props: {
          data: ["起风了(日文版)","纸短情长"]
        },
        layout: $layout.fill,
        events: {
          didSelect: function(tableView, indexPath) {
            switch (indexPath.row) {
              case 0:
var music = "http://music.163.com/song/media/outer/url?id=28885472.mp3"
    $audio.play({
        url: music
    })
              break
              case 1:
var music = "http://music.163.com/song/media/outer/url?id=516076896.mp3"
    $audio.play({
        url: music
    })
               break
              default:
               break
            }
          }
        }
      }]
    }
  },
  {
    name: "ღ实用网站",
    page: {
      views: [{
        type: "list",
        props: {
          data: ["快速百度","谷歌镜像站(免vpn)","程序员的工具箱","少数派","ReadHub","思古影视(全网影视，简单快捷)","SCDXC(微信公众号:scdxcpy回复“账号”获取)","康庄大道(微信公众号:kzddck回复“账号”获取)","Workflow(微信公众号:昌哥更新器)","艾橙科技――――下载工具篇","宅哥科技(不错的资源网站)","在线安装迅雷"]
        },
        layout: $layout.fill,
        events: {
          didSelect: function(tableView, indexPath) {
            switch (indexPath.row) {
              case 0:
$input.text({
  type: $kbType.text,
  placeholder: "输入您要查询的信息",
  handler: function(text) {
$app.openURL("https://m.baidu.com/from=1000539d/s?sa=tb&ts=6209538&t_kt=0&ie=utf-8&rsv_t=b7d0%252BT%252BRaTchWsfQxBl6g1SJgKWtN7sf40vL6O0fiwJM9u7MwS3EZsw6lTF0oJ4&rsv_pq=9652958877520094557&ss=101&tj=1&t_it=1&rqlang=zh&rsv_sug4=13645&inputT=11675&oq=%E7%99%BE%E5%BA%A6&word=" + encodeURI(text))
  }
})
              break
              case 1:
$ui.preview({
  title: "谷歌",
  url: "https://fast.likeso.ml/"
})
              break
              case 2:
$ui.preview({
  title: "程序员的工具箱",
  url: "https://tool.lu/"
})
               break
               case 3:
$ui.preview({
  title: "少数派",
  url: "https://sspai.com/"
})
               break
               case 4:
$ui.preview({
  title: "ReadHub",
  url: "https://readhub.me/"
})
               break
               case 5:
$ui.preview({
  title: "思古影视",
  url: "http://v.sigu.me/"
})
               break
               case 6:
$ui.preview({
  title: "scdxc",
  url: "http://ios.scdxc.top/"
})
               break
               case 7:
$ui.preview({
  title: "康庄大道",
  url: "http://kzddck.com/app/yingyong.html"
})
               break
               case 8:
$app.openURL("mqqapi://card/show_pslcard?src_type=internal&version=1&card_type=group&uin=217169380")
               break
               case 9:
$ui.loading(true)
$http.get({
  url: "http://mp.weixin.qq.com/mp/homepage?__biz=MzI2NjY1MTMyMA==&hid=12&sn=616a6b5e5ca4ad89aac6abe69a2d79fd&scene=18#wechat_redirect",
  handler: function(resp) {
    $ui.loading(false)
    var data = resp.data.replace(/\n|\s|\r/g, "")
    var img = data.match(/background-image.*?(?=\'\))/g).map(function(item) { return item.replace(/background-image:url\(\'/, "") })
    var jumpURL = data.match(/<ahref=\".*?(?=\">)/g).map(function(item) { return item.replace(/<ahref=\"/, "") })
    mainView(img, jumpURL)
  }
})

function mainView(img, jumpURL) {
  $ui.render({
    props: {
      title: "艾橙科技"
    },
    views: [{
        type: "gallery",
        props: {
          id: "ImageGallery",
          items: [{
              type: "button",
              props: {
                src: img[0]
              },
              events: {
                tapped(sender) {
                  openURL(jumpURL[0])
                }
              }
            },
            {
              type: "button",
              props: {
                src: img[1]
              },
              events: {
                tapped(sender) {
                  openURL(jumpURL[1])
                }
              }
            },
            {
              type: "button",
              props: {
                src: img[2]
              },
              events: {
                tapped(sender) {
                  openURL(jumpURL[2])
                }
              }
            }
          ],
          interval: 3
        },
        layout: function(make, view) {
          make.left.right.top.inset(0)
          make.height.equalTo(185)
        }
      },
      {
        type: "view",
        props: {
          id: "Rview"
        },
        views: [{
            type: "button",
            props: {
              id: "B1",
              title: "下载神器",
              titleColor: $color("#90EE90"),
              bgcolor: $color("#FAFAFA")
            },
            layout: function(make, view) {
              make.bottom.left.inset(0)
              make.height.equalTo(view.super)
              make.width.equalTo(view.super).dividedBy(4)
            },
            events: {
              tapped(sender) {
                $("B2").titleColor = $color("black")
                $("B3").titleColor = $color("black")
                $("B4").titleColor = $color("black")
                sender.titleColor = $color("#90EE90")
                load(0)
              }
            }
          },
          {
            type: "button",
            props: {
              id: "B2",
              title: "神器继续",
              titleColor: $color("black"),
              bgcolor: $color("#FAFAFA")
            },
            layout: function(make, view) {
              make.bottom.inset(0)
              make.left.equalTo($("B1").right)
              make.height.equalTo(view.super)
              make.width.equalTo(view.super).dividedBy(4)
            },
            events: {
              tapped(sender) {
                $("B1").titleColor = $color("black")
                $("B3").titleColor = $color("black")
                $("B4").titleColor = $color("black")
                sender.titleColor = $color("#90EE90")
                load(1)
              }
            }
          },
          {
            type: "button",
            props: {
              id: "B3",
              title: "更新介绍",
              titleColor: $color("black"),
              bgcolor: $color("#FAFAFA")
            },
            layout: function(make, view) {
              make.bottom.inset(0)
              make.left.equalTo($("B2").right)
              make.height.equalTo(view.super)
              make.width.equalTo(view.super).dividedBy(4)
            },
            events: {
              tapped(sender) {
                $("B2").titleColor = $color("black")
                $("B1").titleColor = $color("black")
                $("B4").titleColor = $color("black")
                sender.titleColor = $color("#90EE90")
                load(2)
              }
            }
          },
          {
            type: "button",
            props: {
              id: "B4",
              title: "使用介绍",
              titleColor: $color("black"),
              bgcolor: $color("#FAFAFA")
            },
            layout: function(make, view) {
              make.bottom.inset(0)
              make.left.equalTo($("B3").right)
              make.height.equalTo(view.super)
              make.width.equalTo(view.super).dividedBy(4)
            },
            events: {
              tapped(sender) {
                $("B2").titleColor = $color("black")
                $("B3").titleColor = $color("black")
                $("B1").titleColor = $color("black")
                sender.titleColor = $color("#90EE90")
                load(3)
              }
            }
          }
        ],
        layout: function(make) {
          make.top.equalTo($("ImageGallery").bottom)
          make.left.right.inset(0)
          make.height.equalTo(44)
        }
      },
      {
        type: "list",
        props: {
          rowHeight: 80,
          template: [{
              type: "image",
              props: {
                id: "img",
                bgcolor: $color("white")
              },
              layout: function(make, view) {
                make.left.top.bottom.inset(10)
                make.width.equalTo(80)
              }
            },
            {
              type: "label",
              props: {
                id: "Name",
                font: $font("bold", 15),
                lines: 1
              },
              layout: function(make, view) {
                make.left.equalTo($("img").right).offset(10)
                make.top.inset(13)
              }
            },
            {
              type: "label",
              props: {
                id: "note",
                font: $font(13),
                textColor: $color("gray")
              },
              layout: function(make) {
                make.left.equalTo($("Name"))
                make.bottom.inset(10)
                make.top.inset(30)
                make.right.inset(10)
              }
            },
          ]
        },
        layout: function(make) {
          make.top.equalTo($("Rview").bottom)
          make.right.left.bottom.inset(0)
        },
        events: {
          didSelect: function(sender, indexPath, data) {
            openURL(data.url)
          }
        }
      }
    ]
  })
  load(0)
}

function load(num) {
  $http.post({
    url: "http://mp.weixin.qq.com/mp/homepage?__biz=MzI2NjY1MTMyMA==&hid=12&sn=616a6b5e5ca4ad89aac6abe69a2d79fd&scene=18&cid=" + num + "&begin=0&count=500&action=appmsg_list&f=json",
    handler: function(resp) {
      var arr = []
      var data = resp.data.appmsg_list
      for (i in data) {
        arr.push({
          Name: {
            text: data[i].title
          },
          img: {
            src: data[i].cover
          },
          note: {
            text: data[i].digest
          },
          url: data[i].link
        })
      }
      $("list").data = arr
    }
  })
}

function openURL(url, title) {
  $ui.push({
    props: {
      title: "艾橙科技"
    },
    views: [{
      type: "web",
      props: {
        url: url,
        toolbar: false
      },
      layout: $layout.fill
    }]
  })
}
               break
               case 10:
$app.openURL("http://www.312752.top/wz/CityLis.html")
               break
               case 11:
$app.openURL("http://ithunder-ota.a.88cdn.com/download-guide/step1.html?channel=share&from=OfficialSite_MobileThunder")
               break
              default:
               break
            }
          }
        }
      }]
    }
  },
{
    name: "✧ios屏蔽更新",
    page: {
      views: [{
        type: "list",
        props: {
          data: ["ios10用户","ios11用户"]
        },
        layout: $layout.fill,
        events: {
          didSelect: function(tableView, indexPath) {
            switch (indexPath.row) {
              case 0:  
$app.openURL("https://pan.baidu.com/s/19RFUitpGhlmf5fvordid4g")
              break
              case 1:
$app.openURL("https://dl.techxero.com/AppleDev/iOS11/tvos.mobileconfig")
               break
               default:
               break
            }
          }
        }
      }]
    }
  },
  {
    name: "关于☞",
    page: {
      views: [{
        type: "list",
        props: {
          data: ["联系我","简单说明","来口鸡汤 Are you ok?"]
        },
        layout: $layout.fill,
        events: {
          didSelect: function(tableView, indexPath) {
            switch (indexPath.row) {
              case 0:
$app.openURL("mqqwpa://im/chat?chat_type=wpa&uin=1046880355&version=1&src_type=web&web_src=oicqzone.com")
                break
                case 1:
  $ui.render({
  views: [{
    type: "scroll",
    layout: $layout.fill,
    views: [{
      type: "label",
      props: {
        text: "       ☞简单小介绍一下，初来乍到，望多多关照，如有功能失效，请联系我，第一时间为您修复😏",
        lines: 0
      },
      layout: function(make, view) {
        make.width.equalTo(view.super)
        make.top.inset(10)
        make.height.equalTo(50)
      }
    }]
  }]
})
               break
               case 2:
$ui.loading(true)
$http.get({
  url: "https://api.lwl12.com/hitokoto/v1?encode=realjson",
  handler(resp) {
    let dic = resp.data
    $ui.loading(false)
    $ui.alert({
      message: "" + dic.text
    })
  }
})
               break
               default:
               break
            }
          }
        }
      }]
    }
  },
]
data.forEach(function(item) {
  item.page.props = {
    title: item.name
  }
})
  $ui.render({
  props: {
    title: $l10n("生活小工具")
  },
  views: [{
    type: "list",
    props: {
      id: "main-list"
    },
    layout: $layout.fill,
    events: {
      didSelect: function(tableView, indexPath) {
        $ui.push(data[indexPath.row].page)
      }
    }
  }]
}),
$("main-list").data = data.map(function(item) {
  return item.name
})
function scriptVersionUpdate() {
  $http.get({
    url: "https://raw.githubusercontent.com/smallwhispers/jsbox_script/master/gongju/Update",
    handler: function(resp) {
      var afterVersion = resp.data.version;
      var msg = resp.data.msg;
      if (afterVersion > version) {
        $ui.alert({
          title: "检测到新的版本！V" + afterVersion,
          message: "是否更新?\n更新完成后请退出至扩展列表重新启动新版本。\n" + msg,
          actions: [{
            title: "更新",
            handler: function() {
              var url = "jsbox://install?url=https://raw.githubusercontent.com/smallwhispers/jsbox_script/master/gongju/gongju.js&name=gongju" + afterVersion + "&icon=icon_135.png";
              $app.openURL(encodeURI(url));
              $app.close()
            }
          }, {
            title: "取消"
          }]
        })
      }
    }
  })
}
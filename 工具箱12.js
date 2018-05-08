const
  Version = 0.3,
  UPDATE = "http://101.132.159.93/king"
var data = [{
  name: "星座",
    page: {
      views: [{
        type: "list",
        props: {
          data: ["天秤座","天蝎座"]
        },
        layout: $layout.fill,
        events: {
          didSelect: function(tableView, indexPath) {
            switch (indexPath.row) {
              case 0:
              $ui.loading(true)
$http.get({
  url: "https://www.sortime.com/api/v2/constellation/%E5%A4%A9%E7%A7%A4%E5%BA%A7/",
  handler(resp) {
    let dic = resp.data.result.result
    $ui.loading(false)
    $ui.alert({
      title: "当前日期:" + dic.today.date + "\n🎉 今日天秤 🎉",
      message: "速配星座:" + "❤" + dic.today.star + "\n幸运颜色:" + dic.today.color + "\n幸运数字:" + dic.today.number + "\n☞寄语: " + dic.today.presummary
    })
  }
})
              break
              case 1:
              $ui.loading(true)
$http.get({
  url: "https://www.sortime.com/api/v2/constellation/%E5%A4%A9%E8%9D%8E%E5%BA%A7/",
  handler(resp) {
    let dic = resp.data.result.result
    $ui.loading(false)
    $ui.alert({
      title: "当前日期:" + dic.today.date + "\n🎉 今日天蝎 🎉",
      message: "速配星座:" + "❤" + dic.today.star + "\n幸运颜色:" + dic.today.color + "\n幸运数字:" + dic.today.number + "\n☞寄语: " + dic.today.presummary
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
  name: "生活小查询",
    page: {
      views: [{
        type: "list",
        props: {
          data: ["归属地查询","ip查询","邮编查询","iphone序列号查询"]
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
      message: "" + dic.color + " " + dic.capacity + " " + dic.model + "\n型号: " + dic.number + " 网络: " + dic.network + "\n生产地: " + dic.production.start + " " + dic.production.origin + "\n该产品采购日: " + dic.purchase.date
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
    name: "计算器",
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
  }
]
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
function updataVersion() {

  function datainfo(data) {
    var info = ''
    if (data) {
      for (const key in data) {
        info = info + "- " + data[key] + "\n"
      }
    }
    return info
  }
  $http.get({
    url: UPDATE,
    handler: function (resp) {
      var data = resp.data
      info = datainfo(data.updatainfo)
      if (data.version > Version) {
        $ui.alert({
          title: "检测到新的版本！V" + data.version,
          message: "是否更新?\n更新完成后自行启动新版本\n\n" + info + "\n" + data.tips,
          actions: [{
            title: "更新",
            handler: function () {
              var url = 'jsbox://install?url=' + UPDATE
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
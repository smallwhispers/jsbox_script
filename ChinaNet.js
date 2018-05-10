$ui.loading(true)
$http.get({
  url: "https://wtxcx.5ibp.net/xcxService/api/ratable/packageInfonew.do?session3rd=",
  handler(resp) {
    let dic = resp.data.object
    $http.get({
  url: "https://wtxcx.5ibp.net/xcxService/api/bill/balance.do?session3rd=",
  handler(resp) {
    let dic1 = resp.data.object
        $ui.loading(false)
        $ui.alert({
          title: "— 中国电信流量查询结果 —",
          message: "本月数据余量: " + dic.transfer + "\n本月已用数据量: " + dic.used + "\n本月剩余话费: " + dic1.leftBalance + "元" + "\n本月已用话费: " + dic1.acctBalance + "元" + "\n截至 : "+dic.date
         })
        $app.close()
        }
     })
   }
})
$ui.loading(true)
$http.get({
  url: "抓包链接",
  handler(resp) {
    let dic = resp.data
    let dataList = resp.data.dataList
    arr = new Array()
    $ui.loading(false)
    for (i in dataList) {
      let item = dataList[i]
      arr.push(`${item.remainTitle}: ${item.number}${item.unit}`)
    }
    $ui.alert({
    title: "•••联通话费查询•••",
    message: arr.join("\n") + "\n" + dic.flush_date_time
    })
   }
})
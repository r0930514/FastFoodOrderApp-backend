/**
 * 
 * @param {Object} arr 傳入物件
 * @param {String} key 要分類的key 
 * @returns 回傳分類後的物件
 */
function classify(arr, key) {
    // 如果沒輸入目標prop就回傳空物件
    if(!key) return {}
  
    return arr.reduce((acc, cur) => {
      // 目標key的值就是當前物件裡的key prop
      const keyValue = cur[key]
      
      // 如果他沒有這個key就做一個空陣列給他
      if(!acc[keyValue]) {
        acc[keyValue] = []
      }
      // 檢查完之後就把當前值推到累加器
      acc[keyValue].push(cur)
      return acc
    }, {})
}

export default classify;
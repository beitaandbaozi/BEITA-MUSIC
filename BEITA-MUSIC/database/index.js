export const database = wx.cloud.database()
class BEITADATABASE {
  constructor(collectionName) {
    this.collection = database.collection(collectionName)
  }
  // 增
  add(data) {
    return this.collection.add({
      data
    })
  }
  // 删
  remove(condition, isDoc = true) {
    if (isDoc) {
      return this.collection.doc(condition).remove()
    } else {
      return this.collection.where(condition).remove()
    }
  }
  // 改
  update(condition, data, isDoc = true) {
    if (isDoc) {
      return this.collection.doc(condition).update({
        data
      })
    } else {
      return this.collection.where(condition).update({
        data
      })
    }
  }
  // 查
  query(offset = 0, size = 20, condition = {}, isDoc = false) {
    if (isDoc) {
      return this.collection.doc(condition).get()
    } else {
      return this.collection.where(condition).skip(offset).limit(size).get()
    }
  }
}


export const favorCollection = new BEITADATABASE('c_favor')
export const likeCollection = new BEITADATABASE('c_like')
export const historyCollection = new BEITADATABASE('c_history')
export const menuCollection = new BEITADATABASE('c_menu')
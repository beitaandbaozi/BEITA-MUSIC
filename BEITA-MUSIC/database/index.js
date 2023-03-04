const database = wx.cloud.database()
class BEITADATABASE {
  constructor(collectionName) {
    this.collection = database.collection(collectionName)
  }
}
// 增
BEITADATABASE.prototype.add = function (data) {
  return this.collection.add({
    data
  })
}
// 删
BEITADATABASE.prototype.remove = function (condition, isDoc = true) {
  if (isDoc) {
    return this.collection.doc(condition).remove()
  } else {
    return this.collection.where(condition).remove()
  }
}
// 改
BEITADATABASE.prototype.update = function (condition, isDoc = true) {
  if (isDoc) {
    return this.collection.doc(condition).update()
  } else {
    return this.collection.where(condition).update()
  }
}
// 查
BEITADATABASE.prototype.query = function (offset = 0, size = 20, condition = {}, isDoc = false) {
  if (isDoc) {
    return this.collection.doc(condition).get()
  } else {
    return this.collection.where(condition).skip(offset).limit(size).get()
  }
}

export const favorCollection = new BEITADATABASE('c_favor')
export const likeCollection = new BEITADATABASE('c_like')
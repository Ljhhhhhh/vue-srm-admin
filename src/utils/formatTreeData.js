/**
 * @description: 树结构化原始数组
 * @param originData： 原始数组
 * @param parentKey 父键
 * @return: 树结构数组
 */
export default (originData, parentKey = 'parentId', rootKey = 0) => {
  const arr = []
  function toTree(id, array, list) {
    const newArr = list.filter(item => +item[parentKey] === +id)
    newArr.forEach(item => {
      const arr = []
      item.children = toTree(item.id, arr, list)
      if (!item.children.length) {
        delete item.children
      }
      array.push(item)
    })
    return array
  }
  toTree(rootKey, arr, originData)
  return arr
}

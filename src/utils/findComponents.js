// 寻找某个符合条件的父组件
export function findComponentUpwardByProp(vm, prop) {
  let res = null
  let parent = vm.$parent
  while (parent) {
    if (parent[prop] !== undefined) {
      res = parent
      break
    }
    parent = parent.$parent
  }
  return res
}

export function findComponentDownward(context, componentName) {
  const childrens = context.$children
  let children = null

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name

      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) break
      }
    }
  }
  return children
}

export function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChilds = findComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}

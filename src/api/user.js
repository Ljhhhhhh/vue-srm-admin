import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/v1/sysUser/get/userInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function fetchRouter() {
  return request({
    url: '/v1/resource/all/list',
    method: 'get'
  })
}

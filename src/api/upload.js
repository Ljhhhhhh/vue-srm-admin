import request from '@/utils/request'
export const uploadAction = process.env.VUE_APP_BASE_API + '/upload'
export function upload() {
  return request({
    url: '/upload',
    method: 'post'
  })
}

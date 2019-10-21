import request from '@/utils/request'

/*
  {
  "endTime": "string",
  "isOpen": 0,
  "mobile": "string",
  "pageNo": "string",
  "pageSize": "string",
  "roleId": 0,
  "startTime": "string",
  "username": "string"
}
*/
export function fetchList(data) {
  const { pageNo = 1, pageSize = 10, ...rest } = data
  return request({
    url: '/v1/sysUser/list',
    method: 'post',
    data: {
      pageNo,
      pageSize,
      ...rest
    }
  })
}

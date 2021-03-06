import http from '../http'

/**
 * 导入所有api文件
 */
function importApi () {
  let apis = {}
  const apiFiles = require.context('./src/', false, /\.js$/)

  apiFiles.keys().forEach(key => {
    let matches = /^\.\/([\w_-]+)\.js$/.exec(key)
    if (matches && matches[1]) {
      apis[matches[1]] = createApi(apiFiles(key).default)
    }
  })

  return apis
}

/**
 * 生成API调用方法
 * @param apiList
 */
function createApi (apiList) {
  let apis = {}

  for (let key of Object.keys(apiList)) {
    apis[key] = (params, config) => {
      let conf = Object.assign({}, apiList[key], config)
      return http.ajax(conf)
    }
  }
  return apis
}

export default importApi()

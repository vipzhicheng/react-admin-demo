import {
  fetchUtils,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_CHECK
} from 'react-admin'

const apiUrl = '/api'

const options = {
  headers: new Headers({
    Accept: 'application/json'
  })
}

export default {
  login: (params) => {
    const { username, password } = params
    let url = `${apiUrl}/user/login`
    options.method = 'POST'
    options.body = JSON.stringify({ username, password })
    return fetchUtils.fetchJson(url, options)
  },
  logout: () => {
    let url = `${apiUrl}/user/logout`
    // return Promise.resolve('/')
    return fetchUtils.fetchJson(url, options)
    .then(res => {
      return Promise.resolve(res.body);
    })
  },
  checkAuth: () => {
    let url = `${apiUrl}/user/check`
    return fetchUtils.fetchJson(url, options)
  },

  checkError: (params) => {
    console.log('params', params.status)
    const { status } = params
    if (status === 401 || status === 403) {
      return Promise.reject({
        redirectTo: '/login',
        message: 'haha'
      })
    }

  },

  getPermissions: () => Promise.resolve()
}

// export default (type, params) => {
//   let url = ''
//   const options = {
//     headers: new Headers({
//       Accept: 'application/json'
//     })
//   }

//   // called when the user attempts to log in
//   if (type === AUTH_LOGIN) {
//     const { username, password } = params
//     url = `${apiUrl}/user/login`
//     options.method = 'POST'
//     options.body = JSON.stringify({ username, password })
//     return fetchUtils.fetchJson(url, options)
//   }
//   // called when the user clicks on the logout button
//   if (type === AUTH_LOGOUT) {
//     url = `${apiUrl}/user/logout`
//     return fetchUtils.fetchJson(url, options)
//   }
//   // called when the API returns an error
//   if (type === AUTH_ERROR) {
//     const { status } = params
//     if (status === 401 || status === 403) {
//       return Promise.reject()
//     }
//     return Promise.resolve()
//   }
//   // called when the user navigates to a new location
//   if (type === AUTH_CHECK) {
//     url = `${apiUrl}/user/check`
//     return fetchUtils.fetchJson(url, options)
//   }
//   return Promise.reject('Unknown method')
// }

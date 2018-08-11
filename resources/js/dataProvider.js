import { stringify } from 'query-string'
import {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
  GET_MANY,
  GET_MANY_REFERENCE
} from 'react-admin'

const apiUrl = '/api'

/**
 * Maps react-admin queries to my REST API
 *
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a data response
 */
export default (type, resource, params) => {
  let url = ''
  let query = ''
  const options = {
    headers: new Headers({
      Accept: 'application/json'
    })
  }
  switch (type) {
    case GET_LIST: {
      const { page, perPage } = params.pagination
      const { field, order } = params.sort
      query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, perPage]),
        filter: JSON.stringify(params.filter)
      }
      url = `${apiUrl}/${resource}?${stringify(query)}`
      break
    }
    case GET_ONE:
      url = `${apiUrl}/${resource}/${params.id}`
      break
    case CREATE:
      url = `${apiUrl}/${resource}`
      options.method = 'POST'
      options.body = JSON.stringify(params.data)
      break
    case UPDATE:
      url = `${apiUrl}/${resource}/${params.id}`
      options.method = 'PUT'
      options.body = JSON.stringify(params.data)
      break
    case UPDATE_MANY:
      query = {
        filter: JSON.stringify({ id: params.ids })
      }
      url = `${apiUrl}/${resource}?${stringify(query)}`
      options.method = 'PATCH'
      options.body = JSON.stringify(params.data)
      break
    case DELETE:
      url = `${apiUrl}/${resource}/${params.id}`
      options.method = 'DELETE'
      break
    case DELETE_MANY:
      query = {
        filter: JSON.stringify({ id: params.ids })
      }
      url = `${apiUrl}/${resource}?${stringify(query)}`
      options.method = 'DELETE'
      break
    case GET_MANY: {
      query = {
        filter: JSON.stringify({ id: params.ids })
      }
      url = `${apiUrl}/${resource}?${stringify(query)}`
      break
    }
    case GET_MANY_REFERENCE: {
      const { page, perPage } = params.pagination
      const { field, order } = params.sort
      query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify({
          ...params.filter,
          [params.target]: params.id
        })
      }
      url = `${apiUrl}/${resource}?${stringify(query)}`
      break
    }
    default:
      throw new Error(`Unsupported Data Provider request type ${type}`)
  }

  return fetch(url, options)
    .then(res => res.json())
    .then(response => {
      /* Convert HTTP Response to Data Provider Response */
      /* Covered in the next section */

      switch (type) {
        case GET_LIST:
        case GET_MANY_REFERENCE:
          return response
        case CREATE:
          return { data: { ...params.data, id: response.id } }
        default:
          return { data: json }
      }
    })
}

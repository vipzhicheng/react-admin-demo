import React from 'react'
import { Admin, Resource } from 'react-admin'

// import jsonServerProvider from 'ra-data-json-server'
// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com')

import dataProvider from './Providers/DataProvider'
import authProvider from './Providers/AuthProvider'
import { PostList } from './Components/Posts'
import PageList from './Components/Pages'

import { watchFetchOptions } from './Sagas/Options'
import { apiOptionsReducer } from './Reducers/Options'
const App = () => (
  <Admin
    customSagas={[watchFetchOptions]}
    customReducers={{ apiOptions: apiOptionsReducer }}
    authProvider={authProvider}
    dataProvider={dataProvider}
    title="活动管理系统"
  >
    <Resource name="pages" list={PageList} options={{ label: '页面' }} />
    <Resource name="posts" options={{ label: '文章' }} />
  </Admin>
)

export default App

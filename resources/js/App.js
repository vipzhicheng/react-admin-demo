import React from 'react'
import { Admin, Resource } from 'react-admin'

// import jsonServerProvider from 'ra-data-json-server'
import dataProvider from './dataProvider'
import { PostList } from './posts'

// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com')
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="posts" list={PostList} />
  </Admin>
)

export default App

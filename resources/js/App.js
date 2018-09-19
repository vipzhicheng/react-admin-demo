import React from 'react'
import { Admin, Resource } from 'react-admin'

import { createMuiTheme } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/indigo'
const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: grey
  }
})

// import jsonServerProvider from 'ra-data-json-server'
// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com')

import dataProvider from './Providers/DataProvider'
import authProvider from './Providers/AuthProvider'
import { PageList, PageCreate, PageEdit, PageIcon } from './Components/Page'
import { UserList, UserCreate, UserEdit } from './Components/User'
import { MediaList, MediaCreate } from './Components/Media'

import { watchFetchOptions } from './Sagas/Options'
import { apiOptionsReducer } from './Reducers/Options'

import { default as UserIcon } from '@material-ui/icons/SupervisorAccount'
import { default as MediaIcon } from '@material-ui/icons/Image'
import { default as ConfigIcon } from '@material-ui/icons/Settings'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      apiOptions: {}
    }
  }

  async componentWillMount() {
    this.setState({ loading: true })
    const apiOptions = await dataProvider('GET_OPTIONS', 'options')
    this.setState({ loading: false, apiOptions: apiOptions.data })
  }

  render() {
    if (this.state.loading) return <div />
    return (
      <Admin
        theme={theme}
        customSagas={[watchFetchOptions]}
        customReducers={{ apiOptions: apiOptionsReducer }}
        authProvider={authProvider}
        dataProvider={dataProvider}
        title="活动管理系统"
        initialState={{ apiOptions: this.state.apiOptions }}
      >
        <Resource
          name="pages"
          list={PageList}
          options={{ label: '页面管理' }}
          create={PageCreate}
          edit={PageEdit}
          icon={PageIcon}
        />
        <Resource name="media" list={MediaList} create={MediaCreate} options={{ label: '素材管理' }} icon={MediaIcon} />
        <Resource
          name="users"
          list={UserList}
          options={{ label: '用户管理' }}
          create={UserCreate}
          edit={UserEdit}
          icon={UserIcon}
        />
        <Resource
          name="configs"
          list={PageList}
          options={{ label: '系统设置' }}
          create={PageCreate}
          edit={PageEdit}
          icon={ConfigIcon}
        />
        <Resource name="posts" options={{ label: '文章' }} />
      </Admin>
    )
  }
}

export default App

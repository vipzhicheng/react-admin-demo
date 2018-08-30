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

import { watchFetchOptions } from './Sagas/Options'
import { apiOptionsReducer } from './Reducers/Options'

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
          icon={PageIcon}
          create={PageCreate}
          edit={PageEdit}
        />
        <Resource name="posts" options={{ label: '文章' }} />
      </Admin>
    )
  }
}

export default App

import React from 'react'
import compose from 'recompose/compose'
import MuiGridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import { withStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import IconButton from '@material-ui/core/IconButton'
import ContentCreate from '@material-ui/icons/Create'
import { Link } from 'react-router-dom'
import { NumberField } from 'react-admin'
import { linkToRecord } from 'ra-core'
import Viewer from 'react-viewer'
// import 'react-viewer/dist/index.css'

const styles = {
  root: {
    // marginTop: '10px'
  },
  gridList: {
    width: '100%',
    margin: 0
  },
  tileBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)'
  },
  price: {
    display: 'inline',
    fontSize: '1em'
  },
  link: {
    color: '#fff'
  }
}

const getColsForWidth = width => {
  if (width === 'xs') return 2
  if (width === 'sm') return 3
  if (width === 'md') return 4
  if (width === 'lg') return 5
  return 6
}

class GridList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      activeIndex: 0,
      mode: 'modal'
    }
  }

  render() {
    const { classes, ids, data, basePath, width } = this.props
    const images = ids.map(id => {
      return {
        src: `/uploads/pages/${data[id].reference_id}/${data[id].file_name}`,
        alt: `${data[id].file_name}`,
        downloadUrl: `/uploads/pages/${data[id].reference_id}/${data[id].file_name}`
      }
    })
    return (
      <div className={classes.root}>
        <MuiGridList cellHeight={180} cols={getColsForWidth(width)} className={classes.gridList}>
          {ids.map((id, index) => (
            <GridListTile key={id}>
              <img
                src={`/uploads/pages/${data[id].reference_id}/${data[id].file_name}`}
                alt={`${data[id].file_name}`}
                onClick={() => {
                  this.setState({
                    visible: true,
                    activeIndex: index
                  })
                }}
              />
              <GridListTileBar
                className={classes.tileBar}
                title={data[id].file_name}
                actionIcon={
                  <IconButton to={linkToRecord(basePath, data[id].id)} className={classes.link} component={Link}>
                    <ContentCreate />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </MuiGridList>

        <Viewer
          visible={this.state.visible}
          onClose={() => {
            this.setState({ visible: false })
          }}
          images={images}
          activeIndex={this.state.activeIndex}
          container={null}
          downloadable
        />
      </div>
    )
  }
}

const enhance = compose(
  withWidth(),
  withStyles(styles)
)

export default enhance(GridList)

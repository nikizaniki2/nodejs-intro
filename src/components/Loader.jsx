import '../App.css';
import React from 'react'
import {Button} from '../App'

// Currently not in use (here if we decide to implement infinite loading)

function Loader (props) {
    return (
      <div className={'loader'}>
          <Button title="Load More" onClick={props.loadMore}/>
      </div>
  )
}
  export default Loader;
import '../App.css';
import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '../components/Button';
// Currently not in use (here if we decide to implement infinite loading)

function Loader (props) {
  return (
    <div className={'loader'}>
      <Button title='Load More' onClick={props.loadMore}/>
    </div>
  );
}

Loader.propTypes = {
  loadMore: PropTypes.func
};

export default Loader;
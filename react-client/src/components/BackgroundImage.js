import React from 'react'

import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

import blue from "../pics/blue.jpeg";
import yellow from "../pics/yellow.jpeg";
import ferrari from "../pics/Ferrari_F8.jpeg";
import SearchBar from './SearchBar'

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${ferrari})`,
    position: 'relative',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    height: '600px',
    paddingTop: '50px',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    margin: 0,
  },
}));

function BackgroundImage() {
  const classes = useStyles()

  return (
    <Box>
      <div className={classes.overlay}>
        <Box className={classes.background}>
        </Box>
      </div>
    </Box>
  )
}

export default BackgroundImage;

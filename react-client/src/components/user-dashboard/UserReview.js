import { useState, useContext } from 'react';
import axios from 'axios';
import { authContext } from '../../providers/authProvider';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import RateReviewIcon from '@material-ui/icons/RateReview';

const labels = {
  1: 'Very Poor',
  2: 'Poor',
  3: 'Average',
  4: 'Good',
  5: 'Excellent',
};

const useStyles = makeStyles({
  root: {
    width: 500,
    display: 'flex',
    alignItems: 'center',
  },
  Review: {
    color: '#9ccc65',
    fontSize: 30,
  }
});

export default function UserReview({ carId, handleReviewUpdated }) {
  const classes = useStyles();
  const { user } = useContext(authContext);

  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState('');

  // For star rating
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  const handleSubmit = async (event) =>{
    event.preventDefault();
    if (value < 0 || value > 5) {
      return;
    }

    const formData = {
      reviewerId: user.id,
      rating: value,
      carId,
      comments,
    };

    try {
      const response = await axios.post('/api/reviews', formData);
      handleReviewUpdated(response.data);
      setOpen(false);
    } catch (err) {
      console.error('Error saving review', err);
    }
  };

  return (
    <div>
      <RateReviewIcon className={classes.Review} onClick={() => setOpen(true)} style={{cursor: 'pointer'}}/>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="review-rating">
        <form id="user-review-form" onSubmit={handleSubmit}>
          <DialogTitle id="review-rating">Review Vehicle - </DialogTitle>
          <DialogContent>

            <div className={classes.root}>
              <Rating
                name="hover-feedback"
                value={value}
                precision={1}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />
              {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
            </div>

            <TextField
              autoFocus
              margin="dense"
              id="comments"
              label="Comments"
              type="text"
              value={comments}
              onChange={event => setComments(event.target.value)}
              fullWidth
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button type="submit" form="user-review-form" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>

      </Dialog>
    </div>
  );
}

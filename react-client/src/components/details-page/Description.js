import { Container, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Sports from '@material-ui/icons/Sports';

import "./Description.scss";

// Contains image, description, and features of the selected car
const Description = props => {
  return (
    <Container maxWidth="md">
      <img
        src="https://images.unsplash.com/photo-1619405399517-d7fce0f13302?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvcnZldHRlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        alt="C7 Corvette"
        className="Details__vehicle-image"
      />
      <div className="Details__content Details__content--description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem blanditiis nihil provident esse deleniti eum at optio. Aut qui adipisci necessitatibus commodi at magnam, earum impedit eaque tenetur, expedita dignissimos!
      </div>
      <div className="Details__content">
        <List className="Details__features">
          <ListItem className="Details__features--item">
            <ListItemIcon>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="Manual Transmission" />
          </ListItem>
          <ListItem className="Details__features--item">
            <ListItemIcon>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="2 Doors" />
          </ListItem>
          <ListItem className="Details__features--item">
            <ListItemIcon>
              <Sports />
            </ListItemIcon>
            <ListItemText primary="755 Horsepower" />
          </ListItem>
        </List>
      </div>
    </Container>
  );
};

export default Description;

import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Image, Icon, Modal } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
      <Menu style={menuStyle} attached="top" inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h4'><Image size='small' circular src="/images/logo-image.jpg"/>Healthy Manoa</Header>
        </Menu.Item>
        <Modal trigger={<Menu.Item><Header inverted as='h4'><Icon name='id card'/>About Us</Header></Menu.Item>}>
            <Modal.Header>About Healthy Manoa</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='medium' src='/images/logo-image.jpg' />
              <Modal.Description>
                <Header as='h1'>Healthy Manoa is an organization dedicated to providing ways for students to eat healthy.</Header>
                <Header as='h3'>The Healthy Manoa app allows students to learn and share recipes for healthy eating.
                  Students can also interact with vendors to find information on food and cooking items.</Header>
                <Header as='h3'>
                  For additional information, please visit our web page at:  <a href="https://healthy-manoa.github.io/">https://healthy-manoa.github.io/</a>
                </Header>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        <Menu.Item as={NavLink} activeClassName="" exact to="/vendor">
          <Header inverted as='h4'><Icon name='shop'/>Vendor Page</Header>
        </Menu.Item>
        {this.props.currentUser ? (
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Stuff</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list'>List Stuff</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/individual" key='individual'> <Header inverted as='h4'><Icon name='book'/>Your Recipe Book</Header></Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown text="Login" pointing="top right" icon={'user outline'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);

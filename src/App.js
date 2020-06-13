import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Bootstrap
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

// Components
import Menu from './components/Menu';
import SiteProperties from './components/Common/SiteProperties';
import { PropertyRoutes } from './Routes/Properties';
import { ItemRoutes } from './Routes/Item';
import Items from './components/Items';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import { connect } from 'react-redux';
import { MENU_2 } from './util/constants/common';
import { AboutRoutes } from './Routes/About';
import { PostRoutes } from './Routes/Posts';
import { UserRoutes } from './Routes/User';
import { bindActionCreators } from 'redux';
import { setAuthKey } from './actions/User';
import { isUserSignedIn } from './util/ajax/User';
import { showSetupWizard } from './util/ajax/Common';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fluid: false,
      show_setup_wizard: null,
    };
  }

  componentDidMount() {
    const auth_key = localStorage.getItem('auth_key')
    const show_setup_wizard = localStorage.getItem('show_setup_wizard')

    if (show_setup_wizard === null && this.state.show_setup_wizard === null) {
      showSetupWizard((res) => {
        localStorage.setItem('show_setup_wizard', res.data.show_setup_wizard);
        this.setShowSetup(res.data.show_setup_wizard === 'true')
      });
    } else if (show_setup_wizard === 'true') {
      this.setShowSetup(true);
    } else if (auth_key) {
      isUserSignedIn(auth_key, (res) => {
        this.props.setAuthKey(localStorage.getItem('auth_key'));
      }, (err) => {
        console.log(err);
        localStorage.clear();
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.properties && (
        prevProps.properties === undefined ||
        prevProps.properties !== this.props.properties
      )
    ) {
      this.setPage2(this.props.properties)
    }
  }

  setPage2 = (props) => {
    const page2 = props.filter(prop => prop.name === MENU_2)[0].value;
    this.setState({ page2 });
  }

  setFluid = (fluid = false) => {
    this.setState({ fluid })
  }

  setShowSetup = (show_setup_wizard) => {
    this.setState({ show_setup_wizard });
  }

  render() {
    const { fluid, show_setup_wizard } = this.state;

    return (
      <Router>
        <SiteProperties />
        <Container fluid={fluid}>
          {!fluid &&
            <React.Fragment>
              <br />
              <br />
            </React.Fragment>
          }
          <Menu />
          <br />
          {show_setup_wizard === true &&
            <Alert variant="success">
              <Link to="/user/sign_up">
                Start setting up the user for the first use!
              </Link>
            </Alert>
          }

          <Switch>
            <Route exact path="/" component={Gallery} />
            <Route path="/items" component={Items} />
            <Route path="/item" component={ItemRoutes} />
            <Route path="/properties" component={PropertyRoutes} />
            <Route path="/about" component={AboutRoutes} />
            <Route path="/contact" component={Contact} />
            <Route path="/posts" component={PostRoutes} />
            <Route path="/user" component={UserRoutes} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

const mapStatesToProps = (state) => ({
  properties: state.common.properties,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ setAuthKey }, dispatch);

export default connect(mapStatesToProps, mapDispatchToProps)(App);
import React, {Component} from "react";
import { getCurrentUser } from "../services/authService";

import Navbar from "./navbar";

class Layout extends Component {
	state = {};

	componentDidMount(){
	  const user = getCurrentUser();
	  this.setState({ user });
	}

	render(){
		return (
		    <>
		      <Navbar user={this.state.user}/>
		      <main className="container mt-4">
		        {this.props.children}
		      </main>
		    </>
  		);
	}
}

export default Layout;
import { Component } from "react";

import { logout as logoutUser } from "../services/authService";

class logout extends Component {
	componentDidMount(){
		logoutUser();
		window.location = '/';
	}

	render(){
		return null;
	}
}

export default logout;

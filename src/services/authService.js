import jwtDecode from "jwt-decode";
import http from './httpService';
import { apiUrl } from "../config.json";

http.setJWTHeader(getJWT());

export async function login(user){
	const {data:jwt} = await http.post(apiUrl + "/auth", {
		email: user.username,
		password: user.password,
	});
	localStorage.setItem('token', jwt);
}

export function loginWithJWT(jwt){
	localStorage.setItem('token', jwt);
}

export function logout(){
	localStorage.removeItem('token');
}

export function getCurrentUser(){
	try{
		const jwt = localStorage.getItem('token');
		return jwtDecode(jwt);
	} catch(ex) {
		return null;
	}
}

export function getJWT(){
	return localStorage.getItem('token');
}
import {auth, provider} from "../firebase";
import { signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";

export default function SignIn() {

	const [value, setValue] = useState('');
	const handleClick = () => {
		signInWithPopup(auth, provider).then((data)=>{
			setValue(data.user.email);
			localStorage.setItem("email", data.user.email);
		});
	}

	useEffect(()=> {
		setValue(localStorage.getItem('email'));
	});

	return (
	<div>
		<button onClick={handleClick}> Sign in with Google</button>
	</div>
	);
}
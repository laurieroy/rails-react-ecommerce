import React, { Component } from "react";
import axios from "axios";

import Button from "../components/shared/Button";
import SignupForm from "../components/shared/Form";
import Input from "../components/shared/Input";

class Signup extends Component {
	state = {
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		errors: {},
	}

	handleBlur = (e) => {}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { firstname, lastname, email, password } = this.state

		const newUser = {
			user: {
				first_name: firstname,
				last_name: lastname,
				email,
				password
			}
		}

		this.handleSignup(newUser)
	}



	handleSignup = (user) => {
		axios.post('/api/v1/users.json', user)
		.then(resp => {
			console.log(resp.data)
		})
		.catch(error => console.log(error))
	}

  render() {
    return (
      <div className="container mt-4">
        <div className="row">
					<div className="col-md-8 offset-md-2">
						<h1 className="text-center form-header-style mt-5 pt-2 pb-3">
							Sign up
						</h1>
						<SignupForm  onSubmit={this.handleSubmit}>
							<Input 
								title="First Name" 
								type="text"
								name="firstname" 
								value={this.state.firstname}
								onChange={this.handleChange}
								onBlue={this.hanleBlur}
								placeholder="Your first name, e.g., Jane"
								autoFocus={true}
								state="this.state"
							/>
							<Input 
								title="Last Name" 
								type="text"
								name="lastname" 
								value={this.state.lastname}
								onChange={this.handleChange}
								onBlue={this.hanleBlur}
								placeholder="Your last name, e.g., Doe"
								autoFocus={false}
								state="this.state"
							/>
							<Input 
								title="Last Name" 
								type="text"
								name="lastname" 
								value={this.state.lastname}
								onChange={this.handleChange}
								onBlue={this.hanleBlur}
								placeholder="Your last name, e.g., Doe"
								autoFocus={false}
								state="this.state"
							/>
							<Input 
								title="Email" 
								type="email"
								name="email" 
								value={this.state.email}
								onChange={this.handleChange}
								onBlue={this.hanleBlur}
								placeholder="jane_doe@example.com"
								autoFocus={false}
								state="this.state"
							/>
							<Input 
								title="Password" 
								type="password"
								name="password" 
								value={this.state.password}
								onChange={this.handleChange}
								onBlue={this.hanleBlur}
								placeholder="password"
								autoFocus={false}
								state="this.state"
							/>
							<Button>Sign up</Button>
						</SignupForm>
					</div>
        </div>
      </div>
    );
  }
}

export default Signup;

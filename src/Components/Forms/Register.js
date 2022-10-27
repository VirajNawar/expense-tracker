import React, { Component } from 'react'
import fire from '../../Config/FireBase'


export default class Register extends Component {
    state = {
        email: '',
        password: '' ,
        displayName: '',
        fireErrors: ''
      }

      handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value 
        })
      }

      register = e => {
        e.preventDefault()
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((user)=>{
            var currentUser = fire.auth().currentUser;
            currentUser.updateProfile({
                displayName: this.state.displayName
            })
        }).catch((error) =>{
            this.setState({
                fireErrors: error.message
            })
        })
      }
     
           render() {

            let errorNotify = this.state.fireErrors ? 
            (
                <div className='Error'>
                    {this.state.fireErrors} 
                </div>
            ) : null
        return (
            <div>
              {errorNotify}
            <form>
                <input type="text"
                        className='regField'
                        placeholder='Full Name'
                        onChange={this.handleChange}
                        value={this.state.displayName}
                        name='displayName'
                />
                <input type="text"
                        className='regField'
                        placeholder='Email'
                        onChange={this.handleChange}
                        value={this.state.email}
                        name='email'
                />
                <input type="password"
                        className='regField'
                        placeholder='Password'
                        onChange={this.handleChange}
                        value={this.state.password}
                        name='password'
                />
                <input type='submit' 
                className='submitBtn'
                value = "REGISTER" 
                onClick={this.register}
                />
            </form>
          </div>
        )
      }
    }
    

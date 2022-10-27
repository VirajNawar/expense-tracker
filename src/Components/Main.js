import React, { Component } from 'react'
import './Main.css'
import fire from '../Config/FireBase'
import Login from './Forms/Login'
import Register from './Forms/Register'
import Tracker from './Tracker/Tracker'


export default class Main extends Component {
    
    state = {
        user: 1,
        loading: true,
        formSwticher: false
    }

    componentDidMount(){
        this.authListener()
    }

    authListener(){
        fire.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({user})
            }
            else{
                this.setState({user:null})
            }
        })
    }
    
    formSwticher = (action) => {
        console.log(action);
        this.setState({
            formSwticher: action === 'register' ? true : false
        })
    }
    render() {

        const form = !this.state.formSwticher ? <Login /> : <Register />

        if(this.state.user === 1){
            return (
                <div className="loading-wrapper d-flex align-items-center justify-content-center">
  <div className="loading-bar"></div>
</div>
            )
        }

    return (
      <div>
        <div className='heading'>

        <h2 className='title'>Welcome To Track It !</h2>
        <p className='description'>Track your daily expense with ease</p>
        </div>
       { !this.state.user ? 
        (<div className='mainBlock'>
                {form}
            
            { !this.state.formSwticher ?

            ( <span className='underline'>
                    Not Registered? <button 
                    className='linkBtn'
                    onClick={() => this.formSwticher(!this.state.formSwticher ? 'register' : 'login')}
                    >
                        Create an Account
                        </button>
                </span>) : ( <span className='underline'>
                    Already a user? <button 
                    className='linkBtn'
                    onClick={() => this.formSwticher(!this.state.formSwticher ? 'register' : 'login')}
                    >
                        Sign In Here
                        </button>
                </span>
                )
                }
            </div>) : (<Tracker />)
        }
      </div>
    )
  }
}

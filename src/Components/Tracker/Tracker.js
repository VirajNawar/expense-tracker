import React, { Component } from 'react'
import fire  from '../../Config/FireBase'
import './Tracker.css'
import AllTransaction from './AllTransaction'

export default class Tracker extends Component {

  state= {
    transactions: [],
    money: 0,

    transactionName:'',
    transactionType:'',
    price:'',
    currentUID: fire.auth().currentUser.uid
  }
    // Logout 
    logout = ()=> {
        fire.auth().signOut()
    }

    handleChange = input => e => {
      this.setState({
        [input]: e.target.value !== "0" ? e.target.value : ""
      })
    }

    // add transactions
    addNewTransaction = () => {
      const {transactionName, transactionType, price, currentUID, money} = this.state;

      // validation
      if(transactionName && transactionType && price){

          const BackUpState = this.state.transactions;
          BackUpState.push({
              id: BackUpState.length + 1,
              name: transactionName,
              type: transactionType,
              price: price,
              user_id: currentUID
          });
          
          fire.database().ref('Transactions/' + currentUID).push({
              id: BackUpState.length,
              name: transactionName,
              type: transactionType,
              price: price,
              user_id: currentUID
          }).then((data) => {
              //success callback
              console.log('success callback');
              this.setState({
                  transactions: BackUpState,
                  money: transactionType === 'deposit' ? money + parseFloat(price) : money - parseFloat(price),
                  transactionName: '',
                  transactionType: '',
                  price: ''
              })
          }).catch((error)=>{
              //error callback
              console.log('error ' , error)
          });

      }
  }

  componentWillMount()
    {
      const { currentUID, money} = this.state;
      let totalMoney = money;
      const BackUpState = this.state.transactions;
      fire.database().ref('Transactions/' + currentUID).once('value',(snapshot) =>{
        // console.log(snapshot)
        snapshot.forEach((childSnapShot) => {

          totalMoney = childSnapShot.val().type === 'deposit' ?
          parseFloat(childSnapShot.val().price) + totalMoney :
          totalMoney - parseFloat(childSnapShot.val().price);

          BackUpState.push({
            id: childSnapShot.val().id,
                    name: childSnapShot.val().name,
                    type: childSnapShot.val().type,
                    price: childSnapShot.val().price,
                    user_id: childSnapShot.val().user_id
          })

        });
        this.setState({
          transactions: BackUpState,
          money: totalMoney
      });
  });
      
    }
  

  render() {
    
    // current user name display
    var currentUser = fire.auth().currentUser;

    return (
      <div className='trackerBlock'>
        <h2>Track It</h2>
        <div className='welcome'>
          <span>Hi, {currentUser.displayName} !</span>
          <button className='exit' onClick={this.logout}>Sign Out</button>
        </div>
        <div className='totalMoney'>
        ₹ {this.state.money}
        </div>
        <div className='newTransactionBlock'>
          <div className='newTransaction'>
            <form>
              <input
                placeholder='Transaction Name'
                type='text'
                name='transactionName'
                value={this.state.transactionName}
                onChange={this.handleChange('transactionName')}
              />
             
              <div className='inputGroup'>
                <select name='type' 
                placeholder='Select Type'
                value={this.state.transactionType}
                onChange={this.handleChange('transactionType')}
                >
                  <option value='0'>Type</option>
                  <option value='expense'>Expense</option>
                  <option value='deposit'>Deposit</option>
                </select>
                  <input
                  placeholder='Price'
                  type='text'
                  name='price'
                  value={this.state.price}
                onChange={this.handleChange('price')}
                />
              </div>
            </form>
              <button 
              className='addTransaction'
              onClick={() => this.addNewTransaction()}
              >
                + Add Transaction
              </button>
          </div>
        </div>

        <div className='latestTransaction'>
          <p>Latest Transaction</p>
          <ul>
            {
              Object.keys(this.state.transactions).map((id)=>(
                <AllTransaction  key={id}
                type={this.state.transactions[id].type}
                name={this.state.transactions[id].name}
                price={this.state.transactions[id].price}
                />
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

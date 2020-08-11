import React, { Component } from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import Zoom from 'react-reveal'
import Fade from 'react-reveal/Fade'
import formatCurrency from '../utils'
import {removeFromCart} from '../redux/actions/cartAction'
import {clearOrder, createOrder} from '../redux/actions/orderAction'

class Cart extends Component {
  state =  {
    name: '',
    email: '',
    address: '',
    showCheckout: false
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  createOrder = event => {
    event.preventDefault()
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a,b) => a + b.price * b.count, 0)
    }
    this.props.createOrder(order)
  }

  closeModal = () => {
    this.props.clearOrder( )
  }

  render() {
    const {cartItems, order} = this.props
    return (
      <div>
        {
        cartItems.length === 0 ? <div className="cart cart-header">Cart is empty</div> : <div className="cart cart-header">You have {cartItems.length} in the cart{" "}</div>
        }

        {
          order && <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>x</button>
              <div className="order-details ">
                <h3 className="success-message">You order has been placed</h3>
                <h2>Order {order._id}</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Date:</div>
                    <div>{order.createdAt}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>{formatCurrency(order.total)}</div>
                  </li>
                  <li>
                    <div>Cart Items:</div>
                    <div>{order.cartItems.map(x => (
                      <div>
                        {x.count} {" x "} {x.title}
                      </div>
                    ))}</div>
                  </li>
                  <li>
                    <div>Name:</div>
                    <div>{order.name}</div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        }
        <div>
        <div className="cart">
          <Fade left cascade>
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item._id}>
                 <div>
                <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    {item.title}
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count}{" "}
                    <button
                    className="button"
                     onClick={() => this.props.removeFromCart(item)}>Remove</button>
                    </div>
                  </div>
              </li>
            ))}
          </ul>
          </Fade>
        </div>
        {cartItems.length !== 0 && (
          <div>
                  <div className="cart">
                  <div className="total">
                    <div>
                      Total:{" "}
                      {
                      formatCurrency(cartItems.reduce((a,c) => a + c.price * c.count, 0))
                      }
                    </div>
                    <button
                    className="button primary"
                    onClick={() => {this.setState({showCheckout: true})}}
                    >
                      Proceed
                      </button>
                  </div>
                  </div>
                  {this.state.showCheckout && (
                    <Fade right cascade>
                    <div className="cart">
                    <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input
                        name="email"
                        type="email"
                        required
                         onChange={this.handleInput}
                         />
                      </li>
                      <li>
                        <label>Name</label>
                        <input
                        name="name"
                        type="text"
                        required
                         onChange={this.handleInput}
                         />
                      </li>
                      <li>
                        <label>Address</label>
                        <input
                        name="address"
                        type="text"
                        required
                         onChange={this.handleInput}
                         />
                      </li>
                      <li>
                        <button
                        className="button primary"
                        type="submit">Checkout</button>
                      </li>
                    </ul>
                    </form>
                    </div>
                    </Fade>
                  )}
                  </div>
        )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  order: state.order.order,
  cartItems: state.cart.cartItems
})

const mapDispatchToProps = {
  removeFromCart,
  createOrder,
  clearOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

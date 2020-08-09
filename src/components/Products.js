import React, { Component } from 'react'
import {connect} from 'react-redux'
import formatCurrency from '../utils'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'
import {fetchProducts} from '../redux/actions/productAction'

class Products extends Component {
  state = {product: null}

  componentDidMount() {
    this.props.fetchProducts()
  }

  openModal = product => {
    this.setState({
      product
    })
  }

  closeModal = () => {
    this.setState({
      product: null
    })
  }

  render() {
    const {product} = this.state
    return (
      <div>
        <Fade bottom cascade>
          {
            !this.props.products 
            ? (<div>Loading...</div>)
            : (
              <ul className="products">
          {this.props.products.map(product => (
            <li key={product._id}>
              <div className="product">
                <a href={"#" + product.id} onClick={() => this.openModal(product)}>
                  <img src={product.image} alt={product.title} />
                  <p>
                    {product.title}
                  </p>
                </a>
                <div className="product-price">
                  {formatCurrency(product.price)}
                </div>
                <button
                 className="button primary"
                 onClick={() => this.props.addToCart(product)}
                 >
                  Add to Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
            )
          }
        
        </Fade>
        {
          product && (
            <Modal 
            isOpen={true}
            onRequestClose={this.closeModal}
            >
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
                </button>
              <div className="product-details">
                <img src={product.image} alt={product.title}></img>
                <div className="product-details0description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>
                    {product.description}
                  </p>
                  <p>
                  Avaiable Sizes:{" "}
                  {product.availableSizes.map(x => (
  <span>{" "}<button className="button">{x}</button></span>
                  ))}
                  </p>
                  <div className="produc-price">
                    <div>
                    {formatCurrency(product.price)}
                    </div>
                    <button
                     className="button primary" onClick={() => {
                      this.props.addToCart(product)
                      this.closeModal()
                     }
                    }
                     >
                       Add to cart
                     </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products.items,
})

const mapDispatchToProps = {
  fetchProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)

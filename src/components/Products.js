import React, { Component } from 'react'
import formatCurrency from '../utils'

export default class Products extends Component {
  render() {
    return (
      <div>
        <ul className="products">
          {this.props.products.map(product => (
            <li key={product._id}>
              <div className="product">
                <a href={"#" + product.id}>
                  <img src={product.image} alt={product.title} />
                  <p>
                    {product.title}
                  </p>
                </a>
                <div className="product-price">
                  {formatCurrency(product.price)}
                </div>
                <button className="button primary">
                  Add to Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
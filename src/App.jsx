import {useEffect, useState } from 'react'
import './App.css'
import ProductData from './products'
import { FaHeart, FaChartBar, FaShoppingCart, FaShuttleVan } from 'react-icons/fa';
import moment from "moment";

const App = () => {
  
  const [countdownString, setCountdownString] = useState("");
  
  useEffect(() => {
      const formatDate = () => {
        const formattedCountdown = moment().endOf('day').diff(moment());
        const countDown = moment.utc(formattedCountdown).format("hh:mm:ss")
        setCountdownString(countDown)
      };
      const formatDateSecond = setInterval(formatDate, 1000);
      return () => {
        clearInterval(formatDateSecond);
      };
    }, []);


  return (
    <>
      {ProductData.map((productData) => (
        <div key={productData.id} className="flex-container">
          <div className="flex-item-left">
          <div className="eRecommend" style={{visibility: productData.isRecommended ? '' : 'hidden'}}>Eclipse Recommended</div>
              <img className="productImage" src={productData.img} alt={productData.productName}></img>
              <img className="subLogo" src={productData.imgBrand} alt={productData.productBrand}></img>
          </div>
          <div className="flex-item-centre">
              <h5 className='productTitle'>{productData.productName}</h5>
              <div className="stars" style={{ '--rating': `${productData.stockPercent}` }}><span className="reviewAmount">(11 reviews)</span></div>
              {productData.productFeatures && (
                <ul className='productFeatures'>
                  {productData.productFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              )}
              <div className="buttonResponses">
                <button type="submit">
                    <FaHeart/>
                </button>
                <button type="submit" >
                    <FaChartBar />
                </button>
            </div>
          </div>
          <div className="flex-item-right">
            <div className="pricing">
                <div className="productPriceDiscount">RRP £{productData.originalPrice}</div>
                <div className="productPrice">£{productData.discountPrice}</div>
                <div className="productSavings">Save £200</div>
                <div className="stock-bar">
                <div className="stock-level" style={{ width: `${productData.stockPercent}%`, backgroundColor: productData.stockPercent <= 30 ? 'red' : productData.stockPercent <= 55 ? 'yellow' : 'green' }}>                  
                </div>
              </div>
              <div className="stock-text" style={{color: productData.stockPercent <= 30 ? 'red' : productData.stockPercent <= 55 ? 'yellow' : 'green'}}>
                {productData.stockPercent <= 30 ? 'Low Stock' : productData.stockPercent <= 55 ? 'In Demand' : 'In Stock'}
              </div>
            </div>
            <div className="productDelivery">
                <span className='deliveryTime'><FaShuttleVan />Order in the next <b>{countdownString}</b> for delivery on <b>{moment().add(1,'days').format("Do MMMM")}</b> </span>
                <li>FREE UK delivery</li>
                <li>PayPal credit available</li>
            </div>
            <button className="basketButton"><i className="fa-solid fa-cart-shopping"><FaShoppingCart/></i>ADD TO BASKET</button>
          </div>
        </div>
      ))}
    </>
  );
};


export default App;

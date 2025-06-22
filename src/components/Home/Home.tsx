import React from 'react'
import MainBar from './MainBar/MainBar'
import FlashSales from './Sale/FlashSale'
import Categories from './Category/Categories'
import BestSale from './BestSale/BestSale'
import Ad from './Ad/Ad'
import Product from './Product/Product'
import Featuted from './Featured/Featuted'
import Service from '../About/Service/Service'

const Home = () => {
  return (
    <div>
        <MainBar />
        <FlashSales />
        <hr className="mx-18" />
        <Categories />
        <hr className="mx-18" />
        <BestSale />
        <hr className="mx-18" />
        <Ad />
      
        <Product />

        <Featuted />
        <Service />
    </div>
  )
}

export default Home
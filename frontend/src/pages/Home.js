import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Trending Airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular Smart Watches"}/>

      <VerticalCardProduct category={"mobiles"} heading={"Best Smart Phones"}/>
      <VerticalCardProduct category={"mouse"} heading={"Top Quality Mouse"}/>
      <VerticalCardProduct category={"televisions"} heading={"Experience TV Like Never Before"}/>
      <VerticalCardProduct category={"camera"} heading={"Capture Every Moment in Detail"}/>
      <VerticalCardProduct category={"earphones"} heading={"Tune In with Ultimate Clarity"}/>
      <VerticalCardProduct category={"speakers"} heading={"Elevate Your Space with Sound"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Smart Refrigeration for Every Home"}/>
      <VerticalCardProduct category={"printers"} heading={"High-Quality Prints, Every Time"}/>
      <VerticalCardProduct category={"Trimmers"} heading={"Perfect Trim, Grooming Made Easy"}/>
      <VerticalCardProduct category={"processor"} heading={"Unleash Power with Advanced Processors"}/>
      
    </div>
  )
}

export default Home
import React, { useContext, useEffect, useState } from 'react'
import SummaryAPI from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md"
import { toast } from 'react-toastify'

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [firstLoad, setFirstLoad] = useState(true)  
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async () => {
        if (firstLoad) setLoading(true)  
        const response = await fetch(SummaryAPI.addToCartProductView.url, {
            method: SummaryAPI.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
        })

        const responseData = await response.json()
        setLoading(false)  
        setFirstLoad(false)  

        if (responseData.success) {
            setData(responseData.data)
        }
    }

    useEffect(() => {
        if (!data.length) {
            fetchData() 
        }
    }, [data])

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryAPI.updateCartProduct.url, {
            method: SummaryAPI.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1
            })
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
            toast.success(responseData.message)
        }
    }

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryAPI.updateCartProduct.url, {
                method: SummaryAPI.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1
                })
            })

            const responseData = await response.json()

            if (responseData.success) {
                fetchData()
                toast.success(responseData.message)
            }
        }
    }

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryAPI.deleteCartProduct.url, {
            method: SummaryAPI.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: id,
            })
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
            toast.success(responseData.message)
        }
    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)

    const totalPrice = data.reduce((prev,cur)=>prev + (cur.quantity * cur?.productId?.sellingPrice),0)

    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>No Data</p>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                <div className='w-full max-w-3xl'>
                    {
                        loading && firstLoad ? (
                            loadingCart.map((_, index) => {
                                return (
                                    <div key={index + "Loading Your Cart"} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
                                )
                            })
                        ) : (
                            data.map((product) => {
                                return (
                                    <div key={product?._id + "Cart"} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                        <div className='w-32 h-32 bg-slate-200'>
                                            <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply p-4' />
                                        </div>
                                        <div className='px-4 py-2 relative'>
                                            <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer transition-all' onClick={() => deleteCartProduct(product?._id)}>
                                                <MdDelete />
                                            </div>
                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-blue-950 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                                <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-1'>
                                                <button className='border border-blue-900 text-blue-950 hover:bg-blue-900 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
                                                <span>{product?.quantity}</span>
                                                <button className='border border-blue-900 text-blue-950 hover:bg-blue-900 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>

                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {
                        loading && firstLoad ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'></div>
                        ) : (
                            <div className='h-36 bg-white flex flex-col rounded lg:mr-28 lg:mt-2'>
                                <h2 className='text-white bg-blue-900 px-4 py-1 rounded'>Summary</h2>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Quantity</p>
                                    <p>{totalQty}</p>
                                </div>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Total Price</p>
                                    <p>{displayINRCurrency(totalPrice)}</p>
                                </div>
                                <button className='bg-blue-900 p-2 text-white w-full mt-auto rounded'>Buy Now</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart

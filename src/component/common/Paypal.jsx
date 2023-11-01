import { Button } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'


export default function Paypal({props}) {

    const paypal = useRef()

    useEffect(()=>{
        console.log(props)
        window.paypal.Buttons({
            createOrder: (data, actions, err)=> {
                return actions.order.create({
                    intent:"CAPTURE",
                    purchase_units: [
                        {
                            description:"perfume",
                            amount:{
                                value:props,
                                currency_code:"CAD"
                            }
                        }
                    ]
                })
            },
            onApprove: async(data, actions)=> {
                const order = await actions.order.capture()
                console.log(order)
            },
            onError:(err)=> {
                console.log(err)
            }
        }).render(paypal.current)
    },[])

    

  return (
   <>
   <div ref={paypal}></div>
   </>
  )
}

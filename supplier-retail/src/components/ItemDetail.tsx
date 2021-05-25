import React , { useState }from 'react';
import {   Heading } from "@chakra-ui/layout"
import { useSession } from 'next-auth/client';
import Router from 'next/router'
import { Button,useColorModeValue} from "@chakra-ui/react";
import { ItemProps } from "../components/ItemSingle"



const ItemDetail: React.FC <{item: ItemProps}>= (props) => {
  const [session, loading] = useSession();
  const {item }= props
  
    const [amount, setAmount] = useState(0)
    const toEmail = item.user.email
    const fromEmail = session.user.email
    const price = props.item.price
    const itemId = item.id
    const [receipt, setReceipt] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)

    function getTotal(price,amount){
      const total = price*amount
      setTotalPrice(total)
      
      return total

    }

    function getReceipt(){
      const  randomString =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
      setReceipt(randomString)
      return  randomString

    }
   

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
          alert('your order has been sent')
          const totalPrice =getTotal(price,amount)
          const receipt = getReceipt()
          const body = { totalPrice,receipt,amount,itemId,toEmail,fromEmail }
          await fetch(`http://localhost:3000/api/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
          await Router.push('/')
        } catch (error) {
          console.error(error)
        }
      }

    return (
        <>
        <Heading>
         {props.item.user.phone}
   
        </Heading>
                <form
                onSubmit={submitData}>
              
                <input
                  autoFocus
                  onChange={e => setAmount(e.target.value)}
                  // color={useColorModeValue('white', 'black')}
                  placeholder="Number"
                  type="number"
                  value={amount}
                />
     
                {/* <input
                  onChange={e => setReceipt(e.target.value)}
                  placeholder="receipt"
                  type="text"
                  value={receipt}
                />  */}

                <input
               
                  disabled={!amount}
                  type="submit"
                  value="order"
                />
            
              </form>
              </>
    )
}
export default ItemDetail;
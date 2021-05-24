import React , { useState }from 'react';
import {   Heading } from "@chakra-ui/layout"
import Router from 'next/router'

const ItemDetail: React.FC = (props) => {
    const [amount, setAmount] = useState('')
    const [toEmail, setToEmail] = useState('')
    const [fromEmail, setFromEmail] = useState('')
    const [itemId, setItemId] = useState('')
    const [receipt, setReceipt] = useState('')
    const [totalPrice, setTotalPrice] = useState('')


    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
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
         {props.user.phone}
        
        </Heading>
                <form
                onSubmit={submitData}>
              
                <input
                  autoFocus
                  onChange={e => setAmount(e.target.value)}
                  placeholder="Number"
                  type="number"
                  value={amount}
                />
                 <input
                  onChange={e => setFromEmail(e.target.value)}
                  placeholder="fromEmail"
                  type="text"
                  value={fromEmail}
                /> 
                <input
                  onChange={e => setToEmail(e.target.value)}
                  placeholder="toemail"
                  type="text"
                  value={toEmail}
                /> 
                <input
                  onChange={e => setReceipt(e.target.value)}
                  placeholder="receipt"
                  type="text"
                  value={receipt}
                /> 
                                <input
                  onChange={e => setItemId(e.target.value)}
                  placeholder="item id"
                  type="number"
                  value={itemId}
                /> 
                <input
                  onChange={e => setTotalPrice(e.target.value)}
                  placeholder="total price"
                  type="number"
                  value={totalPrice}
                /> 

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
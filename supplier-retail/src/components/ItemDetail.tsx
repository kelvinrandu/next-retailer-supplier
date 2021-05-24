import React , { useState }from 'react';
import {   Heading } from "@chakra-ui/layout"
import Router from 'next/router'

const ItemDetail: React.FC = (props) => {
    const [amount, setAmount] = useState('')

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
          const body = { amount, from, to,item,authorEmail }
          await fetch(`http://localhost:3000/api/orders`, {
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
                 {/* <input
                  onChange={e => setAuthorEmail(e.target.value)}
                  placeholder="Author (email address)"
                  type="hidden"
                  value={authorEmail}
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
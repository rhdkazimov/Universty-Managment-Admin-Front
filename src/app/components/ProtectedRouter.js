import React from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '../../Routes/consts'


export const ProtectedRouter  = ({children}) => {
  if(localStorage.getItem("token")){
   return children 
  }
  return <Navigate to={ROUTES.ADMIN.LOGIN}/>
}
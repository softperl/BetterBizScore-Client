import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/features/auth/reducer'
import { authSelector } from '../../redux/features/auth/selectors'

export const ProtectedRoute = ({ children }) => {
   const { success } = useSelector(authSelector)
   const [loading, setLoading] = React.useState(true);

   const location = useLocation()
   const dispatch = useDispatch()

   React.useLayoutEffect(() => {
      const authCheck = () => {
         setLoading(true)

         const token = localStorage.getItem('__token_bzc_client');
         const user = JSON.parse(localStorage.getItem('__user_bzc_client'));

         if (token && user)
            dispatch(setUser({ user, token }))


         setLoading(false)
      }

      authCheck()

   }, [dispatch])

   if (loading) return null;

   if (!success) {
      return <Navigate to='/login' state={{ from: location.pathname }} replace />
   }

   return children;
}

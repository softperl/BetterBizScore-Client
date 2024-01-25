import React from 'react';
import './App.css';

import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
/* import { useSelector } from 'react-redux' */

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import MultipageForm from './pages/MultipageForm/MultipageForm';
import Result from './pages/Result/Result';
import ThankYou from './pages/ThankYou/ThankYou';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

import { IndustryProvider } from './context/IndustryContext';
import { AnswersProvider } from './context/AnswersContext';

/* import { authSelector } from './redux/features/auth/selectors'; */
import { setUser } from './redux/features/auth/reducer';
import VerifiedEmail from './pages/VerifiedEmail/VerifiedEmail';
import CheckoutStatus from './pages/CheckoutStatus/CheckoutStatus';
import Pricing from './sections/Pricing/Pricing';

const App = () => {
  const [loading, setLoading] = React.useState(true);

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

  return (
    <IndustryProvider>
      <AnswersProvider>
        <Router>
          <Routes>
            <Route path="/" exact element={<Home />} />

            {/* <Route path="/submissions" element={<ProtectedRoute><Result /></ProtectedRoute>} /> */}

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/verifyEmail/:token" element={<ProtectedRoute><VerifiedEmail /></ProtectedRoute>} />

            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />

            <Route path="/multipageForm" element={<ProtectedRoute><MultipageForm /></ProtectedRoute>} />

            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/checkout" element={<Pricing />} />
            <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
            <Route path="/checkoutStatus" element={<ProtectedRoute><CheckoutStatus /></ProtectedRoute>} />

          </Routes>

        </Router>

      </AnswersProvider>

    </IndustryProvider>

  );


};

export default App;

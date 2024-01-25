import React from 'react'
import './pricing.scss'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { loadStripe } from "@stripe/stripe-js";

import { ChevronRight } from '../../assets/ChevronRight'
import { ArrowCircleRight } from '../../assets/ArrowCircleRight'

import { authSelector } from '../../redux/features/auth/selectors'

const stripePromise = loadStripe("pk_test_51OL1VoEIuZR9pMD9aW7YRrKJjivVQazUSKEP0TNykOWV2lb6KfCN7sYKrsWQ7q1BVOBfoQCS5Zv7kT21G1ZLOJZL00gc3hQsvK");


const Pricing = function () {
  const navigate = useNavigate()
  const { success, userToken } = useSelector(authSelector)

  const [loading, setLoading] = React.useState(false);
  const [packages, setPackages] = React.useState([]);
  const [subscription, setSubscription] = React.useState(null);
  const [lookup_key, setLookUpKey] = React.useState('');

  const handleSubmit = async (lookup_key) => {
    try {
      if (success && userToken) {
        setLookUpKey(lookup_key);
        setLoading(true);

        const response = await axios.post('http://localhost:8000/api/subscriptions/create-checkout-session', {
          lookup_key
        }, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": 'application/json'
          }
        })

        setLoading(false)
        const stripe = await stripePromise;

        const { error } = await stripe.redirectToCheckout({
          sessionId: response.data.session.id
        })

        if (error) throw error
      } else {
        setLoading(false)
        navigate('/login', { replace: true })
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }


  React.useEffect(() => {
    const getCurrentSubscription = async () => {
      try {
        const industryId = localStorage.getItem('selected_industry_id');
        const response = await axios.get(industryId ? `http://localhost:8000/api/users/subscription?industryId=${industryId}` : 'http://localhost:8000/api/users/subscription', {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": 'application/json'
          }
        })

        if (response.data?.data?.alreadySubscribed && industryId) {
          console.log({alreadySubscribed: response.data?.data?.alreadySubscribed})
          localStorage.removeItem('selected_industry_id')
          window.location.href = 'http://localhost:3000';
        } else {
          setSubscription(response.data?.data?.subscription)
        }
      } catch (error) {
        console.log(error)
      }
    }
    userToken ? getCurrentSubscription() : setSubscription(null)
  }, [success, userToken])



  React.useEffect(() => {
    const getPackages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/packages', {
          headers: {
            "Content-Type": 'application/json'
          }
        })

        setPackages(response.data?.data?.packages)
      } catch (error) {
        console.log(error)
      }
    }
    getPackages()
  }, [])

  return (
    <section className='bz-home__content plans'>
      <div className="bz-home__heading">
        <h2 className="bz-home__fluid">Get Started by Purchasing One of Our Plans</h2>
        <p>
          Until now more than 200+ companies purchased our plans
        </p>
      </div>

      <div className='plan'>
        {
          packages.length && packages.map((pack) => (
            <span key={pack._id} className={`plan__card ${pack.lookupKey === subscription?.lookupKey ? 'plan__card--active' : ""}`}>
              <input type="hidden" name="lookup_key" value={pack.lookupKey} />
              <div className='plan__price-box'>
                <p className='plan__price'>${pack.price} <span>per month</span></p>
                <h3>{pack.name}</h3>
                <p className='plan__description'>{pack.description}</p>
                <hr />
              </div>
              <ul className='plan__features'>
                {pack.features?.map((feature, i) => (
                  <li key={i} className='plan__feature'><ArrowCircleRight /> {feature}</li>
                ))}
              </ul>
              <button className='plan__cta' disabled={loading} onClick={(e) => {
                e.preventDefault();
                handleSubmit(pack.lookupKey);
              }}>
                {
                  (loading && lookup_key === pack.lookupKey) ? 'Processing...'
                    : subscription?.lookupKey === pack.lookupKey ? 'Upgrade Current plan'
                      : 'Get Started'} <ChevronRight />
              </button>
            </span>
          ))
        }
      </div>
    </section>
  )
}

export default Pricing
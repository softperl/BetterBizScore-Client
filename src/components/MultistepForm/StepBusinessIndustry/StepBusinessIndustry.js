import React from 'react'
import styles from './styles.module.scss'

import axios from 'axios'
import { useForm } from 'react-hook-form'

import { ArrowRight } from '../../../assets/ArrowRight'
import { ArrowLeft } from '../../../assets/ArrowLeft'
import { ChevronDown } from '../../../assets/ChevronDown'

import MultistepForm from '../MultistepForm'
import { useUserDetails } from '../../../context/UserDetailsContext'
import { useIndustry } from '../../../context/IndustryContext'

const baseURL = 'http://api.betterbizscore.com';

const StepBusinessIndustry = ({ handlePrev, handleNext }) => {
  const {userData, setUserData} = useUserDetails()
  const { handleSubmit } = useForm({ defaultValues: userData })
  const userInfo = localStorage.getItem('__user_bzc_client');
  
  const [industries, setIndustries] = React.useState([])
  const [filter, setFilter] = React.useState([])

  const [search, setSearch] = React.useState('')
  const [error, setError] = React.useState('')
  
  const { industry, setIndustry } = useIndustry();


  const dropdownRef = React.useRef();
  const inputRef = React.useRef();

  React.useEffect(() => {
    const getIndustries = async () => {
      try {
        const userId = JSON.parse(userInfo)?._id;
        const response = await axios.get(`${baseURL}/api/industries?userId=${userId}`)

        setFilter(response.data?.data?.industries)
        setIndustries(response.data?.data?.industries)
      } catch (error) {
        console.log(error.response)
      }
    }

    getIndustries()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleOptions = () => {
    dropdownRef.current.classList.toggle(styles.active);
    inputRef.current.focus()
  }

  const onIndustrySelect = (industry) => {
    localStorage.setItem('selected_industry_id', industry?._id);
    setIndustry(industry);
    setError('')
    dropdownRef.current.classList.toggle(styles.active);
    setSearch('')
    setFilter(industries)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)

    if (!e.target.value) {
      return setFilter(industries)
    }

    const searchFilter = industries.filter((industry => {
      return industry.name.startsWith(e.target.value);
    }))

    setFilter(searchFilter);
  }


  const saveData = () => {
    if (!industry.name) {
      setError('Please select an industry!')
    } else {
      setUserData({ ...userData, industry: industry.name })

      handleNext()
    }
  }

  return (
    <MultistepForm onSubmit={handleSubmit(saveData)} style={{ overflow: 'visible' }}>
      <div className={styles.modalContent}>
        <h1>Business Industry</h1>

        <div className={styles.selectWrapper} ref={dropdownRef}>
          <div className={styles.selectButton} onClick={toggleOptions}>
            <span>{industry.name || 'Select Industry'}</span>
            <ChevronDown />
          </div>

          <div className={styles.selectContent}>
            <div className={styles.selectSearch}>
              <input ref={inputRef} type='text' placeholder='Search' value={search} onChange={handleSearch} />
            </div>

            <ul className={styles.selectList}>
              {
                filter.length ? filter.map(((industry, i) => (
                  <li
                    key={industry._id}
                    onClick={() => onIndustrySelect(industry)}
                  >{industry.name}</li>
                ))) : <li>Opps! No categories found!</li>
              }
            </ul>
          </div>
        </div>

        {error && (
          <span className={styles.formError}>{error}</span>
        )}
      </div>

      <button type='button' className='btn__prev' onClick={handlePrev}><ArrowLeft /> &nbsp; PREVIOUS</button>
      <button className='btn__next'>NEXT &nbsp; <ArrowRight /></button>
    </MultistepForm>
  )
}

export default StepBusinessIndustry
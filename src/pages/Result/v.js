import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import './result.scss'
import { Badge } from '../../assets/Badge'
import logo from '../../assets/logo.png'

const Result = () => {
    const user = JSON.parse(localStorage.getItem('__user_bzc_client'));
    const token = localStorage.getItem('__token_bzc_client');
    const [answer, setAnswer] = useState({});
    const [submissions, setSubmissions] = useState([]);
    const { answerId } = useParams();
    const userId = user?._id;

    const getImageBasedOnScore = (scoredPoints) => {
        if (scoredPoints >= 1 && scoredPoints <= 100) {
            return 'percentage/1.png';
        } else if (scoredPoints >= 101 && scoredPoints <= 200) {
            return 'percentage/2.png';
        } else if (scoredPoints >= 201 && scoredPoints <= 280) {
            return 'percentage/3.png';
        } else if (scoredPoints >= 281 && scoredPoints <= 430) {
            return 'percentage/4.png';
        } else if (scoredPoints >= 431 && scoredPoints <= 569) {
            return 'percentage/5.png';
        } else {
            return 'percentage/6.png';
        }
    };

    React.useEffect(() => {
        const getAnswer = async () => {

            try {
                const config = {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const response = await axios.get(`http://localhost:8000/api/answers/result/${userId}?answerId=${answerId}`, config)
                if (response?.data?.status === 'success' && response.data?.data) {
                    const data = response.data.data;
                    setAnswer(data)
                    setSubmissions(data?.suggestions)
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (!token && !user?._id) {
            window.location.href = 'http://localhost:3000/login';
        } else {
            getAnswer();
        }
    }, [user?._id, token])

    return (
        <Fragment>
            <section className='bz-result'>
                <div className='bz-result__content' style={{ padding: '2rem 0' }}>
                    <Link to='/'><img src={logo} className='result__card--logo' alt='Better Biz Score Logo' /></Link>
                </div>
                <div className='bz-result__content'>
                    <img
                        width={'350px'}
                        height={'220px'}
                        src={getImageBasedOnScore(answer?.scoredPoints)}
                        alt='Better Biz Score Wheel'
                        className='bz-result__cover'
                    />
                </div>
            </section>
            <section className='bz-result-card'>
                <div className="bz-result-card__content">
                    <div className='result__card'>
                        <div className='result__card--content'>
                            <h1 className='result__card--score'>{answer.scoredPoints}</h1>
                            <p>Better Biz Score</p>
                            <h1 className='result__card--heading'>Things You Can Improve</h1>
                        </div>


                        <div style={{ padding: '2rem' }}>
                            <table>
                                <tr>
                                    <th>Badge</th>
                                    <th>Category</th>
                                    <th>Score</th>
                                    <th>Suggestions</th>
                                </tr>
                                {(submissions || []).map((ans, i) => {
                                    const percentage = ans?.value?.percentage;
                                    let badgeColor = '';

                                    if (percentage > 90) {
                                        badgeColor = 'gold';
                                    } else if (percentage > 80) {
                                        badgeColor = 'silver';
                                    } else if (percentage > 70) {
                                        badgeColor = 'brown';
                                    } else {
                                        badgeColor = 'gray';
                                    }
                                    <tr key={i}>
                                        <td><Badge color={badgeColor} /></td>
                                        <td>{ans?.name}</td>
                                        <td>{ans?.value?.points}</td>
                                        <td>{ans?.value?.suggestion}</td>
                                    </tr>
                                })}
                            </table>

                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Result
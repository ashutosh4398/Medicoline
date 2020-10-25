import React,{useEffect, useContext, useState} from 'react';
import Axios from 'axios';
import {Bar} from 'react-chartjs-2';
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';
import { BASEURL } from '../../shared/BASEURL';
import Loader from '../Loader/Loader';


const BarChart = ({type='overall',disease_name}) => {

    const [data,setData] = useState({
        labels: [],
        datasets: [{
            labels: '',
            data: [],
            backgroundColor: [],
        }]
    });

    const [loaded, setLoaded] = useState(false);

    const {getToken} = useContext(TOKEN_HANDLER);

    const generateRandomColors = () => {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgba(" + r + "," + g + "," + b + ", 1)";
    }

    const generateColors = (arr) => {
        const colors = arr.map(each => generateRandomColors())
        console.log(colors)
        return colors;
    }

    useEffect(() => {

        if (type === 'overall') {
            Axios.get(`${BASEURL}/api/doctor/statistics/`,{
                headers: {
                    Authorization: `Token ${getToken()}`
                }
            })
            .then(resp => {
                setData({
                    labels: Object.keys(resp.data),
                    datasets: [{
                        label: `Questions Answered for Overall`,
                        data: Object.values(resp.data),
                        backgroundColor: generateColors(Object.keys(resp.data)),
                        
                    }]
                })
                setLoaded(true);
            })
            .catch(err => {
                console.log(err.response);
                setLoaded(true);
            })
        } else if(type==='groupwise') {
            Axios.get(`${BASEURL}/api/doctor/statistics/groupwise/${disease_name}/`,{
                headers: {
                    Authorization: `Token ${getToken()}`
                }
            })
            .then(resp => {
                setData({
                    labels: Object.keys(resp.data),
                    datasets: [{
                        data: Object.values(resp.data),
                        backgroundColor: generateColors(Object.keys(resp.data)),
                    }]
                })
                setLoaded(true);
            })
            .catch(err => {
                console.log(err.response);
                setLoaded(true);
            })
        }
        
    },[]);

    return (
        <div className="">
            {
                loaded? (
                    <Bar data={data} options={{
                        title: {
                            display: true,
                            text: disease_name? `Questions Answered for ${disease_name}`: 'Questions Answered Overall',
                        },
                        legend: {
                                    display: false,
                        },
                        scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                        }
                    }}/>
                ):(
                    <Loader />
                ) 
            }
        </div>
    );
};

export default BarChart;
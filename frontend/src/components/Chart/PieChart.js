import React, {useState, useEffect, useContext} from 'react';
import Axios from 'axios';
import {Doughnut} from 'react-chartjs-2';
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';
import { BASEURL } from '../../shared/BASEURL';
import Loader from '../Loader/Loader';

const PieChart = () => {

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
        Axios.get(`${BASEURL}/api/doctor/statistics/distribution/`,{
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
            setLoaded(true)
        })
        .catch(err => {
            console.log(err.response);
            setLoaded(true)
        })
    },[]);

    return (
        <div>
            {
                loaded? (
                    <Doughnut data={data} />
                ):(
                    <Loader />
                ) 
            }
            
        </div>
    );
};

export default PieChart;
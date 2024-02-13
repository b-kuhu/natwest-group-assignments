import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { useEffect,useState } from 'react';

import {Bar} from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    scales: {
        y: {
          beginAtZero: true
        }
      },
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio : false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };

 
const BarChart = ({cityName}) =>{
    const [data,setData] = useState({
        labels: ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
          label: 'temperature',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            
          ], borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)',
              'rgb(255, 99, 132)'
            ],
            borderWidth: 1
          },
          {
              label: 'humidity',
              data: [60, 49, 88, 38, 76, 45, 50],
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(75, 192, 192, 0.2)',

              ], borderColor: [
                  'rgb(75, 192, 192)',
                  'rgb(75, 192, 192)',
                  'rgb(75, 192, 192)',
                  'rgb(75, 192, 192)',
                  'rgb(75, 192, 192)',
                  'rgb(75, 192, 192)',
                  'rgb(75, 192, 192)',
                  
                ],
                borderWidth: 1
              },
              {
                label: 'windspeed',
                data: [60, 49, 88, 38, 76, 45, 50],
                backgroundColor: [
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  
                ], borderColor: [
                    'rgb(153, 102, 255)',
                    'rgb(153, 102, 255)',
                    'rgb(153, 102, 255)',
                    'rgb(153, 102, 255)',
                    'rgb(153, 102, 255)',
                    'rgb(153, 102, 255)',
                    'rgb(153, 102, 255)',
            
                  ],
                  borderWidth: 1
                }
      ]
        }

    )
    useEffect(()=>{
        const fetchData = async() =>{
            const url =`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/2024-02-04/2024-02-11?unitGroup=us&include=days&key=TH7AU4PSXX96HQXD5GRY3SMZF&contentType=json`
            const labelSet = [];
            const dataSet1 = [];
            const dataSet2 = [];
            const dataSet3 = [];
            await fetch(url)
            .then(data =>{
                const res = data.json();
                return res;
            }).then(res =>{
                
                for (let val= 0;val<res.days.length;val++) {
                    dataSet1.push(((res.days[val].feelslike)*5)/9);
                    dataSet2.push(res.days[val].humidity)
                    dataSet3.push(res.days[val].windspeed)
                    labelSet.push(res.days[val].datetime)
                }
                console.log(dataSet2);
                setData({
                    labels: labelSet,
                    datasets: [{
                      label: 'temperature',
                      data: dataSet1,
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                      ], borderColor: [
                          'rgb(255, 99, 132)',
                          'rgb(255, 159, 64)',
                          'rgb(255, 205, 86)',
                          'rgb(75, 192, 192)',
                          'rgb(54, 162, 235)',
                          'rgb(153, 102, 255)',
                          'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                      },
                      {
                          label: 'humidity',
                          data: dataSet2,
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                          ], borderColor: [
                              'rgb(255, 99, 132)',
                              'rgb(255, 159, 64)',
                              'rgb(255, 205, 86)',
                              'rgb(75, 192, 192)',
                              'rgb(54, 162, 235)',
                              'rgb(153, 102, 255)',
                              'rgb(201, 203, 207)'
                            ],
                            borderWidth: 1
                          },
                          {
                            label: 'windspeed',
                            data: dataSet3,
                            backgroundColor: [
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              
                            ], borderColor: [
                                'rgb(54, 162, 235)',
                                'rgb(54, 162, 235)',
                                'rgb(54, 162, 235)',
                                'rgb(54, 162, 235)',
                                'rgb(54, 162, 235)',
                                'rgb(54, 162, 235)',
                                'rgb(54, 162, 235)',
                        
                              ],
                              borderWidth: 1
                            }
                  ]
                })
            })
            .catch(e => {
                console.log(e);
            })    
        }
        fetchData();
    },[cityName])
    return <div className ='bar-graph' ><Bar data={data} options={options}/></div>
}
export default BarChart;

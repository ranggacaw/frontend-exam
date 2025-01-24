import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Footer from '../components/Footer'

const Dashboard = () => {
  const [dataContent, setDataContent] = useState([])

  // Fetching data dari table todos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          'https://b02c-182-253-48-10.ngrok-free.app/api/article',
          {
            headers: {
              'ngrok-skip-browser-warning': '1', // Additional header
              Authorization: `Bearer ${token}`, // Bearer token
            },
          }
        );
  
        // Debugging response
        console.log('API Response:', response.data.data.data);
  
        // Ensure the data is an array before setting it
        setDataContent(Array.isArray(response.data.data.data) ? response.data.data.data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div>
      <Navbar/>

      <main className="flex-grow h-screen">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Content</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataContent.length > 0 ? (
              dataContent.map(item => (
                <div
                  key={item.id}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{item.title}</h3>
                  <p>{item.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                No content available.
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  )
}

export default Dashboard
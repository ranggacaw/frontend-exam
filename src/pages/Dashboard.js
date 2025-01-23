import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Footer from '../components/Footer'

const Dashboard = () => {
  const [dataContent, setDataContent] = useState([])

  // Fetching data dari table todos
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/todos/');
      setDataContent(response.data);
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
              dataContent.map((isicontent) => (
                <div
                  key={isicontent.id}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{isicontent.title}</h3>
                  <p>{isicontent.content}</p>
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
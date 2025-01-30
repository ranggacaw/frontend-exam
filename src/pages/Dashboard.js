import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Footer from '../components/Footer'
import { MdDeleteOutline } from 'react-icons/md'

const Dashboard = () => {
  const [dataContent, setDataContent] = useState([])
  const token = localStorage.getItem("token");
  
  // Fetching data dari table todos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          'http://localhost:3001/todos/',
          {
            headers: {
              'ngrok-skip-browser-warning': '1', // Additional header
              Authorization: `Bearer ${token}`, // Bearer token
            },
          }
        );
  
        // Debugging response
        console.log('API Response:', response.data);
  
        // Ensure the data is an array before setting it
        setDataContent(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleDelete = async (id) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(
            `http://localhost:3001/todos/${id}`, // Pass the actual ID
            {
                headers: {
                    'ngrok-skip-browser-warning': '1', // Additional header
                    Authorization: `Bearer ${token}`, // Bearer token
                },
            }
        );

        // Remove the deleted todo from the UI
        setDataContent(prevData => prevData.filter(todo => todo.id !== id));

        console.log("Todo deleted successfully:", response.data);
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
  };

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

                  {token && (
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className='px-6 py-3 bg-red-700 hover:bg-red-800 text-white transition duration-100 rounded-lg'>
                        <MdDeleteOutline/>
                    </button>
                  )}
                    
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
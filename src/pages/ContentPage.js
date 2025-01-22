import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'

const ContentPage = () => {

  const {id} = useParams() // untuk mendapatkan ID dari url
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=> {
    const fetchContent = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`http://localhost:3001/api/articles/${id}`)

        if(!response.ok) {
          throw new Error("Failed to fetch content");
        }

        const data = await response.json();
        setContent(data); // menyimpan data content ke state 

      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchContent();
  }, [id]) // useEffect akan dijalankan ulang jika nilai 'id' berubah

  // Menampilkan pesan loading jika data sedang dimuat
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-2xl text-blue-600">Loading...</div>
      </div>
    );
  }

  // Menampilkan pesan error jika terjadi kesalahan
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-2xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  // Menampilkan pesan jika artikel tidak ditemukan
  if (!content) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-2xl text-yellow-600">Content not found</div>
      </div>
    );
  }

  return (
    <>
      <Navbar/>
      
      {/* Konten Content */}
      <div className="flex-1 overflow-hidden bg-white shadow-xl py-8">

        {/* Konten */}
        <div className="p-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
            {content.title} {/* Menampilkan judul kontent */}
          </h1>
          <div
            className="text-lg text-gray-700 mb-8 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content.content }} // Menampilkan konten artikel
          />
          {/* Tombol Share */}
          <div className="flex justify-start space-x-6 mt-8">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105">
              Share this Article {/* Tombol untuk membagikan artikel */}
            </button>
          </div>

          {/* Tanggal Publikasi */}
          <div className="mt-6 text-gray-500 text-sm">
            <span>
              Published on {new Date(content.createdAt).toLocaleDateString()}{" "}
              {/* Menampilkan tanggal publikasi artikel */}
            </span>
          </div>
        </div>
      </div>

      <Footer/>
    </>
  )
}

export default ContentPage
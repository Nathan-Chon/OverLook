import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";
import './RequestEdit.css';
import './DataRequestInfo.css'

export default function DataRequestInfo() {
  const { requestId } = useParams();
  const [request, setRequest] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const res2 = await fetch(`/api/requests/${requestId}`)
        if (!res2.ok) throw new Error(`fetch Error ${res2.status}`);
        const [data2] = await res2.json();
        setRequest(data2)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData();
  }, [requestId]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="container">
      <div className="row min-vh-100 pb-5 justify-content-center align-items-center">
        <div className="col col-md-8 bg-light rounded w-100 position-relative">
          <h1 className="text-center my-5 titles">{request.title}</h1>
          <Link to='/dataView'>
            <FiArrowLeft size={40} className="position-absolute top-0 start-0 mt-1 ml-1"></FiArrowLeft>
          </Link>
            <div className="container">
              <div className="row align-items-start">
                <div className="mb-3 d-flex flex-column col-md titles">
                  <h2>{request.question}</h2>
                </div>
                <div className="mb-3 d-flex flex-column col-md rounded text-end titles">
                  <h5>{request.name}</h5>
                </div>
              </div>
              <div className="row align-items-start">
                <div className="d-flex flex-column col-md titles">
                  <p>{request.description}</p>
                </div>
              <div className="mb-4 d-flex flex-column col-md text-end titles">
                  <h5>Date:</h5>
                <p>{new Date(Date.parse(request.createdAt)).toDateString()}</p>
                  <h5>Time:</h5>
                <p>{new Date(Date.parse(request.createdAt)).toTimeString()}</p>
                  <h5>Phone Number:</h5>
                  <p>{request.phoneNumber}</p>
                  <h5>Email:</h5>
                  <p>{request.email}</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

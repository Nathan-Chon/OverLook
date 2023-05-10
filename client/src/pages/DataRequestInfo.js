import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";
import './RequestEdit.css';

export default function DataRequestInfo() {
  const { requestId } = useParams();
  const [request, setRequest] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [question, setQuestion] = useState('');
  const [userId, setUserId] = useState();
  const [memberData, setMemberData] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const res2 = await fetch(`/api/requests/${requestId}`)
        if (!res2.ok) throw new Error(`fetch Error ${res2.status}`);
        const [data2] = await res2.json();
        setRequest(data2);
        setTitle(data2.title)
        setDescription(data2.description)
        setQuestion(data2.question)
        setUserId(data2.userId)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData();
  }, [requestId]);

  if (!request) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="container">
      <div className="row min-vh-100 pb-5 justify-content-center align-items-center">
        <div className="col col-md-8 bg-light rounded w-100 position-relative">
          <h1 className="text-center my-5">Edit Form</h1>
          <Link to='/dataView'>
            <FiArrowLeft size={40} className="position-absolute top-0 start-0 mt-1 ml-1"></FiArrowLeft>
          </Link>
            <div className="container">
              <div className="row align-items-start">
                <div className="mb-3 d-flex flex-column col-md">
                  <h2>{request.name}</h2>
                </div>
                <div className="mb-3 d-flex flex-column col-md rounded">
                  <label> Title</label>
                  <input name="title" defaultValue={request.title} onChange={e => setTitle(e.target.value)} className="form-control" required></input>
                </div>
              </div>
              <div className="row align-items-start">
                <div className="my-5 d-flex flex-column col-md">
                  <label> Question</label>
                  <input name="question" defaultValue={request.question} onChange={e => setQuestion(e.target.value)} className="form-control" required></input>
                </div>
                <div className="mb-4 d-flex flex-column col-md">
                  <label> Description</label>
                  <textarea name="description" defaultValue={request.description} onChange={e => setDescription(e.target.value)} className="form-control" required rows={5}></textarea>
                </div>
              </div>
              <div className="float-end mb-5">
                <button type="submit" className='btn btn-primary'>UPDATE</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

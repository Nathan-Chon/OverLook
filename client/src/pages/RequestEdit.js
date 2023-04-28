import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";
import './RequestEdit.css';

export default function RequestEdit() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [question, setQuestion] = useState('');
  const [userId, setUserId] = useState();
  const [memberData, setMemberData] = useState([]);

  function handleSubmit(event) {
    console.log(request);
    event.preventDefault();
    fetch(`/api/requests/${requestId}`, {
      method: 'PATCH',
      body: JSON.stringify({ title, description, question, userId }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
      })
      .catch(e => console.error(e))
    navigate('/edit')
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/users')
        const res2 = await fetch(`/api/requests/${requestId}`)
        if (!res.ok) throw new Error(`fetch Error ${res.status}`);
        if (!res2.ok) throw new Error(`fetch Error ${res.status}`);
        const data = await res.json();
        const [data2] = await res2.json();
        setMemberData(data);
        setRequest(data2);
        console.log(data2)
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
          <Link to='/edit'>
            <FiArrowLeft size={40} className="position-absolute top-0 start-0 mt-1 ml-1"></FiArrowLeft>
          </Link>
          <form method="post" onSubmit={handleSubmit}>
            <div className="container">
              <div className="row align-items-start">
                <div className="mb-3 d-flex flex-column col-md">
                  <label> Send Request to...</label>

                  <select className="form-control" required defaultValue={request.userId} onChange={e => { setUserId(e.target.value) }}>
                    <option value="Choose" disabled hidden>Choose</option>
                    {memberData.map((info) => <option value={info.userId} key={info.userId}>{info.name}</option>)}
                  </select>

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
          </form>
        </div>
      </div>
    </div>
  )
}

import {useState, useEffect } from 'react';
import { FiArrowLeft } from "react-icons/fi";

export default function RequestForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [question, setQuestion] = useState('');
  const [member, setMember] = useState('');
  const [memberData, setMemberData] = useState([]);
  function handleSubmit(event) {
    event.preventDefault();
    console.log(title, description, question)
    fetch('/api/requests', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title, description, question, member})
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
      })
      .catch(e => console.error(e))
  }

  useEffect(()=> {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setMemberData(data))
      .catch(console.error);
  },[])


  return (
    <div className="container">
      <div className="row min-vh-100 pb-5 justify-content-center align-items-center">
        <div className="col col-md-8 bg-light rounded w-100 position-relative">
          <h1 className="text-center my-5">Form Creation</h1>
          <FiArrowLeft size={40} className="position-absolute top-0 start-0"></FiArrowLeft>
          <form method="post" onSubmit={handleSubmit}>
            <div className="container">
              <div className="row align-items-start">
                <div className="mb-3 d-flex flex-column col-md">
                  <label> Send Request to...</label>
                  <select className="form-control" required defaultValue={'Choose'}>
                    <option value="Choose" disabled hidden>Choose</option>
                    {memberData.map((info) => <option value={info.userId} key={info.userId} onChange={e => setMember(e.target.value)}>{info.name}</option>)}
                  </select>
                </div>
                <div className="mb-3 d-flex flex-column col-md rounded">
                  <label> Title</label>
                  <input name="title" onChange={e => setTitle(e.target.value)} className="form-control" required></input>
                </div>
              </div>
              <div className="row align-items-start">
                <div className="my-5 d-flex flex-column col-md">
                  <label> Question</label>
                  <input name="question" onChange={e => setQuestion(e.target.value)} className="form-control" required></input>
                </div>
                <div className="mb-4 d-flex flex-column col-md">
                  <label> Description</label>
                  <textarea name="description" onChange={e => setDescription(e.target.value)} className="form-control" required rows={5}></textarea>
                </div>
              </div>
              <div className="float-end mb-5">
                <button type="submit" className='btn btn-primary'>SUBMIT</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

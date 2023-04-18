import {useState } from 'react';


export default function RequestForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [question, setQuestion] = useState('');
  function handleSubmit(event) {
    event.preventDefault();
    console.log(title, description, question)
    fetch('/api/requests', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title, description, question})
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
      })
      .catch(e => console.error(e))
  }


  return (
    <div className="container">
      <div className="row min-vh-100 pb-5 justify-content-center align-items-center">
        <div className="col col-md-8">
          <form method="post" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label> Title
                <input name="title" onChange={e => setTitle(e.target.value)}></input>
              </label>
            </div>
            <div className="mb-3">
              <label> Description
                <input name="description" onChange={e => setDescription(e.target.value)}></input>
              </label>
            </div>
            <div className="mb-3">
              <label> Question
                <input name="question" onChange={e => setQuestion(e.target.value)}></input>
              </label>
            </div>
            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  )
}

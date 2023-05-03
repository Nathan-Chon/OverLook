import { useEffect, useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { BsX } from "react-icons/bs";

export default function RequestPage() {
  const [requests, setRequests] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [theRequestId, setTheRequestId] = useState();

  async function fetchRequests() {
    const res = await fetch('/api/requests');
    if (!res.ok) throw new Error(`fetch Error ${res.status}`);
    return await res.json();
  }

  async function loadRequest() {
    try {
      const request = await fetchRequests();
      setRequests(request);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    loadRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDelete(event) {
    event.preventDefault();
    fetch(`/api/requests/${theRequestId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(console.error);
    loadRequest()
  }

  function Request({ request }) {
    const { title, description, question, requestId, name } = request;
    return (
      <div
        className="card mb-4 shadow-sm">
        <div className="card-body">
          <button type="button" className='position-absolute top-0 end-0 border-0 btn' data-toggle="modal" data-target="#exampleModalCenter" onClick={() => setTheRequestId(requestId)}>
            <BsX size={30}></BsX>
          </button>
          <Link to={`requestEdit/${requestId}`} className="text-decoration-none text-dark">
            <h5 className="card-title">{title}</h5>
            <p className="description card-text">{description}</p>
            <p className="card-text">{question}</p>
            <p className='card-text text-secondary'>{name}</p>
          </Link >
        </div>
      </div>
    );
  }



  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading Catalog: {error.message}</div>;
  return (
    <div className="container">
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title" id="exampleModalLongTitle">Delete this request</h5>
            </div>
            <div class="modal-footer justify-content-between border-0">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" onClick={handleDelete} data-dismiss="modal">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row pb-5 justify-content-center align-items-center'>
        <div className='col-md w-100'>
          <div className='w-100 pb-5 mt-4'></div>
          <h1 className='text-center my-5'>Edit Requests</h1>
          <div className="row">
            {
              requests?.map((request) => (
                <div key={request.requestId} className="col-12 col-md-6 col-lg-4">
                  <Request request={request} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

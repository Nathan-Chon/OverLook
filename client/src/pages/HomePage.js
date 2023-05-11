import './HomePage.css';
import { Link } from 'react-router-dom';
import { BsPersonFill } from "react-icons/bs";
import { AiOutlineForm } from "react-icons/ai";

export default function Home() {
  return (
    <div className="container">
      <div className='row w-100 mb-5'></div>
      <div className="row min-vh-100 justify-content-center align-items-center">
        <Link to="request" className='col-md bg-light mx-4 sizing rounded' style={{ textDecoration: 'none' }}>
          <h2 className='text-center my-5 title'>Request Form</h2>
          <AiOutlineForm className='align-text-center w-100 icon' size={100}></AiOutlineForm>
        </Link>
        <Link to="dataView" className='col-md bg-light mx-4 sizing rounded' style={{ textDecoration: 'none' }}>
          <h2 className='text-center my-5 title'>Members</h2>
          <BsPersonFill className='align-text-center w-100 icon' size={100}></BsPersonFill>
        </Link>
      </div>
    </div>
  );
}

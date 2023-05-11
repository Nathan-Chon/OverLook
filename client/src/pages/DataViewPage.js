import React from "react";
import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from 'react-router-dom';
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

export default function DataViewPage() {
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const columns = [
    {
      dataField: "requestId",
      text: "RequestId",
    },
    {
      dataField: "name",
      text: "Name",
      sort: true
    },
    {
      dataField: "phoneNumber",
      text: "Phone Number"
    },
    {
      dataField: "email",
      text: "Email"
    },
    {
      dataField: "",
      text: "Form Response",
      formatter: (cellContent: string, row: IMyColumnDefinition) => {
        const number = row.requestId;
        return <Link to={`dataRequest/${number}`}> <p>Form URL</p> </Link>
      }
    },
    {
      dataField: "createdAt",
      text: "Date",
      formatter: (cellContent: string, row: IMyColumnDefinition) => {
        let theDate = cellContent;
        let date = new Date(Date.parse(theDate))
        const dated = date.toDateString()
        return <p>{dated}</p>
      }
    }
  ];

  const sortOption = {
    sortCaret: (order, column) => {
      if (!order) return (<span><AiOutlineArrowUp /> <AiOutlineArrowDown /> </span>);
      else if (order === 'asc') return (<AiOutlineArrowUp/>);
      else if (order === 'desc') return (<AiOutlineArrowDown/>);
      return null;
    }
  };

  useEffect(()=> {
    setIsLoading(true);
    async function fetchData() {
      try {
        const res = await fetch('/api/requests')
        if (!res.ok) throw new Error(`fetch Error ${res.status}`);
        const data = await res.json();
        setUserInfo(data);
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false);
        console.log(userInfo)


      }
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="container">
      <div className="row min-vh-100 pb-5 justify-content-center align-items-center">
        <div className="col col-md-8 bg-light rounded w-100 position-relative">
          <div className="App text-center px-2 pt-3">
            <BootstrapTable
              bootstrap5
              keyField="requestId"
              data={userInfo}
              columns={columns}
              sort={sortOption}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

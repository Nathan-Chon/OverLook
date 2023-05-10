import React from "react";
import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from 'react-router-dom';


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
      dataField: "requestId",
      text: "Form Response",
      formatter: (cellContent: string, row: IMyColumnDefinition) => {
        const number = row.requestId;
        return <Link to={`dataRequest/${number}`}> <button className="btn btn-primary btn-xs">Form URL</button> </Link>
      }
    },
    {
      dataField: "createdAt",
      text: "Time"
    }
    // {
    //   dataField: "time",
    //   text: "Time"
    // },
    // {
    //   dataField: "date",
    //   Text: "Date"
    // }
  ];

  useEffect(()=> {
    setIsLoading(true);
    async function fetchData() {
      try {
        const res = await fetch('/api/requests')
        if (!res.ok) throw new Error(`fetch Error ${res.status}`);
        const data = await res.json();
        setUserInfo(data);
        console.log(userInfo)
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
          <div className="App">
            <BootstrapTable
              bootstrap5
              keyField="requestId"
              data={userInfo}
              columns={columns}

            />
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useParams } from 'react-router-dom';


export default function DataViewPage() {
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { requestId } = useParams();
  const [requestInfo, setRequestInfo] = useState();
  const columns = [
    {
      dataField: "userId",
      text: "UserId",
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
      dataField: "request",
      text: "Form Response",
      formatter: (cellContent: string, row: IMyColumnDefinition) => {
          return <button className="btn btn-primary btn-xs" onClick={() => console.log('hi')}>Form URL</button>
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
        // const res2 = await fetch(`/api/requests/${requestId}`)
        if (!res.ok) throw new Error(`fetch Error ${res.status}`);
        // if (!res2.ok) throw new Error(`fetch Error ${res.status}`);
        const data = await res.json();
        // const [data2] = await res2.json();
        setUserInfo(data);
        // setRequestInfo(data2);
        console.log(userInfo)
        console.log(requestInfo)
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
              keyField="userId"
              data={userInfo}
              columns={columns}

            />
          </div>
        </div>
      </div>
    </div>
  );
}

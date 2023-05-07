import React from "react";
import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";


const products = [
  { id: 0, name: "Item name 0", price: 2100 },
  { id: 1, name: "Item name 1", price: 2101 },
  { id: 2, name: "Item name 2", price: 2102 },
  { id: 3, name: "Item name 3", price: 2103 }
];



export default function DataViewPage() {
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
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
      text: "Form Response"
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
        const res = await fetch('/api/users')
        if (!res.ok) throw new Error(`fetch Error ${res.status}`);
        const data = await res.json();
        setUserInfo(data);
        console.log(userInfo)
        console.log(products)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false);
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

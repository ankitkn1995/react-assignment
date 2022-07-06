/** @format */

import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const UserInfo = () => {
  const { users } = useSelector((state) => state.crud);
  const { id } = useParams();
  const singleUser = users?.res?.find((item) => item.id == id);
  console.log(singleUser);
  return (
    <div style={{ marginTop: "100px" }}>
      {singleUser && (
        <div className='table__info'>
          <div className='table__heading'>user info</div>
          <div className='table__cel'>
            <span>
              <b>UserId:</b>
            </span>{" "}
            {singleUser.id}
          </div>
          <div className='table__cel'>
            <span>
              <b>Name:</b>
            </span>{" "}
            {singleUser.name}
          </div>
          <div className='table__cel'>
            <span>
              <b>Email:</b>
            </span>{" "}
            {singleUser.email}
          </div>
          <div className='table__cel'>
            <span>
              <b>Phone No.:</b>
            </span>{" "}
            {singleUser.mobile}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;

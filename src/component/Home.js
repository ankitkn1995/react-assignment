/** @format */
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delUser, loadUsers, sortUsers } from "../crud/crudSlice";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUsers({ start: 0, end: 5, currentPage: 0 }));
  }, []);
  const [sortValue, setSortValue] = useState("");
  const { users, loading, currentPage, pageLimit } = useSelector(
    (state) => state.crud
  );
  const sortOption = ["Name", "Email"];

  const handleDel = (id) => {
    window.confirm("are you sure you want to del");
    dispatch(delUser({ id }));
    window.location.reload();
    window.alert("user removed");
  };

  const sortChange = (e) => {
    let sortStr = e.target.value
      .toLowerCase()
      .split(" ")
      .map((item, index) => item.charAt(0).toUpperCase() + item.substring(1))
      .join(" ");
    console.log(sortStr);
    if (sortOption.includes(sortStr)) {
      setSortValue(e.target.value);
      dispatch(sortUsers(e.target.value));
    } else {
      dispatch(loadUsers({ start: 0, end: 5, currentPage: 0 }));
      setSortValue("");
    }
  };
  console.log(loading);

  return (
    <div className='table__top'>
      <div className='table__sort'>
        <div>Sort By:</div>
        <select value={sortValue} onChange={sortChange}>
          <option>Please select</option>
          {sortOption.map((item, index) => (
            <option value={item.toLowerCase()} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.res?.length > 0 &&
              users?.res?.map((item, index) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>
                    <div className='table__action__sec'>
                      <div className='table__action__bt'>
                        <Link to={`/user/${item.id}`}> View</Link>
                      </div>
                      <div className='table__action__bt'>
                        <Link to={`/editUser/${item.id}`}>Edit</Link>
                      </div>
                      <div className='table__action__bt'>
                        <Link to='#' onClick={() => handleDel(item.id)}>
                          Del
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div>
          <div className='table__page'>
            {users?.currentPage > 0 && (
              <div
                className='table__page__bt'
                onClick={() =>
                  dispatch(
                    loadUsers({
                      start: (users?.currentPage - 1) * 5,
                      end: users?.currentPage * 5,
                      currentPage: users?.currentPage - 1,
                    })
                  )
                }>
                Prev
              </div>
            )}
            {users?.currentPage != null && (
              <div className='table__page__bt active'>
                {users?.currentPage + 1}
              </div>
            )}
            {users?.res?.length === pageLimit && (
              <div
                className='table__page__bt'
                onClick={() =>
                  dispatch(
                    loadUsers({
                      start: (users?.currentPage + 1) * 5,
                      end: (users?.currentPage + 2) * 5,
                      currentPage: users?.currentPage + 1,
                    })
                  )
                }>
                Next
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

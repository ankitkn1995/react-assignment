/** @format */
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delUser, loadUsers } from "../crud/crudSlice";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUsers());
  }, []);
  const { users, loading } = useSelector((state) => state.crud);
  const handleDel = (id) => {
    window.confirm("are you sure you want to del");
    dispatch(delUser({ id }));
    window.location.reload();
    window.alert("user removed");
  };
  return (
    <div className='table__top'>
      <div></div>
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
            {users?.length > 0 &&
              users?.map((item, index) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>
                    <div>
                      <div>
                        <Link to={`/user/${item.id}`}> View</Link>
                      </div>
                      <div>
                        <Link to='#'>Edit</Link>
                      </div>
                      <div>
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
      </div>
    </div>
  );
};

export default Home;

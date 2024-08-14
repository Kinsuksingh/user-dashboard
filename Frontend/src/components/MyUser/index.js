import React from 'react';
import { Button } from 'react-bootstrap';
import { CiEdit } from "react-icons/ci";
import { FaBan } from "react-icons/fa";

function MyUser({ user, onEdit, onBan }) {
  return (
    <tr>
      <td>{user.userId}</td>
      <td>{user.username}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Button variant="secondary" onClick={() => onEdit()}><CiEdit/></Button>
      </td>
      <td>
        <Button variant="danger" onClick={() => onBan()}><FaBan/></Button>
      </td>
      
    </tr>
  );
}

export default MyUser;

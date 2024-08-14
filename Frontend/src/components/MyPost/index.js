import React from 'react';
import { Button } from 'react-bootstrap';
import { BiSolidHide } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";

function MyUser({ post, onDelete, onHide }) {
    return (
    <tr>
        <td>{post.postId}</td>
        <td>{post.postCaption}</td>
        <td>{post.mediaUrl}</td>
        <td>
            <Button variant="secondary" onClick={() => onDelete()}><RiDeleteBin5Fill/></Button>
        </td>
        <td>
            <Button variant="danger" onClick={() => onHide()}><BiSolidHide/></Button>
        </td>
    </tr>
    );
}

export default MyUser;

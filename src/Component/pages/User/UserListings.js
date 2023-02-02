import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";

import {
  deleteUserData,
  editUserData,
  removeUserData,
} from "../../../redux/Slice/UserSlice";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";

const UserListings = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.users?.userData);
  const [rows, setRows] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setRows(data);
    }, 1500);
  }, [data]);

  const DeleteData = (uniqueId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your record has been deleted.", "success");
        const newData = data.filter((item) => item.key != uniqueId);
        dispatch(deleteUserData(newData));
      }
    });
  };
  const editData = (row) => {
    navigate("/user-form");
    dispatch(editUserData(row));
  };
  return (
    <div>
      <div className="btn-User-Listing">
        <Button
          variant="contained"
          onClick={() => {
            navigate("/user-form");
            dispatch(removeUserData());
          }}
          startIcon={<AddIcon />}
        >
          ADD User
        </Button>
        &nbsp;
      </div>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>User List</h1>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className="margin-Top"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <span className="Table-Font-Size-UserList">Name</span>
              </TableCell>
              <TableCell align="center">
                <span className="Table-Font-Size-UserList"> Email </span>
              </TableCell>

              <TableCell align="center">
                <span className="Table-Font-Size-UserList">Username </span>
              </TableCell>
              <TableCell align="center">
                <span className="Table-Font-Size-UserList">Mobile Number</span>
              </TableCell>
              <TableCell align="center">
                <span className="Table-Font-Size-UserList">Role</span>
              </TableCell>
              <TableCell align="center">
                <span className="Table-Font-Size-UserList"> Action</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.email} </TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{row.mobile}</TableCell>
                <TableCell align="center">{row.role}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => DeleteData(row.key)}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                  &nbsp;
                  <Button
                    variant="contained"
                    onClick={() => {
                      editData(row);
                    }}
                    startIcon={<CreateIcon />}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell colSpan={7}>
                {data.length === 0 ? (
                  <h1 align={"center"}>No Record Found</h1>
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {!rows && data.length >= 1 && (
          <HashLoader color="#007aff" style={{ textAlign: "center" }} />
        )}
      </TableContainer>
    </div>
  );
};

export default UserListings;

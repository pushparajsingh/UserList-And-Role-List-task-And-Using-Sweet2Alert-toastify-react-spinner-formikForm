import { Button } from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRoleData,
  editRoleData,
  removeRoleData,
} from "../../redux/Slice/RoleSlice";
import { HashLoader } from "react-spinners";

const RoleListing = () => {
  const navigate = useNavigate();
  const roleData = useSelector((state) => state?.roles?.roleData);
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState();
  React.useEffect(() => {
    setTimeout(() => {
      setRows(roleData);
    }, 800);
  }, [roleData]);
  const confirmDelete = (id) => {
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
        const data = roleData.filter((item) => item.roleKey != id);
        dispatch(deleteRoleData(data));
      }
    });
  };

  const editData = (row) => {
    navigate("/role-form");
    dispatch(editRoleData(row));
  };
  return (
    <>
      <div>
        <div className="Btn-Role-listing">
          <Button
            variant="contained"
            onClick={() => {
              navigate("/role-form");
              dispatch(removeRoleData());
            }}
          >
            Add Role
          </Button>
        </div>
        <h1 style={{ textAlign: "center" }}>Role List</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <b>Role Label</b>
                </TableCell>
                <TableCell align="center">
                  <b>Role Key</b>
                </TableCell>
                <TableCell align="center">
                  <b>Action</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows?.map((row) => (
                <TableRow
                  key={row.roleKey}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.roleLabel}</TableCell>
                  <TableCell align="center">{row.roleKey}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        confirmDelete(row.roleKey);
                      }}
                    >
                      Delete
                    </Button>
                    &nbsp;
                    <Button variant="contained" onClick={() => editData(row)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={7}>
                  {roleData.length === 0 ? (
                    <h1 align={"center"}>No Record Found</h1>
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {!rows && roleData.length >= 1 && (
          <HashLoader color="#007aff" style={{ textAlign: "center" }} />
        )}
      </div>
    </>
  );
};

export default RoleListing;

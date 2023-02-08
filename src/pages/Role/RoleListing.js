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
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRoleData,
  getRoleData,
  resetRoleData,
} from "../../Redux/Slice/RoleSlice";

import TableNoRecordFound from "../../Components/Table/TableNoRecordFound";
const RoleListing = () => {
  const navigate = useNavigate();
  const roleData = useSelector((state) => state?.roles?.roleData);
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setRows(roleData);
  }, [roleData]);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
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
    dispatch(getRoleData(row));
  };
  return (
    <>
      <div>
        <div className="Btn-Role-listing">
          <Button
            variant="contained"
            onClick={() => {
              navigate("/role-form");
              dispatch(resetRoleData());
            }}
            startIcon={<AddIcon />}
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
              {!isLoading &&
                rows?.map((row) => (
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
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                      &nbsp;
                      <Button
                        variant="contained"
                        onClick={() => editData(row)}
                        startIcon={<CreateIcon />}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              <TableNoRecordFound
                colSpan={7}
                loading={isLoading}
                roleData={roleData.length == 0}
              />
            </TableBody>
          </Table>
        </TableContainer>
        {/* {!rows && roleData.length >= 1 && (
          <HashLoader color="#007aff" style={{ textAlign: "center" }} />
        )} */}
      </div>
    </>
  );
};

export default RoleListing;

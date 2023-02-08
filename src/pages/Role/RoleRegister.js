import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerRoleData, updateRoleData } from "../../Redux/Slice/RoleSlice";
import { useNavigate } from "react-router-dom";
import { numberKeyRegExp } from "../../Components/ReguxValidation";

const validationSchema = yup.object({
  roleLabel: yup
    .string("Enter your roleLabel:")
    .required("Role Label is required"),
  roleKey: yup
    .string("Enter your roleKey")
    .min(3, "Role key at least 3 digit")
    .matches(numberKeyRegExp, "Role Key is not valid,Write in number format")
    .required("Role Key is required"),
});
const toastifyObject = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};
const RoleRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roleData = useSelector((state) => state?.roles?.roleData);
  const updateData = useSelector((state) => state?.roles?.updateRoleData);
  const formik = useFormik({
    initialValues: updateData
      ? updateData
      : {
          roleLabel: "",
          roleKey: "",
        },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (updateData) {
        const uniqueKey = roleData.filter(
          (item) => item.roleKey == values.roleKey
        );
        console.log("unique", uniqueKey);
        if (updateData.roleKey == values.roleKey || uniqueKey.length == 0) {
          const updatedData = roleData?.map((item) => {
            if (updateData.roleKey == item.roleKey) {
              return values;
            } else {
              return item;
            }
          });
          dispatch(updateRoleData(updatedData));
          toast.success("Role submited successfully", toastifyObject);
          navigate("/role-listing");
        } else {
          alert("This key has already exist, please try another key");
        }
      } else {
        const data = roleData.filter((item) => item.roleKey == values.roleKey);
        if (data != 0) {
          alert("This key has already exist, please try another key");
        } else {
          dispatch(registerRoleData(values));
          toast.success("Form submited successfully", toastifyObject);
          navigate("/role-listing");
        }
      }
    },
  });

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "3rem" }}>
        {updateData ? "Role Labeling Update" : "Role Labeling"}
      </h1>
      <div id="centerRoleLabelBox">
        <form onSubmit={formik.handleSubmit}>
          <div className="box-label">
            <TextField
              fullWidth
              name="roleLabel"
              label="Role Label"
              value={formik.values.roleLabel}
              onChange={formik.handleChange}
              error={
                formik.touched.roleLabel && Boolean(formik.errors.roleLabel)
              }
              helperText={formik.touched.roleLabel && formik.errors.roleLabel}
            />
          </div>

          <div className="box-label">
            <TextField
              fullWidth
              name="roleKey"
              label="Role Key"
              value={formik.values.roleKey}
              onChange={formik.handleChange}
              error={formik.touched.roleKey && Boolean(formik.errors.roleKey)}
              helperText={formik.touched.roleKey && formik.errors.roleKey}
            />
          </div>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default RoleRegister;

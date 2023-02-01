import { useFormik } from "formik";
import * as React from "react";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData, registerUserData } from "../../redux/AllSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  username: yup
    .string()
    .min(1, "Mininum 1 characters")
    .max(15, "Maximum 15 characters")
    .required("You must enter a username"),
  mobile: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  role: yup.string("Enter your Role").required("Role is required"),
});

const UserRegister = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const updateData = useSelector((state) => state.Data.update);
  const getdata = useSelector((state) => state.Data.value);
  const getRoleLabeldata = useSelector((state) => state.Data.roleData);

  const uuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  const formik = useFormik({
    initialValues: updateData
      ? updateData
      : {
          name: "",
          email: "",
          password: "",
          username: "",
          mobile: "",
          role: "",
        },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      debugger;
      if (updateData) {
        const updatedData = getdata.map((item) => {
          if (updateData.key == item.key) {
            return values;
          } else {
            return item;
          }
        });
        dispatch(updateUserData(updatedData));
      } else {
        dispatch(registerUserData({ ...values, key: uuid() }));
      }
      toast.success("Form submited successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigator("/");
    },
  });

  return (
    <>
      <div className="RegisterForm">
        <h2 className="headingTop">
          {!updateData ? "Register Form" : "Update Form"}
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <div className="spaceBottom"></div>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <div className="spaceBottom"></div>
          <TextField
            fullWidth
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <div className="spaceBottom"></div>
          <TextField
            fullWidth
            name="mobile"
            label="Mobile Number"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />
          <div className="spaceBottom"></div>

          <TextField
            select={updateData ? false : true}
            fullWidth
            name="role"
            label="Role Key"
            value={formik.values.role}
            onChange={formik.handleChange}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
          >
            {getRoleLabeldata?.map((option, i) => (
              <MenuItem key={option.roleKey} value={option.roleLabel}>
                {option.roleLabel}
              </MenuItem>
            ))}
          </TextField>
          <div className="spaceBottom"></div>
          {!updateData ? (
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          ) : (
            ""
          )}
          <div className="spaceBottom"></div>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default UserRegister;

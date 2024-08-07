import React, { useContext } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { findUserId } from "../utils/utilFunctions";
import { UserContext } from "../store/UserContextProvider";
import { LoginContext } from "../store/LoginContextProvider";

const Login = () => {
  const navigate = useNavigate();
  // const users = useSelector((state) => state.reducer3.users);
  const { users, initialUserLoad } = useContext(UserContext);
  const { doLogin } = useContext(LoginContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // dispatch(registeredUsersAction.initialUserLoad());
  initialUserLoad();
  const onSubmit = (userCredentials) => {
    console.log(userCredentials); // This will contain the form data
    // Form submission handled by React Router's Form component
    if (userCredentials) {
      const uid = findUserId(
        users,
        userCredentials.email,
        userCredentials.password
      );
      if (uid) {
        // userCredentials.email === "rjpatel7991@gmail.com" &&
        // userCredentials.password === "ronak"
        console.log("LOGGED IN SUCCESSFULLY");
        toast.success("Logged in Successfully  !", {
          position: "top-center",
        });

        // dispatch(
        //   loginStatusActions.doLogin({
        //     uid: uid,
        //   })
        // );

        doLogin({
          uid: uid,
        });

        navigate("/");
      } else {
        toast.error("Incorrect email or password...", {
          position: "top-center",
        });
        console.log("NOT AUTHORIZED");
      }
    }
  };

  return (
    <div className=" flex flex-col bg-orange-50  border-orange-300 border-1 shadow-lg rounded-xl w-1/2">
      <div className="p-11 flex flex-col h-full items-center justify-center mb-12">
        <div className="flex w-full justify-center ">
          <h1 className="text-xl font-bold">Login</h1>
        </div>

        <div className="w-full">
          <Form
            className="flex flex-col mt-9 "
            method="post"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="font-light flex p-6 flex-col ">
              <label className="mt-2" htmlFor="email">
                Email
              </label>
              <input
                className="rounded-md mt-2 h-10  placeholder:text-slate-200 placeholder:italic"
                type="text"
                id="email"
                name="email"
                {...register("email", {
                  required: "Please enter the email..",
                  validate: (val) => {
                    if (!val.includes("@")) {
                      return "Email must include @ character..";
                    }

                    return true;
                  },
                })}
                placeholder="Enter your email"
              />

              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
              <label className="mt-6" htmlFor="password">
                Password
              </label>
              <input
                className=" rounded-md mt-2 h-10 placeholder:text-slate-200 placeholder:italic"
                id="password"
                type="password"
                name="password"
                {...register("password", {
                  required: "Please enter the password ..",
                  validate: (val) => {
                    if (val.length < 3) {
                      return "Passwords must be atleast 4 characters long";
                    }
                    return true;
                  },
                })}
                placeholder="Enter your password"
              />

              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <div className="flex justify-center">
              <button
                className="mt-10 mx-11 h-10 bg-orange-400 bg-opacity-70 rounded-lg w-full font-bold  active:bg-opacity-35 "
                type="submit"
              >
                Login
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../store/UserContextProvider";

const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const { registerUserAccount } = useContext(UserContext);
  function onSubmit(data) {
    console.log(data);
    toast.success("Account created successfully ..", {
      position: "top-center",
    });
    // dispatch(registeredUsersAction.registerUserAccount(data));

    registerUserAccount(data);

    navigate("/login");
  }
  return (
    <div className=" flex flex-col bg-orange-50  border-orange-300 border-1 shadow-lg rounded-xl w-1/2">
      <div className="p-11 flex flex-col h-full items-center justify-center mb-12">
        <div className="flex w-full justify-center ">
          <h1 className="text-xl font-bold">Create a new account</h1>
        </div>
        <div className="w-full">
          <Form
            className="flex flex-col mt-9 "
            method="post"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="font-light flex p-6 flex-col ">
              <label className="mt-2" htmlFor="fullname">
                Full Name
              </label>
              <input
                className="rounded-md mt-2 h-10  placeholder:text-slate-200 placeholder:italic"
                type="text"
                id="fullname"
                name="fullname"
                {...register("fullname", {
                  required: "Please enter the fullname..",
                })}
                placeholder="Enter your name"
              />

              {errors.fullname && (
                <span className="text-red-500">{errors.fullname.message}</span>
              )}
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
              <label className="mt-6" htmlFor="repeatPassword">
                Confim Password
              </label>
              <input
                className=" rounded-md mt-2 h-10 placeholder:text-slate-200 placeholder:italic"
                id="repeatPassword"
                type="password"
                name="repeatPassword"
                {...register("repeatPassword", {
                  required: "Please enter the password ..",
                  validate: (val) => {
                    if (watch("password") != val) {
                      return "Your passwords do no match";
                    }
                    return true;
                  },
                })}
                placeholder="Enter password again"
              />

              {errors.repeatPassword && (
                <span className="text-red-500">
                  {errors.repeatPassword.message}
                </span>
              )}
            </div>
            <div className="flex justify-center">
              <button
                className="mt-10 mx-11 h-10 bg-orange-400 bg-opacity-70 rounded-lg w-full font-bold  active:bg-opacity-35 "
                type="submit"
              >
                Create Account
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

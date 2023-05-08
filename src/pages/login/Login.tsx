import PrimaryButton from "base/PrimaryButton";
import Textfield from "base/Textfield";
import { useFormik } from "formik";
import * as Yup from "yup";
import useLogin from "./useLogin";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(8)
    .required()
});



const Login = () => {

  const {
    isFetching,
    onSubmit,
  } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema
  });

  return (
    <>
      <div>
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="">
              <img src="/logo.svg" className="mx-auto" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" action="" onSubmit={formik.handleSubmit}>
                <Textfield
                  label="Email"
                  formik={formik}
                />
                <Textfield
                  label="Password"
                  type="password"
                  formik={formik}
                />
                <PrimaryButton
                  isLoading={isFetching}
                >
                  Sign In
                </PrimaryButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
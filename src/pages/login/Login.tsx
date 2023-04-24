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
        <form action="" onSubmit={formik.handleSubmit}>
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
    </>
  )
}

export default Login;
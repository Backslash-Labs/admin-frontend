import PrimaryButton from "base/PrimaryButton";
import Textfield from "base/Textfield";
import { useFormik } from "formik";
import withNav from "hocs/withNav";
import * as Yup from "yup";
import usePlanForm from "./usePlanForm";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required(),
  price: Yup.number()
    .required(),
});



const PlanForm = () => {

  const {
    isFetching,
    onSubmit,
  } = usePlanForm();

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
    },
    onSubmit,
    validationSchema
  });

  return (
    <>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <Textfield
            label="Name"
            formik={formik}
          />
          <Textfield
            label="Price"
            formik={formik}
          />
          <PrimaryButton
            isLoading={isFetching}
          >
            Add Plan
          </PrimaryButton>
        </form>
      </div>
    </>
  )
}

export default withNav(PlanForm);
import PrimaryButton from "base/PrimaryButton";
import Select from "base/Select";
import Textfield from "base/Textfield";
import { useFormik } from "formik";
import withNav from "hocs/withNav";
import * as Yup from "yup";
import useRestaurantForm from "./useRestaurantForm";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required(),
  email: Yup.string()
    .email()
    .required(),
  workspaces: Yup.number()
    .required(),
  users: Yup.number()
    .required(),
  plan_id: Yup.number()
    .required(),
});



const ResturantForm = () => {

  const {
    isFetchingPlans,
    isFetching,
    onSubmit,
    plans,
  } = useRestaurantForm();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      users: 0,
      workspaces: 0,
      plan_id: null,
    },
    onSubmit,
    validationSchema
  });

  if (isFetchingPlans) return null;

  return (
    <>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <Textfield
            label="Name"
            formik={formik}
          />
          <Textfield
            label="Email"
            formik={formik}
          />
          <Textfield
            label="Users"
            formik={formik}
          />
          <Textfield
            label="Workspaces"
            formik={formik}
          />
          <Select
            label="Plan"
            name="plan_id"
            formik={formik}
            options={plans.map(({name, id}) => ({ name, value: id}))}
          />
          <PrimaryButton
            isLoading={isFetching}
          >
            Add Restaurant
          </PrimaryButton>
        </form>
      </div>
    </>
  )
}

export default withNav(ResturantForm);
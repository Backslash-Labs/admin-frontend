import PrimaryButton from "base/PrimaryButton";
import Select from "base/Select";
import Textfield from "base/Textfield";
import { Formik, useFormik } from "formik";
import withNav from "hocs/withNav";
import * as Yup from "yup";
import useRestaurantForm from "./useRestaurantForm";
import { useEffect, useState } from "react";

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

  const [edit, setEdit] = useState(false);

  const {
    isFetchingPlans,
    isFetching,
    onSubmit,
    plans,
    isEditing,
    restaurant,
    isFetchingRestaurant,
  } = useRestaurantForm();

  if (isFetchingPlans) return null;

  if(isFetchingRestaurant) return null;

  return (
    <>
      <div>
        <Formik
          initialValues={{
            ...restaurant,
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {
            (formik) => {
              return (
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
                    options={plans.map(({ name, id }) => ({ name, value: id }))}
                  />
                  <PrimaryButton
                    isLoading={isFetching}
                  >
                    Add Restaurant
                  </PrimaryButton>
                </form>
              )
            }
          }
        </Formik>
      </div>
    </>
  )
}

export default withNav(ResturantForm);
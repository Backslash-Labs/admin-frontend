import { Formik } from "formik";
import withNav from "hocs/withNav";
import * as Yup from "yup";
import useRestaurantForm from "./useRestaurantForm";
import { useState } from "react";
import { ResturantFormContext } from "./RestaurantFormContext";
import Form from "./Form";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required(),
  email: Yup.string()
    .email()
    .required(),
  allowed_branches: Yup.number()
    .required(),
  allowed_users: Yup.number()
    .required(),
  plan_id: Yup.number()
    .required(),
});

const ResturantForm = () => {

  const {
    isFetchingPlans,
    onSubmit,
    plans,
    restaurant,
    isFetchingRestaurant,
    isFetching,
  } = useRestaurantForm();

  const [selectedFeatures, setSelectedFeatures] = useState([]);

  if (isFetchingPlans) return null;

  if (isFetchingRestaurant) return null;

  if (plans.length == 0) return null;


  const resturantFormContext = {
    plans,
    selectedFeatures,
    setSelectedFeatures,
    isFetching,
  }

  const handleSubmit = (values) => {
    onSubmit({ ...values, features: selectedFeatures })
  }

  return (
    <>
      <ResturantFormContext.Provider
        value={resturantFormContext}
      >
        <div>
          <Formik
            initialValues={{
              ...restaurant,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {
              (formik) => <Form formik={formik} />
            }
          </Formik>
        </div>
      </ResturantFormContext.Provider>
    </>
  )
}

export default withNav(ResturantForm);
import FeatureCheckbox from "./FeatureCheckbox";
import PrimaryButton from "base/PrimaryButton";
import Select from "base/Select";
import Textfield from "base/Textfield";
import { useContext } from "react";
import { ResturantFormContext } from "./RestaurantFormContext";

const Form = ({ formik }) => {
  const { setSelectedFeatures, plans, isFetching } =
    useContext(ResturantFormContext);

  const onChangePlan = ({ target }) => {
    const { value } = target;

    try {
      // get plan by id

      // compare with == because value is a string
      let selectedPlans = plans.filter((plan) => plan.id == value);

      if (value) {
        let selectedPlan = selectedPlans[0];

        let selectedFeatureIds = selectedPlan.plan_features.map(
          (feature) => feature.feature.id
        );

        setSelectedFeatures([...selectedFeatureIds]);

        formik.handleChange({
          target: {
            name: "allowed_users",
            value: selectedPlan.allowed_users,
          },
        });
        formik.handleChange({
          target: {
            name: "allowed_branches",
            value: selectedPlan.allowed_branches,
          },
        });
      } else {
        setSelectedFeatures([]);
      }

      formik.handleChange({ target });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <form
        action=""
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-[12px]"
      >
        <Textfield label="Name" formik={formik} />
        <Textfield label="Email" formik={formik} />
        <Textfield label="Allowed Users" name="allowed_users" formik={formik} />
        <Textfield
          label="Allowed Branches"
          name="allowed_branches"
          formik={formik}
        />
        <Textfield
          label="Branch Location"
          name="branch_location"
          formik={formik}
        />
        <Select
          label="Plan"
          name="plan_id"
          onChange={onChangePlan}
          value={formik.values.plan_id}
          options={plans.map(({ name, id }) => ({ name, value: id }))}
        />
        {
          /* Last plan has all feature */
          plans[plans.length - 1].plan_features.map((plan_feature, i) => (
            <FeatureCheckbox key={i} feature={plan_feature.feature} />
          ))
        }
        <PrimaryButton isLoading={isFetching}>Add Restaurant</PrimaryButton>
      </form>
    </>
  );
};

export default Form;

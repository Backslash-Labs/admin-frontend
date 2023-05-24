import { Formik } from "formik";
import withNav from "hocs/withNav";
import * as Yup from "yup";
import useBranchForm from "./useBranchForm";
import Textfield from "base/Textfield";
import PrimaryButton from "base/PrimaryButton";

const validationSchema = Yup.object().shape({
  location: Yup.string().required(),
});

const BranchForm = () => {
  const { onSubmit, isFetching } = useBranchForm();

  return (
    <>
      <div>
        <Formik
          initialValues={{
            location: "",
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <form action="" onSubmit={formik.handleSubmit}>
              <Textfield label="Location" formik={formik} />
              <PrimaryButton isLoading={isFetching}>Add Branch</PrimaryButton>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default withNav(BranchForm);

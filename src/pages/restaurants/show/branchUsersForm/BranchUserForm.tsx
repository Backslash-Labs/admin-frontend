import { Formik } from "formik";
import withNav from "hocs/withNav";
import * as Yup from "yup";
import useBranchUserForm from "./useBranchUserForm";
import Textfield from "base/Textfield";
import PrimaryButton from "base/PrimaryButton";
import BranchSelect from "./BranchSelect";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required(),
  email: Yup.string()
    .email()
    .required(),
});


const BranchUserForm = () => {

  const {
    onSubmit,
    isFetching,
    branches,
    selectedBranches,
    setSelectedBranches,
  } = useBranchUserForm();

  const handleSubmit = (values) => {
    onSubmit({ ...values, branches: selectedBranches })
  }

  return (
    <>

      <div>
        <Formik
          initialValues={{
            name: "",
            email: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {
            (formik) => (
              <form action="" onSubmit={formik.handleSubmit}>
                <Textfield
                  label="Name"
                  formik={formik}
                />
                <Textfield
                  label="Email"
                  formik={formik}
                />
                <div className="grid grid-cols-3 mt-2 gap-2">
                  {
                    branches.map((branch, i) => <BranchSelect
                      key={i}
                      branch={branch}
                      selectedBranches={selectedBranches}
                      setSelectedBranches={setSelectedBranches}
                    />)
                  }
                </div>
                <PrimaryButton
                  isLoading={isFetching}
                >
                  Add User
                </PrimaryButton>
              </form>
            )
          }
        </Formik>
      </div>
    </>
  )
}

export default withNav(BranchUserForm);
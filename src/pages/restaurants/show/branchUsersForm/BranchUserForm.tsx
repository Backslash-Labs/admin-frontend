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
  username: Yup.string()
    .required(),
  password: Yup.string()
    .min(8)
    .required()
});


const BranchUserForm = () => {

  const {
    onSubmit,
    isFetching,
    branches,
    selectedBranches,
    setSelectedBranches,
    asyncErrors,
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
                  asyncErrors={asyncErrors}
                />
                <Textfield
                  label="Email"
                  formik={formik}
                  asyncErrors={asyncErrors}
                />
                <Textfield
                  label="Username"
                  formik={formik}
                  asyncErrors={asyncErrors}
                />
                <Textfield
                  label="Password"
                  formik={formik}
                  type="password"
                  asyncErrors={asyncErrors}
                />
                <Textfield
                  name="password_confirmation"
                  label="Password Confirmation"
                  formik={formik}
                  type="password"
                  asyncErrors={asyncErrors}
                />
                <div className="mb-2">
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
                  {
                    asyncErrors["branches"] ?
                      <p className="text-[#DC143C] capitalize text-[12px] mt-[5px] bg-[#FFF0F0]">{asyncErrors["branches"][0]}</p>
                      : null
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
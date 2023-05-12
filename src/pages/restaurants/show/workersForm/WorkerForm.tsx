import { Formik } from "formik";
import withNav from "hocs/withNav";
import * as Yup from "yup";
import useWorkerForm from "./useWorkerForm";
import Textfield from "base/Textfield";
import PrimaryButton from "base/PrimaryButton";
import classNames from "lib/classNames";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required(),
  email: Yup.string()
    .required(),
});

const BranchSelect = ({ branch, selectedBranches, setSelectedBranches }) => {

  const fselectedBranches = selectedBranches.filter(selectedBranch => selectedBranch == branch.id)

  const isSelected = fselectedBranches.length > 0;  

  const onSelect = () => {
    if(isSelected){
      const i = selectedBranches.indexOf(fselectedBranches[0])
      selectedBranches.splice(i, 1);
    }else{
      selectedBranches.push(branch.id)
    }
    setSelectedBranches([...selectedBranches])
  }

  return (
    <div 
      className={
        classNames(
          "rounded-md border border-green-850 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-green-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 my-3 text-center",
          isSelected ? "bg-green-850 text-white" : "text-green-850",
        )
      }
      onClick={onSelect}
    >
      {branch.location}
    </div>
  )
}

const WorkerForm = () => {

  const {
    onSubmit,
    isFetching,
    branches,
    selectedBranches,
    setSelectedBranches,
  } = useWorkerForm();

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
                  Add Worker
                </PrimaryButton>
              </form>
            )
          }
        </Formik>
      </div>
    </>
  )
}

export default withNav(WorkerForm);
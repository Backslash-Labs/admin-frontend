import { Formik } from "formik";
import withNav from "hocs/withNav";
import * as Yup from "yup";
import useUserForm from "./useUserForm";
import { useState } from "react";
import Textfield from "base/Textfield";
import PrimaryButton from "base/PrimaryButton";


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required(),
    email: Yup.string()
        .email()
        .required(),
});

const UserForm = () => {

    const {
        onSubmit,
        user,
        isFetchingUser,
        isFetching,
        isEditing,
        asyncErrors,
    } = useUserForm();


    if (isFetchingUser) return null;


    const handleSubmit = (values) => {
        onSubmit({ ...values })
    }

    return (
        <>

            <div>
                <Formik
                    initialValues={{
                        ...user,
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {
                        (formik) => (
                            <form
                                action=""
                                onSubmit={formik.handleSubmit}
                                className="flex flex-col gap-[12px]"
                            >
                                <Textfield label="Name" formik={formik} asyncErrors={asyncErrors} />
                                <Textfield label="Email" type="email" formik={formik} asyncErrors={asyncErrors} />
                                <Textfield label="Password" type="password" formik={formik} asyncErrors={asyncErrors} />
                                <PrimaryButton isLoading={isFetching}>{ isEditing ? 'Update' : 'Add'  } User</PrimaryButton>
                            </form>
                        )
                    }
                </Formik>
            </div>
        </>
    )
}

export default withNav(UserForm);
import * as yup from 'yup';

export const step1Schema = yup.object().shape({
    name: yup.string().required("Name is a required field").min(3, "Name must be at least 3 characters"),
    age: yup.number().required("Age is a required field").positive("Age must be a positive number"),
    sex: yup.string().required("Sex is a required field").oneOf(["Male", "Female"], "Oneof [Male, Female”]"),
    mobile: yup
        .string()
        .required("Mobile is a required field")
        .matches(/^[6-9]\d{9}$/, "Invalid Indian Mobile Number"),
    govtIdType: yup.string().required("Government ID Type is a required field").oneOf(["Aadhar", "PAN"], "Invalid ID Type"),
    govtId: yup
        .string()
        .when("govtIdType", {
            is: "Aadhar",
            then: (step1Schema) => step1Schema.matches(/^[2-9]\d{11}$/, "Invalid Aadhar number"),
            otherwise: (step1Schema) => step1Schema.matches(/^[A-Za-z0-9]{10}$/, "Invalid PAN number"),
        }),
});

export const step2Schema = yup.object().shape({
    address: yup.string().optional(),
    state: yup.string().optional(),
    city: yup.string().optional(),
    country: yup.string().optional(),
    pincode: yup.string().optional().matches(/^\d+$/, "Invalid pincode"),
});
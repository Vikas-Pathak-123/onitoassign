import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Form.css";
import {
    TextField,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Container,
    Typography,
    Paper,
} from "@mui/material";
import { useDispatch } from 'react-redux';
import { addStep1FormData } from '../../actions/formActions';
import { step1Schema } from "../../utils/validation";
import { IStep1FormInput } from "../../utils/types";


interface Step1FormProps {
    onSubmit: (data: IStep1FormInput) => void;
}



const Step1Form: React.FC<Step1FormProps> = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IStep1FormInput>({ resolver: yupResolver(step1Schema) as any });
    const dispatch = useDispatch();

    const handleFormSubmit = (data: IStep1FormInput) => {
        console.log(data);
        dispatch(addStep1FormData(data));
        onSubmit(data);
    };


    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} className="form-paper">
                <Typography variant="h5" component="div" gutterBottom style={{ textAlign: "center" }}>
                    Step 1: Personal Information
                </Typography>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <TextField label="Name" {...register("name")} fullWidth margin="normal" />
                    {errors.name && <p>{errors.name.message}</p>}

                    <TextField label="Age" type="number" {...register("age")} fullWidth margin="normal" />
                    {errors.age && <p>{errors.age.message}</p>}

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Sex</InputLabel>
                        <Select {...register("sex")}>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </Select>
                    </FormControl>
                    {errors.sex && <p>{errors.sex.message}</p>}

                    <TextField label="Mobile" {...register("mobile")} fullWidth margin="normal" />
                    {errors.mobile && <p>{errors.mobile.message}</p>}

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Govt Issued ID Type</InputLabel>
                        <Select {...register("govtIdType")}>
                            <MenuItem value="Aadhar">Aadhar</MenuItem>
                            <MenuItem value="PAN">PAN</MenuItem>
                        </Select>
                    </FormControl>
                    {errors.govtIdType && <p>{errors.govtIdType.message}</p>}

                    <TextField label="Govt Issued ID" {...register("govtId")} fullWidth margin="normal" />
                    {errors.govtId && <p>{errors.govtId.message}</p>}

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        NEXT
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Step1Form;

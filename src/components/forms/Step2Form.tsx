import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import "./Form.css";
import {
    TextField,
    Button,
    Container,
    FormControl,
    InputLabel,
    Autocomplete,
    Typography,
} from "@mui/material";
import { useDispatch } from 'react-redux';
import { addStep2FormData } from '../../actions/formActions';
import { step2Schema } from "../../utils/validation";
import { IStep2FormInput } from "../../utils/types";


interface Step2FormProps {
    onSubmit: (data: IStep2FormInput) => void;
}


const Step2Form: React.FC<Step2FormProps> = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IStep2FormInput>({
        resolver: yupResolver(step2Schema),
    });

    const [countryOptions, setCountryOptions] = useState<string[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<string[]>([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("https://restcountries.com/v3.1/all");
                const countries = response.data.map((country: { name: { common: string } }) => country.name.common);
                setCountryOptions(countries);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);

    const handleCountryInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const filteredCountries = countryOptions.filter((country) =>
            country.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredCountries(filteredCountries);
    };

    const onSelectCountry = (selectedCountry: string | null) => {
        setValue("country", selectedCountry || "");
        setFilteredCountries([]);
    };

    const dispatch = useDispatch();

    const handleFormSubmit = (data: IStep2FormInput) => {
        console.log(data);
        dispatch(addStep2FormData(data));
        onSubmit(data);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography variant="h5" component="div" gutterBottom style={{textAlign:"center"}}>
                Step 2: Personal Information
            </Typography>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <TextField label="Address" {...register("address")} fullWidth margin="normal" />
                {errors.address && <p>{errors.address.message}</p>}

                <TextField label="State" {...register("state")} fullWidth margin="normal" />
                {errors.state && <p>{errors.state.message}</p>}

                <TextField label="City" {...register("city")} fullWidth margin="normal" />
                {errors.city && <p>{errors.city.message}</p>}

                <FormControl fullWidth margin="normal">
                    <InputLabel>Country</InputLabel>
                    <Autocomplete
                        options={filteredCountries}
                        onChange={(_event, value) => onSelectCountry(value)}
                        renderInput={(params) => (
                            <TextField {...params} {...register("country")} onChange={handleCountryInputChange} />
                        )}
                    />
                </FormControl>
                {errors.country && <p>{errors.country.message}</p>}

                <TextField label="Pincode" {...register("pincode")} fullWidth margin="normal" />
                {errors.pincode && <p>{errors.pincode.message}</p>}

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    SUBMIT
                </Button>
            </form>
        </Container>
    );
};

export default Step2Form;

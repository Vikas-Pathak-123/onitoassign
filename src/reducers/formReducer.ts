// formReducer.ts
import { createReducer } from '@reduxjs/toolkit';
import { addStep1FormData, addStep2FormData } from '../actions/formActions';
import { IStep1FormInput, IStep2FormInput } from '../utils/types';


interface FormState {
    formData1: IStep1FormInput[];
    formData2: IStep2FormInput[];
}

const initialState: FormState = {
    formData1: [],
    formData2: [],
};

export const formReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addStep1FormData, (state, action) => {
            state.formData1.push(action.payload);
        })
        .addCase(addStep2FormData, (state, action) => {
            state.formData2.push(action.payload);
        });
});

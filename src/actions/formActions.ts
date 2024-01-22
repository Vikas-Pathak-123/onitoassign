// formActions.ts
import { createAction } from '@reduxjs/toolkit';
import { IStep1FormInput, IStep2FormInput } from '../utils/types';

export const addStep1FormData = createAction<IStep1FormInput>('ADD_STEP1_FORM_DATA');
export const addStep2FormData = createAction<IStep2FormInput>('ADD_STEP2_FORM_DATA');

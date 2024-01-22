export interface IStep1FormInput {
    name: string;
    age: number;
    sex: string;
    mobile: string;
    govtIdType: string;
    govtId: string;
}
export interface IStep2FormInput {
    address?: string;
    state?: string;
    city?: string;
    country?: string;
    pincode?: string;
}
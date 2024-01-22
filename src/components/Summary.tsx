import React, { useEffect, useRef } from "react";
import DataTables from "datatables.net-dt";
import { Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';
import { IStep1FormInput, IStep2FormInput } from "../utils/types";


interface SummaryProps {
    formData1: Array<IStep1FormInput>;
    formData2: Array<IStep2FormInput>;
}
const Summary: React.FC<SummaryProps> = () => {
    const formData1 = useSelector((state: RootState) => state.form.formData1);
    const formData2 = useSelector((state: RootState) => state.form.formData2);

    const tableRef = useRef<HTMLTableElement>(null);

    useEffect(() => {
        if (formData2.length > 0) {
            const mergedFormData = formData2.map((data2, index) => {
                // Use the index to get the corresponding data from formData1
                const correspondingData1 = formData1[index];

                // Merge data from formData1 and formData2
                return {
                    ...correspondingData1,
                    address: data2.address || "",
                    state: data2.state || "",
                    city: data2.city || "",
                    country: data2.country || "",
                    pincode: data2.pincode || "",
                };
            });

            const tableData = mergedFormData.map((mergedData) => ({
                name: mergedData?.name || "",
                age: mergedData?.age || "",
                sex: mergedData?.sex || "",
                mobile: mergedData?.mobile || "",
                govtIdType: mergedData?.govtIdType || "",
                govtId: mergedData?.govtId || "",
                address: mergedData?.address || "",
                state: mergedData?.state || "",
                city: mergedData?.city || "",
                country: mergedData?.country || "",
                pincode: mergedData?.pincode || "",
            }));
            const tableConfig = {
                columns: [
                    { title: "Name", data: "name" },
                    { title: "Age", data: "age" },
                    { title: "Sex", data: "sex" },
                    { title: "Mobile", data: "mobile" },
                    { title: "Govt ID Type", data: "govtIdType" },
                    { title: "Govt ID", data: "govtId" },
                    { title: "Address", data: "address" },
                    { title: "State", data: "state" },
                    { title: "City", data: "city" },
                    { title: "Country", data: "country" },
                    { title: "Pincode", data: "pincode" },
                ],
            };

            console.log("Table Data:", tableData);
            console.log("Table Config:", tableConfig);

            const dt = new DataTables(tableRef.current!, {
                ...tableConfig,
                data: tableData,
                destroy: true,
            });

            return () => {
                dt.destroy();
            };
        }
    }, [formData2]);

    return (
        <>
            <Typography variant="h5" component="div" gutterBottom>
                Data Table
            </Typography>
            {formData2.length > 0 && <table ref={tableRef}></table>}
        </>
    );
};

export default Summary;

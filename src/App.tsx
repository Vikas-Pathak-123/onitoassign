
import React, { useState } from 'react';
import "datatables.net-dt/css/jquery.dataTables.css";
import Summary from "./components/Summary";
import Step1Form from './components/forms/Step1Form';
import Step2Form from './components/forms/Step2Form';

const App: React.FC = () => {
  const [show, setshow] = useState(true)

  const handleStep1Submit = () => {
    setshow(false)
  };

  const handleStep2Submit = () => {
    setshow(true)
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center"}}>
        <div style={{ width: "30%" }}>
          {show && < Step1Form onSubmit={handleStep1Submit} />}
          {!show && <Step2Form onSubmit={handleStep2Submit} />}
        </div>
        <div style={{ width: "80%" }}>
          <Summary formData1={[]} formData2={[]} />
          </div>
      </div>


    </>
  );
};

export default App;

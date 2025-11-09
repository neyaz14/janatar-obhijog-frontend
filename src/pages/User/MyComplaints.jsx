import React from "react";
import ComplaintForm from "../../Components/Complaints/ComplaintBox";

const MyComplaints = () => {
  return (
    <div className="flex flex-col bg-green-50 ">
      <div className="mr-5 p-5 flex flex-col items-center justify-center gap-3">
        <p>
          <img
            src="../../../public/logoTransparent.png"
            alt="জনতার অভিযোগ"
            className="w-36"
          />
        </p>
        <h1 className="text-black font-semibold text-4xl">জনতার অভিযোগ</h1>
        <p className="text-gray-800">Digital Complaint Box</p>
      </div>
      <ComplaintForm></ComplaintForm>
    </div>
  );
};

export default MyComplaints;

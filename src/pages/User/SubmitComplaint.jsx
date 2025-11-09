import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/authProvider';
import AllComplaintNew from '../../Components/AllComplaintNew/AllComplaintNew';
const SubmitComplaint = () => {
const {user} = useContext(AuthContext);
console.log(user)
    return (
        <div className='w-[70%] mx-auto flex items-center justify-center bg-green-50 text-black'>
            <></>
            <AllComplaintNew user={user}></AllComplaintNew>
        </div>
    );
};

export default SubmitComplaint;
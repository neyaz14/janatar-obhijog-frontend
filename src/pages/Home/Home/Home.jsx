import React from 'react';
import Banner from '../Banner/Banner';
import CallToAction from '../CallToAction/CallToAction';
import FeaturesSection from '../FeaturesSection/FeaturesSection';
import RoleBasedSection from '../RoleBasedSection/RoleBasedSection';
import AllComplainWatch from '../AllComplainWatch/AllComplainWatch';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <CallToAction></CallToAction>
            <FeaturesSection></FeaturesSection>
            <AllComplainWatch></AllComplainWatch>
        </div>
    );
};

export default Home;
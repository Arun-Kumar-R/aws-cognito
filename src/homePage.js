import React from 'react'
import Amplify, { Auth } from 'aws-amplify';

// Amplify configured
Amplify.configure({
    Auth: {
        identityPoolId: 'us-east-2:890369dc-0696-48a9-8c77-b097502df181',
        region: 'us-east-2',
        identityPoolRegion: 'us-east-2',
        userPoolId: 'us-east-2_wSwfNHiZC',
        userPoolWebClientId: '2flvubsspmfn5n1juv0adb83nq',
    }
  });

async function handleSignOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}  
const HomePage = () => {
    return (
        <>
            <h2>Home Pahe</h2>
            <p>welcome to Home Page</p>
            <button type = "submit" onClick = {handleSignOut}>SignOut</button>
        </>
    )
}

export default HomePage;

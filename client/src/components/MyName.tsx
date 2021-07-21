import React, { useState } from "react";

import Particles from "react-particles-js";

const MyName = ({ setHasMyName }: { setHasMyName: any }) => {
    const [myName, setMyName] = useState<string>('')

    const handleSetMyName = (event: React.FormEvent<HTMLInputElement>) => {
        setMyName(event.currentTarget.value)
    }

    const handleSaveMyName = async () => {
        await localStorage.setItem('myName', myName)
        setHasMyName(true)
    }

    return (
        <div className='container_component_myname'>
            <Particles
                params={{
                    particles: {
                        number: {
                            value: 100,
                            density: {
                                enable: true,
                                value_area: 1000,
                            }
                        },
                    },
                    fullScreen: {
                        enable: true,
                        zIndex: 1
                    }
                }}
            />
            <h1>What is your name?</h1>
            <input
                type='text'
                onChange={handleSetMyName} />
            <button onClick={handleSaveMyName}>
                Enter
            </button>
        </div>
    )
}

export default MyName
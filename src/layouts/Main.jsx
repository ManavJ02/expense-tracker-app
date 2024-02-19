import { Outlet, useLoaderData } from "react-router-dom";  // react-router-dom imports
import wave from "../assets/wave.svg";  // assets
import { fetchData } from "../helpers";  // helper functions
import Nav from "../components/Nav";  // components

// loader function
export function mainLoader() {
    const userName = fetchData("userName");
    return { userName }
}

const Main = () => {
    const { userName } = useLoaderData()

    return (
        <div className="layout">
            <Nav userName={userName}/>
            <main>
                <Outlet />
            </main>
            <img src={wave} alt="" />
        </div>
    )
};

export default Main;

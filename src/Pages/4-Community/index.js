import {Route, Router, Routes} from "react-router";
import Following from "./Follow";
import Discover from "./Discover";
import Profile from "./Profile";

export function Community() {
    return (
        <div>
            <Routes>
                <Route path="/"    element={<Discover/>}/>
                <Route path="/discover"    element={<Discover/>}/>
                <Route path="/follow"    element={<Following/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </div>
    )
}
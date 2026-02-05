import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./components/Login";
import Body from "./components/Body";
import { appStore } from "./utils/appStore";
import { Feed } from "./components/Feed";
import { Profile } from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            {/* Default Landing */}
            <Route index element={<Feed />} />

            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/" element={<Feed />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="chat/:id/:firstname" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

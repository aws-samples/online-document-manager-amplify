import {withAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

import {HashRouter, Route, Routes} from "react-router-dom";
import Main from "./screen/Main/Main";

Amplify.configure(awsconfig);

function App() {
  return (
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Main level="private"/>}/>
          <Route exact path="/public" element={<Main level="public"/>}/>
        </Routes>
      </HashRouter>

  );
}

export default withAuthenticator(App);
// export default App;

import React from 'react';
import Student from './components/Student'
import { Alert, Card, Button } from 'react-bootstrap';
const App = () => {
  return (
    <div>
      <div>
        <Alert variant="success">
          <Alert.Heading>HOME WORK</Alert.Heading>
          <p>
            ARIM CHEBERAHIM
          </p>
          <hr />
          <p className="mb-0">
            6035512059
          </p>
        </Alert>
      </div>
      <Student />
    </div>
  );
}

export default App;

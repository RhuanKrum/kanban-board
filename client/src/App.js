import React from 'react'
import { Container } from 'react-bootstrap'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import Board from './components/Board/Board'

const App = () => (
  <Container className="themed-container" fluid={true}>
    <Router>
      <Route exact path="/" component={Board} />
    </Router>
  </Container>
)

export default App
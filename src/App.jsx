import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard';
import Topics from './components/Topics';
import Questions from './components/Questions';

function App() {

  return (
    <Routes>
      <Route
        path='/'
        element={
          <Signup />
        }
      />
      <Route
        path='/dashboard'
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path='/topics'
        element={
          <Layout>
            <Topics />
          </Layout>
        }
      />
      <Route
        path='/questions'
        element={
          <Layout>
            <Questions />
          </Layout>
        }
      />
    </Routes>
    
  )
}
export default App

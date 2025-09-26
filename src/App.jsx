import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
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
        element={<Signup />}
      />
      <Route
        path='/RAG_frontend'
        element={<Navigate to="/" replace />}
      />
      <Route
        path='/RAG_frontend/'
        element={<Navigate to="/" replace />}
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
      {/* Add catch-all route to redirect unknown paths to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
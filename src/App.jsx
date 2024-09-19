import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ArticlePage from './components/ArticlePage';
import Header from './components/Header';
import NavBar from './components/NavBar';
import StatusBar from './components/StatusBar';

const App = () => {

  return (
    <>
    <Header />
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/article/:article_id" element={<ArticlePage />} />
    </Routes>
    <StatusBar />
    </>
  )
}

export default App

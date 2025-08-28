import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Counter from './components/Counter.jsx';
import Main from './components/Main.jsx';
import SubjectList from './components/ItemList.jsx';
import AddTask from './components/ItemAdd.jsx';
import RemoveStudent from './components/ItemRemove.jsx';
import ProductSearch from './components/ItemSearch.jsx';

function App() {
  const isLoggedIn = false;
  const headerContent = "Content";
  const footerContent = "Content";
  return (
    <>
      <div className='app-container'>
        <Header content={headerContent} login={isLoggedIn} />
        
        {/* <Counter /> */}
        
        <SubjectList />
        <AddTask />
        <RemoveStudent />
        <ProductSearch />

        {/* <Main /> */}

        <Footer content={footerContent}/>
      </div>
    </>
  )
}

export default App

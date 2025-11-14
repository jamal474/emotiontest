import './App.css';
import { useEffect } from 'react';
import Header from './page/Header'
import Body from './page/Body'
import Footer from './page/Footer'
import { Toaster } from "@/components/ui/sonner"

function App() {
  
  return (
    <div className="App">
      <Header/>
      <Body/>
      <Footer/>
      <Toaster className=""/>
    </div>
  );
}

export default App;

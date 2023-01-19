import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Footer from './scenes/global/Footer';
import Home from './scenes/Home/home';
import Portfolio from './scenes/Portfolio/portfolio';
import AllPortfolios from './scenes/AllPortfolios/allportfolios';
import ModalDialog from './components/Authorization/ModalDialog';
// import Transactions from './scenes/transactions';
// import Leaderboard from './scenes/leaderboard';
// import Prizes from './scenes/prizes';
// import Faq from './scenes/faq';
// import Aboutbattle from './scenes/aboutbattle';
// import Aboutaspis from './scenes/aboutaspis';
import apiPath from './apiPath';
import PrivateRoute from './components/PrivateRoute';




function App() {

  const [theme, colorMode] = useMode();
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          <Sidebar />
          <main className='content'>
            <Topbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<PrivateRoute TargetComponent={<Portfolio />} />} />
              <Route path="/allportfolios" element={<PrivateRoute TargetComponent={<AllPortfolios />} />} />
              {/* <Route path='/allportfolios' element={<AllPortfolios />} /> */}
              {/* <Route path="/transactions" element={<Transactions />} /> */}
              {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
              {/* <Route path="/prizes" element={<Prizes />} /> */}
              {/* <Route path="/faq" element={<Faq />} /> */}
              {/* <Route path="/aboutbattle" element={<Aboutbattle />} /> */}
              {/* <Route path="/aboutaspis" element={<Aboutaspis />} /> */}
            </Routes>
            <Footer />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

import React, { useState, useMemo } from "react"
import styled from "styled-components"
import bg from "./img/bg.png"
import { MainLayout } from "./styles/Layouts"
import Orb from "./Components/Orb/Orb"
import Navigation from "./Components/Navigation/Navigation"
import Dashboard from "./Components/Dashboard/Dashboard"
import Income from "./Components/Income/Income"
import Expenses from "./Components/Expenses/Expenses"
import Goals from "./Components/Goals/Goals"
import Reports from "./Components/Reports/Reports"
import Login from "./Components/Login/Login"
import SignUp from "./Components/SignUp/Signup"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

function Home() {

  // if(!localStorage.getItem("token")){
  //   window.location.href = '/'
  // }

  const [active, setActive] = useState(1)
  const navigation = useNavigate()

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />
      case 3:
        return <Income />
      case 4:
        return <Expenses />
      case 5:
        return <Goals />
      case 6:
        return <Reports />
      case 7: 
        localStorage.removeItem("token")
        return navigation("/")
      default:
        return <Dashboard />
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  }, [])

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        {/* <Navigation active={active} setActive={setActive} /> */}
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  )
}

const AppStyled = styled.div`
  height: 100vh
  position: relative
  width : 100%:
  padding : 0;

  main {
    background: rgba(252, 246, 249, 0.78)
    border: 3px solid #ffffff
    backdrop-filter: blur(2px)
    border-radius: 32px
    overflow-x: hidden
    &::-webkit-scrollbar {
      width: 0
    }
  }
`

export default App

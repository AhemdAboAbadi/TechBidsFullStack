import React, {useState} from "react"
import {Box, Typography, Divider} from "@mui/material"
import {useNavigate} from "react-router-dom"
import SignInForm from "../../Components/SignInForm"
import logo from "../../images/logo.png"
import {useAuth} from "../../context/useAuth"
import {useSnack} from "../../context/useSnack"

const SignIn: React.FC = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  })
  const {email, password} = formValues
  const [error, setError] = useState({
    email: false,
    password: false,
  })

  const {login} = useAuth()
  const navigate = useNavigate()
  const {showSnack} = useSnack()

  const handleChange = (event: any): any => {
    setFormValues({...formValues, [event.target.name]: event.target.value})
  }

  const handleError = (callback: any): any => {
    if (formValues.email === "") {
      setError({
        email: true,
        password: false,
      })
    } else if (formValues.password.length < 8) {
      setError({
        email: false,
        password: true,
      })
    } else {
      callback()
    }
  }

  const onClickHandle = (): any => {
    handleError(() => {
      login(email, password, (err: any): any => {
        if (err) {
          showSnack(err?.response?.data?.message, "error")
        } else {
          navigate("/")
        }
      })
    })
  }

  return (
    <Box sx={{display: "flex"}}>
      {/* Left Section */}
      <Box
        sx={{
          width: "50%",
          height: "100vh",
          backgroundColor: "#000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography
          variant="h3"
          align="center"
          sx={{color: "#fff", marginBottom: "2rem"}}>
          Make Your Dream
        </Typography>
        <Divider light />
        <Typography align="justify" sx={{color: "#fff", padding: "0rem 8rem"}}>
          Lorem Ipsum is simply dummy text of the printing anLorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco Lorem Ipsum is simply dummy text of
          the printing anLorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        </Typography>
      </Box>

      {/* Right Section, Sign in Form */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography variant="h3" align="center">
          Welcome To
        </Typography>
        <img src={logo} alt="Logo" width="35%" />
        <SignInForm
          email={email}
          emailError={error.email}
          password={password}
          passwordError={error.password}
          handleChange={handleChange}
          onClickHandle={onClickHandle}
        />
      </Box>
    </Box>
  )
}

export default SignIn

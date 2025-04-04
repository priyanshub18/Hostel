import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import App from './App'
import AdminRoute from "../AdminRoute";
// import ProtectedPage from './ProtectedPage.jsx' // Ensure this exists

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const PUBLISHABLE_KEY = "pk_test_ZnJlZS1vcmNhLTM4LmNsZXJrLmFjY291bnRzLmRldiQ"
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const ClerkRoutes = () => {
  const navigate = useNavigate()
  
  return (
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<App />} />
        <Route 
          path="/sign-in"
          element={<SignIn redirectUrl={'/admin'} routing="path" path="/sign-in"/>}
        />
        <Route 
          path="/sign-up"
          element={<SignUp redirectUrl={'/admin'} routing="path" path="/sign-up"/>}
        />
        <Route
          path="/admin"
          element={
            <>
              <SignedIn>
                <AdminRoute />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn/>
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  )
}

export default ClerkRoutes

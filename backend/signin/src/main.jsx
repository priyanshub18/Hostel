import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react'
import ProtectedPage from './ProtectedPage.jsx' // Ensure this exists

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
 
const ClerkWithRoutes = () => {
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
          element={<SignIn redirectUrl={'/protected'} routing="path" path="/sign-in"/>}
        />
        <Route 
          path="/sign-up"
          element={<SignUp redirectUrl={'/protected'} routing="path" path="/sign-up"/>}
        />
        <Route
          path="/protected"
          element={
            <>
              <SignedIn>
                <ProtectedPage />
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

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <BrowserRouter>
      <ClerkWithRoutes />
    </BrowserRouter>
  </StrictMode>
)

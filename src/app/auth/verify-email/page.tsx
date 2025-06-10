"use client";

import { useRouter } from 'next/navigation';
import { useUser, useSignUp, useClerk } from '@clerk/nextjs';
import { useState, useEffect, FormEvent, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CreateAnimation from '@/components/Home/CreateAnimation';
import AuthHeader from '../_components/AuthHeader';
import "@/styles/AuthPage.css";
import "@/styles/VerifyEmail.css"; // Import des styles spécifiques pour les champs OTP

// Activer ce mode pour tester la page sans authentification
const TEST_MODE = true;

const VerifyEmail = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signUp, setActive } = useSignUp();
  const router = useRouter();
  const clerk = useClerk();
  
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailAddress, setEmailAddress] = useState<string | null>(null);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verifying, setVerifying] = useState(false);
  
  // Redirection après animation de vérification réussie
  useEffect(() => {
    if (verificationSuccess) {
      const redirectTimeout = setTimeout(() => {
        router.push('/auth/onboarding');
      }, 10000); // Rediriger après 10 secondes d'animation
      
      return () => clearTimeout(redirectTimeout);
    }
  }, [verificationSuccess, router]);
  
  // Messages pour l'animation de vérification
  const verificationMessages = [
    "Verifying code...",
   "Validating your identity...",
    "Preparing your workspace...",
    "Configuration completed !"
  ];
  
  // Refs for inputs
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (!isLoaded) return;
    
    if (isSignedIn) {
      // Already verified and signed in
      router.push('/auth/onboarding');
      return;
    }
    
    // Focus the first input on load
    inputRefs[0].current?.focus();
    
    // Récupérer l'adresse email depuis le signUp object
    if (signUp && signUp.emailAddress) {
      setEmailAddress(signUp.emailAddress);
    } else if (TEST_MODE) {
      setEmailAddress('test@example.com');
    }
  }, [signUp]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0); // Only take the first character
    }
    
    // Update verification code
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);
    
    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && verificationCode[index] === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    if (/^\d{6}$/.test(pastedData)) {
      // Paste the 6 digits individually
      const digits = pastedData.split('');
      digits.forEach((digit, index) => {
        if (index < 6) {
          const newVerificationCode = [...verificationCode];
          newVerificationCode[index] = digit;
          setVerificationCode(newVerificationCode);
        }
      });
      // Focus the last input
      inputRefs[5].current?.focus();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const code = verificationCode.join('');
    
    if (code.length !== 6) {
      setError('Veuillez entrer les 6 chiffres du code');
      return;
    }
    
    setLoading(true);
    setVerifying(true);
    
    try {
      if (!signUp) {
        throw new Error('Une erreur est survenue. Veuillez réessayer.');
      }
      
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      
      if (completeSignUp.status !== 'complete') {
        throw new Error('Vérification échouée. Veuillez réessayer.');
      }
      
      // Activation de la session
      await setActive({ session: completeSignUp.createdSessionId });
      
      // Activer l'animation de vérification réussie
      setVerificationSuccess(true);
      
      // La redirection est gérée par le composant CreateAnimation
      // après la fin de l'animation
      
    } catch (err) {
      console.error('Erreur lors de la vérification:', err);
      setError((err as Error).message || 'Une erreur est survenue. Veuillez réessayer.');
      setVerifying(false);
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError(null);
    try {
      if (!signUp) {
        throw new Error('Une erreur est survenue. Veuillez réessayer.');
      }
      
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      
    } catch (err) {
      console.error('Erreur lors de l\'envoi du code:', err);
      setError((err as Error).message || 'Une erreur est survenue. Veuillez réessayer.');
    }
  };

  // Pour tester l'animation de vérification
  const handleTestAnimation = () => {
    setVerificationSuccess(true);
  };

  // Afficher l'animation de vérification réussie
  if (verificationSuccess) {
    return (
      <div className="auth-section">
        <section>
          <AuthHeader />
          <CreateAnimation 
            successBool={verificationSuccess}
            barColor="#BDFFFB" 
            loadingTxts={verificationMessages}
            title="Verification successful!"
          />
        </section>
      </div>
    );
  }
  
  // Afficher l'état de chargement
  if (!isLoaded || verifying) {
    return (
      <div className="auth-section">
        <section>
          <AuthHeader />
          <CreateAnimation 
            successBool={true}
            barColor="#BDFFFB" 
            loadingTxts={["Verification in progress...", "Validating code...", "Almost there..."]}
            title={verifying ? "Verifying your code" : "Loading..."}
          />
        </section>
      </div>
    );
  }

  // Vérifier si tous les champs sont remplis
  const allFieldsFilled = verificationCode.every(digit => digit !== '');

  return (
    <div className="auth-section">
      <section>
        <AuthHeader />
        <div className="container">
          <div className="back-icon" onClick={() => router.back()}>
            <Image
              src="/svgs/arrow-left.svg"
              alt="Back"
              height={15}
              width={15}
            />
          </div>
          
          <h1>Verify OTP</h1>
          <p className="subtitle">
            Please enter the code that was sent to your email address.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="label-txt">Enter code</div>
            
            <div className="otp-box">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="otp-input"
                  maxLength={1}
                  autoComplete="off"
                  inputMode="numeric"
                  pattern="[0-9]"
                  placeholder=""
                  required
                />
              ))}
            </div>
            
            {error && <p className="error">{error}</p>}
            
            <div className="retry-box">
              <p>Didn't receive the code? <span onClick={handleResendCode} className="text-link">Retry</span></p>
            </div>
            
            <button
              type="submit"
              disabled={loading || !allFieldsFilled}
              className={`submit-button ${allFieldsFilled ? 'active-btn' : ''}`}
            >
              <div className="hover-container">
                <span>{loading ? "Verifying..." : "Verify"}</span>
              </div>
            </button>
            
            {TEST_MODE && (
              <div className="test-mode-container">
                <button
                  type="button"
                  onClick={handleTestAnimation}
                  className="test-button"
                >
                  Test Animation
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default VerifyEmail;
'use client';

import { useRouter } from 'next/navigation';
import { useUser, useSignUp, useClerk } from '@clerk/nextjs';
import { useState, useEffect, FormEvent, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CreateAnimation from '@/components/Home/CreateAnimation';

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
    
    // Get email from signUp object
    if (signUp) {
      const pendingEmail = signUp.emailAddress;
      setEmailAddress(pendingEmail || null);
    }
  }, [isLoaded, isSignedIn, signUp]);

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

  // Afficher l'animation de vérification réussie
  if (verificationSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="absolute top-8 left-8">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Yamify" width={24} height={24} />
            <span className="ml-2 text-xl font-bold">Yamify</span>
          </div>
        </div>
        <CreateAnimation 
          successBool={verificationSuccess}
          barColor="#BDFFFB" 
          loadingTxts={verificationMessages}
          title="Vérification réussie !"
        />
      </div>
    );
  }
  
  // Afficher l'état de chargement
  if (!isLoaded || verifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="absolute top-8 left-8">
          <Link href="/">
            <div className="flex items-center">
              <Image src="/logo.png" alt="Yamify" width={24} height={24} />
              <span className="ml-2 text-xl font-bold">Yamify</span>
            </div>
          </Link>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <Image src="/logo.png" alt="Yamify" width={48} height={48} />
          </div>
          <p className="mt-4 text-lg">{verifying ? "Verification en cours..." : "Chargement..."}</p>
          <div className="w-64 h-2 bg-gray-700 rounded-full mt-4">
            <div className="h-full bg-yellow-500 rounded-full animate-pulse" style={{ width: '50%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="absolute top-8 left-8">
        <Link href="/">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Yamify" width={24} height={24} />
            <span className="ml-2 text-xl font-bold">Yamify</span>
          </div>
        </Link>
      </div>
      
      <div className="absolute top-8 right-8">
        <span className="text-sm">Already have an account? </span>
        <Link href="/auth/sign-in" className="text-yellow-500 hover:underline">Sign in</Link>
      </div>
      
      <div className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-md p-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-400 hover:text-white mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          
          <h1 className="text-3xl font-bold mb-8">Verify OTP</h1>
          
          <p className="mb-8 text-gray-300">
            Please enter the code that was sent to {emailAddress || 'your email address'}.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-300">Enter code</label>
            </div>
            
            <div className="flex gap-2 mb-6">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 border border-gray-600 rounded bg-black text-white text-center text-xl focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
                />
              ))}
            </div>
            
            {error && (
              <div className="text-red-500 text-sm mb-4">
                {error}
              </div>
            )}
            
            <div className="mb-6">
              <button 
                type="button" 
                onClick={handleResendCode}
                className="text-yellow-500 hover:underline text-sm"
              >
                Didn't receive the code? Retry
              </button>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-colors"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
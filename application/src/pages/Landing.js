import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useHistory } from 'react-router-dom';

import Hero from '../components/Hero';
import Features from '../components/Features';
import Tech from '../components/Tech';
import Problems from '../components/Problems';
import Footer from '../components/Footer';
import { getAccount } from '../utils/solana';

export default function Landing() {
  const wallet = useWallet();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (wallet.connected) {
        const account = await getAccount(wallet);
        const walletAddress = wallet.publicKey.toString();
        const currAccount = account.userList.filter(
          user => user.address === walletAddress
        );

        if (currAccount.length > 0) {
          history.push(`/user/${walletAddress}`);
        } else {
          history.push('/register');
        }
      }
    })();
  }, []);

  return (
    <div>
      <Hero />
      <Tech />
      <Problems />
      <Features />
      <Footer />
    </div>
  );
}

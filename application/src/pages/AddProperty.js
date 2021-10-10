import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useHistory } from 'react-router-dom';

import { getAccount } from '../utils/solana';
import AddPropertyForm from '../components/AddPropertyForm';

export default function AddProperty() {
  const wallet = useWallet();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (wallet.connected) {
        const account = await getAccount(wallet);
        const walletAddress = wallet.publicKey.toString();

        if (account.authority.toString() !== walletAddress) {
          history.push('/');
        }
      } else {
        history.push('/connect');
      }
    })();
  }, []);

  return (
    <div>
      <AddPropertyForm />
    </div>
  );
}

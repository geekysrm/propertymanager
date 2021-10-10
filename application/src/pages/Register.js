import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useHistory } from 'react-router-dom';

import { getAccount } from '../utils/solana';
import RegisterForm from '../components/RegisterForm';

export default function Register() {
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
        }
      } else {
        history.push('/connect');
      }
    })();
  }, []);

  return (
    <div>
      <RegisterForm />
    </div>
  );
}

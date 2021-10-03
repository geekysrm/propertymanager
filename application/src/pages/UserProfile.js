import React, { useEffect, useState } from 'react';

import { useWallet } from '@solana/wallet-adapter-react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { getProvider, getProgram, getAccount, getPair } from '../utils/solana';

export default function UserProfile() {
    const wallet = useWallet();
    const history = useHistory();
    const { id } = useParams();

    const [user, setUser] = useState({});

    useEffect(() => {
        (async () => {
            if (wallet.connected) {
                const account = await getAccount(wallet);
                const walletAddress = wallet.publicKey.toString();
                const currAccount = account.userList.filter(
                    user => user.address === walletAddress
                );

                if (currAccount.length === 0) {
                    history.push('/register');
                } else {
                    const program = await getProgram(wallet);
                    const pair = getPair();

                    const account = await program.account.baseAccount.fetch(pair.publicKey);

                    const currAccount = account.userList.filter(
                        (user) => user.address === id
                    );

                    setUser({
                        ...currAccount[0],
                        isAdmin: account.authority.toString() === id,
                    });
                }
            } else {
                history.push('/connect');
            }
        })();
    }, []);

    return (
        <div>
            User Profile Page.
            {id}
        </div>
    )
}

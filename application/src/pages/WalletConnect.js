import React, { useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from "@chakra-ui/react"
import { ArrowForwardIcon } from '@chakra-ui/icons'

export default function WallectConnect() {

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '100px',
                }}
            >
                <WalletMultiButton />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '100px',
                }}
            >
                <Button rightIcon={<ArrowForwardIcon />} colorScheme="purple:500" variant="outline">
                    Continue
                </Button>
            </div>
        </div>
    );
}

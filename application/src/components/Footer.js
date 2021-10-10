import React from 'react';
import { Center } from "@chakra-ui/react"


export default function Footer() {
    return (
        <Center h="100px" color="white">
            Handcrafted by &nbsp;<b>Team Marvellous (India 🇮🇳)</b>&nbsp; &copy; &nbsp;<b>{new Date().getFullYear()}</b>
        </Center>
    )
}

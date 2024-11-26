import React from "react"
import SmallWithLogoLeft from "../components/Common/Footer"
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"
import Header from "../components/Common/Header"
import { Container } from "@chakra-ui/react"

export const Route = createFileRoute("/_base-layout")({
    component: BaseLayout,
    // beforeLoad: async () => {
    //   if (!isLoggedIn()) {
    //     throw redirect({
    //       to: "/login",
    //     })
    //   }
    // },
})

function BaseLayout() {

    return (
        <>
            <Header />

            <Container maxW="full">

                <Outlet />
            </Container>


            <SmallWithLogoLeft />

        </>

    )
}

import React from "react"

import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"
import Header from "../components/Common/Header"

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

            <Outlet />

        </>

    )
}

import { Box, Flex, Spinner, useColorModeValue } from "@chakra-ui/react"
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

import Sidebar from "../components/Common/Sidebar"
import UserMenu from "../components/Common/UserMenu"
import useAuth, { isLoggedIn } from "../hooks/useAuth"

export const Route = createFileRoute("/_layout")({
  component: Layout,
  beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: "/login",
      })
    }
  },
})

function Layout() {

  const bgColor = useColorModeValue("ui.light", "ui.dark")
  const secBgColor = useColorModeValue("ui.secondary", "ui.darkSlate")
  const { isLoading } = useAuth()

  return (
    <>
      <Flex maxW="large" h="auto" position="relative">
        {/* <Header /> */}
        <Sidebar />
        {isLoading ? (
          <Flex justify="center" align="center" height="100vh" width="full">
            <Spinner size="xl" color="ui.main" />
          </Flex>
        ) : (

          // <Box
          //   bg={bgColor}
          //   p={3}
          //   // h="100"
          //   // w={"100%"}
          //   // top="0"
          // >
          //   <Box
          //     // justify="space-between"
          //     bg={secBgColor}
          //     p={4}
          //     borderRadius={12}
          //   >

              <Outlet />
          //   {/* </Bo>
          // </Box> */}
        )}
        <UserMenu />
      </Flex>
    </>

  )
}

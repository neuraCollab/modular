import { Box, Container, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import Feature from "../../components/Index/Feature"
import Multistep from "../../components/Index/Multistep"
import useAuth from "../../hooks/useAuth"
import Pricing from "../../components/Pricing/Pricing"

export const Route = createFileRoute("/_base-layout/")({
  component: Dashboard,
})

function Dashboard() {
  const { user: currentUser } = useAuth()

  return (
    <>
      <Feature />
      <Multistep />
      <Pricing />
      {/* <ChatComponent /> */}
    </>
  )
}

import { Box, Container, Text, useColorModeValue } from "@chakra-ui/react"
import { createFileRoute, useParams } from "@tanstack/react-router"
import Feature from "../../components/Index/Feature"
import Multistep from "../../components/Index/Multistep"
import useAuth from "../../hooks/useAuth"
import React from 'react'
import FindPerson from "../../components/FindPerson/FindPerson"
import Pagination from "../../components/Profile/Pagination"
import Card from "../../components/Profile/Card"
import ChatComponent from "../../components/Chat/ChatComponent"
import IntroSection from "../../components/Profile/IntroSection"

export const Route = createFileRoute("/_layout/profile/$id")({
  loader: ({ params }) => console.log(params),
  component: Profile,
})

function Profile() {
  const { user: currentUser } = useAuth()
  const { id } = Route.useParams()

  const bgColor = useColorModeValue("ui.light", "ui.dark")
  const secBgColor = useColorModeValue("ui.secondary", "ui.darkSlate")


  console.log(id);


  return (
    <>
      <Box
        bg={bgColor}
        p={3}
        h="100vh"
        w={"100%"}
        top="0"
      >
        <Box
          // justify="space-between"
          h={"100%"}
          bg={secBgColor}
          p={4}
          borderRadius={12}
        >
          <ChatComponent />

        </Box>
      </Box>
      {/* <IntroSection /> */}
    </>
  )
}

import { Box, Container, Text } from "@chakra-ui/react"
import { createFileRoute, useParams } from "@tanstack/react-router"
import Feature from "../../components/Index/Feature"
import Multistep from "../../components/Index/Multistep"
import useAuth from "../../hooks/useAuth"
import React from 'react'
import FindPerson from "../../components/Profile/FindPerson"
import Pagination from "../../components/Profile/Pagination"
import Card from "../../components/Profile/Card"
import ChatComponent from "../../components/Chat/ChatComponent"
import IntroSection from "../../components/Profile/IntroSection"

export const Route = createFileRoute("/_base-layout/profile/$id")({
  loader: ({ params }) => console.log(params),
  component: Profile,
})

function Profile() {
  const { user: currentUser } = useAuth()
  const { id } = Route.useParams()


  console.log(id);
  

  return (
    <>
      {/* <ChatComponent /> */}
      <IntroSection />
    </>
  )
}

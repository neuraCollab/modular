import { Box, Container, Text } from "@chakra-ui/react"
import { createFileRoute, Outlet, useParams } from "@tanstack/react-router"
import Feature from "../../components/Index/Feature"
import Multistep from "../../components/Index/Multistep"
import useAuth from "../../hooks/useAuth"
import React from 'react'
import FindPerson from "../../components/FindPerson/FindPerson"
import Pagination from "../../components/Profile/Pagination"
import Card from "../../components/Profile/Card"
import ChatComponent from "../../components/Chat/ChatComponent"
import VideoChat from "../../components/Chat/VideoChat"

export const Route = createFileRoute("/_layout/profile")({
  loader: ({ params }) => console.log(params),
  component: Profile,
})

function Profile() {
  const { user: currentUser } = useAuth()
  const { postId } = Route.useParams()

  return (
    <>
      {/* <FindPerson /> */}
      {/* <ChatComponent /> */}
      <VideoChat />
      <Outlet />
    </>
  )
}

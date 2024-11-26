import { Box, Container, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import Feature from "../../components/Index/Feature"
import Multistep from "../../components/Index/Multistep"
import useAuth from "../../hooks/useAuth"
import React from 'react'
import FindPerson from "../../components/Profile/FindPerson"
import Pagination from "../../components/Profile/Pagination"
import Card from "../../components/Profile/Card"
import Maps from "../../components/FindPerson/Maps"

export const Route = createFileRoute("/_base-layout/find-person")({
  component: FindPeople,
})

function FindPeople() {
  const { user: currentUser } = useAuth()

  return (
    <>
      {/* <FindPerson /> */}
      <Maps />
      {[1,2].map(i => <Card  />)}
      <Pagination />
    </>
  )
}

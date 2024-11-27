
import { createFileRoute } from "@tanstack/react-router"

import React from 'react'
import FindPerson from "../../components/FindPerson/FindPerson"
import Pagination from "../../components/Profile/Pagination"

import ProductCard from "../../components/Profile/ProductCard"
import SocialProfileSimple from "../../components/Profile/SocialCard"
import Maps from "../../components/FindPerson/Maps"
import { Box, useColorModeValue } from "@chakra-ui/react"


export const Route = createFileRoute("/_layout/find-person")({
  component: FindPeople,
})


function FindPeople() {

  const bgColor = useColorModeValue("ui.light", "ui.dark")
  const secBgColor = useColorModeValue("ui.secondary", "ui.darkSlate")

  return (
    <>
      <Box
        bg={bgColor}
        p={3}
        h="100%"
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


          {/* <FindPerson /> */}
          <Maps />

          <SocialProfileSimple />
        </Box>
      </Box>


    </>
  )
}

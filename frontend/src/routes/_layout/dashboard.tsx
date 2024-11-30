import { Box, Container, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

import useAuth from "../../hooks/useAuth"
import IntroSection from "../../components/Profile/IntroSection"
import ReviewWithRatingChart from "../../components/Profile/ReviewWithRatingChart"
import Tagline from "../../components/Profile/TagLine"

export const Route = createFileRoute("/_layout/dashboard")({
  component: Dashboard,
})

function Dashboard() {
  const { user: currentUser } = useAuth()
  const tags = [
    "Developer",
    "Designer",
    "Photographer",
    "Blogger",
    "Traveler",
    "Creator",
  ];

  return (
    <>
      <Container maxW="full">

        <IntroSection name={currentUser?.full_name || currentUser?.email} />

        <Tagline tags={tags} />
        <ReviewWithRatingChart />
      </Container>
    </>
  )
}
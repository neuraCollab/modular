import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  Box,
  IconButton,
  Select,
  Checkbox,
  Stack,
  useColorModeValue,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { FaArrowDownWideShort, FaArrowDownShortWide } from "react-icons/fa6";
import { CiViewTable, CiMap } from "react-icons/ci";
import { MdOutlineGridView } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import Maps from "../../components/FindPerson/Maps";
import SocialProfileSimple from "../../components/Profile/SocialCard";

export const Route = createFileRoute("/_layout/find-person")({
  component: FindPeople,
});

function FindPeople() {
  const bgColor = useColorModeValue("ui.light", "ui.dark");
  const secBgColor = useColorModeValue("ui.secondary", "ui.darkSlate");

  const [isMapVisible, setIsMapVisible] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [sortOrder, setSortOrder] = useState("cheap");
  const [grouping, setGrouping] = useState("none");

  const toggleMapVisibility = () => setIsMapVisible(!isMapVisible);

  return (
    <>
      <Box bg={bgColor} p={3} h="100%" w={"100%"} top="0">
        <Box
          h={"100%"}
          bg={secBgColor}
          p={4}
          borderRadius={12}
          display="flex"
          flexDir="column"
          justifyContent="center"
        >
          {/* Controls for sorting, grouping, map visibility, and view mode */}
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={4}
            align="center"
            mb={6}
          >
            {/* Sorting */}
            <Stack direction="row" align="center">
              <Text>Сортировка:</Text>
              <FaArrowDownWideShort />
              <FaArrowDownShortWide />
              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                size="sm"
                width="auto"
                border="none"
              >
                <option value="cheap">Сначала недорогие</option>
                <option value="expensive">Сначала дорогие</option>
              </Select>
            </Stack>

            {/* Grouping */}
            <Stack direction="row" align="center">
              <Text>Группировка:</Text>
              <FaLayerGroup />
              <Select
                value={grouping}
                onChange={(e) => setGrouping(e.target.value)}
                size="sm"
                width="auto"
                border="none"
              >
                <option value="none">Отсутствует</option>
                <option value="category">По категориям</option>
              </Select>
            </Stack>

            <Spacer />

            {/* Map visibility toggle */}
            <Stack direction="row" align="center">
              <Checkbox
                isChecked={isMapVisible}
                onChange={toggleMapVisibility}
                colorScheme="teal"
              >
                Показать карту
              </Checkbox>
              <CiMap size="24px" />
            </Stack>

            {/* View mode toggle */}
            <Stack direction="row" align="center" spacing={2}>
              <IconButton
                aria-label="Grid View"
                icon={<CiViewTable />}
                onClick={() => setViewMode("grid")}
                bg={viewMode === "grid" ? "teal.500" : "gray.600"}
                _hover={{ bg: "teal.400" }}
                color="white"
                size="sm"
                borderRadius="md"
              />
              <IconButton
                aria-label="List View"
                icon={<MdOutlineGridView />}
                onClick={() => setViewMode("list")}
                bg={viewMode === "list" ? "teal.500" : "gray.600"}
                _hover={{ bg: "teal.400" }}
                color="white"
                size="sm"
                borderRadius="md"
              />
            </Stack>
          </Stack>

          {/* Map component toggle */}
          {isMapVisible && <Maps />}

          {/* Other components */}
          <SocialProfileSimple />
        </Box>
      </Box>
    </>
  );
}

export default FindPeople;

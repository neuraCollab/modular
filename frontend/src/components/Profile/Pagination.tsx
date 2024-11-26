import React from "react";
import { Flex } from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";

const CustomPagination = () => {
  return (
    <Flex
      w="full"
      bg={"gray.400"}
      _dark={{ bg: "gray.600" }}
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Pagination
        defaultCurrent={5}
        total={500}
        paginationProps={{ display: "flex" }}
        showSizeChanger
      />
    </Flex>
  );
};

export default CustomPagination;
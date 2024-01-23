import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  Select,
  Input,
} from "@chakra-ui/react";
import { backendApi } from "../../api";

const url = `${backendApi}/doctor/appointments`;
const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const populateData = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        `${url}?filter=${filter}&name=${searchQuery}&sortOrder=${sortOrder}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDoctors(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    populateData();
  }, [filter, sortOrder, searchQuery]);

  return (
    <Box>
      <Select
        placeholder="Select specialization"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="Cardiologist">Cardiologist</option>
        <option value="Dermatologist">Dermatologist</option>
        <option value="Pediatrician">Pediatrician</option>
        <option value="Psychiatrist">Psychiatrist</option>
      </Select>

      <Select
        placeholder="Sort by date"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </Select>

      <Input
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Flex wrap="wrap">
        {doctors.map((doctor) => (
          <Box key={doctor._id} p={5} shadow="md" borderWidth="1px">
            <Image
              borderRadius="full"
              boxSize="150px"
              src={doctor.imageURL}
              alt={doctor.name}
            />
            <Text mt={4} fontSize="xl">
              Dr. {doctor.name}
            </Text>
            <Text>Specialization: {doctor.specialization}</Text>
            <Text>Experience: {doctor.experience} Years</Text>
            <Text>Location: {doctor.location}</Text>
            <Text>Date: {new Date(doctor.date).toLocaleDateString()}</Text>
            <Text>Slots: {doctor.slots}</Text>
            <Text>Fee: ${doctor.fee}</Text>

            <Button colorScheme="green" size="sm" mt={4}>
              EDIT
            </Button>

            <Button colorScheme="red" size="sm" mt={4}>
              DELETE
            </Button>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Doctor;

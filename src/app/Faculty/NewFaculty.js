import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useService } from "../../API/Services";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";
import Swal from "sweetalert2";

export const NewFaculty = () => {
  const { adminFacultyService } = useService();
  const navigate = useNavigate();
  const [newFacultyFormData, setNewFacultyFormData] = React.useState();

  const { mutateAsync: mutateNewFaculty, isLoading } = useMutation((body) =>
    adminFacultyService.postNewFaculty(body)
  );

  const handleOnChangeInput = ({ target: { value, name } }) =>
    setNewFacultyFormData((previous) => ({ ...previous, [name]: value }));

  const handleOnSumbit = () =>
    mutateNewFaculty(newFacultyFormData)
      .then(() => navigate(ROUTES.ADMIN.FACULTY.HOME))
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Xəta baş verdi",
          text: "Dəyişikliklər saxlanılmadı! Daha sonra yenidən cəhd edin",
        })
      );

  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  return (
    <FormControl isRequired>
      <Text as="b" fontSize="3xl">
        Yeni Fakültə Yarat
      </Text>
      <FormLabel>Kod</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        name="Code"
        placeholder="Fakültə Kodu"
      />
      <FormLabel>Adı</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        name="Name"
        placeholder="Fakültə Adı"
      />
      <Button colorScheme="blue" onClick={handleOnSumbit}>
        Create
      </Button>
    </FormControl>
  );
};

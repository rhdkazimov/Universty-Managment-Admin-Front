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
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";
import Swal from "sweetalert2";

export const EditFaculty = () => {
  const location = useLocation();
  const initialEditFacultyValue = {
    code: location.state.code,
    name: location.state.name,
  };
  const { adminFacultyService } = useService();
  const navigate = useNavigate();
  const [newFormData, setNewFormData] = React.useState(initialEditFacultyValue);

  const { mutateAsync: mutateNewFaculty, isLoading } = useMutation((body) => {
    return adminFacultyService.editFacultyById(location.state.id, body);
  });

  const handleOnChangeInput = ({ target: { value, name } }) =>
    setNewFormData((previous) => ({ ...previous, [name]: value }));

  const handleOnSumbit = () =>
    mutateNewFaculty(newFormData)
      .then(() => navigate(ROUTES.ADMIN.FACULTY.HOME))
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Xəta baş verdi",
          text: "Dəyişikliklər saxlanılmadı! Daha sonra yenidən cəhd edin",
        });
      });

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
        Düzəliş et (Fakültə)
      </Text>
      <FormLabel>Kod</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        name="code"
        placeholder="Fakültə Kodu"
        defaultValue={location.state.code}
      />
      <FormLabel>Adı</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        name="name"
        placeholder="Fakültə Adı"
        defaultValue={location.state.name}
      />
      <Button colorScheme="blue" onClick={handleOnSumbit}>
        Yaddaşda Saxla
      </Button>
    </FormControl>
  );
};

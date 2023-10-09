import {
  FormControl,
  FormLabel,
  Input,
  Select,
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
import { QueryKeys } from "../../consts";

export const NewSpecilty = () => {
  const { adminSpecialtyService, adminFacultyService } = useService();
  const navigate = useNavigate();
  const [newFormData, setNewFormData] = React.useState();
  const [faculty, setFaculty] = React.useState([]);

  const { isLoading: isFacultyLoading } = useQuery(
    [QueryKeys.getAllFacultys],
    () => {
      adminFacultyService
        .getFacultysAll()
        .then((data) => setFaculty(data.data));
    }
  );

  const { mutateAsync: mutateNewSpecialty, isLoading } = useMutation((body) => {
    return adminSpecialtyService.postNewSpecialty(body);
  });

  const handleOnChangeInput = ({ target: { value, name } }) =>
    setNewFormData((previous) => ({ ...previous, [name]: value }));

  const handleOnSumbit = () =>
    mutateNewSpecialty(newFormData)
      .then(() => {
        navigate(ROUTES.ADMIN.SPECIALTY.HOME);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Xəta baş verdi",
          text: "Dəyişikliklər saxlanılmadı! Daha sonra yenidən cəhd edin",
        });
      });

  if (isLoading || isFacultyLoading) {
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
        Yeni Ixtisas yarat
      </Text>
      <FormLabel>Ixtisas adı</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        name="name"
        placeholder="Boş Buraxıla Bilmez"
      />
      <FormLabel>Dəyər</FormLabel>
      <Select
        name="FacultyId"
        onChange={(e) => handleOnChangeInput(e)}
        placeholder="Fakültə Seçin"
      >
        {faculty.map(({ id, name }) => (
          <option value={id}>{name}</option>
        ))}
      </Select>
      <Button colorScheme="blue" onClick={handleOnSumbit}>
        Create
      </Button>
    </FormControl>
  );
};

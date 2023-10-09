import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
  Text,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { useService } from "../../API/Services";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";
import Swal from "sweetalert2";
import { QueryKeys } from "../../consts";

export const EditSpecialty = () => {
  const location = useLocation();
  const initalEditInputValue = {
    name: location.state.name,
    facultyId: location.state.facultyId,
  };

  const { adminSpecialtyService, adminFacultyService } = useService();
  const navigate = useNavigate();
  const [newFormData, setNewFormData] = React.useState(initalEditInputValue);
  const [faculty, setFaculty] = React.useState([]);

  const { isLoading: isFacultyLoading } = useQuery(
    [QueryKeys.getAllFacultys],
    () =>
      adminFacultyService
        .getFacultysAll()
        .then((data) => setFaculty(data.data))
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Xəta baş verdi",
            text: "Daha sonra yenidən cəhd edin",
          });
          navigate(ROUTES.ADMIN.SPECIALTY.HOME);
        })
  );

  const { mutateAsync: mutateEditSpecialty, isLoading } = useMutation(
    (body) => {
      return adminSpecialtyService.editSpecialtyById(location.state.id, body);
    }
  );

  const handleOnChangeInput = ({ target: { value, name } }) =>
    setNewFormData((previous) => ({ ...previous, [name]: value }));

  const handleOnSumbit = () =>
    mutateEditSpecialty(newFormData)
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
        Ixtisas Düzəliş et
      </Text>
      <FormLabel>İxtisas Adı</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        name="name"
        defaultValue={location.state.name}
        placeholder="Boş Buraxıla Bilmez"
      />
      <FormLabel>Fakültə</FormLabel>
      <Select
        name="FacultyId"
        onChange={(e) => handleOnChangeInput(e)}
        placeholder="Fakültə Seçin"
      >
        {faculty.map(({ id, name }) => (
          <option selected={id === location.state.facultyId} value={id}>
            {name}
          </option>
        ))}
      </Select>
      <Button colorScheme="blue" onClick={handleOnSumbit}>
        Yaddaşda Saxla
      </Button>
    </FormControl>
  );
};

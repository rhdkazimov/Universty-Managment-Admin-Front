import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { useService } from "../../API/Services";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";
import Swal from "sweetalert2";
import { QueryKeys } from "../../consts";

export const NewLesson = () => {
  const { adminLessonService, adminFacultyService } = useService();
  const navigate = useNavigate();
  const [faculty, setFaculty] = React.useState([]);
  const [newFormData, setNewFormData] = React.useState();

  const { isLoading: isLoadingFaculty } = useQuery(
    QueryKeys.getAllFacultys,
    () => {
      adminFacultyService
        .getFacultysAll()
        .then((data) => setFaculty(data.data));
    }
  );

  const { mutateAsync: mutateNewLesson, isLoading } = useMutation((body) => {
    return adminLessonService.postNewLesson(body);
  });

  const handleOnChangeInput = ({ target: { value, name } }) =>
    setNewFormData((previous) => ({ ...previous, [name]: value }));

  const handleOnSumbit = () =>
    mutateNewLesson(newFormData)
      .then(() => {
        navigate(ROUTES.ADMIN.LESSON.HOME);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Xəta baş verdi",
          text: "Dəyişikliklər saxlanılmadı! Daha sonra yenidən cəhd edin",
        });
      });

  if (isLoading || isLoadingFaculty) {
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
      <FormLabel>Dərs Adı</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        name="Name"
        placeholder="Boş Buraxıla Bilmez"
      />
      <FormLabel>Fakültə</FormLabel>
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

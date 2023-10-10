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

export const NewTeacher = () => {
  const { adminTeacherService, adminFacultyService } = useService();
  const navigate = useNavigate();
  const [newFormData, setNewFormData] = React.useState();
  const [faculty, setFaculty] = React.useState([]);
  const [imgFile, setImgFile] = React.useState();
  const { isLoading: isFacultyLoading } = useQuery(
    [QueryKeys.getAllFacultys],
    () =>
      adminFacultyService
        .getFacultysAll()
        .then((data) => setFaculty(data.data))
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Xəta baş verdi",
            text: "Daha sonra yenidən cəhd edin",
          });
        })
  );

  const { mutateAsync: mutateNewTeacher, isLoading } = useMutation((body) => {
    return adminTeacherService.postNewTeacher(body, imgFile);
  });

  const handleOnChangeInput = ({ target: { value, name } }) =>
    setNewFormData((previous) => ({ ...previous, [name]: value }));

  const handleOnSumbit = () =>
    mutateNewTeacher(newFormData, imgFile)
      .then(() => {
        navigate(ROUTES.ADMIN.TEACHER.HOME);
      })
      .catch((e) => {
        console.log(e);
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
        Yeni Müəllim Əlavə et
      </Text>
      <FormLabel>Ad</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        name="FirstName"
        placeholder="Boş Buraxıla Bilmez"
      />
      <FormLabel>Soyad</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        name="SurName"
        placeholder="Boş Buraxıla Bilmez"
      />
      <FormLabel>Şifrə</FormLabel>
      <Input
        type="password"
        onChange={(e) => handleOnChangeInput(e)}
        name="Password"
        placeholder="Boş Buraxıla Bilmez"
      />
      <FormLabel>Doğum Tarixi</FormLabel>
      <Input
        type="date"
        onChange={(e) => handleOnChangeInput(e)}
        name="Birthday"
        placeholder="Boş Buraxıla Bilmez"
      />
      <FormLabel>Ixtisas</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        name="Specialty"
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
      <FormLabel>Dil</FormLabel>
      <Select
        name="Language"
        onChange={(e) => handleOnChangeInput(e)}
        placeholder="Dil Seçin"
      >
        <option value="Azerbaycan">AZ</option>
        <option value="İngilis">EN</option>
        <option value="Rus">RU</option>
      </Select>
      <FormLabel>Mail</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        name="Mail"
        placeholder="Boş Buraxıla Bilmez"
      />
      <FormLabel>Şəkil</FormLabel>
      <Input
        type="file"
        onChange={(e) => setImgFile(e.target.files[0])}
        name="ImageFile"
      />
      <Button colorScheme="blue" onClick={handleOnSumbit}>
        Create
      </Button>
    </FormControl>
  );
};

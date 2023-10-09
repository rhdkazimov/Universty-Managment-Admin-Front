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

const NewGroup = () => {
  const { adminSpecialtyService, adminGroupService } = useService();
  const navigate = useNavigate();
  const [specialty, setSpecialty] = React.useState([]);
  const [newGroupFormData, setNewGroupFormData] = React.useState();

  useQuery(QueryKeys.getAllSpecialtys, () => {
    adminSpecialtyService
      .getSpecialtyAll()
      .then((data) => setSpecialty(data.data));
  });

  const { mutateAsync: mutateNewGroup, isLoading } = useMutation((body) => {
    console.log(newGroupFormData);
    return adminGroupService.postNewGroup(body);
  });

  const handleOnChangeInput = ({ target: { value, name } }) =>
    setNewGroupFormData((previous) => ({ ...previous, [name]: value }));

  const handleOnSumbit = () =>
    mutateNewGroup(newGroupFormData)
      .then(() => {
        navigate(ROUTES.ADMIN.GROUP);
      })
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
      <Text as='b' fontSize='3xl'>Yeni Qrup Yarat </Text>
      <FormLabel>GroupCode</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        name="GroupCode"
        placeholder="Group Code"
      />
      <FormLabel>Ixtisas</FormLabel>
      <Select
        name="SpecialtyId"
        onChange={(e) => handleOnChangeInput(e)}
        placeholder="Select Specialty"
      >
        {specialty.map((sp) => (
          <option value={sp.id}>{sp.name}</option>
        ))}
      </Select>
      <Button colorScheme='blue' onClick={handleOnSumbit}>Create</Button>
    </FormControl>
  );
};

export default NewGroup;

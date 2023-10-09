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
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";
import Swal from "sweetalert2";

export const EditType = () => {
  const location = useLocation();
  const initalEditInputValue = {
    name: location.state.name,
  };

  const { adminTypeService } = useService();
  const navigate = useNavigate();
  const [newFormData, setNewFormData] = React.useState(initalEditInputValue);

  const { mutateAsync: mutateEditType, isLoading } = useMutation((body) => {
    return adminTypeService.editTypeById(location.state.id, body);
  });

  const handleOnChangeInput = ({ target: { value, name } }) =>
    setNewFormData((previous) => ({ ...previous, [name]: value }));

  const handleOnSumbit = () =>
    mutateEditType(newFormData)
      .then(() => {
        navigate(ROUTES.ADMIN.TYPE.HOME);
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
      <Text as="b" fontSize="3xl">
        Tip Düzəliş et
      </Text>
      <FormLabel>Ad</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        name="name"
        defaultValue={location.state.name}
        placeholder="Boş Buraxıla Bilmez"
      />
      <Button colorScheme="blue" onClick={handleOnSumbit}>
        Yaddaşda Saxla
      </Button>
    </FormControl>
  );
};

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
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";
import Swal from "sweetalert2";

export const AddAdmin = () => {
  const { userAuthService } = useService();
  const navigate = useNavigate();
  const [newFormData, setNewFormData] = React.useState();

  const { mutateAsync: mutateNewAdmin, isLoading } = useMutation((body) =>
    userAuthService.createAdmin(body)
  );

  const handleOnChangeInput = ({ target: { value, name } }) =>
    setNewFormData((previous) => ({ ...previous, [name]: value }));

  const handleOnSumbit = () =>
    mutateNewAdmin(newFormData)
      .then(() => navigate(ROUTES.ADMIN.HOME))
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Xəta baş verdi",
          text: "Dəyişikliklər saxlanılmadı! Daha sonra yenidən cəhd edin",
        });
        navigate(ROUTES.ADMIN.HOME);
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
        Yeni Admin Yarat
      </Text>
      <FormLabel>UserName</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        name="userName"
        placeholder="istifadəçi adı"
      />
      <FormLabel>Mail</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        name="mail"
        placeholder="Mail"
      />
      <FormLabel>Şifrə</FormLabel>
      <Input
        type="password"
        onChange={(e) => handleOnChangeInput(e)}
        name="password"
        placeholder="Şifrə"
      />
      <Button colorScheme="blue" onClick={handleOnSumbit}>
        Create
      </Button>
    </FormControl>
  );
};

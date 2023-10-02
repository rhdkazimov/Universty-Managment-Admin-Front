import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useService } from "../../API/Services";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";
import Swal from "sweetalert2";

const NewAnnounce = () => {
  const { adminAnnounceService } = useService();
  const navigate = useNavigate();
  const [newFormData, setNewFormData] = React.useState();

  const { mutateAsync: mutateNewGroup, isLoading } = useMutation((body) => {
    return adminAnnounceService.postNewAnnounce(body);
  });

  const handleOnChangeInput = ({ target: { value, name } }) =>
    setNewFormData((previous) => ({ ...previous, [name]: value }));

  const handleOnSumbit = () =>
    mutateNewGroup(newFormData)
      .then(() => {
        navigate(ROUTES.ADMIN.ANNOUNCE.HOME);
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
      <FormLabel>Başlıq</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        name="headerInfo"
        placeholder="Header Info"
      />
      <FormLabel>Məlumat</FormLabel>
      <Textarea
        onChange={(e) => handleOnChangeInput(e)}
        name="mainInfo"
        placeholder="Main Info"
      />
      <Button colorScheme="blue" onClick={handleOnSumbit}>
        Create
      </Button>
    </FormControl>
  );
};

export default NewAnnounce;

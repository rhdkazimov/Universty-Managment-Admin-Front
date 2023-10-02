import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Spinner,
  } from "@chakra-ui/react";
  import React from "react";
  import { useService } from "../../API/Services";
  import { useMutation, useQuery } from "react-query";
  import { useNavigate } from "react-router-dom";
  import { ROUTES } from "../../Routes/consts";
  import Swal from "sweetalert2";
  
  export const NewType = () => {
    const { adminTypeService } = useService();
    const navigate = useNavigate();
    const [newFormData, setNewFormData] = React.useState();
  
    const { mutateAsync: mutateNewType, isLoading } = useMutation((body) => {
      return adminTypeService.postNewType(body);
    });
  
    const handleOnChangeInput = ({ target: { value, name } }) =>
      setNewFormData((previous) => ({ ...previous, [name]: value }));
  
    const handleOnSumbit = () =>
      mutateNewType(newFormData)
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
        <FormLabel>Ad</FormLabel>
        <Input
          onChange={(e) => handleOnChangeInput(e)}
          name="name"
          placeholder="Boş Buraxıla Bilmez"
        />
        <Button colorScheme="blue" onClick={handleOnSumbit}>
          Create
        </Button>
      </FormControl>
    );
  };
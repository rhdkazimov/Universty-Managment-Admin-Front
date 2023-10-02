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
  
  export const NewSetting = () => {
    const { adminSettingService } = useService();
    const navigate = useNavigate();
    const [newFormData, setNewFormData] = React.useState();
  
    const { mutateAsync: mutateNewSetting, isLoading } = useMutation((body) => {
      return adminSettingService.postNewSetting(body);
    });
  
    const handleOnChangeInput = ({ target: { value, name } }) =>
      setNewFormData((previous) => ({ ...previous, [name]: value }));
  
    const handleOnSumbit = () =>
      mutateNewSetting(newFormData)
        .then(() => {
          navigate(ROUTES.ADMIN.SETTING.HOME);
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
        <FormLabel>Açar söz</FormLabel>
        <Input
          onChange={(e) => handleOnChangeInput(e)}
          name="key"
          placeholder="Boş Buraxıla Bilmez"
        />
        <FormLabel>Dəyər</FormLabel>
        <Input
          onChange={(e) => handleOnChangeInput(e)}
          name="value"
          placeholder="Boş Buraxıla Bilmez"
        />
        <Button colorScheme="blue" onClick={handleOnSumbit}>
          Create
        </Button>
      </FormControl>
    );
  };
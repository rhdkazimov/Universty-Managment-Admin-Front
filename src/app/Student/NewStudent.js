import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Spinner,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import React from "react";
import { useService } from "../../API/Services";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";
import Swal from "sweetalert2";
import { QueryKeys } from "../../consts";

export const NewStudent = () => {
  const { adminStudentService, adminGroupService } = useService();
  const navigate = useNavigate();
  const [newFormData, setNewFormData] = React.useState();
  const [isStateOrdered, setIsStateOrdered] = React.useState(false);
  const [isStatus, setIsStatus] = React.useState(false);
  const [group, setGroup] = React.useState([]);
  const [imgFile, setImgFile] = React.useState();

  const { isLoading: isGroupLoading } = useQuery([QueryKeys.getAllGroups], () =>
    adminGroupService
      .getGroupsAll()
      .then((data) => setGroup(data.data))
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Xəta baş verdi",
          text: "Daha sonra yenidən cəhd edin",
        });
      })
  );

  const { mutateAsync: mutateNewStudent, isLoading } = useMutation((body) =>
    adminStudentService.postNewStudent(body, isStatus, isStateOrdered, imgFile)
  );

  const handleOnChangeInput = ({ target: { value, name } }) =>
    setNewFormData((previous) => ({ ...previous, [name]: value }));

  const handleOnSumbit = () =>
    mutateNewStudent(newFormData)
      .then(() => {
        navigate(ROUTES.ADMIN.STUDENT.HOME);
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Xəta baş verdi",
          text: "Dəyişikliklər saxlanılmadı! Daha sonra yenidən cəhd edin",
        });
      });

  if (isLoading || isGroupLoading) {
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
        Yeni Tələbə Əlavə et
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
      <FormLabel>Qrup</FormLabel>
      <Select
        name="groupId"
        onChange={(e) => handleOnChangeInput(e)}
        placeholder="Qrup Seçin"
      >
        {group.map(({ id, groupCode }) => (
          <option value={id}>{groupCode}</option>
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
      <FormLabel>İllik</FormLabel>
      <Input
        type="number"
        onChange={(e) => handleOnChangeInput(e)}
        name="PerYear"
        placeholder="Boş Buraxıla Bilmez"
      />
      <FormLabel>Status</FormLabel>
      <Checkbox onChange={(e) => setIsStatus(e.target.checked)} name="Status">
        Checkbox
      </Checkbox>
      <FormLabel>Dövlət Sifarişli</FormLabel>
      <Checkbox
        name="StateOrdered"
        onChange={(e) => setIsStateOrdered(e.target.checked)}
      >
        Checkbox
      </Checkbox>
      <FormLabel>Giriş Balı</FormLabel>
      <Input
        max={700}
        type="number"
        onChange={(e) => handleOnChangeInput(e)}
        name="IncludePoint"
      />
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
        name="ImgFile"
      />
      <Button colorScheme="blue" onClick={handleOnSumbit}>
        Create
      </Button>
    </FormControl>
  );
};

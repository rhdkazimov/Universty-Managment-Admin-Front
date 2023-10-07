import React from "react";
import { useService } from "../../API/Services";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { QueryKeys } from "../../consts";
import Swal from "sweetalert2";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";

export const Settings = () => {
  const { adminSettingService } = useService();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [data, setData] = React.useState([]);

  const { isLoading } = useQuery(QueryKeys.getAllSettings, () => {
    adminSettingService.getSettingsAll().then((data) => setData(data.data)).catch((err)=>console.log(err));
  });

  const { mutateAsync: mutateDeleteSetting } = useMutation((id) =>
    adminSettingService.deleteSettingById(id),{onSuccess:()=>queryClient.invalidateQueries([QueryKeys.getAllSettings])}
  );

  const handleNavigation = () => navigate(ROUTES.ADMIN.SETTING.NEW_SETTING);

  const handleDeleteSetting = (id) => {
    Swal.fire({
      title: "Silmək istədiyinizdən əminsiniz ?",
      text: "Dəyişikliklər yaddaşda saxlanılmayacağ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hə,əminəm !",
      cancelButtonText: "Ləğv et",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateDeleteSetting(id)
          .then(() => {
            return Swal.fire({
              position: "center",
              icon: "success",
              title: "Silindi",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            return Swal.fire({
              icon: "error",
              title: "Xəta baş verdi",
              text: "Silinmədi ! Daha sonra yenidən cəhd edin",
            });
          });
      } else return null;
    });
  };

  const handleEditSetting = (id, key, value) => {
    navigate(ROUTES.ADMIN.SETTING.EDIT_SETTING, {
      state: { id, key, value },
    });
  };

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
    <div>
      <Flex>
        <Button colorScheme="blue" onClick={() => handleNavigation()}>
          Yenisini Əlavə et
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Açar söz</Th>
              <Th>Dəyər</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0
              ? data.map(({ id, key, value }) => (
                  <Tr key={id}>
                    <Td>{id}</Td>
                    <Td>{key}</Td>
                    <Td>{value}</Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDeleteSetting(id)}
                      >
                        Silmək
                      </Button>
                      <Button
                        colorScheme="orange"
                        onClick={() => handleEditSetting(id, key, value)}
                      >
                        Edit
                      </Button>
                    </Td>
                  </Tr>
                ))
              : "data yoxdur"}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

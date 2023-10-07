import React from "react";
import { useService } from "../../API/Services";
import { useMutation, useQuery, useQueryClient } from "react-query";
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

export const Type = () => {
  const { adminTypeService } = useService();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [data, setData] = React.useState([]);

  const { isLoading } = useQuery(QueryKeys.getAllTypes, () => {
    adminTypeService.getTypesAll().then((data) => setData(data.data));
  });

  const { mutateAsync: mutateDeleteType } = useMutation((id) =>
    adminTypeService.deleteTypeById(id),{onSuccess:()=>queryClient.invalidateQueries([QueryKeys.getAllTypes])}
  );

  const handleNavigation = () => navigate(ROUTES.ADMIN.TYPE.NEW_TYPE);

  const handleDeleteType = (id) => {
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
        mutateDeleteType(id)
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

  const handleEditType = (id, name) => {
    navigate(ROUTES.ADMIN.TYPE.EDIT_TYPE, {
      state: { id, name },
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
              <Th>Adı</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0
              ? data.map(({ id, name }) => (
                  <Tr key={id}>
                    <Td>{id}</Td>
                    <Td>{name}</Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDeleteType(id)}
                      >
                        Silmək
                      </Button>
                      <Button
                        colorScheme="orange"
                        onClick={() => handleEditType(id, name)}
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
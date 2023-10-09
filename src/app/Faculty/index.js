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
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";

export const Faculty = () => {
  const { adminFacultyService } = useService();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [facultysData, setFacultysData] = React.useState([]);

  const { isLoading } = useQuery(QueryKeys.getAllFacultys, () => {
    adminFacultyService
      .getFacultysAll()
      .then((data) => setFacultysData(data.data));
  });

  const { mutateAsync: mutateDeleteFaculty } = useMutation(
    (id) => adminFacultyService.deleteFacultyById(id),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([QueryKeys.getAllFacultys]),
    }
  );

  const handleNavigation = () => navigate(ROUTES.ADMIN.FACULTY.NEW_FACULTY);

  const handleDeleteFaculty = (id) => {
    Swal.fire({
      title: "Qrupu silmək istədiyinizdən əminsiniz ?",
      text: "Dəyişikliklər yaddaşda saxlanılmayacağ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hə,əminəm !",
      cancelButtonText: "Ləğv et",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateDeleteFaculty(id)
          .then(() => {
            return Swal.fire({
              position: "center",
              icon: "success",
              title: "Qrup Silindi",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            return Swal.fire({
              icon: "error",
              title: "Xəta baş verdi",
              text: "Qrup silinmədi ! Daha sonra yenidən cəhd edin",
            });
          });
      } else return null;
    });
  };

  const handleEditFaculty = (id, name, code) => {
    navigate(ROUTES.ADMIN.FACULTY.EDIT_FACULTY, {
      state: { id, name, code },
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
      <Text as="b" fontSize="3xl">
        Fakültələr
      </Text>
      <Flex>
        <Button colorScheme="blue" onClick={() => handleNavigation()}>
          Fakültə Yarat
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Kod</Th>
              <Th>Adı</Th>
            </Tr>
          </Thead>
          <Tbody>
            {facultysData.length > 0 ? (
              facultysData.map(({ id, name, code }) => (
                <Tr key={id}>
                  <Td>{id}</Td>
                  <Td>{code}</Td>
                  <Td>{name}</Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDeleteFaculty(id)}
                    >
                      Silmək
                    </Button>
                    <Button
                      colorScheme="orange"
                      onClick={() => handleEditFaculty(id, name, code)}
                    >
                      Edit
                    </Button>
                  </Td>
                </Tr>
              ))
            ) : (
              <h1>Data Yoxdur . . .</h1>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

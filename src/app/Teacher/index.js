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
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";

export const Teachers = () => {
  const { adminTeacherService } = useService();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [data, setData] = React.useState([]);

  const { isLoading } = useQuery(QueryKeys.getAllTeacher, () => {
    adminTeacherService
      .getAllTeacher()
      .then((data) => setData(data.data))
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Xəta baş verdi",
          text: "Daha sonra yenidən cəhd edin",
        })
      );
  });

  const { mutateAsync: mutateDeleteTeacher } = useMutation(
    (id) => adminTeacherService.deleteTeacherById(id),
    {
      onSuccess: () => queryClient.invalidateQueries([QueryKeys.getAllTeacher]),
    }
  );

  const handleNavigation = () => navigate(ROUTES.ADMIN.TEACHER.NEW_TEACHER);

  const handleDeleteTeacher = (id) => {
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
        mutateDeleteTeacher(id)
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
        Ayarlar
      </Text>
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
              <Th>Ad Soyad</Th>
              <Th>Mail</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0 ? (
              data.map(({ id, firstName, surName, mail }) => (
                <Tr key={id}>
                  <Td>{id}</Td>
                  <Td>{firstName + " " + surName}</Td>
                  <Td>{mail}</Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDeleteTeacher(id)}
                    >
                      Silmək
                    </Button>
                  </Td>
                </Tr>
              ))
            ) : (
              <h1>Məlumat Yoxdur . . .</h1>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

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

export const Specialty = () => {
  const { adminSpecialtyService } = useService();
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const queryClient = useQueryClient();

  const { isLoading, isRefetching } = useQuery(
    QueryKeys.getAllSpecialtys,
    () => {
      adminSpecialtyService
        .getSpecialtyAll()
        .then((data) => setData(data.data));
    }
  );

  const { mutateAsync: mutateDeleteSpecialty } = useMutation(
    (id) => adminSpecialtyService.deleteSpecialtyById(id),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([QueryKeys.getAllSpecialtys]),
    }
  );

  const handleNavigation = () => navigate(ROUTES.ADMIN.SPECIALTY.NEW_SPECIALTY);

  const handleDeleteLesson = (id) => {
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
        mutateDeleteSpecialty(id)
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

  const handleEditLesson = (id, name, facultyId) => {
    navigate(ROUTES.ADMIN.SPECIALTY.EDIT_SPECIALTY, {
      state: { id, name, facultyId },
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
        Ixtisaslar
      </Text>
      <Flex>
        <Button colorScheme="blue" onClick={() => handleNavigation()}>
          Ixtisas Yarat
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Ixtisas</Th>
              <Th>Fakültə</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0
              ? data.map(
                  ({
                    id,
                    name,
                    faculty: { name: facultyName, id: facultyId },
                  }) => (
                    <Tr key={id}>
                      <Td>{id}</Td>
                      <Td>{name}</Td>
                      <Td>{facultyName}</Td>
                      <Td>
                        <Button
                          colorScheme="red"
                          onClick={() => handleDeleteLesson(id)}
                        >
                          Silmək
                        </Button>
                        <Button
                          colorScheme="orange"
                          onClick={() => handleEditLesson(id, name, facultyId)}
                        >
                          Edit
                        </Button>
                      </Td>
                    </Tr>
                  )
                )
              : "data yoxdur"}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

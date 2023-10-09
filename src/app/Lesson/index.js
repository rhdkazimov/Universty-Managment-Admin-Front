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

const Lessons = () => {
  const { adminLessonService } = useService();
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const queryClient = useQueryClient();


  const { isLoading, isRefetching } = useQuery(QueryKeys.getAllLessons, () => {
    adminLessonService.getLessonsAll().then((data) => setData(data.data));
  });

  const { mutateAsync: mutateDeleteLesson } = useMutation((id) =>
    adminLessonService.deleteLessonById(id),{onSuccess:()=>queryClient.invalidateQueries([QueryKeys.getAllLessons])}
  );

  const handleNavigation = () => navigate(ROUTES.ADMIN.LESSON.NEW_LESSON);

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
        mutateDeleteLesson(id)
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

  const handleEditLesson = (id, name,hours, facultyId) => {
    navigate(ROUTES.ADMIN.LESSON.EDIT_LESSON, {
      state: { id,name,hours,facultyId },
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
      <Text as='b' fontSize='3xl'>Dərslər</Text>
      <Flex>
        <Button colorScheme="blue" onClick={() => handleNavigation()}>
          Dərs Yarat
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Dərs</Th>
              <Th>Saat</Th>
              <Th>Fakültə İd</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0
              ? data.map(({ id, name,hours,facultyId }) => (
                  <Tr key={id}>
                    <Td>{id}</Td>
                    <Td>{name}</Td>
                    <Td>{hours}</Td>
                    <Td>{facultyId}</Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDeleteLesson(id)}
                      >
                        Silmək
                      </Button>
                      <Button
                        colorScheme="orange"
                        onClick={() => handleEditLesson(id, name,hours, facultyId)}
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

export default Lessons;

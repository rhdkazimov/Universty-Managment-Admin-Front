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

export const GroupLesson = () => {
  const {adminGroupLessonService} = useService();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [data, setData] = React.useState([]);

  const { isLoading } = useQuery(QueryKeys.getAllGroupLesson, () => {
    adminGroupLessonService.getAllGroupLessons().then((data) => setData(data.data));
  });

  const { mutateAsync:mutateDeleteGroupLesson } = useMutation((id) =>
  adminGroupLessonService.deleteGroupLessonById(id),{onSuccess:()=>queryClient.invalidateQueries([QueryKeys.getAllGroupLesson])}
  );

  const handleNavigation = () => navigate(ROUTES.ADMIN.GROUP_LESSON.NEW_GROUP_LESSON);

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
        mutateDeleteGroupLesson(id)
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

  const handleEditType = (id,groupId,lessonId,teacherId) => {
    navigate(ROUTES.ADMIN.GROUP_LESSON.EDIT_GROUP_LESSON, {
      state: { id,groupId,lessonId,teacherId },
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
      <Text as='b' fontSize='3xl'>Qrup Dərsləri </Text>
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
              <Th>Qrup Kodu</Th>
              <Th>Dərs Adı</Th>
              <Th>Müəllim</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0
              ? data.map(({ id, group:{id:groupId,groupCode},lesson:{id:lessonId,name},teacher:{id:teacherId,firstName,surName} }) => (
                  <Tr key={id}>
                    <Td>{id}</Td>
                    <Td>{groupCode}</Td>
                    <Td>{name}</Td>
                    <Td>{firstName+" "+surName}</Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDeleteType(id)}
                      >
                        Silmək
                      </Button>
                      <Button
                        colorScheme="orange"
                        onClick={() => handleEditType(id,groupId,lessonId,teacherId)}
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
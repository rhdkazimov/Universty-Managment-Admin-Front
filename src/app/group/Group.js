import React from "react";
import { useService } from "../../API/Services";
import { useMutation, useQuery } from "react-query";
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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";

const Group = () => {
  const { adminGroupService } = useService();
  const navigate = useNavigate();
  const [groupsData, setGroupsData] = React.useState([]);

  const { isLoading, isRefetching } = useQuery(QueryKeys.getAllGroups, () => {
    adminGroupService.getGroupsAll().then((data) => setGroupsData(data.data));
  });

  const { mutateAsync: mutateDeleteGroup } = useMutation((id) =>
    adminGroupService.deleteGroupById(id)
  );

  const handleNavigation = () =>navigate(ROUTES.ADMIN.NEW_GROUP);

  const handleDeleteGroup = (id) => {
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
        mutateDeleteGroup(id)
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

  if (isLoading) {
    return "....loading";
  }

  return (
    <div>
      <Flex>
        <Button colorScheme="blue" onClick={()=>handleNavigation()}>Qrup Yarat</Button>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Kod</Th>
              <Th>Tələbə</Th>
              <Th>İxstisas</Th>
              <Th>Operation</Th>
            </Tr>
          </Thead>
          <Tbody>
            {groupsData.length > 0
              ? groupsData.map(
                  ({
                    id,
                    groupCode,
                    studentsCount,
                    specialty: { id: specialtyId, name, facultyId },
                  }) => (
                    <Tr key={id}>
                      <Td>{id}</Td>
                      <Td>{groupCode}</Td>
                      <Td>{studentsCount}</Td>
                      <Td>{specialtyId}</Td>
                      <Td>
                        <Button
                          colorScheme="red"
                          onClick={() => handleDeleteGroup(id)}
                        >
                          Silmək
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

export default Group;

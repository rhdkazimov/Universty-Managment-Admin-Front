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

const Announces = () => {
  const { adminAnnounceService } = useService();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [data, setData] = React.useState([]);

  const { isLoading } = useQuery(QueryKeys.getAllAnnounces, () => {
    adminAnnounceService.getAnnouncesAll().then((data) => setData(data.data));
  });

  const { mutateAsync: mutateDeleteAnnounce } = useMutation(
    (id) => adminAnnounceService.deleteAnnounceById(id),
    {
      onSuccess: () => queryClient.invalidateQueries([QueryKeys.getAllAnnounces]),
    }
  );

  const handleNavigation = () => navigate(ROUTES.ADMIN.ANNOUNCE.NEW_ANNOUNCE);

  const handleDeleteAnnounce = (id) => {
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
        mutateDeleteAnnounce(id)
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
      <Text as='b' fontSize='3xl'>Elanlar </Text>
      <Flex>
        <Button colorScheme="blue" onClick={() => handleNavigation()}>
          Elan Yarat
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Başlıq</Th>
              <Th>Məlumat</Th>
              <Th>Tarix</Th>
              <Th>Operation</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0
              ? data.map(({ id, headerInfo, date, mainInfo }) => (
                  <Tr key={id}>
                    <Td>{id}</Td>
                    <Td>{headerInfo}</Td>
                    <Td>
                      <Text>{mainInfo}</Text>
                    </Td>
                    <Td>{date}</Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDeleteAnnounce(id)}
                      >
                        Silmək
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

export default Announces;

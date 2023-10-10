import React from "react";
import { useService } from "../../API/Services";
import { useQuery } from "react-query";
import { QueryKeys } from "../../consts";
import { Spinner, Text } from "@chakra-ui/react";
import { BarComp } from "./bar";

const Dashboard = () => {
  const { adminStudentService, adminStatisticService } = useService();
  const [data, setData] = React.useState([]);
  const [usersStatistics, setUsersStatistics] = React.useState({});

  const { isLoading } = useQuery(QueryKeys.getAllAnnounces, () => {
    adminStudentService.getAllStudent().then(({ data }) => setData(data));
  });

  useQuery(QueryKeys.getStatisticUser, () => {
    adminStatisticService
      .getUsersCount()
      .then(({ data }) => setUsersStatistics(data));
  });

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
    <>
      <Text className="dashboardInfo" as="b" fontSize="5xl">
        Statistika
      </Text>
      <div className="dashboard">
        <div className="asignedUserStats">
          <Text fontSize="2xl" as="b">Tələbə Sayı : {usersStatistics.studentsCount}</Text>
          <Text fontSize="2xl" as="b">Müəllim sayı : {usersStatistics.teachersCount}</Text>
        </div>
        <BarComp data={data} />
      </div>
    </>
  );
};

export default Dashboard;

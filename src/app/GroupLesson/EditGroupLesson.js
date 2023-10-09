import {
  FormControl,
  FormLabel,
  Select,
  Button,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useService } from "../../API/Services";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";
import Swal from "sweetalert2";
import { QueryKeys } from "../../consts";

export const EditGroupLesson = () => {
  const location = useLocation();

  const initialEditGroupLessonValue = {
    groupId: location.state.groupId,
    lessonId: location.state.lessonId,
    teacherId: location.state.teacherId,
  };

  const {
    adminLessonService,
    adminGroupService,
    adminTeacherService,
    adminGroupLessonService,
  } = useService();
  const navigate = useNavigate();
  const [lesson, setLesson] = React.useState([]);
  const [teacher, setTeacher] = React.useState([]);
  const [group, setGroup] = React.useState([]);
  const [newFormData, setNewFormData] = React.useState(
    initialEditGroupLessonValue
  );

  const { isLoading: isLoadingGroup } = useQuery(QueryKeys.getAllGroups, () => {
    adminGroupService.getGroupsAll().then((data) => setGroup(data.data));
  });
  const { isLoading: isLoadingLesson } = useQuery(
    QueryKeys.getAllLessons,
    () => {
      adminLessonService.getLessonsAll().then((data) => setLesson(data.data));
    }
  );
  const { isLoading: isLoadingTeacher } = useQuery(
    QueryKeys.getAllTeacher,
    () => {
      adminTeacherService.getAllTeacher().then((data) => setTeacher(data.data));
    }
  );

  const { mutateAsync: mutateNewLesson, isLoading } = useMutation((body) => {
    return adminGroupLessonService.editGroupLessonById(location.state.id, body);
  });

  const handleOnChangeInput = ({ target: { value, name } }) =>
    setNewFormData((previous) => ({ ...previous, [name]: value }));

  const handleOnSumbit = () =>
    mutateNewLesson(newFormData)
      .then(() => {
        navigate(ROUTES.ADMIN.GROUP_LESSON.HOME);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Xəta baş verdi",
          text: "Dəyişikliklər saxlanılmadı! Daha sonra yenidən cəhd edin",
        });
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
    <FormControl isRequired>
      <Text as='b' fontSize='3xl'>Qrup Dərslərini dəyiş  </Text>
      <FormLabel>Qrup</FormLabel>
      <Select
        name="GroupId"
        onChange={(e) => handleOnChangeInput(e)}
        placeholder="Qrup Seçin"
        defaultValue={location.state.groupCode}
      >
        {group.map(({ id, groupCode }) => (
          <option selected={id===location.state.groupId&&true} value={id}>{groupCode}</option>
        ))}
      </Select>
      <FormLabel>Dərs</FormLabel>
      <Select
        name="LessonId"
        onChange={(e) => handleOnChangeInput(e)}
        placeholder="Dərsi Seçin"
      >
        {lesson.map(({ id, name }) => (
          <option selected={name===location.state.name&&true} value={id}>{name}</option>
        ))}
      </Select>
      <FormLabel>Müəllim</FormLabel>
      <Select
        name="TeacherId"
        onChange={(e) => handleOnChangeInput(e)}
        placeholder="Müəllim Seçin"
      >
        {teacher.map(({ id, firstName, surName }) => (
          <option  selected={id===location.state.teacherId&&true} value={id}>{firstName + " " + surName}</option>
        ))}
      </Select>
      <Button colorScheme="blue" onClick={handleOnSumbit}>
        Yaddaşda Saxla
      </Button>
    </FormControl>
  );
};

import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import { useService } from "../../API/Services";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";
import Swal from "sweetalert2";
import { QueryKeys } from "../../consts";

export const NewGroupLesson = () => {
  const {
    adminLessonService,
    adminGroupService,
    adminGroupLessonService,
    adminTeacherService,
  } = useService();
  const navigate = useNavigate();
  const [lesson, setLesson] = React.useState([]);
  const [teacher, setTeacher] = React.useState([]);
  const [group, setGroup] = React.useState([]);
  const [newFormData, setNewFormData] = React.useState();

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

  const { mutateAsync: mutateNewGroupLesson, isLoading } = useMutation(
    (body) => {
      return adminGroupLessonService.postNewGroupLesson(body);
    }
  );

  const handleOnChangeInput = ({ target: { value, name } }) =>
    setNewFormData((previous) => ({ ...previous, [name]: value }));

  const handleOnSumbit = () =>
    mutateNewGroupLesson(newFormData)
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
      <FormLabel>Qrup</FormLabel>
      <Select
        name="GroupId"
        onChange={(e) => handleOnChangeInput(e)}
        placeholder="Qrup Seçin"
      >
        {group.map(({ id, groupCode }) => (
          <option value={id}>{groupCode}</option>
        ))}
      </Select>
      <FormLabel>Dərs</FormLabel>
      <Select
        name="LessonId"
        onChange={(e) => handleOnChangeInput(e)}
        placeholder="Dərsi Seçin"
      >
        {lesson.map(({ id, name }) => (
          <option value={id}>{name}</option>
        ))}
      </Select>
      <FormLabel>Müəllim</FormLabel>
      <Select
        name="TeacherId"
        onChange={(e) => handleOnChangeInput(e)}
        placeholder="Müəllim Seçin"
      >
        {teacher.map(({ id, firstName,surName }) => (
          <option value={id}>{firstName+" "+surName}</option>
        ))}
      </Select>
      <Button colorScheme="blue" onClick={handleOnSumbit}>
        Create
      </Button>
    </FormControl>
  );
};

import axiosClient from "@/api/axiosClient";

export const CoursesApi = {
  getAllCourses: () => {
    const url = "/course/";
    return axiosClient.get(url);
  },

  addCourse: (data, token) => {
    const url = "/course/";
    return axiosClient.post(url, data, { headers: { token: token } });
  },

  getCourseLesson: (id, token) => {
    const url = `/course/${id}/lessons`;
    return axiosClient.get(url, { headers: { token: token } });
  },

  getLessonById: (id, token) => {
    const url = `/lessons/${id}`;
    return axiosClient.get(url, { headers: { token: token } });
  },

  deleteCourse: (id, token) => {
    const url = `/course/${id}`;
    return axiosClient.delete(url, { headers: { token: token } });
  },

  editCourse: (id, data, token) => {
    const url = `/course/edit/${id}`;
    return axiosClient.post(url, data, { headers: { token: token } });
  },

  addLessonToCourse: (id, data, token) => {
    const url = `/course/${id}/lessons`;
    return axiosClient.post(url, data, { headers: { token: token } });
  },

  deleteLesson: (id, token) => {
    const url = `/course/lessons/${id}`;
    return axiosClient.delete(url, { headers: { token: token, "Content-Type": 'multipart/form-data' } });
  },
};

export default CoursesApi;
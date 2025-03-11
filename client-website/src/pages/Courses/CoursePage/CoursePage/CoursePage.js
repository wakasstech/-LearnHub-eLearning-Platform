import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Learnings,
  courseIncludes,
  courseDetails,
  courseData,
  courseReq,
  desc,
  courseDetData,
  moreCourses,
  instructorData,
  featuredReviewUserData,
} from "../../../../../src/defaultData/fakedata";
import CourseHeaderComp from "../../../../components/CourseComponents/CourseHeaderComp/CourseHeaderComp";

import TextPointsNoter from "../../../../components/CourseComponents/TextPointsNoter/TextPointsNoter";
// import CourseIncludesCard from "../../../../components/Cards/CourseIncludesCard/CourseIncludesCard";
import CourseReqComp from "../../../../components/CourseComponents/CourseReqComp/CourseReqComp";
import CourseDescriptionComp from "../../../../components/CourseComponents/CourseDescriptionComp/CourseDescriptionComp";
import FeaturedReviewComp from "../../../../components/CourseComponents/FeaturedReviewComp/FeaturedReviewComp";
import StudentsAlsoBought from "../../../../components/CourseComponents/StudentsAlsoBought/StudentsAlsoBought";
import CourseInstructorComp from "../../../../components/CourseComponents/CourseInstructorComp/CourseInstructorComp";
// import CourseCard from "../../../../components/Cards/CourseCard/CourseCard";
// import ShareCourseCard from "../../../../components/Cards/ShareCourseCard/ShareCourseCard";
import CourseDetailsTabComp from "../../../../components/CourseComponents/CourseDetailsTabComp/CourseDetailsTabComp";


import css from "./CoursePage.module.css";
import Button1 from "../../../../utils/coursepageutils/Buttons/Button1/Button1";
import { useDispatch, useSelector } from "react-redux";
import { fetchLectures } from "../../../../globalStore/Slices/LecturesSlice";
import { fetchEnrollmentInfo } from "../../../../globalStore/Slices/CoursesSlice";
import CourseEnrollmentTabComp from "../../../../components/CourseComponents/CourseEnrollmentTabComp/CourseEnrollmentTabComp";

const CoursePage = () => {
  const [shareModal, setShareModal] = useState(false);
  const location = useLocation();
  const { completeInfo, courseId } = location.state || {};
console.log(completeInfo,'completeInfocompleteInfo')
const { enrollStudents, enrollTeachers} = useSelector((state) => state.courses);


const { lectures, loading, error } = useSelector((state) => state.lectures);
 
// const checkLectureRequest = ( ) => {
//     if(checkLectureRequest){
//       const { lectures, loading, error } = useSelector((state) => state.lectures);
//     }
// }

const course = completeInfo;



const dispatch = useDispatch();

  useEffect(() => {
    if (courseId) {
      dispatch(fetchLectures({ courseId }));
      dispatch(fetchEnrollmentInfo({ courseId }));
      // alert(courseId)
    }
  }, [dispatch, courseId]);


  // useEffect(() => {
  //   if (courseId) {
     
  //     dispatch(fetchEnrollmentInfo({ courseId }));
  //     // alert(courseId)
  //   }
  // }, [dispatch, courseId]);


  return (
    <>


        <div className={css.outerDiv}>
          <CourseHeaderComp
           enrollStudents={enrollStudents}
           enrollTeachers={enrollTeachers}
           data={completeInfo}
           setShareModal={setShareModal}
          />
          <div className={css.innerDiv}>
            <div className={css.bodySec}>
              <TextPointsNoter data={Learnings} />
              <div >
                <div className={css.secTtl}>Enroll Info</div>
                <div className={css.secBdy}>
                  <CourseEnrollmentTabComp  />
                </div>
              </div>
              <div className={css.boxSection}>
                <div className={css.secTtl}>Course content</div>
                <div className={css.secBdy}>
                  <CourseDetailsTabComp courseData={lectures} />
                </div>
              </div>
              <div className={css.boxSection}>
                <CourseReqComp data={courseReq} />
              </div>
              <div className={css.boxSection}>
                <CourseDescriptionComp ttl="Description" desc={desc} />
              </div>
              <div className={css.boxSection}>
                <div className={css.secTtl}>
                  {instructorData?.length > 1 ? "Instructors" : "Instructor"}
                </div>
                {instructorData?.map((item) => {
                  return <CourseInstructorComp key={item.id} data={item} />;
                })}
              </div>
              <hr />
            </div>
          </div>
        </div>
      </>
    
  );
};

export default CoursePage;

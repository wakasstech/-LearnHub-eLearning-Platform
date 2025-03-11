import { useEffect, useState } from "react";
import css from "./CourseFloatingBuyCard.module.css";
import alarmIcon from "../../../assests/icons/alaram.png";
// import playIcon from "/icons/play.png";
import heartIcon from "../../../assests/icons/play-icon.png";
import { Alarm, PlayCircle } from "@mui/icons-material";
import Button1 from "../../../utils/coursepageutils/Buttons/Button1/Button1";
import InputUtil from "../../../utils/coursepageutils/FormUtils/InputUtil/InputUtil";
import defaultThumbnail from "../../../assests/images/homeBanner.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { courseEnrollment } from "../../../services/ApiService/CourseService";
import Swal from "sweetalert2";
import { addEnrollment, fetchEnrollmentInfo } from "../../../globalStore/Slices/CoursesSlice";

const CourseFloatingBuyCard = (props) => {
  const { user } = useSelector((state) => state.auth);

  const { enrollStudents, enrollTeachers } = useSelector(
    (state) => state.courses
  );
  const userRole = useSelector((state) => state.auth.role);
console.log(userRole, 'user role comes from ')
  const dispatch = useDispatch();
  const [approvalStatus, setApprovalStatus] = useState({status: null, role: null});

  const navigate = useNavigate();

  const {
    thumbnail_image,
    course_name,
    course_description,
    duration,
    course_outline,
    course_timings,
    course_fee,
    courseId,
    id,
    rating = 4.9,
    rats = 100,
    enrolled = 1000,
    authors = ["Imam Ali", "Sheikh Ahmed"],
    lastUpdated = new Date(),
    lang = "Arabic",
    subTtl = "English",
    is_premium
  } = props.data;

  const { scrolled, setCoupon, applyCoupon, setApplyCoupon, setShareModal } =
    props;
  const [validImage, setValidImage] = useState(null);
  const styleGuide = {
    display: "none",
  };

  const outStyleGuide = {
    position: "fixed",
    top: 0,
    right: "12%",
  };

  const handleClickCourse = () => {
    alert(id)
    navigate("/course_lectures", {
      state: {
        courseId: id,
        courseName: course_name,
      },
    });
    // if (is_premium === false) {
    //   navigate("/course_lectures", {
    //     state: {
    //       courseId: id,
    //       courseName: course_name,
    //     },
    //   });
    // } else
    //  if (
    //   !enrollStudents.some((student) => student.user_id === user?.id) &&
    //   !enrollTeachers.some((teacher) => teacher.user_id === user?.id)
    // ) {
    //   Swal.fire({
    //     text: "Please enroll first.",
    //     icon: "error",
    //     confirmButtonText: "OK",
    //   });
    // } else if (approvalStatus?.approved === false) {
    //   Swal.fire({
    //     icon: "info",
    //     title: "Request Pending",
    //     text: `We're still processing your request to be enrolled as a ${
    //       approvalStatus.role === "student" ? "student" : "teacher"
    //     }. Please wait for admin approval.`,
    //     showCancelButton: false,
    //     confirmButtonText: "OK",
    //   });
    // } else {
    //   navigate("/course_lectures", {
    //     state: {
    //       courseId: id,
    //       courseName: course_name,
    //     },
    //   });
    // } 


  };
  
  
  const defaultCourseThumbs = [
    "https://media.istockphoto.com/id/1718890803/photo/close-up-of-holy-book-quran-at-mosque-sunlight-is-reflected-to-quran.webp?b=1&s=170667a&w=0&k=20&c=nZQ6tCRnxbK2dmQ5hHHoyKdCVumaiskPwNJZ0GPu_Uk=",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBZ5bRblqFICE4-f0gQNUxOkqzkDMChgH8Kg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRVOteqWY1aIK721xRyOXj8G8ri8trrc88w&s",
  ];

  const getRandomDefaultImage = () => {
    return defaultCourseThumbs[
      Math.floor(Math.random() * defaultCourseThumbs.length)
    ];
  };

  useEffect(() => {
    const validateImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
      });
    };

    const checkImage = async () => {
      const isValid = await validateImage(thumbnail_image);
      setValidImage(isValid ? thumbnail_image : getRandomDefaultImage());
    };

    checkImage();
  }, [thumbnail_image]);

 

  const handleEnroll = async (enrollTag, event) => {
   console.log(typeof id, 'course id type')
   console.log(typeof user?.id, 'cuser?.id type')
    event.preventDefault();
    const payload = {
      user_id: user?.id,
      course_id: id,
      role: enrollTag === "enroll" ? "student": "teacher",
      completed_status: false,
      total_lectures_attended: 0
      };
 console.log(id, 'course_idcourse_id')

      try {
        // setLoading(true); // Set loading to true before making the API call
        const responseData = await courseEnrollment(payload, dispatch, enrollTag);
    
        if (responseData) {
          Swal.fire({
            icon: "success",
            title: "Request Sent",
            text: 'Your request successfully sent. Please wait for admin approval.',
            showCancelButton: false,
            confirmButtonText: 'OK',
            // cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
              console.log(responseData, 'here is response after enrollment')
            
              if(responseData.message === "Teacher assigned successfully") {
                dispatch(addEnrollment(responseData.assignment));
              } else {
                dispatch(addEnrollment(responseData.enrollment));
              }

               
            } else {
              // User clicked Cancel or closed the popup
              // Handle accordingly
            }
        });
          console.log("Response data Enrollment:", responseData);
          // dispatch(fetchEnrollmentInfo({ id }));

          // setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      } catch (error) {
        console.error("Error in lead capture:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
        showCancelButton: false,
        confirmButtonText: "OK",
        // cancelButtonText: 'Cancel',
      });
    } finally {
      // setLoading(false); // Set loading to false after the API call is complete
    }
  };
  console.log(enrollTeachers, "teachers");

  const checkEnrollment = (enroll) => {
    if (enroll === "student") {
      const studentExists = enrollStudents.some(
        (student) => student.user_id === user?.id
      );
      return studentExists;
    } else if (enroll === "teacher") {
      const teacherExists = enrollTeachers.some(
        (teacher) => teacher.user_id === user?.id
      );
      console.log(teacherExists);
      return teacherExists;    }
  };
  console.log(enrollStudents, "enrolllllstudentsss")

   const requestApproval = ( ) => {
    
    //Check if user id exist in get students enrollment info

    const student = enrollStudents.find((student)=> student?.user_id === user?.id);
    if (student){
      setApprovalStatus({status: student?.approved, role: student?.role});
      return;
    }

    const teacher = enrollTeachers.find((teacher)=> teacher?.user_id === user?.id);
    

    if (teacher){
      setApprovalStatus({status: teacher?.approved, role: teacher?.role});
      return;
    }

     // If the user is not found in both arrays
     setApprovalStatus(null);
   }
   useEffect(() => {
    if (user?.id) {
      requestApproval();
    }
  }, [user?.id, enrollStudents, enrollTeachers]);

  return (
    <div className={css.outerDiv} style={scrolled ? outStyleGuide : {}}>
      <div className={css.innRightDiv} style={scrolled ? styleGuide : {}}>
        <div className={css.imgBox}>
          <img
            src={validImage} // Use the default thumbnail if img is not provided
            alt="course thumbnail"
            className={css.crsThumb}
          />
        </div>
        <div className={css.maskDiv}></div>
        <div className={css.imgMask}>
          <div className={css.imgODiv} onClick={handleClickCourse}>
            <PlayCircle style={{ color: "white", width: 50, height: 50 }} />
          </div>
          <div className={css.maskTxt}>Preview the course</div>
        </div>
      </div>
      <div className={css.crsePmtDt}>
        <div className={css.prcDet}>
          <div className={css.prc}>
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "PKR",
            }).format(course_fee)}
          </div>
          {/* Assuming you want to display some discounted price */}
          <div className={css.dscPrc}>
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "PKR",
            }).format(course_fee * 2)}
          </div>
          <div className={css.desc}>20% off</div>
        </div>
        <div className={css.tmLeft}>
          <img src={alarmIcon} alt="clock icon" className={css.cicon} />
          <span>
            <b>48 hours</b> left at this price!
          </span>
        </div>
        <div className={css.btns}>
        <div className={css.btnsSec2}>
            {/* {studentExists && ( */}
                  {userRole === "student" && (
                <Button1
                    onClick={(event) => handleEnroll("enroll", event)}
                   
                    txt="Enroll now (student)"
                    extraCss={{
                        width: "100%",
                        padding: "0.7rem",
                        margin: "0.5rem 0",
                    }}
                /> )}
            {/* )} */}
            {/* {!teacherExists && ( */}
            {userRole === "teacher" && (
                <Button1
                      onClick={(event) => handleEnroll('apply', event)}
                    disableBtn={checkEnrollment("teacher")}
                    txt="Apply now (teacher)"
                    extraCss={{
                        width: "100%",
                        padding: "0.7rem",
                        margin: "0.5rem 0",
                    }}
                /> )}
            {/* )} */}
        </div>
        <>
          
        {approvalStatus?.status === true && (
          <>
      <p style={{textAlign: 'center', color: 'green'}}>Your request as {approvalStatus.role} is approved.</p>
      <p>      ✅ <strong>Approved</strong>: You now have full access to the course content, including lectures, videos, and materials📚🎥
</p>
</>
    )}
    {approvalStatus?.status === false && (
      <p style={{textAlign: 'center', color: 'orangered'}}>Your request as {approvalStatus.role} is pending.</p>
    )}
      
    </>
        </div>
        <div className={css.crsePmtDtTxt}>Full Lifetime Access</div>
        <div className={css.crsePmtDtExSec}>
          <div
            className={css.innCrsePmtDtExSec}
            onClick={() => setApplyCoupon((prev) => !prev)}
          >
            Apply Discount Code
          </div>
        </div>
        <div className={css.inptBox}>
          {applyCoupon ? (
            <InputUtil
              style={{ background: "rgb(184 198 237)", borderRaduis: 10 }}
              btnTxt="Apply"
              onChange={(e) => setCoupon(e.target.value)}
              btnClick={() => console.log("coupon", "coupon")}
              extraCss={{ height: "42px" }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <hr />
      <div className={css.footerSec}>
        <div className={css.fooTtl}>Training a Group?</div>
        <div className={css.fooDesc}>
          Get your group access to a variety of Quran courses anytime, anywhere.
        </div>
        <Button1
          txt="Try Quran Academy for Groups"
          extraCss={{ width: "100%", padding: "0.7rem", margin: 0 }}
        />
      </div>
    </div>
  );
};

export default CourseFloatingBuyCard;

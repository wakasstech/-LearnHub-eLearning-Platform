import { useEffect, useState } from "react";

import css from "./CourseHeaderComp.module.css";

import Button1 from "../../../utils/coursepageutils/Buttons/Button1/Button1";
import InputUtil from "../../../utils/coursepageutils/FormUtils/InputUtil/InputUtil";
import CourseFloatingBuyCard from "../CourseFloatingBuyCard/CourseFloatingBuyCard"
import captionIcon from "../../../assests/icons/quran.png";
import globIcon from "../../../assests/icons/quran.png";
import warningIcon from "../../../assests/icons/updated.png";
import playIcon from "../../../assests/icons/play-icon.png";
import alarmIcon from "../../../assests/icons/play-icon.png";
import { PlayCircle } from "@mui/icons-material";
import defaultThumbnail from "../../../assests/images/homeBanner.jpg"; 
import { useDispatch, useSelector } from "react-redux";
import { courseEnrollment } from "../../../services/ApiService/CourseService";
import { addEnrollment, fetchEnrollmentInfo } from "../../../globalStore/Slices/CoursesSlice";
import Swal from "sweetalert2";

const CourseHeaderComp = (props) => {
  const { setShareModal } = props;
  console.log(props.data, 'here is my consoleeeee')
  const {user} = useSelector((state) => state.auth);

  const dispatch = useDispatch();


  const [scrolled, setScrolled] = useState(false);
  const [applyCoupon, setApplyCoupon] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [validImage, setValidImage] = useState(null)

  const {
    thumbnail_image,
    course_name,
    course_description,
    duration,
    course_outline,
    course_timmings,
    course_fee,
    courseId,
    id,
    rating = 4.9,
    rats = 100,
    enrolled = 1000,
    authors = ["Teacher 1", "Teacher 2"],
    lastUpdated = new Date(),
    lang = "Arabic",
    subTtl = "Urdu",
    is_premium
  } = props.data;
  useEffect(() => {
    const handleScroll = () => {
      if (document.body.scrollHeight - window.pageYOffset <= 1026) {
        setScrolled(false);
      } else if (window.pageYOffset >= 375) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const defaultCourseThumbs = [
    'https://media.istockphoto.com/id/1718890803/photo/close-up-of-holy-book-quran-at-mosque-sunlight-is-reflected-to-quran.webp?b=1&s=170667a&w=0&k=20&c=nZQ6tCRnxbK2dmQ5hHHoyKdCVumaiskPwNJZ0GPu_Uk=',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBZ5bRblqFICE4-f0gQNUxOkqzkDMChgH8Kg&s' ,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRVOteqWY1aIK721xRyOXj8G8ri8trrc88w&s'
  ];

  const getRandomDefaultImage = () => {
    return defaultCourseThumbs[Math.floor(Math.random() * defaultCourseThumbs.length)];
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

    event.preventDefault();
   
    const payload = {
      user_id: user?.id,
      course_id: id,
      role: enrollTag === "enroll" ? "student": "teacher",
      completed_status: false,
      total_lectures_attended: 0
      };


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
              dispatch(addEnrollment(responseData.assignment));

               
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

  return (
    <div className={css.outerDiv}>
      <CourseFloatingBuyCard
        scrolled={scrolled}
        data={props.data}
        setCoupon={setCoupon}
        applyCoupon={applyCoupon}
        setApplyCoupon={setApplyCoupon}
        setShareModal={setShareModal}
      />
      <div className={css.innerDiv}>
        <div className={css.leftDiv}>
          <div className={css.ttl}>{course_name}</div>
          <div className={css.desc}>{course_description}</div>
          <div className={css.rats}>
            <div className={css.rating}>{rating}</div>
            <div className={css.ratss}>({rats})</div>
            <div className={css.enrolled}>{enrolled} students enrolled</div>
          </div>
          <div className={css.authors}>
            Created by
            {authors?.map((user, id) => {
              if (authors.length === id + 1) {
                return (
                  <a key={id} >
                    {user}
                  </a>
                );
              }
              return (
                <a key={id}  className={css.authorSpn}>
                  {user}
                </a>
              );
            })}
          </div>
          <div className={css.det}>
            <div className={css.lastUpdated}>
              <img src={warningIcon} alt="warning icon" className={css.icon} />
              Last updated{" "}
              {`${lastUpdated.getMonth() + 1}/${lastUpdated.getFullYear()}`}
            </div>
            <div className={css.lang}>
              <img
                src={globIcon}
                alt="language icon"
                className={css.icon}
                style={{ filter: "invert(1)" }}
              />
              {lang}
            </div>
            <div className={css.subTtl}>
              <img src={captionIcon} alt="subtitle icon" className={css.icon} />
              {subTtl}
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
          <Button1
             onClick={(event) => handleEnroll('enroll', event)}
           
              txt="Enroll now (student)"
              extraCss={{
                width: "100%",
                padding: "0.7rem",
                margin: "0.5rem 0",
              }}
            />
             <Button1
             onClick={(event) => handleEnroll('apply', event)}
             txt="Apply now (teacher)"
              extraCss={{
                width: "100%",
                padding: "0.7rem",
                margin: "0.5rem 0",
              }}
            />
          </div>
        </div>
        <div className={css.crsePmtDtTxt}>Full Lifetime Access</div>
        <div className={css.crsePmtDtExSec}>
          <div
            className={css.innCrsePmtDtExSec}
            onClick={() => setApplyCoupon((prev) => !prev)}
          >
            Apply Discount Codee
          </div>
        </div>
        <div className={css.inptBox}>
          {applyCoupon ? (
            <InputUtil
              btnTxt="Apply"
              onChange={(e) => setCoupon(e.target.value)}
              btnClick={() => console.log('coupon', "coupon")}
              extraCss={{ height: "42px" }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
     
        </div>
        <div className={css.rightDiv}>
          <div className={css.innRightDiv}>
            <div className={css.imgBox}>
              <img
                src={validImage}
                alt="course thumbnail"
                className={css.crsThumb}
              />
            </div>
            <div className={css.maskDiv}></div>
            <div className={css.imgMask}>
              <div className={css.imgODiv}>
                <PlayCircle style={{ color: "white", width: 40, height: 40 }} />
              </div>
              <div className={css.maskTxt}>Preview the course</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeaderComp;

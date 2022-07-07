import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper';
import styles from './styles.module.scss';
import { CourseItem, COURSE_TYPE } from '@/types/course/course';
import RightDirection from '@/icons/RightDirection';

import { Container } from '@/components/Container';
import Image from 'next/image';
import { addFocalPoint } from '@/utils/image';

type HomeSliderProps = {
  courses: CourseItem[];
  swiperClasses?: string;
  swiperItemClasses?: string;
  swiperItemImageClasses?: string;
  swiperItemCourseClasses?: string;
  swiperItemCourseTitleClasses?: string;
  swiperItemCourseTypeClasses?: string;
};

const HomeSlider = ({
  courses,
  swiperClasses,
  swiperItemClasses = '',
  swiperItemImageClasses = '',
  swiperItemCourseClasses = '',
  swiperItemCourseTitleClasses = '',
  swiperItemCourseTypeClasses = '',
}: HomeSliderProps) => {
  const router = useRouter();
  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef<HTMLDivElement>(null);

  return (
    <Container className="px-0" extraClassName="max-w-[940px]">
      <div className="relative">
        <div
          ref={navigationPrevRef}
          className={`hidden lg:flex ${styles.arrow} ${styles.left}  bg-white prev-btn w-[50px] h-[50px] rounded-full justify-center items-center `}
        >
          <img src="/images/hi-landing/left-arrow.jpg" alt="Left arrow" />
        </div>
        <div
          ref={navigationNextRef}
          className={`hidden lg:flex ${styles.arrow} ${styles.right} next-btn bg-white  w-[50px] h-[50px] rounded-full justify-center items-center`}
        >
          <img src="/images/hi-landing/right-arrow.jpg" alt="Right arrow" />
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={5}
          pagination={{
            clickable: true,
            el: `.${swiperClasses}`,
          }}
          loop
          className="w-full"
          spaceBetween={22}
          centeredSlides={true}
          navigation={{
            nextEl: '.next-btn',
            prevEl: '.prev-btn',
          }}
          breakpoints={{
            1024: {
              centeredSlides: false,
              spaceBetween: 17,
            },
          }}
          autoplay={{
            delay: 5000,
          }}
        >
          {courses.map((course, index) => (
            <SwiperSlide
              key={course.cmsId}
              className={`flex justify-center items-center flex-col ${swiperItemClasses}`}
            >
              <div className={`relative ${swiperItemImageClasses}`}>
                <Image
                  objectFit="cover"
                  layout="fill"
                  src={`${addFocalPoint(course.image, 800, 1670)}`}
                />
              </div>
              <div
                className={`flex justify-between items-center ${swiperItemCourseClasses}`}
                onClick={() => {
                  router.push(
                    course.type === COURSE_TYPE.COURSE
                      ? `/signature-courses/${course.slug}`
                      : `/mini-courses/${course.slug}`,
                  );
                }}
              >
                <div className="pl-[13px] hover:underline cursor-pointer ">
                  <div className={`${swiperItemCourseTitleClasses}`}>{course.title}</div>
                  <div className="h-[3px]" />
                  <div className={`${swiperItemCourseTypeClasses}`}>{course.type}</div>
                </div>
                <div className="lg:pr-[17px] pr-[20px]">
                  <RightDirection stroke="#333333" width={7} height={13} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={`${swiperClasses}`} />
    </Container>
  );
};

export default HomeSlider;

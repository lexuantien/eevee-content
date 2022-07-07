import React, { useState, useRef, useEffect } from 'react';

import { Container } from '@/components/Container';
import Image from 'next/image';
import CaretRightIcon from '@/icons/CaretRightIcon';
import styles from './home.module.scss';
import coursesService from '@/services/coursesService';
import useSWR from 'swr';
import HomeSlider from '@/components/WebApp/HomeSlider';

import useElementInView from '@/custom-hooks/useElementInView';
import useTimeout from '@/custom-hooks/useTimeout';
import useAuth from '@/custom-hooks/useAuth';

import dynamic from 'next/dynamic';
import Link from 'next/link';

const DynamicRebrandHeader = dynamic(() => import('@/components/RebrandHeader'));
const DynamicRebrandFooter = dynamic(() => import('@/components/RebrandFooter'));

const delay = 3000;
const Home = () => {
  const isLogin = useAuth();
  const { data: courses } = useSWR('v1/courses', (url) => coursesService.getAllCoursesService(url));
  const [show, setShow] = useState<boolean>(false);
  const [abortTimeout, setAbortTimeout] = useState(false);
  const section4Ref = useRef<HTMLDivElement>(null);
  const [isOnScreen] = useElementInView(section4Ref);
  const headerRef = useRef<HTMLDivElement>(null);

  const [isSticky, setSticky] = useState<boolean>(false);

  useTimeout(
    () => {
      setShow(true);
    },
    abortTimeout ? null : delay,
  );

  useEffect(() => {
    if (isOnScreen) {
      setAbortTimeout(true);
      setShow(false);
    }
  }, [isOnScreen]);

  return (
    <div className="relative">
      <div ref={headerRef}>
        <DynamicRebrandHeader stickyFunc={(isSticky) => setSticky(isSticky)} />
      </div>
      <div
        className={`${styles['animatedFadeIn']} ${
          show ? styles['animatedFadeInActive'] : ''
        } hidden lg:flex fixed z-[19] flex-row  items-center h-[108px] bg-[#F3F0EA] left-0 right-0 bottom-0`}
      >
        <div
          className={`text-[24px] leading-[29px] text-center sohne-font text-[#333333] relative p-0 m-0 flex-grow`}
        >
          Expert led courses and cashbacks in your pocket.
        </div>
        {!isLogin && (
          <div className="min-w-[240px] right-[93px] absolute">
            <Link passHref href="/login">
              <button className="bg-[#EAA15E] w-[233px] h-[52px] sohne-font text-base text-[#333333] border-none leading-[17px]">
                <a className="sohne-font font-bold text-base text-[#333333] border-none leading-[17px]">
                  Get started for FREE
                </a>
              </button>
            </Link>
          </div>
        )}
      </div>
      <Container
        className={` ${
          isSticky ? 'lg:h-[calc(100vh-64px)]' : 'lg:h-[calc(100vh-98px)]'
        } h-[724px]  w-screen !mx-auto !px-0`}
        extraClassName="w-full max-w-none h-full flex items-center justify-center"
        image="/images/home-demo/pc/section1-bg.png"
      >
        <div className="flex items-center flex-col justify-center">
          <div className="px-[32px] pt-[52px] pb-[75px] lg:px-0 lg:mb-[66px] lg:p-0  w-full">
            <h1 className=" text-normal text-[#333333] font-light text-[48px] mb-[16px]  leading-[48px]  lg:text-[54px] lg:text-center lg:mb-auto lg:leading-[59px] not-italic financier-font">
              Be guided <br className="block lg:hidden" /> to a happier,
              <br />
              healthier you
            </h1>

            <h2 className="block lg:hidden text-[16px] font-medium tracking-[0.01em] text-[#000000] sohne-font leading-[19px]">
              Expert led courses and <br /> cashbacks in your pocket.
            </h2>
          </div>
          <div className="relative">
            <div className="absolute  -top-[44px] -left-[26px] lg:-top-[44px] lg:-left-[44px] z-10">
              <div className="w-[70px] h-[75px] lg:w-[93px] lg:h-[101px] relative">
                <Image src="/images/home-demo/pc/moon.png" layout="fill" objectFit="contain" />
              </div>
            </div>

            {/* image pc */}
            <div className="hidden lg:block lg:w-[980px] lg:h-[250px] relative">
              <Image layout="fill" objectFit="contain" src="/images/home-demo/pc/section1Pic.jpg" />

              <div className="hidden lg:block absolute -top-[212px] right-[-20px]">
                <Image
                  width="82px"
                  height="78px"
                  objectFit="contain"
                  src="/images/home-demo/pc/bird.png"
                />
              </div>

              <div className="hidden lg:block absolute bottom-[-112px] left-[188px]">
                <Image
                  width="82px"
                  height="78px"
                  objectFit="contain"
                  src="/images/home-demo/pc/noodles.png"
                />
              </div>
            </div>

            <div className="relative lg:hidden w-screen h-[400px]">
              <Image
                objectFit="cover"
                layout="fill"
                src="/images/home-demo/mobile/section1Pic.jpg"
              />
              {!isLogin && (
                <Link passHref href="/login">
                  <button
                    className={`bottom-0 left-1/2 lg:hidden absolute bg-[#FFFFFF] w-[254px] h-[54px] sohne-font text-base text-[#333333] border-none leading-[17px] ${styles['customTransform2']}`}
                  >
                    <a className="sohne-font text-base font-bold text-[#333333] border-none leading-[19px] tracking-[0.01em]">
                      Get started for FREE
                    </a>
                  </button>
                </Link>
              )}
              <div className="absolute right-[33px] -top-[95px]">
                <Image
                  width="50px" // 45
                  height="48px" // 43
                  objectFit="contain"
                  src="/images/home-demo/pc/noodles.png"
                />
              </div>

              <div className="absolute -top-[331px] right-[59px]">
                <Image
                  width="57px" // 47
                  height="41px" // 31
                  objectFit="contain"
                  src="/images/home-demo/pc/bird.png"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container
        className="h-[744px] lg:h-screen w-screen !mx-auto !px-0 bg-[#30553E]"
        extraClassName="w-full !max-w-none h-full"
        // image="/images/home-demo/pc/section2-bg.png"
        objectFit="contain"
      >
        <div
          className={`hidden z-[1] lg:block absolute xl:top-1/2 xl:left-1/2 lg:top-1/2 lg:left-[70%] ${styles['customTransform1']}`}
        >
          <Image
            width="240px"
            height="495px"
            objectFit="contain"
            src="/images/home-demo/pc/section2-phone.png"
          />
        </div>

        {/* pc */}
        <div className="hidden lg:block z-0">
          <div
            className={`block w-full h-[552px] absolute top-1/2 left-1/2 ${styles['customTransform1']}`}
          >
            <Image objectFit="fill" layout="fill" src="/images/home-demo/pc/graph.png" />
          </div>

          <div className={`block w-[57px] h-[57px] top-[80%] left-[20%] absolute `}>
            <Image objectFit="contain" layout="fill" src="/images/home-demo/mobile/coin.png" />
          </div>
          <div className={`block w-[35px] h-[35px] top-[20%] left-[25%] absolute `}>
            <Image objectFit="contain" layout="fill" src="/images/home-demo/mobile/coin.png" />
          </div>
          <div className={`block w-[73px] h-[73px] top-[15%] right-[10%] absolute `}>
            <Image objectFit="contain" layout="fill" src="/images/home-demo/mobile/coin.png" />
          </div>
          <div className={`block w-[41px] h-[41px] top-[60%] right-[30%] absolute `}>
            <Image objectFit="contain" layout="fill" src="/images/home-demo/mobile/coin.png" />
          </div>
        </div>
        {/* mobile */}
        <div className="block lg:hidden z-0">
          <div
            className={`block w-full h-[273px] lg:hidden absolute top-1/2 left-1/2 ${styles['customTransform1']}`}
          >
            <Image objectFit="fill" layout="fill" src="/images/home-demo/mobile/graph.png" />
          </div>

          <div className={`block w-[50px] h-[50px] top-[30%] -right-[5px] lg:hidden absolute `}>
            <Image objectFit="contain" layout="fill" src="/images/home-demo/mobile/coin.png" />
          </div>

          <div className={`block w-[35px] h-[35px] top-[50%] -left-[3px] lg:hidden absolute `}>
            <Image objectFit="contain" layout="fill" src="/images/home-demo/mobile/coin.png" />
          </div>

          <div className={`block w-[47px] h-[47px] top-[75%] left-[75%] lg:hidden absolute `}>
            <Image objectFit="contain" layout="fill" src="/images/home-demo/mobile/coin.png" />
          </div>
        </div>

        <div className="px-[30px] pt-[39px] pb-[53px] z-10 lg:pt-[264px] lg:px-0 lg:pb-0 lg:w-[297px] lg:ml-[201px]">
          <h3 className="not-italic font-medium text-[32px] leading-[34px] text-[#FFFFFF] pb-[14px] financier-font">
            <span className="bg-[#1F3929] lg:bg-transparent">Get cashback</span> offers on health
            and wellbeing brands
          </h3>
          <p className="text-[#FFFFFF] mb-[17px] text-sm leading-[17px] flex items-center sohne-font">
            Or discover something new from up and coming cult favourites.
          </p>

          <Link href="/cashback" passHref>
            <a className={`text-[#FFFFFF] font-bold sohne-font leading-[15px] flex text-[14px] `}>
              View cashbacks
              <CaretRightIcon stroke="#fff" width={7} height={15} className={`ml-3`} />
            </a>
          </Link>
        </div>

        <div className="block lg:hidden w-[209px] h-[435px] relative mx-[auto]">
          <Image layout="fill" objectFit="contain" src="/images/home-demo/pc/section2-phone.png" />
        </div>

        <div className="hidden pt-[264px] w-[297px] z-10 ml-[201px] ">
          <h3 className="not-italic font-medium text-[32px] leading-[35px] text-[#FFFFFF] pb-[13px] financier-font lg:leading-[34px] lg:pb-[14px]">
            Get cashback offers on health and wellbeing brands
          </h3>
          <p className="text-[#FFFFFF] mb-[24px] text-base leading-[17px] flex items-center sohne-font lg:text-sm lg:mb-[17px]">
            Or discover something new from up and coming cult favourites.
          </p>

          <Link href="/cashback" passHref>
            <a
              className={`text-[#FFFFFF] sohne-font text-[16px] leading-[18px] flex lg:text-[14px] lg:leading-[15px]`}
            >
              View cashbacks
              <CaretRightIcon stroke="#fff" width={7} height={15} className={`pt-1 ml-3`} />
            </a>
          </Link>
        </div>
      </Container>
      <Container
        className=" lg:h-screen w-screen !mx-auto !px-0 bg-[#EBE8E2] "
        extraClassName="w-full !max-w-none h-full flex items-center justify-center flex-col"
      >
        <div className="flex flex-col items-start px-[32px] pt-[36px] pb-[39px] lg:px-[51px] lg:items-center">
          <h2 className="hidden lg:block financier-font not-italic font-medium pb-5 text-[32px] leading-[34px] text-center">
            Online learning. Designed by experts to enhance your wellbeing.
          </h2>
          <h2 className="block lg:hidden financier-font not-italic font-medium text-[32px] leading-[34px] pb-[12px]">
            Online learning. Designed by experts to enhance your wellbeing.
          </h2>
          <Link href="/courses" passHref>
            <a className="text-[#333333] font-bold text-[14px] sohne-font leading-[15px] lg:leading-[17px] flex justify-center">
              Explore Courses
              <CaretRightIcon width={7} height={15} className={`ml-[15px]`} />
            </a>
          </Link>
        </div>
        {/* <div className="hidden lg:block h-[51px]" /> */}
        {courses && (
          <div>
            <HomeSlider
              courses={courses}
              swiperClasses="cusomSwiperNewHome"
              swiperItemClasses="!w-[216px] !h-[459px] lg:!w-[174px] lg:!h-[370px]"
              swiperItemImageClasses="w-[216px] h-[459px] lg:w-[174px] lg:h-[323px]"
              swiperItemCourseClasses="h-[57px] lg:h-[46px] w-full bg-white"
              swiperItemCourseTitleClasses="financier-font font-semibold text-base leading-[18px] lg:text-sm lg:leading-[15px] text-[#333]"
              swiperItemCourseTypeClasses="sohne-font text-[12px] leading-[13px] lg:text-[10px] lg:leading-[11px]"
            />
          </div>
        )}
      </Container>
      <Container
        className="hidden lg:block h-screen w-screen !mx-auto !px-0 bg-[#FFFFFF] "
        extraClassName="w-full !max-w-none h-full"
        image="/images/home-demo/pc/section4.jpg"
      >
        <div className="pt-[103px] ml-[200px] z-10">
          <div className="bg-white w-[404px] h-[200px] p-[30px]">
            <div className="not-italic font-medium text-[32px] leading-[34px] financier-font">
              Upgrade to Expert Access. Chat 1:1 with course experts for up to 3 months.
            </div>
            <Link href={!isLogin ? '/login' : '/pricing'} passHref>
              <a className="text-[#333333] font-bold text-sm sohne-font leading-[15px] flex pt-[22px]">
                Join us
                <CaretRightIcon width={7} height={15} className="pt-1 ml-[10px]" />
              </a>
            </Link>
          </div>
        </div>
      </Container>
      {/*  */}
      <Container
        className="lg:hidden block h-[663px] w-screen !mx-auto !px-0 bg-[#FFFFFF] "
        extraClassName="w-full !max-w-none h-full lg:hidden block bg-[#F3F0EA]"
      >
        <div className="relative lg:hidden w-screen h-[391px]">
          <Image objectFit="cover" layout="fill" src="/images/home-demo/mobile/section4.jpg" />
        </div>
        <div className="pt-[43px] px-[32px] pb-[77px]">
          <div className="not-italic font-medium text-[32px] leading-[35px] financier-font">
            Upgrade to Expert Access to message with experts one on one
          </div>
          <Link href={!isLogin ? '/login' : '/pricing'} passHref>
            <a className="text-[#333333] font-bold text-sm sohne-font leading-[15px] flex pt-[12px]">
              Join Us
              <CaretRightIcon width={7} height={13} className="pt-1 ml-[12px]" />
            </a>
          </Link>
        </div>
      </Container>

      <div className="px-[32px] pt-[107px] pb-[98px] text-center lg:px-[auto] lg:h-[332px]">
        <blockquote
          className={`hidden relative font-semibold lg:inline-block lg:text-[40px] italic lg:leading-[44px] financier-font lg:text-center ${styles['customBlockQuote']} pb-[38px]`}
        >
          The courses are really informative and in depth and the presenters are very knowledgeable.
          Plus the discounts are a bonus
        </blockquote>

        <div className="hidden lg:block text-base leading-[19px] text-center sohne-font text-[#333333]">
          Parsiy. Sydney
        </div>

        <blockquote
          className={`lg:hidden text-left text-[32px] leading-[35px] relative font-semibold inline-block  italic financier-font ${styles['customBlockQuoteMobile']} pb-[32px]`}
        >
          Benefit Pocket really helped me. I sleep so much better now after doing the sleep course.
        </blockquote>

        <div className="lg:hidden text-base leading-[19px] text-left sohne-font text-[#333333]">
          Alicia Jones. Sydney
        </div>
      </div>

      <div ref={section4Ref} className="flex lg:h-[574px] flex-col lg:flex-row bg-[#f3f0ea]">
        <div className="relative w-full h-[371px] lg:w-[604px] lg:h-full ">
          <Image layout="fill" objectFit="cover" src="/images/home-demo/pc/human.jpg" />
        </div>

        <div className="pt-[41px] pb-[45px] px-[32px]  bg-[#F3F0EA] lg:pl-[126px] lg:pt-[79px] lg:pr-[100px]">
          <div className="font-medium text-[32px] leading-[35px] not-italic financier-font text-[#333333] pb-[29px]">
            What is Benefit Pocket?
          </div>
          <div className="hidden lg:block w-[16px] h-[4px] bg-[#333333] mb-8" />
          <p className="text-base leading-[22px] lg:text-sm lg:leading-5 tracking-normal sohne-font pb-[35px] lg:pb-[43px]">
            Benefit Pocket is a free app that brings together cashback offers and online learning to
            give you the front door to all of you health and wellbeing needs. <br />
            <br />
            Discover cashback from big brands, cult favourites and up and comers. Allow experts to
            guide you through some of life&apos;s trickier health challenges. As you learn,
            you&apos;ll have the option to connect directly with qualified experts to help you.
            You&apos;ll also unlock special discount offers from relevant partners.
          </p>
          {/* <div className="h-[35px] lg:h-[43px]" /> */}
          <div className="flex justify-between lg:justify-start">
            <div className="w-[48%] h-[118px] p-[10px] lg:w-[298px] lg:h-[140px] border-solid border-[1px] border-[#333333]   lg:py-[22px] lg:px-[20px] lg:mr-[20px]">
              <Link href="/cashback">
                <div
                  className={`text-[#333333] font-bold text-base leading-[18px] sohne-font lg:leading-[20px] lg:text-[18px] flex items-center`}
                >
                  Explore cashbacks
                  <CaretRightIcon width={8} height={20} strokeWidth={3} className={`ml-[15px]`} />
                </div>
              </Link>
              <div className="text-[12px] leading-[14px] lg:text-sm lg:leading-4 pt-[9px] lg:pt-[14px] text-[#111111] sohne-font ">
                Discover cashback offers from health and wellbeing brands you&apos;ll love.
              </div>
            </div>

            <div className="w-[48%] h-[118px] p-[10px] lg:w-[298px] lg:h-[140px] border-solid border-[1px] border-[#333333] lg:py-[22px] lg:px-[20px]">
              <Link href="/courses">
                <div
                  className={`text-[#333333] font-bold text-base leading-[18px] sohne-font lg:leading-[20px] lg:text-[18px] flex items-center`}
                >
                  Explore courses
                  <CaretRightIcon width={8} height={20} strokeWidth={3} className={`ml-[15px]`} />
                </div>
              </Link>
              <div className="text-[12px] leading-[14px] lg:text-sm lg:leading-4 pt-[9px] lg:pt-[14px] text-[#111111] sohne-font ">
                Learn at your own pace with a variety of courses designed by experts.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Container
        image="/images/home-demo/pc/bottom-bg.jpg"
        className="w-screen !mx-auto !px-0"
        extraClassName="w-full !max-w-none h-full flex items-start lg:items-center flex-col pt-[47px] lg:pt-[84px] px-[32px]"
      >
        <div
          className={`block lg:hidden absolute right-[30px] -top-[20px] ${styles['customBalloutRotate']}`}
        >
          <Image width={90} height={131} src="/images/home-demo/pc/ballout.png" />
        </div>

        <div className="hidden lg:block absolute right-[160px] top-[-40px]">
          <Image width={125} height={182} src="/images/home-demo/pc/ballout.png" />
        </div>

        <h2 className="z-10 text-[#333333] font-light lg:font-light text-[48px] leading-[51px] not-italic financier-font  lg:text-[42px] lg:leading-[45px]">
          Get started <br className="block lg:hidden" /> today for free
        </h2>

        <div className="relative">
          <div className="hidden lg:block absolute left-[-300px] top-[-70px]">
            <Image width={102} height={182} src="/images/home-demo/pc/tree.png" />
          </div>
          <div className="hidden lg:block absolute right-[-200px] bottom-[-120px]">
            <Image width={61} height={71} src="/images/home-demo/pc/cup.png" />
          </div>

          <p className="z-10 pt-[22px] pb-[50px] lg:pb-[43px] lg:pt-[21px] text-base leading-[19px] lg:text-xl lg:leading-6 text-[#333333] sohne-font">
            Get our cashback offers and mini courses for free.
          </p>
        </div>
        <Link href={isLogin ? '/cashback' : '/login'} passHref>
          <button className="z-10  cursor-pointer bg-[#333333] lg:mb-[108px] mb-[61px] w-full h-[52px] lg:w-[250px] lg:h-[62px] sohne-font text-base text-[#FFFFFF] border-none leading-[19px] self-center">
            <a className="sohne-font font-bold text-base text-[#FFFFFF] leading-[19px]">
              Get started for FREE
            </a>
          </button>
        </Link>
      </Container>
      <div className="h-[224px] lg:h-[161px] flex flex-col items-start px-[32px] pt-[45px] bg-[#333333] lg:items-center lg:justify-between lg:px-[94px] lg:flex-row lg:pt-0">
        <div className="text-white financier-font not-italic font-normal leading-[35px] text-[32px] lg:leading-[46px] lg:text-[42px]">
          Have more questions?
        </div>
        <div className="lg:hidden block h-[32px]" />
        <button className="w-[100%] lg:w-[212px] h-[52px] bg-transparent text-[16px] leading-[19px] border-[#FFFFFF] text-white">
          <Link href="/support" passHref>
            <a className="text-white text-[16px] leading-[19px] sohne-font">View FAQs</a>
          </Link>
        </button>
      </div>
      <DynamicRebrandFooter />
    </div>
  );
};

export default Home;

/**
 * 1.done
 * 2.done
 * 3.check later
 * 4.done
 * 5.done
 * 6.done
 * 7.some trouble
 * 8.don't know
 */
